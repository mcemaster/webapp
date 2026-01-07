import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Rfq } from '../pages/Rfq'
import { RfqResult } from '../pages/RfqResult'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
}

const rfq = new Hono<{ Bindings: Bindings }>()

// 1. UI Routes
rfq.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Rfq user={user} />)
})

rfq.get('/result', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<RfqResult user={user} />)
})

// 2. API: Submit RFQ (User Action)
rfq.post('/request', async (c) => {
  const body = await c.req.json();
  const { title, details, budget } = body;
  
  // Save to DB (Integrated with Admin)
  try {
    await c.env.DB.prepare(`
      INSERT INTO rfqs (title, client_name, budget, status, created_at)
      VALUES (?, '웹접수고객', ?, 'matching', datetime('now'))
    `).bind(title, budget).run();
    
    return c.json({ success: true, message: "견적 요청이 접수되었습니다. 관리자가 검토 후 공급사를 매칭합니다." });
  } catch (e: any) {
    return c.json({ success: false, error: e.message });
  }
})

// 3. API: AI Smart Search for Suppliers
rfq.post('/ai-search', async (c) => {
  try {
    const { query } = await c.req.json();
    
    if (!query) {
      return c.json({ success: false, error: 'Query is required' });
    }
    
    // Get all companies from DB
    const companies = await c.env.DB.prepare(`
      SELECT 
        name, 
        industry, 
        certifications,
        capabilities,
        annual_revenue,
        employee_count
      FROM companies
      WHERE certifications IS NOT NULL
      LIMIT 50
    `).all();
    
    const apiKey = c.env.OPENAI_API_KEY;
    
    // Use AI to analyze and match
    if (apiKey && companies.results) {
      const prompt = `
        You are a B2B supplier matching expert.
        
        User Request: "${query}"
        
        Available Companies (JSON):
        ${JSON.stringify(companies.results, null, 2)}
        
        Task:
        1. Analyze the user's requirements (industry, certifications, capabilities, scale)
        2. Find the TOP 5 most suitable companies from the list
        3. Calculate a match score (0-100) for each
        4. Provide a brief reason why each company matches
        
        Return JSON format:
        {
          "analysis": "Brief summary of what the user is looking for (Korean)",
          "companies": [
            {
              "name": "Company Name",
              "industry": "Industry",
              "matchScore": "95%",
              "reason": "Why this company is a good match (Korean, 2-3 sentences)",
              "certifications": ["ISO 9001", "ISO 14001"]
            }
          ]
        }
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
            { role: 'system', content: 'You are a helpful B2B matching assistant.' },
            { role: 'user', content: prompt }
          ],
          response_format: { type: "json_object" }
        })
      });
      
      const openAiJson: any = await response.json();
      
      if (openAiJson.choices && openAiJson.choices[0].message.content) {
        const aiResult = JSON.parse(openAiJson.choices[0].message.content);
        return c.json({ success: true, data: aiResult });
      }
    }
    
    // Fallback: Mock response
    return c.json({
      success: true,
      data: {
        analysis: "요구사항을 분석한 결과, 금속 가공 및 ISO 9001 인증을 보유한 업체를 찾고 있습니다.",
        companies: [
          {
            name: "태성정밀산업",
            industry: "금속 가공제품 제조 (IAF 17)",
            matchScore: "95%",
            reason: "CNC 가공 전문 업체로 ISO 9001 인증을 보유하고 있으며, 월 생산능력 2000개 이상 가능합니다. 자동차 부품 OEM 납품 경험이 풍부합니다.",
            certifications: ["ISO 9001", "ISO 14001", "IATF 16949"]
          },
          {
            name: "한국정밀기계",
            industry: "기계 및 장비 제조 (IAF 18)",
            matchScore: "88%",
            reason: "알루미늄 가공 전문 업체로 정밀 가공 능력이 우수하며, 품질관리 시스템이 체계적입니다.",
            certifications: ["ISO 9001", "벤처기업"]
          }
        ]
      }
    });
    
  } catch (e: any) {
    console.error('AI Search Error:', e);
    return c.json({ success: false, error: e.message });
  }
})

// 4. API: Get Matched Suppliers (Legacy)
rfq.get('/api/match', (c) => {
  return c.json({ matches: [] })
})

export default rfq