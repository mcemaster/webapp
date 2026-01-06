import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
  DART_API_KEY: string;
}

const api = new Hono<{ Bindings: Bindings }>()

// ==========================================
// DART API Integration
// ==========================================

// 1. DART Connection Test
api.get('/dart/test', async (c) => {
  const apiKey = c.env.DART_API_KEY
  if (!apiKey) return c.json({ success: false, message: 'API Key Missing' })
  
  try {
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

// 3. Company Search (from DB + Mock fallback)
api.get('/search/company', async (c) => {
  const q = c.req.query('q') || ''
  if (q.length < 1) return c.json([])
  
  try {
    // Try from DB first
    const db = c.env.DB
    if (db) {
      const result = await db.prepare(
        `SELECT name, biz_num as code, 
         (SELECT name FROM users WHERE users.id = companies.user_id) as ceo
         FROM companies WHERE name LIKE ? LIMIT 10`
      ).bind(`%${q}%`).all()
      
      if (result.results && result.results.length > 0) {
        return c.json(result.results)
      }
    }
  } catch (e) {
    console.log('DB search failed, using mock')
  }
  
  // Fallback to mock
  const mockDB = [
    { name: '삼성전자', code: '00126380', ceo: '한종희' },
    { name: '삼성에스디아이', code: '00126362', ceo: '최윤호' },
    { name: '태성정밀', code: '00123456', ceo: '김철수' },
    { name: '현대자동차', code: '00164779', ceo: '정의선' },
    { name: 'LG에너지솔루션', code: '01515337', ceo: '권영수' }
  ]
  
  return c.json(mockDB.filter(x => x.name.includes(q)))
})

// ==========================================
// Admin Dashboard APIs (Real DB Connected)
// ==========================================

// 4. Admin Stats - Real DB
api.get('/admin/stats', async (c) => {
  try {
    const db = c.env.DB
    
    // Get user count
    const usersResult = await db.prepare('SELECT COUNT(*) as count FROM users').first<{count: number}>()
    const users = usersResult?.count || 0
    
    // Get AI analysis count
    const aiResult = await db.prepare('SELECT COUNT(*) as count FROM analysis_logs').first<{count: number}>()
    const aiUsage = aiResult?.count || 0
    
    // Get grants count
    const grantsResult = await db.prepare('SELECT COUNT(*) as count FROM grants').first<{count: number}>()
    const grants = grantsResult?.count || 0
    
    // Get pending partners count
    const pendingResult = await db.prepare("SELECT COUNT(*) as count FROM partners WHERE status = 'pending'").first<{count: number}>()
    const pending = pendingResult?.count || 0
    
    return c.json({ users, aiUsage, grants, pending })
  } catch (e: any) {
    console.error('Admin stats error:', e)
    return c.json({ users: 0, aiUsage: 0, grants: 0, pending: 0, error: e.message })
  }
})

// 5. Admin - Companies List
api.get('/admin/companies', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(`
      SELECT 
        c.id,
        c.name,
        c.biz_num,
        c.industry_code as industry,
        c.employee_count,
        c.financial_json,
        c.certifications,
        c.analyzed_at as created_at,
        u.name as ceo
      FROM companies c
      LEFT JOIN users u ON c.user_id = u.id
      ORDER BY c.analyzed_at DESC
      LIMIT 100
    `).all()
    
    const companies = (result.results || []).map((c: any) => {
      let revenue = '-'
      try {
        if (c.financial_json) {
          const fin = JSON.parse(c.financial_json)
          revenue = fin.revenue ? `${(fin.revenue / 100000000).toFixed(1)}억원` : '-'
        }
      } catch {}
      
      return {
        id: c.id,
        name: c.name || '-',
        ceo: c.ceo || '-',
        industry: c.industry || '-',
        revenue,
        created_at: c.created_at ? c.created_at.split('T')[0] : '-'
      }
    })
    
    return c.json({ companies })
  } catch (e: any) {
    console.error('Admin companies error:', e)
    return c.json({ companies: [], error: e.message })
  }
})

// 6. Admin - Grants List
api.get('/admin/grants', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(`
      SELECT 
        id, title, agency, type, max_amount, deadline, url
      FROM grants 
      ORDER BY deadline ASC
      LIMIT 100
    `).all()
    
    const today = new Date().toISOString().split('T')[0]
    
    const grants = (result.results || []).map((g: any) => ({
      id: g.id,
      title: g.title || '-',
      agency: g.agency || '-',
      amount: g.max_amount ? `최대 ${(g.max_amount / 1000).toFixed(0)}만원` : '-',
      deadline: g.deadline || '-',
      status: g.deadline && g.deadline >= today ? 'active' : 'closed',
      url: g.url
    }))
    
    return c.json({ grants })
  } catch (e: any) {
    console.error('Admin grants error:', e)
    return c.json({ grants: [], error: e.message })
  }
})

