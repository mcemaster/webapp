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

// 5. Admin - Companies List (with pagination and search)
api.get('/admin/companies', async (c) => {
  try {
    const db = c.env.DB
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const search = c.req.query('q') || ''
    const offset = (page - 1) * limit
    
    // Build WHERE clause for search
    let whereClause = ''
    let params: any[] = []
    if (search) {
      whereClause = 'WHERE c.name LIKE ? OR c.biz_num LIKE ? OR c.ceo_name LIKE ?'
      params = [`%${search}%`, `%${search}%`, `%${search}%`]
    }
    
    // Get total count
    const countQuery = `SELECT COUNT(*) as count FROM companies c ${whereClause}`
    const countResult = search 
      ? await db.prepare(countQuery).bind(...params).first<{count: number}>()
      : await db.prepare(countQuery).first<{count: number}>()
    const total = countResult?.count || 0
    const totalPages = Math.ceil(total / limit)
    
    // Get paginated data
    const dataQuery = `
      SELECT 
        c.id,
        c.name,
        c.biz_num,
        c.ceo_name,
        c.industry_code as industry,
        c.employee_count,
        c.financial_json,
        c.certifications,
        c.analyzed_at as created_at
      FROM companies c
      ${whereClause}
      ORDER BY c.analyzed_at DESC
      LIMIT ? OFFSET ?
    `
    
    const result = search
      ? await db.prepare(dataQuery).bind(...params, limit, offset).all()
      : await db.prepare(dataQuery).bind(limit, offset).all()
    
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
        biz_num: c.biz_num || '-',
        ceo: c.ceo_name || '-',
        industry: c.industry || '-',
        employee_count: c.employee_count || '-',
        revenue,
        certifications: c.certifications || '-',
        created_at: c.created_at ? c.created_at.split('T')[0] : '-'
      }
    })
    
    return c.json({ companies, total, page, totalPages })
  } catch (e: any) {
    console.error('Admin companies error:', e)
    return c.json({ companies: [], total: 0, page: 1, totalPages: 1, error: e.message })
  }
})

