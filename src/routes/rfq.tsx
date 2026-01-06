import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Rfq } from '../pages/Rfq'
import { RfqResult } from '../pages/RfqResult'

type Bindings = {
  DB: D1Database;
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

// 3. API: Get Matched Suppliers (AI Logic placeholder)
rfq.get('/api/match', (c) => {
  // Logic to find suppliers based on keywords
  return c.json({ matches: [] })
})

export default rfq