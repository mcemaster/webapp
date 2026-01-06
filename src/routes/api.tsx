import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
  DART_API_KEY: string;
}

const api = new Hono<{ Bindings: Bindings }>()

// 1. DART Connection Test
api.get('/dart/test', async (c) => {
  const apiKey = c.env.DART_API_KEY
  if (!apiKey) return c.json({ success: false, message: 'API Key Missing' })
  
  try {
    // Test with Samsung Electronics Code
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=00126380`
    const res = await fetch(url)
    const data: any = await res.json()
    
    if (data.status === '000') {
      return c.json({ success: true, company: data.corp_name })
    } else {
      return c.json({ success: false, message: data.message })
    }
  } catch (e: any) {
    return c.json({ success: false, message: e.message })
  }
})

// 2. DART Data Fetch
api.get('/dart/data', async (c) => {
  const code = c.req.query('code')
  const apiKey = c.env.DART_API_KEY
  if (!apiKey) return c.json({ error: 'Key Missing' })
  if (!code) return c.json({ error: 'Code Missing' })

  try {
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${code}`
    const res = await fetch(url)
    const data: any = await res.json()
    
    if (data.status === '000') {
      return c.json({
        success: true,
        data: {
          name: data.corp_name,
          ceo: data.ceo_nm,
          est_date: data.est_dt,
          address: data.adres,
          corp_cls: data.corp_cls
        }
      })
    }
    return c.json({ success: false, message: data.message })
  } catch (e: any) {
    return c.json({ success: false, message: e.message })
  }
})

// 3. Company Search (Autocomplete Mock)
api.get('/search/company', (c) => {
  const q = c.req.query('q') || ''
  if (q.length < 1) return c.json([])
  
  const mockDB = [
    { name: '삼성전자', code: '00126380', ceo: '한종희' },
    { name: '삼성에스디아이', code: '00126362', ceo: '최윤호' },
    { name: '태성정밀', code: '00123456', ceo: '김철수' },
    { name: '현대자동차', code: '00164779', ceo: '정의선' },
    { name: 'LG에너지솔루션', code: '01515337', ceo: '권영수' }
  ]
  
  return c.json(mockDB.filter(x => x.name.includes(q)))
})

// 4. Admin Stats
api.get('/admin/stats', (c) => {
  return c.json({
    users: 1250,
    aiUsage: 150,
    grants: 320,
    pending: 5
  })
})

// 5. Admin Data Tables
api.get('/admin/companies', (c) => {
  return c.json({
    companies: [
      { name: '(주)테스트기업', ceo: '김대표', industry: '제조업', revenue: '50억원', created_at: '2026-01-05' },
      { name: '삼성전자', ceo: '한종희', industry: '전자', revenue: '300조원', created_at: '2026-01-04' },
      { name: '현대자동차', ceo: '정의선', industry: '자동차', revenue: '150조원', created_at: '2026-01-03' }
    ]
  })
})

api.get('/admin/grants', (c) => {
  return c.json({
    grants: [
      { title: '2026 AI 바우처 지원사업', agency: 'NIPA', amount: '최대 3억원', deadline: '2026-05-01', status: 'active' },
      { title: '혁신성장 R&D 지원', agency: '중소벤처기업부', amount: '최대 5억원', deadline: '2026-04-15', status: 'active' },
      { title: '수출바우처 사업', agency: 'KOTRA', amount: '최대 1억원', deadline: '2026-03-31', status: 'active' }
    ]
  })
})

api.get('/admin/logs', (c) => {
  return c.json({
    logs: [
      { created_at: '2026-01-06 14:30', user_email: 'user@example.com', company_name: '테스트기업', match_count: 15, tokens_used: '2,450' },
      { created_at: '2026-01-06 13:15', user_email: 'admin@mce.re.kr', company_name: '삼성전자', match_count: 20, tokens_used: '3,100' },
      { created_at: '2026-01-05 17:45', user_email: 'partner@test.com', company_name: '현대자동차', match_count: 18, tokens_used: '2,800' }
    ]
  })
})

api.get('/admin/users', (c) => {
  return c.json({
    users: [
      { name: '최고관리자', email: 'admin@mce.re.kr', role: 'admin', created_at: '2025-12-01', ai_usage: 45 },
      { name: '김철수', email: 'user@example.com', role: 'user', created_at: '2026-01-02', ai_usage: 12 },
      { name: '박영희', email: 'partner@test.com', role: 'partner', created_at: '2026-01-03', ai_usage: 8 }
    ]
  })
})

// Admin Deploy Trigger
api.post('/admin/deploy', async (c) => {
  // Placeholder - In production, trigger Cloudflare deployment webhook
  return c.json({ success: true, message: 'Deploy triggered' })
})

// 6. User Registration
api.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    // TODO: Save to DB
    // await c.env.DB.prepare('INSERT INTO users ...').run()
    return c.json({ success: true, message: '회원가입이 완료되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 400)
  }
})

export default api