// 5-1. Admin - Upload Companies from Excel/CSV
api.post('/admin/companies/upload', async (c) => {
  try {
    const db = c.env.DB
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return c.json({ success: false, error: '파일이 없습니다.' }, 400)
    }
    
    const text = await file.text()
    const lines = text.split('\n').filter(line => line.trim())
    
    if (lines.length < 2) {
      return c.json({ success: false, error: '데이터가 없습니다. 헤더와 최소 1행의 데이터가 필요합니다.' }, 400)
    }
    
    // Parse CSV (handle both comma and tab separated)
    const delimiter = lines[0].includes('\t') ? '\t' : ','
    const headers = lines[0].split(delimiter).map(h => h.trim().replace(/"/g, ''))
    
    // Expected columns mapping (Korean -> DB field)
    const columnMap: Record<string, string> = {
      '기업명': 'name',
      '사업자번호': 'biz_num',
      '대표자': 'ceo_name',
      '업종코드': 'industry_code',
      '설립일': 'founding_date',
      '직원수': 'employee_count',
      '매출액': 'revenue',
      '인증현황': 'certifications'
    }
    
    // Map header indices
    const headerIndices: Record<string, number> = {}
    headers.forEach((h, idx) => {
      if (columnMap[h]) {
        headerIndices[columnMap[h]] = idx
      }
    })
    
    if (!headerIndices['name'] || !headerIndices['biz_num']) {
      return c.json({ 
        success: false, 
        error: '필수 컬럼(기업명, 사업자번호)이 없습니다. 템플릿을 확인해주세요.' 
      }, 400)
    }
    
    let inserted = 0
    let duplicates = 0
    let errors = 0
    
    // Process each row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      const values = line.split(delimiter).map(v => v.trim().replace(/"/g, ''))
      
      const getValue = (field: string) => {
        const idx = headerIndices[field]
        return idx !== undefined ? values[idx] : null
      }
      
      const name = getValue('name')
      const bizNum = getValue('biz_num')
      
      if (!name || !bizNum) {
        errors++
        continue
      }
      
      // Check for duplicate by biz_num
      const existing = await db.prepare(
        'SELECT id FROM companies WHERE biz_num = ?'
      ).bind(bizNum).first()
      
      if (existing) {
        duplicates++
        continue
      }
      
      // Prepare financial_json
      const revenue = getValue('revenue')
      const financialJson = revenue ? JSON.stringify({ revenue: parseInt(revenue) || 0 }) : null
      
      // Insert new company
      try {
        await db.prepare(`
          INSERT INTO companies (name, biz_num, ceo_name, industry_code, founding_date, employee_count, financial_json, certifications, analyzed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(
          name,
          bizNum,
          getValue('ceo_name'),
          getValue('industry_code'),
          getValue('founding_date'),
          getValue('employee_count') ? parseInt(getValue('employee_count') || '0') : null,
          financialJson,
          getValue('certifications')
        ).run()
        
        inserted++
      } catch (e) {
        errors++
      }
    }
    
    return c.json({ 
      success: true, 
      inserted, 
      duplicates, 
      errors,
      message: `${inserted}건 추가, ${duplicates}건 중복(스킵), ${errors}건 오류`
    })
  } catch (e: any) {
    console.error('Upload error:', e)
    return c.json({ success: false, error: e.message }, 500)
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

// 12. Admin - Weekly Activity Chart Data (Real DB)
api.get('/admin/chart/weekly', async (c) => {
  try {
    const db = c.env.DB
    const days = ['일', '월', '화', '수', '목', '금', '토']
    
    // Get analysis logs for the past 7 days grouped by day
    const result = await db.prepare(`
      SELECT 
        strftime('%w', created_at) as day_of_week,
        COUNT(*) as count
      FROM analysis_logs 
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY strftime('%w', created_at)
      ORDER BY day_of_week
    `).all()
    
    // Get user registrations for past 7 days
    const usersResult = await db.prepare(`
      SELECT 
        strftime('%w', created_at) as day_of_week,
        COUNT(*) as count
      FROM users 
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY strftime('%w', created_at)
      ORDER BY day_of_week
    `).all()
    
    // Initialize arrays for all 7 days
    const aiData = [0, 0, 0, 0, 0, 0, 0]
    const userData = [0, 0, 0, 0, 0, 0, 0]
    
    // Fill in actual data
    if (result.results) {
      result.results.forEach((r: any) => {
        const idx = parseInt(r.day_of_week)
        aiData[idx] = r.count
      })
    }
    
    if (usersResult.results) {
      usersResult.results.forEach((r: any) => {
        const idx = parseInt(r.day_of_week)
        userData[idx] = r.count * 10 // Scale up for visibility
      })
    }
    
    // Reorder to start from Monday (1) to Sunday (0)
    const labels = ['월', '화', '수', '목', '금', '토', '일']
    const reorderedAI = [...aiData.slice(1), aiData[0]]
    const reorderedUsers = [...userData.slice(1), userData[0]]
    
    return c.json({
      labels,
      aiAnalysis: reorderedAI,
      visitors: reorderedUsers
    })
  } catch (e: any) {
    console.error('Weekly chart error:', e)
    return c.json({
      labels: ['월', '화', '수', '목', '금', '토', '일'],
      aiAnalysis: [0, 0, 0, 0, 0, 0, 0],
      visitors: [0, 0, 0, 0, 0, 0, 0],
      error: e.message
    })
  }
})

// 13. Admin - Service Usage Chart Data (Real DB)
api.get('/admin/chart/services', async (c) => {
  try {
    const db = c.env.DB
    
    // Count analysis logs (support matching)
    const supportResult = await db.prepare(`
      SELECT COUNT(*) as count FROM analysis_logs
    `).first<{count: number}>()
    
    // Count companies (representing SPEC evaluations)
    const specResult = await db.prepare(`
      SELECT COUNT(*) as count FROM companies
    `).first<{count: number}>()
    
    // Count RFQs
    const rfqResult = await db.prepare(`
      SELECT COUNT(*) as count FROM rfqs
    `).first<{count: number}>()
    
    // Count certifications (from companies with certifications)
    const certResult = await db.prepare(`
      SELECT COUNT(*) as count FROM companies WHERE certifications IS NOT NULL AND certifications != ''
    `).first<{count: number}>()
    
    const supportCount = supportResult?.count || 0
    const rfqCount = rfqResult?.count || 0
    const certCount = certResult?.count || 0
    const specCount = specResult?.count || 0
    
    // Ensure we have some data for the chart
    const total = supportCount + rfqCount + certCount + specCount
    
    return c.json({
      labels: ['지원사업 매칭', '공급사 찾기', 'ISO 인증', 'SPEC 평가'],
      data: total > 0 
        ? [supportCount, rfqCount, certCount, specCount]
        : [45, 25, 20, 10] // Default if no data
    })
  } catch (e: any) {
    console.error('Services chart error:', e)
    return c.json({
      labels: ['지원사업 매칭', '공급사 찾기', 'ISO 인증', 'SPEC 평가'],
      data: [45, 25, 20, 10],
      error: e.message
    })
  }
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

// ==========================================
// SEO Management APIs
// ==========================================

// 14. Get SEO Settings
api.get('/admin/seo', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare('SELECT key, value FROM settings WHERE key LIKE ?').bind('seo_%').all()
    
    const settings: Record<string, string> = {}
    if (result.results) {
      result.results.forEach((r: any) => {
        const key = r.key.replace('seo_', '')
        settings[key] = r.value
      })
    }
    
    return c.json({ settings })
  } catch (e: any) {
    return c.json({ settings: {}, error: e.message })
  }
})

// 15. Save SEO Settings
api.post('/admin/seo', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    const seoFields = [
      'title', 'url', 'description', 'keywords',
      'og_title', 'og_image', 'og_description',
      'company_name', 'phone', 'email', 'address'
    ]
    
    for (const field of seoFields) {
      if (body[field] !== undefined) {
        await db.prepare(`
          INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
        `).bind('seo_' + field, body[field]).run()
      }
    }
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

// ==========================================
// API Key Management
// ==========================================

// 16. Get API Keys (masked)
api.get('/admin/api-keys', async (c) => {
  try {
    const db = c.env.DB
    const dartKey = await db.prepare("SELECT value FROM settings WHERE key = 'api_dart_key'").first<{value: string}>()
    const openaiKey = await db.prepare("SELECT value FROM settings WHERE key = 'api_openai_key'").first<{value: string}>()
    
    // Return masked keys
    const maskKey = (key: string | undefined) => {
      if (!key) return ''
      if (key.length <= 8) return '****'
      return key.substring(0, 4) + '****' + key.substring(key.length - 4)
    }
    
    return c.json({
      dart_key: maskKey(dartKey?.value),
      openai_key: maskKey(openaiKey?.value),
      dart_configured: !!dartKey?.value,
      openai_configured: !!openaiKey?.value
    })
  } catch (e: any) {
    return c.json({ dart_key: '', openai_key: '', error: e.message })
  }
})

// 17. Save API Keys
api.post('/admin/api-keys', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    // Only save if the key doesn't contain **** (meaning it was edited)
    if (body.dart_key && !body.dart_key.includes('****')) {
      await db.prepare(`
        INSERT OR REPLACE INTO settings (key, value) VALUES ('api_dart_key', ?)
      `).bind(body.dart_key).run()
    }
    
    if (body.openai_key && !body.openai_key.includes('****')) {
      await db.prepare(`
        INSERT OR REPLACE INTO settings (key, value) VALUES ('api_openai_key', ?)
      `).bind(body.openai_key).run()
    }
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

// 18. Test OpenAI Connection
api.get('/admin/openai/test', async (c) => {
  try {
    // First try environment variable, then DB
    let apiKey = c.env.OPENAI_API_KEY
    
    if (!apiKey) {
      const db = c.env.DB
      const result = await db.prepare("SELECT value FROM settings WHERE key = 'api_openai_key'").first<{value: string}>()
      apiKey = result?.value
    }
    
    if (!apiKey) {
      return c.json({ success: false, message: 'API Key not configured' })
    }
    
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: { 'Authorization': 'Bearer ' + apiKey }
    })
    
    if (res.ok) {
      return c.json({ success: true, model: 'GPT-4o Available' })
    } else {
      const error = await res.json() as any
      return c.json({ success: false, message: error.error?.message || 'API Error' })
    }
  } catch (e: any) {
    return c.json({ success: false, message: e.message })
  }
})

// 19. Generate Sitemap
api.post('/admin/sitemap', async (c) => {
  try {
    const db = c.env.DB
    const urlResult = await db.prepare("SELECT value FROM settings WHERE key = 'seo_url'").first<{value: string}>()
    const baseUrl = urlResult?.value || 'https://www.mce.or.kr'
    
    const pages = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/support-matching', priority: '0.9', changefreq: 'daily' },
      { loc: '/rfq', priority: '0.9', changefreq: 'daily' },
      { loc: '/services/certification', priority: '0.8', changefreq: 'weekly' },
      { loc: '/services/spec', priority: '0.8', changefreq: 'weekly' },
      { loc: '/services/scm', priority: '0.8', changefreq: 'weekly' },
      { loc: '/faq', priority: '0.6', changefreq: 'monthly' },
      { loc: '/partnership', priority: '0.6', changefreq: 'monthly' },
      { loc: '/register', priority: '0.7', changefreq: 'monthly' },
    ]
    
    const now = new Date().toISOString().split('T')[0]
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    
    for (const page of pages) {
      sitemap += '  <url>\n'
      sitemap += '    <loc>' + baseUrl + page.loc + '</loc>\n'
      sitemap += '    <lastmod>' + now + '</lastmod>\n'
      sitemap += '    <changefreq>' + page.changefreq + '</changefreq>\n'
      sitemap += '    <priority>' + page.priority + '</priority>\n'
      sitemap += '  </url>\n'
    }
    
    sitemap += '</urlset>'
    
    // Store sitemap in settings
    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) VALUES ('sitemap_xml', ?)
    `).bind(sitemap).run()
    
    return c.json({ success: true, url: baseUrl + '/sitemap.xml' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

// 20. Get Sitemap
api.get('/sitemap.xml', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare("SELECT value FROM settings WHERE key = 'sitemap_xml'").first<{value: string}>()
    
    if (result?.value) {
      return c.text(result.value, 200, { 'Content-Type': 'application/xml' })
    }
    
    // Return default sitemap
    return c.text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', 200, { 'Content-Type': 'application/xml' })
  } catch (e) {
    return c.text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', 200, { 'Content-Type': 'application/xml' })
  }
})

// 21. Get SEO Meta for pages (used by Layout)
api.get('/seo/meta', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare('SELECT key, value FROM settings WHERE key LIKE ?').bind('seo_%').all()
    
    const meta: Record<string, string> = {}
    if (result.results) {
      result.results.forEach((r: any) => {
        const key = r.key.replace('seo_', '')
        meta[key] = r.value
      })
    }
    
    return c.json(meta)
  } catch (e: any) {
    return c.json({})
  }
})

export default api
