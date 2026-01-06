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

// 2. API: Deep AI Analysis
support.post('/analyze', async (c) => {
  try {
    const { companyData } = await c.req.json();
    const apiKey = c.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OpenAI API Key Missing");
    }

    // Advanced Prompt with Deep Data
    const systemPrompt = `
      당신은 대한민국 최고의 정부지원사업 매칭 컨설턴트 AI입니다.
      기업이 제공한 '정밀 진단 데이터'를 바탕으로 2026년도 최적의 지원사업 Top 20을 추천해야 합니다.
      
      [분석 원칙]
      1. 재무 안정성: 부채비율과 영업이익을 고려하여 금융 지원 vs R&D 지원 여부를 판단하세요.
      2. 기술 역량: 연구소 보유 여부와 R&D 투자비율이 높다면 '기술개발(R&D)' 사업을 최우선 추천하세요.
      3. 수출 역량: 수출 실적이 있다면 '글로벌/수출바우처' 사업을 반드시 포함하세요.
      4. 고용 창출: 청년 고용이나 인력 증가가 보이면 '고용장려금'이나 '일자리사업'을 매칭하세요.
      
      Output JSON Format:
      {
        "diagnosis": {
          "techScore": "기술성 점수(S/A/B/C)",
          "bizScore": "사업성 점수(S/A/B/C)",
          "marketScore": "시장성 점수(S/A/B/C)",
          "comment": "기업의 강점과 약점에 대한 한 줄 총평"
        },
        "data": [
          {
            "rank": 1,
            "title": "공고명",
            "agency": "주관기관",
            "category": "분야(R&D/사업화/수출/인력/자금)",
            "matchScore": 98,
            "amount": "최대 지원금",
            "deadline": "마감일",
            "aiReason": "이 사업을 추천하는 구체적인 이유 (기업 데이터 인용 필수)"
          }
          // ... 20 items
        ]
      }
    `;

    const userPrompt = `
      [기업 정밀 데이터]
      1. 기업 개요
         - 기업명: ${companyData.basic.name}
         - 업종: ${companyData.basic.industry}
         - 설립일: ${companyData.basic.estDate}
         - 규모: ${companyData.basic.scale}
         - 주소: ${companyData.basic.address}

      2. 재무 현황 (단위: 백만원)
         - 매출액: ${companyData.finance.revenue}
         - 영업이익: ${companyData.finance.profit}
         - 자본총계: ${companyData.finance.capital}
         - 부채비율: ${companyData.finance.debtRatio}%

      3. 기술 및 R&D
         - 연구소 보유: ${companyData.tech.hasLab ? '보유' : '미보유'}
         - R&D 투자액: ${companyData.tech.rndSpend} 백만원
         - 지식재산권: ${companyData.tech.ipCount} 건
         - 주력 제품/기술: ${companyData.tech.description}

      4. 인력 현황
         - 총 직원: ${companyData.hr.total} 명
         - 연구 인력: ${companyData.hr.researchers} 명
         - 청년 고용: ${companyData.hr.youth} 명

      5. 수출 및 인증
         - 직수출 실적: ${companyData.export.amount} USD
         - 보유 인증: ${companyData.cert.list.join(', ')}
    `;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.6,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) throw new Error("AI Server Error");

    const aiData: any = await response.json();
    const result = JSON.parse(aiData.choices[0].message.content);

    return c.json({ success: true, ...result });

  } catch (e: any) {
    return c.json({ 
      success: false, 
      message: "AI 분석 중 오류가 발생했습니다. (API Key 확인 필요)",
      error: e.message 
    });
  }
})

export default support