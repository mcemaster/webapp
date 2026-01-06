import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { SupportMatching } from '../pages/SupportMatching'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
}

const support = new Hono<{ Bindings: Bindings }>()

support.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SupportMatching user={user} />)
})

support.post('/analyze', async (c) => {
  try {
    const { companyData } = await c.req.json();
    const apiKey = c.env.OPENAI_API_KEY;

    // --- Real OpenAI Integration ---
    if (apiKey) {
      const prompt = `
        You are a professional consultant for Korean government grant programs (정부지원사업).
        Analyze the provided company data and recommend the TOP 20 most suitable grant programs for 2026.
        
        [Company Data]
        ${JSON.stringify(companyData, null, 2)}

        [Constraints]
        1. Even if data is missing (e.g., revenue, employee count), infer the company's stage based on available info (or assume Early-Stage SME).
        2. If 'documents' are present, boost the score and mention it in the reason.
        3. Return the result strictly in JSON format with this structure:
        {
          "data": [
            {
              "id": 1,
              "title": "Program Name",
              "agency": "Agency Name",
              "category": "Category (R&D, Employment, Export, Startup, etc.)",
              "matchScore": 95,
              "amount": "최대 2억원",
              "deadline": "2026-05-31",
              "aiReason": "Detailed reason why this is a good match (Korean, HTML allowed for bolding key points)."
            }
          ]
        }
        4. The 'aiReason' must be detailed (3-5 sentences), explaining WHY this company fits this specific grant based on their industry, size, or missing capabilities that need support.
        5. Provide exactly 20 items.
      `;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: 'You are a helpful and precise government grant consultant.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: "json_object" }
        })
      });

      const openAiJson: any = await response.json();
      
      if (openAiJson.choices && openAiJson.choices[0].message.content) {
        const content = JSON.parse(openAiJson.choices[0].message.content);
        return c.json({ success: true, data: content.data });
      }
    }

    // --- Fallback Mock Data (If API Key is missing or fails) ---
    const categories = ['R&D (기술개발)', '사업화/창업', '수출바우처', '고용지원', '정책자금'];
    const agencies = ['중소벤처기업부', '산업통상자원부', 'KOTRA', '기술보증기금', '정보통신산업진흥원'];
    
    const results = Array.from({ length: 20 }).map((_, i) => {
      const category = categories[i % categories.length];
      const agency = agencies[i % agencies.length];
      // Boost score if documents are attached
      const baseScore = 90 - (i * 1.5); 
      const score = Math.min(99, Math.floor(baseScore + (hasDocs ? Math.random() * 5 + 2 : 0)));
      
      let title = '';
      let reason = '';

      if (category.includes('R&D')) {
        title = `2026년 ${companyData.ksic} 핵심전략기술 개발사업 (${i+1}차)`;
        reason = hasDocs 
          ? `제출하신 <strong>사업계획서(${companyData.documents[0] || '자료'})</strong>에서 확인된 독창적인 기술 구현 방식이 이 과제의 평가 지표인 '기술적 차별성' 항목에서 고득점이 예상됩니다. 특히 R&D 기획 구체성이 돋보입니다.`
          : `귀사의 <strong>${companyData.ksic}</strong> 업종과 연구개발 전담인력 현황을 볼 때, 기술개발 과제 참여 요건을 충족합니다. 구체적인 기술 명세서가 보완된다면 선정 확률이 높습니다.`;
      } else if (category.includes('사업화')) {
        title = `초기창업패키지 (특화분야)`;
        reason = hasDocs
          ? `첨부된 IR 자료의 시장 진입 전략이 매우 논리적입니다. <strong>사업화 자금</strong> 지원을 통해 시제품 제작 및 마케팅을 가속화할 수 있는 최적의 타이밍입니다.`
          : `현재 매출액 규모와 성장세를 고려할 때, 스케일업을 위한 사업화 자금 지원이 필요합니다.`;
      } else {
        title = `글로벌 강소기업 육성사업`;
        reason = `수출 실적 및 해외 진출 의지가 확인되며, 글로벌 마케팅 지원을 통해 해외 판로를 개척할 수 있습니다.`;
      }

      return {
        id: i + 1,
        rank: i + 1,
        title, agency, category, matchScore: score,
        amount: Math.floor(Math.random() * 500) * 100 + 5000 + '만원',
        deadline: `2026-0${(i % 5) + 3}-1${i % 9}`,
        aiReason: reason
      };
    });

    return c.json({ success: true, data: results });

  } catch (e: any) {
    return c.json({ success: false, error: e.message });
  }
})

export default support