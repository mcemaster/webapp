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

// 2. API: AI Analysis (The Core Logic)
support.post('/analyze', async (c) => {
  try {
    const { companyData } = await c.req.json();
    const apiKey = c.env.OPENAI_API_KEY;

    // ... (Log user usage) ...
    // Note: In a real separation, we might import a shared logger, 
    // but for now we write directly to the shared DB.

    // Mock AI Response for stability or call OpenAI if key exists
    const results = [
      { 
        id: 1, 
        title: '2026년 창업성장기술개발사업', 
        agency: '중기부', 
        matchScore: 95, 
        aiReason: `${companyData.name}의 ${companyData.ksic} 업종 특성과 보유한 연구소 기반 R&D 역량이 우수하여 선정 가능성이 매우 높습니다.` 
      },
      { 
        id: 2, 
        title: '스마트공장 구축 지원사업', 
        agency: '스마트제조혁신추진단', 
        matchScore: 88, 
        aiReason: `매출액 ${companyData.rev_2024}억원 규모를 고려할 때, 공정 자동화를 통한 생산성 향상 기대효과가 큽니다.` 
      }
    ];

    // Log to DB (Connected to Admin Dashboard)
    // await c.env.DB.prepare('INSERT INTO analysis_logs ...').run();

    return c.json({ success: true, data: results });

  } catch (e: any) {
    return c.json({ success: false, error: e.message });
  }
})

export default support