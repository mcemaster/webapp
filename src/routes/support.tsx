import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { SupportMatching } from '../pages/SupportMatching'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
}

const support = new Hono<{ Bindings: Bindings }>()

// 1. UI Route
support.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SupportMatching user={user} />)
})

// 2. API: Real AI Analysis (OpenAI GPT-4o)
support.post('/analyze', async (c) => {
  try {
    const { companyData } = await c.req.json();
    const apiKey = c.env.OPENAI_API_KEY;

    // API 키 확인
    if (!apiKey) {
      throw new Error("OpenAI API Key가 설정되지 않았습니다. 클라우드플레어 설정을 확인해주세요.");
    }

    // 프롬프트 구성 (Strict JSON Output)
    const systemPrompt = `
      당신은 대한민국 최고의 정부지원사업 매칭 전문가 AI입니다.
      현재 시점은 2026년입니다.
      
      입력된 기업 데이터를 정밀 분석하여, 합격 가능성이 높은 '2026년 정부지원사업' 20개를 추천해야 합니다.
      반드시 다음 JSON 스키마를 준수하여 응답하세요.
      
      Output JSON Format:
      {
        "data": [
          {
            "rank": 1,
            "title": "공고명 (예: 2026년 초기창업패키지)",
            "agency": "주관기관 (예: 중소벤처기업부)",
            "category": "분야 (R&D, 사업화, 인력, 수출, 자금 중 택1)",
            "matchScore": 98,
            "amount": "지원금액 (예: 최대 1억원)",
            "deadline": "마감일 (예: 2026-03-15)",
            "aiReason": "기업의 상황(매출, 업종 등)과 공고의 특성을 연결한 구체적인 추천 사유 (2문장 이상)"
          }
          // ... 총 20개 항목
        ]
      }
    `;

    const userPrompt = `
      [분석 대상 기업 정보]
      - 기업명: ${companyData.name}
      - 대표자: ${companyData.ceo || '미입력'}
      - 업종(KSIC): ${companyData.ksic}
      - 주요사업: ${companyData.desc || '정보 없음'}
      - 매출액: ${companyData.rev_2024} 백만원
      - 직원수: ${companyData.employees} 명
      - 보유인증: ${companyData.certs ? companyData.certs.join(', ') : '없음'}
      
      위 기업에게 가장 적합한 2026년도 정부지원사업 20개를 선정하고, 각 사업별로 선정이유를 논리적으로 작성해주세요.
      매출액 규모와 업력을 고려하여 '창업기', '도약기', '성장기'에 맞는 사업을 매칭해야 합니다.
      특히 '보유인증'이 가점이 되는 사업을 우선순위에 두세요.
    `;

    // OpenAI API 호출
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // 속도와 성능 균형
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const err = await response.json() as any;
      throw new Error(`OpenAI API Error: ${err.error?.message || response.statusText}`);
    }

    const aiData: any = await response.json();
    const content = aiData.choices[0].message.content;
    const parsedData = JSON.parse(content);

    // 데이터 검증 및 가공 (ID 부여)
    const results = parsedData.data.map((item: any, index: number) => ({
      ...item,
      id: index + 1,
      rank: index + 1
    }));

    return c.json({ success: true, data: results });

  } catch (e: any) {
    console.error("AI Analysis Failed:", e);
    
    // 실패 시 Fallback (사용자 경험을 위해 정적 데이터 반환하되, 에러 메시지 포함 가능)
    // 여기서는 명시적으로 에러를 리턴하여 클라이언트가 알게 함
    return c.json({ 
      success: false, 
      error: e.message,
      message: "AI 분석 중 오류가 발생했습니다. API Key를 확인하거나 잠시 후 다시 시도해주세요."
    });
  }
})

export default support