// 7. Admin - AI Analysis Logs
api.get('/admin/logs', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(`
      SELECT 
        l.id,
        l.created_at,
        l.match_score,
        l.ai_reasoning,
        l.result_json,
        u.email as user_email,
        u.name as user_name,
        c.name as company_name
      FROM analysis_logs l
      LEFT JOIN users u ON l.user_id = u.id
      LEFT JOIN companies c ON l.company_id = c.id
      ORDER BY l.created_at DESC
      LIMIT 100
    `).all()
    
    const logs = (result.results || []).map((l: any) => {
      let matchCount = 0
      let tokensUsed = '-'
      
      try {
        if (l.result_json) {
          const parsed = JSON.parse(l.result_json)
          matchCount = Array.isArray(parsed.data) ? parsed.data.length : (parsed.matchCount || 0)
          tokensUsed = parsed.tokens_used || '-'
        }
      } catch {}
      
      return {
        id: l.id,
        created_at: l.created_at || '-',
        user_email: l.user_email || '-',
        company_name: l.company_name || '-',
        match_count: matchCount || l.match_score || 0,
        tokens_used: tokensUsed
      }
    })
    
    return c.json({ logs })
  } catch (e: any) {
    console.error('Admin logs error:', e)
    return c.json({ logs: [], error: e.message })
  }
})

// 8. Admin - Users List
api.get('/admin/users', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(`
      SELECT 
        u.id,
        u.name,
        u.email,
        u.role,
        u.company_name,
        u.created_at,
        (SELECT COUNT(*) FROM analysis_logs WHERE user_id = u.id) as ai_usage
      FROM users u
      ORDER BY u.created_at DESC
      LIMIT 100
    `).all()
    
    const users = (result.results || []).map((u: any) => ({
      id: u.id,
      name: u.name || '-',
      email: u.email || '-',
      role: u.role || 'user',
      company_name: u.company_name || '-',
      created_at: u.created_at ? u.created_at.split('T')[0] : '-',
      ai_usage: u.ai_usage || 0
    }))
    
    return c.json({ users })
  } catch (e: any) {
    console.error('Admin users error:', e)
    return c.json({ users: [], error: e.message })
  }
})

// 9. Admin - Partners (Pending Approvals)
api.get('/admin/partners', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(`
      SELECT id, company_name, ceo_name, biz_num, phone, status, applied_at
      FROM partners
      ORDER BY applied_at DESC
      LIMIT 100
    `).all()
    
    const partners = (result.results || []).map((p: any) => ({
      id: p.id,
      company_name: p.company_name || '-',
      ceo_name: p.ceo_name || '-',
      phone: p.phone || '-',
      status: p.status || 'pending',
      applied_at: p.applied_at ? p.applied_at.split('T')[0] : '-'
    }))
    
    return c.json({ partners })
  } catch (e: any) {
    console.error('Admin partners error:', e)
    return c.json({ partners: [], error: e.message })
  }
})

// 10. Admin - Approve/Reject Partner
api.post('/admin/partners/:id/approve', async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare("UPDATE partners SET status = 'approved' WHERE id = ?").bind(id).run()
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

api.post('/admin/partners/:id/reject', async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare("UPDATE partners SET status = 'rejected' WHERE id = ?").bind(id).run()
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

// 11. Admin Deploy Trigger
api.post('/admin/deploy', async (c) => {
  // In production, trigger Cloudflare deployment webhook
  return c.json({ success: true, message: 'Deploy triggered' })
})

// ==========================================
// User Registration & Auth
// ==========================================

// 12. User Registration - Real DB
api.post('/register', async (c) => {
  try {
    const body = await c.req.json()
    const { email, name, companyName, userType, phone } = body
    
    if (!email || !name) {
      return c.json({ success: false, error: '필수 항목을 입력해주세요.' }, 400)
    }
    
    const db = c.env.DB
    
    // Check if email already exists
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email).first()
    if (existing) {
      return c.json({ success: false, error: '이미 등록된 이메일입니다.' }, 400)
    }
    
    // Insert new user
    const role = userType === 'partner' ? 'partner' : 'user'
    await db.prepare(`
      INSERT INTO users (email, name, company_name, role) 
      VALUES (?, ?, ?, ?)
    `).bind(email, name, companyName || null, role).run()
    
    // If partner, also add to partners table for approval
    if (userType === 'partner') {
      await db.prepare(`
        INSERT INTO partners (company_name, ceo_name, phone, status)
        VALUES (?, ?, ?, 'pending')
      `).bind(companyName, name, phone || null).run()
    }
    
    return c.json({ success: true, message: '회원가입이 완료되었습니다.' })
  } catch (e: any) {
    console.error('Registration error:', e)
    return c.json({ success: false, error: e.message }, 400)
  }
})

// ==========================================
// Analysis Log Recording (for SupportMatching)
// ==========================================

// 13. Save Analysis Log
api.post('/analysis/log', async (c) => {
  try {
    const body = await c.req.json()
    const { userId, companyId, resultJson } = body
    
    const db = c.env.DB
    
    await db.prepare(`
      INSERT INTO analysis_logs (user_id, company_id, result_json, created_at)
      VALUES (?, ?, ?, datetime('now'))
    `).bind(userId || null, companyId || null, JSON.stringify(resultJson)).run()
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

export default api
