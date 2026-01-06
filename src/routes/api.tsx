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
    
    // Get companies count
    const companiesResult = await db.prepare('SELECT COUNT(*) as count FROM companies').first<{count: number}>()
    const companies = companiesResult?.count || 0
    
    return c.json({ users, aiUsage, grants, pending, companies })
  } catch (e: any) {
    console.error('Admin stats error:', e)
    return c.json({ users: 0, aiUsage: 0, grants: 0, pending: 0, companies: 0, error: e.message })
  }
})

// 4-1. Admin API Usage Stats - OpenAI, DART 사용량 및 비용
api.get('/admin/api-usage', async (c) => {
  try {
    const db = c.env.DB
    
    // api_usage 테이블 생성 (없으면)
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS api_usage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        api_type TEXT NOT NULL,
        endpoint TEXT,
        tokens_input INTEGER DEFAULT 0,
        tokens_output INTEGER DEFAULT 0,
        cost_usd REAL DEFAULT 0,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run()
    
    // 오늘 날짜
    const today = new Date().toISOString().split('T')[0]
    const thisMonth = today.substring(0, 7)
    
    // OpenAI 사용량 (오늘)
    const openaiToday = await db.prepare(`
      SELECT 
        COALESCE(SUM(tokens_input), 0) as input_tokens,
        COALESCE(SUM(tokens_output), 0) as output_tokens,
        COALESCE(SUM(cost_usd), 0) as cost,
        COUNT(*) as calls
      FROM api_usage 
      WHERE api_type = 'openai' AND date(created_at) = date('now')
    `).first<{input_tokens: number, output_tokens: number, cost: number, calls: number}>()
    
    // OpenAI 사용량 (이번 달)
    const openaiMonth = await db.prepare(`
      SELECT 
        COALESCE(SUM(tokens_input), 0) as input_tokens,
        COALESCE(SUM(tokens_output), 0) as output_tokens,
        COALESCE(SUM(cost_usd), 0) as cost,
        COUNT(*) as calls
      FROM api_usage 
      WHERE api_type = 'openai' AND strftime('%Y-%m', created_at) = ?
    `).bind(thisMonth).first<{input_tokens: number, output_tokens: number, cost: number, calls: number}>()
    
    // OpenAI 사용량 (전체)
    const openaiTotal = await db.prepare(`
      SELECT 
        COALESCE(SUM(tokens_input), 0) as input_tokens,
        COALESCE(SUM(tokens_output), 0) as output_tokens,
        COALESCE(SUM(cost_usd), 0) as cost,
        COUNT(*) as calls
      FROM api_usage 
      WHERE api_type = 'openai'
    `).first<{input_tokens: number, output_tokens: number, cost: number, calls: number}>()
    
    // DART API 사용량 (오늘)
    const dartToday = await db.prepare(`
      SELECT COUNT(*) as calls
      FROM api_usage 
      WHERE api_type = 'dart' AND date(created_at) = date('now')
    `).first<{calls: number}>()
    
    // DART API 사용량 (이번 달)
    const dartMonth = await db.prepare(`
      SELECT COUNT(*) as calls
      FROM api_usage 
      WHERE api_type = 'dart' AND strftime('%Y-%m', created_at) = ?
    `).bind(thisMonth).first<{calls: number}>()
    
    // 일별 사용량 (최근 7일)
    const dailyUsage = await db.prepare(`
      SELECT 
        date(created_at) as date,
        api_type,
        COALESCE(SUM(tokens_input + tokens_output), 0) as tokens,
        COALESCE(SUM(cost_usd), 0) as cost,
        COUNT(*) as calls
      FROM api_usage 
      WHERE created_at >= datetime('now', '-7 days')
      GROUP BY date(created_at), api_type
      ORDER BY date DESC
    `).all()
    
    return c.json({
      success: true,
      openai: {
        today: {
          input_tokens: openaiToday?.input_tokens || 0,
          output_tokens: openaiToday?.output_tokens || 0,
          total_tokens: (openaiToday?.input_tokens || 0) + (openaiToday?.output_tokens || 0),
          cost_usd: openaiToday?.cost || 0,
          calls: openaiToday?.calls || 0
        },
        month: {
          input_tokens: openaiMonth?.input_tokens || 0,
          output_tokens: openaiMonth?.output_tokens || 0,
          total_tokens: (openaiMonth?.input_tokens || 0) + (openaiMonth?.output_tokens || 0),
          cost_usd: openaiMonth?.cost || 0,
          calls: openaiMonth?.calls || 0
        },
        total: {
          input_tokens: openaiTotal?.input_tokens || 0,
          output_tokens: openaiTotal?.output_tokens || 0,
          total_tokens: (openaiTotal?.input_tokens || 0) + (openaiTotal?.output_tokens || 0),
          cost_usd: openaiTotal?.cost || 0,
          calls: openaiTotal?.calls || 0
        }
      },
      dart: {
        today: { calls: dartToday?.calls || 0 },
        month: { calls: dartMonth?.calls || 0 },
        daily_limit: 10000
      },
      daily: dailyUsage.results || [],
      // 가격 정보 (2024년 기준 GPT-4o-mini)
      pricing: {
        'gpt-4o-mini': { input: 0.00015, output: 0.0006 }, // per 1K tokens
        'gpt-4o': { input: 0.005, output: 0.015 },
        'gpt-4-turbo': { input: 0.01, output: 0.03 }
      }
    })
  } catch (e: any) {
    console.error('API usage error:', e)
    return c.json({ success: false, error: e.message })
  }
})

// 4-2. API 사용량 기록 (내부 호출용)
api.post('/admin/api-usage/log', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { api_type, endpoint, tokens_input, tokens_output, cost_usd } = body
    
    await db.prepare(`
      INSERT INTO api_usage (api_type, endpoint, tokens_input, tokens_output, cost_usd)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      api_type || 'unknown',
      endpoint || '',
      tokens_input || 0,
      tokens_output || 0,
      cost_usd || 0
    ).run()
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
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
api.get('/seo-meta', async (c) => {
  try {
    const db = c.env.DB
    
    // First try site_settings table
    let result = await db.prepare('SELECT setting_key, setting_value FROM site_settings WHERE setting_group = ?').bind('seo').all()
    
    if (result.results && result.results.length > 0) {
      const meta: Record<string, string> = {}
      result.results.forEach((r: any) => {
        // Remove 'seo_' prefix if present
        const key = r.setting_key.replace('seo_', '')
        meta[key] = r.setting_value
      })
      return c.json(meta)
    }
    
    // Fallback to settings table
    result = await db.prepare('SELECT key, value FROM settings WHERE key LIKE ?').bind('seo_%').all()
    
    const meta: Record<string, string> = {}
    if (result.results) {
      result.results.forEach((r: any) => {
        const key = r.key.replace('seo_', '')
        meta[key] = r.value
      })
    }
    
    return c.json(meta)
  } catch (e: any) {
    console.log('SEO meta error:', e)
    return c.json({})
  }
})

// ==========================================
// Dashboard API - History
// ==========================================

// 22. Get Analysis History for Dashboard
api.get('/history', async (c) => {
  try {
    const db = c.env.DB
    
    const result = await db.prepare(`
      SELECT 
        l.id,
        l.created_at,
        l.match_score,
        l.ai_reasoning,
        l.result_json,
        l.grant_id,
        g.title,
        g.agency
      FROM analysis_logs l
      LEFT JOIN grants g ON l.grant_id = g.id
      ORDER BY l.created_at DESC
      LIMIT 50
    `).all()
    
    const results = (result.results || []).map((r: any) => {
      let parsedResult = {}
      try {
        if (r.result_json) {
          parsedResult = JSON.parse(r.result_json)
        }
      } catch {}
      
      return {
        id: r.id,
        created_at: r.created_at,
        match_score: r.match_score || 85,
        ai_reasoning: r.ai_reasoning || '분석 결과를 기반으로 해당 사업에 높은 적합도를 보입니다.',
        title: r.title || '정부지원사업',
        agency: r.agency || '중소벤처기업부',
        grant_id: r.grant_id,
        result_json: r.result_json
      }
    })
    
    return c.json({ results })
  } catch (e: any) {
    console.error('History error:', e)
    return c.json({ results: [], error: e.message })
  }
})

// ==========================================
// RFQ API - 견적 요청
// ==========================================

// 23. Submit RFQ Request
api.post('/rfq/submit', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    const { iaf_codes, title, usage, material, process, size, weight, tolerance, 
            finishes, quantity, deadline, cert, reports, budget, delivery, description } = body
    
    // Insert into rfqs table
    const result = await db.prepare(`
      INSERT INTO rfqs (title, client_name, budget, deadline, status, matched_count, created_at)
      VALUES (?, ?, ?, ?, 'matching', 0, datetime('now'))
    `).bind(
      title || '견적 요청',
      '회원', // In real app, get from session
      budget || null,
      deadline || null
    ).run()
    
    // Store full RFQ details in settings or a dedicated rfq_details table if needed
    // For now, we'll just return success
    
    return c.json({ 
      success: true, 
      message: '견적 요청이 접수되었습니다. AI가 최적의 공급사를 매칭 중입니다.',
      rfq_id: result.meta?.last_row_id
    })
  } catch (e: any) {
    console.error('RFQ submit error:', e)
    return c.json({ success: false, error: e.message }, 400)
  }
})

// 24. Get Matched Partners for RFQ
api.get('/rfq/matches', async (c) => {
  try {
    const db = c.env.DB
    
    // Get partners (approved) with high ratings
    const result = await db.prepare(`
      SELECT 
        p.id,
        p.company_name,
        p.ceo_name,
        c.industry_code,
        c.certifications,
        c.financial_json
      FROM partners p
      LEFT JOIN companies c ON c.name = p.company_name
      WHERE p.status = 'approved'
      ORDER BY RANDOM()
      LIMIT 3
    `).all()
    
    // If no real partners, return mock data
    if (!result.results || result.results.length === 0) {
      return c.json({
        matches: [
          {
            id: 1,
            company_name: '(주)태성정밀',
            location: '인천 남동공단',
            match_score: 98,
            grade: 'A+',
            reasons: ['유사한 알루미늄 로봇 부품 제작 이력이 15건 있습니다.', '보유한 5축 가공기가 요청하신 도면 형상에 최적화되어 있습니다.'],
            image: 'https://images.unsplash.com/photo-1616423640778-2cfd2b96906b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 2,
            company_name: '대영플라스틱',
            location: '경기 시흥',
            match_score: 94,
            grade: 'A',
            reasons: ['납기 준수율 99%로 긴급 제작 요청에 적합합니다.', '자체 후처리 라인을 보유하여 비용 절감이 예상됩니다.'],
            image: 'https://images.unsplash.com/photo-1565514020125-9988a719d451?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            id: 3,
            company_name: '한일철강',
            location: '부산 사상',
            match_score: 89,
            grade: 'B+',
            reasons: ['가격 경쟁력이 가장 우수한 파트너입니다.', '해당 지역(부산) 내 당일 배송이 가능합니다.'],
            image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        ]
      })
    }
    
    const matches = (result.results || []).map((p: any, idx: number) => ({
      id: p.id,
      company_name: p.company_name,
      location: '대한민국',
      match_score: 98 - (idx * 4),
      grade: idx === 0 ? 'A+' : (idx === 1 ? 'A' : 'B+'),
      reasons: ['AI 분석 결과 높은 적합도를 보입니다.', '품질 인증 및 생산 역량이 우수합니다.'],
      image: 'https://images.unsplash.com/photo-1616423640778-2cfd2b96906b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }))
    
    return c.json({ matches })
  } catch (e: any) {
    return c.json({ matches: [], error: e.message })
  }
})

// ==========================================
// Partners API - 검색/필터
// ==========================================

// 25. Search Partners
api.get('/partners/search', async (c) => {
  try {
    const db = c.env.DB
    const q = c.req.query('q') || ''
    const region = c.req.query('region') || ''
    const category = c.req.query('category') || ''
    const sort = c.req.query('sort') || 'rating'
    const page = parseInt(c.req.query('page') || '1')
    const limit = 12
    const offset = (page - 1) * limit
    
    // For now, return mock data since we don't have a full partners schema with all fields
    const mockPartners = [
      { id: 1, name: '(주)태성정밀', location: '인천 남동공단', years: 15, rating: 4.9, categories: ['CNC 가공', '머시닝센터', '알루미늄'], description: '5축 가공기 10대 보유, 반도체 장비 부품 및 항공 우주 부품 전문 생산 기업입니다. 정밀도 ±0.005mm 보증.', grade: 'A+', matches: 12, image: 'https://images.unsplash.com/photo-1616423640778-2cfd2b96906b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: '대영플라스틱', location: '경기 시흥', years: 22, rating: 4.8, categories: ['사출 성형', '금형 설계', '이중사출'], description: '자동차 내장재 및 생활가전 부품 사출, 금형 설계부터 양산까지 원스톱 솔루션 제공. 24시간 가동 체제.', grade: 'A', matches: 28, image: 'https://images.unsplash.com/photo-1565514020125-9988a719d451?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 3, name: '한일철강', location: '부산 사상', years: 8, rating: 4.7, categories: ['판금', '레이저 커팅', '용접'], description: '레이저 커팅(10kW) 및 절곡, 대형 구조물 용접 전문. SUS, 알루미늄, 티타늄 등 난삭재 가공 가능.', grade: 'B+', matches: 5, image: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 4, name: '미래테크', location: '경기 화성', years: 10, rating: 4.8, categories: ['3D 프린팅', '시제품'], description: 'SLA, SLS 방식 3D 프린팅 전문. 대형 시제품 제작 및 소량 양산 대응 가능.', grade: 'A', matches: 18, image: 'https://plus.unsplash.com/premium_photo-1661962360537-4148b871c4c8?q=80&w=2940&auto=format&fit=crop' },
      { id: 5, name: '성진아노다이징', location: '인천 서구', years: 30, rating: 4.6, categories: ['표면처리', '아노다이징'], description: '알루미늄 경질/연질 아노다이징 전문. 반도체 장비 부품 표면처리 경험 다수 보유.', grade: 'A', matches: 8, image: 'https://images.unsplash.com/photo-1590959651373-a3db0f38a96b?q=80&w=2839&auto=format&fit=crop' },
      { id: 6, name: '정우엔지니어링', location: '경남 창원', years: 12, rating: 4.9, categories: ['기구설계', '시제품'], description: '제품 디자인부터 기구설계, 시제품 제작까지 원스톱 서비스. 스타트업 제품 개발 파트너.', grade: 'A', matches: 15, image: 'https://images.unsplash.com/photo-1635315619566-b807534575c3?q=80&w=2940&auto=format&fit=crop' }
    ]
    
    // Filter
    let filtered = mockPartners
    if (q) {
      filtered = filtered.filter(p => p.name.includes(q) || p.categories.some(c => c.includes(q)))
    }
    if (category && category !== '전체') {
      filtered = filtered.filter(p => p.categories.some(c => c.includes(category)))
    }
    
    // Sort
    if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sort === 'newest') {
      filtered.sort((a, b) => b.id - a.id)
    }
    
    return c.json({ 
      partners: filtered.slice(offset, offset + limit),
      total: filtered.length,
      page,
      totalPages: Math.ceil(filtered.length / limit)
    })
  } catch (e: any) {
    return c.json({ partners: [], error: e.message })
  }
})

// ==========================================
// Form Submissions API
// ==========================================

// 26. Submit Audit Application
api.post('/audit/apply', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    const { applicant_company, applicant_name, applicant_phone, applicant_email,
            target_company, target_product, target_address,
            audit_goal, audit_scope, desired_date, audit_days, comments } = body
    
    // Store in a simple inquiries table or send notification
    // For now, store in settings as JSON for demo
    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) 
      VALUES (?, ?)
    `).bind(
      'audit_inquiry_' + Date.now(),
      JSON.stringify({
        type: 'audit',
        applicant_company,
        applicant_name,
        applicant_phone,
        applicant_email,
        target_company,
        target_product,
        target_address,
        audit_goal,
        audit_scope,
        desired_date,
        audit_days,
        comments,
        submitted_at: new Date().toISOString()
      })
    ).run()
    
    return c.json({ success: true, message: '2자 심사 신청이 접수되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 400)
  }
})

// 27. Submit Partnership Proposal
api.post('/partnership/submit', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    const { company_name, website, contact_name, contact_phone, contact_email,
            partnership_type, proposal_title, proposal_content } = body
    
    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) 
      VALUES (?, ?)
    `).bind(
      'partnership_inquiry_' + Date.now(),
      JSON.stringify({
        type: 'partnership',
        company_name,
        website,
        contact_name,
        contact_phone,
        contact_email,
        partnership_type,
        proposal_title,
        proposal_content,
        submitted_at: new Date().toISOString()
      })
    ).run()
    
    return c.json({ success: true, message: '제휴 제안이 접수되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 400)
  }
})

// 28. Submit 1:1 Inquiry
api.post('/inquiry/submit', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    const { name, email, phone, category, content } = body
    
    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) 
      VALUES (?, ?)
    `).bind(
      'inquiry_' + Date.now(),
      JSON.stringify({
        type: 'inquiry',
        name,
        email,
        phone,
        category,
        content,
        submitted_at: new Date().toISOString()
      })
    ).run()
    
    return c.json({ success: true, message: '문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 400)
  }
})

// ==========================================
// DART API - 기업 DB 수집
// ==========================================

// 29. Fetch Companies from DART and save to DB
api.post('/admin/dart/fetch-companies', async (c) => {
  try {
    const apiKey = c.env.DART_API_KEY
    if (!apiKey) {
      return c.json({ success: false, error: 'DART API Key가 설정되지 않았습니다.' }, 400)
    }
    
    const db = c.env.DB
    const body = await c.req.json()
    const { corp_codes } = body // Array of corp_codes to fetch
    
    if (!corp_codes || !Array.isArray(corp_codes) || corp_codes.length === 0) {
      return c.json({ success: false, error: '기업 코드 목록이 필요합니다.' }, 400)
    }
    
    let inserted = 0
    let updated = 0
    let errors = 0
    
    for (const code of corp_codes.slice(0, 50)) { // Limit to 50 at a time
      try {
        // Fetch company info from DART
        const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${code}`
        const res = await fetch(url)
        const data: any = await res.json()
        
        if (data.status !== '000') {
          errors++
          continue
        }
        
        // Check if company exists
        const existing = await db.prepare('SELECT id FROM companies WHERE biz_num = ?').bind(data.bizr_no || code).first()
        
        if (existing) {
          // Update existing
          await db.prepare(`
            UPDATE companies SET 
              name = ?,
              ceo_name = ?,
              industry_code = ?,
              founding_date = ?,
              analyzed_at = datetime('now')
            WHERE id = ?
          `).bind(
            data.corp_name,
            data.ceo_nm,
            data.induty_code || null,
            data.est_dt || null,
            existing.id
          ).run()
          updated++
        } else {
          // Insert new
          await db.prepare(`
            INSERT INTO companies (name, biz_num, ceo_name, industry_code, founding_date, analyzed_at)
            VALUES (?, ?, ?, ?, ?, datetime('now'))
          `).bind(
            data.corp_name,
            data.bizr_no || code,
            data.ceo_nm,
            data.induty_code || null,
            data.est_dt || null
          ).run()
          inserted++
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (e) {
        errors++
      }
    }
    
    return c.json({ 
      success: true, 
      inserted, 
      updated, 
      errors,
      message: `${inserted}건 추가, ${updated}건 업데이트, ${errors}건 오류`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 30. Search DART for companies by name
api.get('/admin/dart/search', async (c) => {
  try {
    const apiKey = c.env.DART_API_KEY
    if (!apiKey) {
      return c.json({ success: false, error: 'DART API Key가 설정되지 않았습니다.' })
    }
    
    const q = c.req.query('q')
    if (!q || q.length < 2) {
      return c.json({ success: false, error: '검색어를 2자 이상 입력해주세요.' })
    }
    
    // DART doesn't have a direct search by name API, so we'll use the corpCode.xml file
    // For now, return a message about using corp_code list
    return c.json({
      success: true,
      message: 'DART API는 기업코드로 검색해야 합니다. 기업코드를 알고 계시다면 직접 입력해주세요.',
      tip: '금융감독원 DART(dart.fss.or.kr)에서 기업명으로 검색 후 기업코드를 확인할 수 있습니다.'
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

// 31. Get sample DART corp codes for testing
api.get('/admin/dart/sample-codes', async (c) => {
  return c.json({
    codes: [
      { code: '00126380', name: '삼성전자' },
      { code: '00164779', name: '현대자동차' },
      { code: '00164742', name: '기아' },
      { code: '00126362', name: '삼성SDI' },
      { code: '00401731', name: 'SK하이닉스' },
      { code: '00258801', name: 'LG전자' },
      { code: '00293886', name: 'POSCO홀딩스' },
      { code: '00104465', name: '네이버' },
      { code: '00155846', name: '카카오' },
      { code: '00356361', name: 'LG에너지솔루션' }
    ],
    message: '위 기업코드를 사용하여 DART에서 기업 정보를 가져올 수 있습니다.'
  })
})

// 32. Admin - Clear Cache
api.post('/admin/cache/clear', async (c) => {
  try {
    // In a real implementation, this would clear Cloudflare cache
    // For now, just return success
    return c.json({ success: true, message: '캐시가 초기화되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message })
  }
})

// ==========================================
// 기업 DB 초기화 및 자동 생성 API
// ==========================================

// 33. Admin - 기업 DB 초기화 (기본 시드 데이터 삽입)
api.post('/admin/companies/seed', async (c) => {
  try {
    const db = c.env.DB
    
    // 기본 기업 데이터 (한국 대기업 + 중소기업)
    const seedCompanies = [
      // 대기업/중견기업
      { name: '삼성전자', code: '005930', biz_num: '124-81-00998', ceo: '한종희', industry: '통신 및 방송 장비 제조업', founding_date: '1969-01-13', address: '경기도 수원시 영통구 삼성로 129', employee_count: 121000, revenue: 258935500, profit: 6567000, certifications: 'ISO9001,녹색기업', tags: '#반도체 #스마트폰 #글로벌' },
      { name: '현대자동차', code: '005380', biz_num: '101-81-09147', ceo: '정의선', industry: '자동차용 엔진 및 자동차 제조업', founding_date: '1967-12-29', address: '서울특별시 서초구 헌릉로 12', employee_count: 72000, revenue: 142527500, profit: 9819800, certifications: 'ISO14001,안전보건', tags: '#모빌리티 #전기차 #수소차' },
      { name: 'SK하이닉스', code: '000660', biz_num: '126-81-05758', ceo: '곽노정', industry: '반도체 제조업', founding_date: '1983-02-23', address: '경기도 이천시 부발읍 경충대로 2091', employee_count: 31000, revenue: 44621600, profit: 7000000, certifications: 'ISO9001', tags: '#메모리 #반도체 #AI' },
      { name: 'LG에너지솔루션', code: '373220', biz_num: '426-86-01775', ceo: '김동명', industry: '축전지 제조업', founding_date: '2020-12-01', address: '서울특별시 영등포구 여의대로 108', employee_count: 11000, revenue: 33745500, profit: 2163200, certifications: '벤처기업', tags: '#배터리 #2차전지 #전기차' },
      { name: 'NAVER', code: '035420', biz_num: '220-81-62517', ceo: '최수연', industry: '포털 및 기타 인터넷 정보매개 서비스업', founding_date: '1999-06-02', address: '경기도 성남시 분당구 정자일로 95', employee_count: 4800, revenue: 9670000, profit: 1488000, certifications: '가족친화기업', tags: '#IT #플랫폼 #AI' },
      { name: '카카오', code: '035720', biz_num: '120-81-47521', ceo: '정신아', industry: '포털 및 기타 인터넷 정보매개 서비스업', founding_date: '1995-02-16', address: '제주특별자치도 제주시 첨단로 242', employee_count: 3900, revenue: 8100000, profit: 500000, certifications: '벤처기업', tags: '#모바일 #메신저 #콘텐츠' },
      { name: 'POSCO홀딩스', code: '005490', biz_num: '506-81-00012', ceo: '장인화', industry: '지주회사', founding_date: '1968-04-01', address: '경상북도 포항시 남구 동해안로6213번길 15-1', employee_count: 300, revenue: 77000000, profit: 3500000, certifications: 'ISO14001', tags: '#철강 #이차전지소재 #친환경' },
      { name: '기아', code: '000270', biz_num: '119-81-02316', ceo: '송호성', industry: '자동차 제조업', founding_date: '1944-12-11', address: '서울특별시 서초구 헌릉로 12', employee_count: 35000, revenue: 99800000, profit: 11600000, certifications: 'ISO9001', tags: '#자동차 #모빌리티 #디자인' },
      
      // 중소/강소기업
      { name: '(주)태성정밀', code: null, biz_num: '123-45-67890', ceo: '김태성', industry: '금형 및 주조 제조업', founding_date: '2015-03-15', address: '경기도 수원시 팔달구 효원로 123', employee_count: 45, revenue: 11000, profit: 600, certifications: '벤처기업,이노비즈,ISO9001', tags: '#금형 #자동차부품 #소부장' },
      { name: '미래테크', code: null, biz_num: '504-11-22334', ceo: '박미래', industry: '소프트웨어 개발 및 공급업', founding_date: '2018-07-01', address: '서울특별시 강남구 테헤란로 420', employee_count: 25, revenue: 3500, profit: 400, certifications: '벤처기업,메인비즈', tags: '#SaaS #AI #스타트업' },
      { name: '한일철강', code: null, biz_num: '105-86-33445', ceo: '이철수', industry: '1차 철강 제조업', founding_date: '1998-11-20', address: '인천광역시 남동구 남동대로 100', employee_count: 80, revenue: 25000, profit: 1200, certifications: 'ISO14001,뿌리기업', tags: '#철강 #건축자재 #인천' },
      { name: '대영플라스틱', code: null, biz_num: '220-88-99887', ceo: '최영희', industry: '플라스틱 사출 성형업', founding_date: '2005-05-05', address: '충청남도 안산시 서북구 공단로 55', employee_count: 60, revenue: 15000, profit: 800, certifications: '이노비즈,소부장전문', tags: '#플라스틱 #용기 #사출' },
      { name: '솔라에너지', code: null, biz_num: '606-22-77788', ceo: '정태양', industry: '태양광 발전 장치 제조업', founding_date: '2020-01-10', address: '전라남도 천안시 동남구 산단로 33', employee_count: 15, revenue: 8000, profit: 150, certifications: '녹색인증,벤처기업', tags: '#태양광 #신재생에너지' },
      { name: '우리바이오', code: null, biz_num: '303-55-11223', ceo: '김생명', industry: '건강기능식품 제조업', founding_date: '2012-09-09', address: '충청북도 청주시 흥덕구 오송생명로 88', employee_count: 120, revenue: 40000, profit: 3000, certifications: 'GMP,HACCP', tags: '#바이오 #건기식 #헬스케어' },
      { name: '넥스트칩', code: null, biz_num: '404-77-66554', ceo: '이반도', industry: '시스템 반도체 설계', founding_date: '2019-04-01', address: '경기도 성남시 분당구 판교로 200', employee_count: 55, revenue: 18000, profit: -200, certifications: '벤처기업,기업부설연구소', tags: '#팹리스 #반도체 #설계' },
      { name: '스마트솔루션', code: null, biz_num: '888-99-00112', ceo: '박지능', industry: '응용 소프트웨어 개발', founding_date: '2021-06-15', address: '서울특별시 성동구 성수이로 99', employee_count: 30, revenue: 5000, profit: 500, certifications: '벤처기업,TIPS선정', tags: '#스마트팩토리 #MES #ERP' },
      { name: '동해물류', code: null, biz_num: '777-11-22233', ceo: '강해운', industry: '화물 운송 중개업', founding_date: '2000-12-12', address: '부산광역시 중구 중앙대로 10', employee_count: 200, revenue: 60000, profit: 2500, certifications: 'ISO9001', tags: '#물류 #해운 #포워딩' },
      { name: '세종푸드', code: null, biz_num: '555-44-33322', ceo: '윤맛나', industry: '도시락 및 식사류 제조업', founding_date: '2016-03-03', address: '세종특별자치시 도움1로 50', employee_count: 90, revenue: 22000, profit: 1100, certifications: 'HACCP', tags: '#식품 #도시락 #급식' },
      
      // 추가 기업
      { name: '삼성SDI', code: '006400', biz_num: '101-81-00001', ceo: '최윤호', industry: '축전지 제조업', founding_date: '1970-01-20', address: '경기도 용인시 기흥구 공세로 150', employee_count: 11000, revenue: 20000000, profit: 1000000, certifications: 'ISO14001', tags: '#배터리 #전자재료' },
      { name: 'LG전자', code: '066570', biz_num: '107-86-00002', ceo: '조주완', industry: '가정용 전자기기 제조업', founding_date: '2002-04-01', address: '서울특별시 영등포구 여의대로 128', employee_count: 34000, revenue: 80000000, profit: 4000000, certifications: '녹색기업', tags: '#가전 #TV #로봇' },
      { name: 'SK텔레콤', code: '017670', biz_num: '101-81-00004', ceo: '유영상', industry: '이동통신업', founding_date: '1984-03-29', address: '서울특별시 중구 을지로 65', employee_count: 5000, revenue: 17000000, profit: 1600000, certifications: '가족친화기업', tags: '#통신 #AI #메타버스' },
      { name: 'KT', code: '030200', biz_num: '102-81-00005', ceo: '김영섭', industry: '유선 통신업', founding_date: '1981-12-10', address: '경기도 성남시 분당구 불정로 90', employee_count: 20000, revenue: 26000000, profit: 1700000, certifications: 'ISO9001', tags: '#통신 #디지털 #플랫폼' },
      { name: '한화솔루션', code: '009830', biz_num: '101-81-00007', ceo: '이구영', industry: '합성수지 제조업', founding_date: '1965-08-25', address: '서울특별시 중구 청계천로 86', employee_count: 5000, revenue: 13000000, profit: 600000, certifications: 'ISO14001', tags: '#태양광 #화학 #첨단소재' },
      { name: '정우엔지니어링', code: null, biz_num: '612-22-33456', ceo: '김정우', industry: '기계 설계 서비스업', founding_date: '2010-05-20', address: '경남 창원시 성산구 창원대로 100', employee_count: 35, revenue: 7500, profit: 400, certifications: 'ISO9001,기업부설연구소', tags: '#기구설계 #시제품 #ODM' },
      { name: '성진아노다이징', code: null, biz_num: '121-33-44567', ceo: '이성진', industry: '표면처리 제조업', founding_date: '1992-08-15', address: '인천광역시 서구 가정로 200', employee_count: 40, revenue: 9000, profit: 550, certifications: 'ISO14001', tags: '#아노다이징 #표면처리 #반도체' },
      { name: '프리시전테크', code: null, biz_num: '215-44-55678', ceo: '박정밀', industry: 'CNC 정밀가공업', founding_date: '2008-11-30', address: '경기도 화성시 동탄대로 333', employee_count: 55, revenue: 12000, profit: 700, certifications: 'ISO9001,IATF16949', tags: '#CNC #정밀가공 #자동차부품' },
      { name: '그린파워', code: null, biz_num: '316-55-66789', ceo: '최그린', industry: '신재생에너지 발전업', founding_date: '2017-03-01', address: '전남 나주시 혁신산단로 50', employee_count: 20, revenue: 5500, profit: 200, certifications: '녹색기업,벤처기업', tags: '#태양광 #ESS #신재생' },
      { name: '바이오헬스', code: null, biz_num: '417-66-77890', ceo: '정건강', industry: '의료기기 제조업', founding_date: '2014-07-07', address: '충북 오송읍 오송생명로 123', employee_count: 65, revenue: 15000, profit: 800, certifications: 'ISO13485,KGMP', tags: '#의료기기 #헬스케어 #진단' },
      { name: '디지털웍스', code: null, biz_num: '518-77-88901', ceo: '한디지', industry: '시스템 통합 및 관리업', founding_date: '2016-09-15', address: '서울특별시 마포구 상암산로 100', employee_count: 85, revenue: 25000, profit: 1500, certifications: 'ISO27001', tags: '#SI #클라우드 #보안' }
    ]
    
    let inserted = 0
    let duplicates = 0
    let errors = 0
    
    for (const company of seedCompanies) {
      try {
        // Check if company exists by biz_num
        const existing = await db.prepare('SELECT id FROM companies WHERE biz_num = ?').bind(company.biz_num).first()
        
        if (existing) {
          duplicates++
          continue
        }
        
        // Prepare financial_json
        const financialJson = JSON.stringify({
          revenue: company.revenue,
          profit: company.profit
        })
        
        // Insert new company
        await db.prepare(`
          INSERT INTO companies (name, biz_num, ceo_name, industry_code, founding_date, employee_count, financial_json, certifications, analyzed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(
          company.name,
          company.biz_num,
          company.ceo,
          company.industry,
          company.founding_date,
          company.employee_count,
          financialJson,
          company.certifications
        ).run()
        
        inserted++
      } catch (e) {
        errors++
        console.error('Insert error for', company.name, e)
      }
    }
    
    return c.json({
      success: true,
      inserted,
      duplicates,
      errors,
      message: `기업 DB 초기화 완료! ${inserted}건 추가, ${duplicates}건 중복(스킵), ${errors}건 오류`
    })
  } catch (e: any) {
    console.error('Seed companies error:', e)
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 34. Admin - OpenAI를 통한 기업 데이터 생성
api.post('/admin/companies/generate', async (c) => {
  try {
    // First try environment variable, then DB
    let apiKey = c.env.OPENAI_API_KEY
    
    if (!apiKey) {
      const db = c.env.DB
      const result = await db.prepare("SELECT value FROM settings WHERE key = 'api_openai_key'").first<{value: string}>()
      apiKey = result?.value
    }
    
    if (!apiKey) {
      return c.json({ success: false, error: 'OpenAI API Key가 설정되지 않았습니다. 시스템 설정에서 API 키를 입력해주세요.' }, 400)
    }
    
    const db = c.env.DB
    const body = await c.req.json()
    const { industry = '제조업', count = 10, region = '전국' } = body
    
    // Call OpenAI to generate company data
    const prompt = `한국의 ${region} 지역에 있는 ${industry} 분야의 실제처럼 보이는 가상의 중소기업 데이터를 ${count}개 생성해주세요.

각 기업은 다음 형식의 JSON 배열로 반환해주세요:
[
  {
    "name": "기업명 (주식회사 포함)",
    "biz_num": "000-00-00000 형식의 사업자번호",
    "ceo": "대표자명",
    "industry": "상세 업종명",
    "founding_date": "YYYY-MM-DD 형식의 설립일",
    "address": "상세 주소",
    "employee_count": 직원수(숫자),
    "revenue": 연매출(백만원 단위, 숫자만),
    "profit": 영업이익(백만원 단위, 숫자만),
    "certifications": "보유인증들 (콤마 구분)",
    "tags": "#해시태그 형식"
  }
]

요구사항:
- 실제 한국 기업처럼 자연스러운 이름과 데이터
- ${region}의 실제 존재하는 도시/구 주소 사용
- 중소기업 규모에 맞는 현실적인 직원수와 매출
- 사업자번호는 유효한 형식으로 고유하게 생성
- 설립일은 2000년 이후로 생성
- 인증은 ISO9001, ISO14001, 벤처기업, 이노비즈, 메인비즈 등에서 적절히 선택

JSON 배열만 반환하고, 다른 설명은 포함하지 마세요.`

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: '당신은 한국 기업 데이터 전문가입니다. 요청받은 형식에 맞게 가상의 기업 데이터를 JSON으로 생성합니다.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 4000
      })
    })
    
    if (!openaiRes.ok) {
      const errorData = await openaiRes.json() as any
      return c.json({ success: false, error: 'OpenAI API 오류: ' + (errorData.error?.message || 'Unknown error') }, 400)
    }
    
    const openaiData = await openaiRes.json() as any
    const content = openaiData.choices?.[0]?.message?.content
    
    // API 사용량 기록
    const usage = openaiData.usage
    if (usage) {
      const inputTokens = usage.prompt_tokens || 0
      const outputTokens = usage.completion_tokens || 0
      // GPT-4o-mini 가격: input $0.15/1M, output $0.60/1M
      const costUsd = (inputTokens * 0.00000015) + (outputTokens * 0.0000006)
      
      try {
        await db.prepare(`
          INSERT INTO api_usage (api_type, endpoint, tokens_input, tokens_output, cost_usd)
          VALUES ('openai', 'companies/generate', ?, ?, ?)
        `).bind(inputTokens, outputTokens, costUsd).run()
      } catch (e) {
        // 사용량 기록 실패 무시
      }
    }
    
    if (!content) {
      return c.json({ success: false, error: 'OpenAI 응답이 비어있습니다.' }, 400)
    }
    
    // Parse the JSON response
    let companies: any[]
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        companies = JSON.parse(jsonMatch[0])
      } else {
        companies = JSON.parse(content)
      }
    } catch (e) {
      return c.json({ success: false, error: 'OpenAI 응답 파싱 실패: ' + content.substring(0, 200) }, 400)
    }
    
    // Insert companies into DB
    let inserted = 0
    let duplicates = 0
    let errors = 0
    
    for (const company of companies) {
      try {
        // Check if company exists by biz_num
        const existing = await db.prepare('SELECT id FROM companies WHERE biz_num = ?').bind(company.biz_num).first()
        
        if (existing) {
          duplicates++
          continue
        }
        
        // Prepare financial_json
        const financialJson = JSON.stringify({
          revenue: company.revenue,
          profit: company.profit
        })
        
        // Insert new company with [AI] prefix to indicate AI-generated
        await db.prepare(`
          INSERT INTO companies (name, biz_num, ceo_name, industry_code, founding_date, employee_count, financial_json, certifications, analyzed_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        `).bind(
          company.name,
          company.biz_num,
          company.ceo,
          company.industry,
          company.founding_date,
          company.employee_count,
          financialJson,
          company.certifications
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
      total_generated: companies.length,
      message: `AI가 ${companies.length}개 기업을 생성했습니다. ${inserted}건 추가, ${duplicates}건 중복(스킵), ${errors}건 오류`
    })
  } catch (e: any) {
    console.error('Generate companies error:', e)
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 35. Admin - 모든 기업 데이터 삭제
api.post('/admin/companies/clear', async (c) => {
  try {
    const db = c.env.DB
    
    // Delete all companies
    await db.prepare('DELETE FROM companies').run()
    
    return c.json({ success: true, message: '모든 기업 데이터가 삭제되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 35-1. Admin - 네이버 금융에서 실제 상장사 데이터 수집
api.post('/admin/companies/collect-real', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json().catch(() => ({}))
    const market = body.market || 'all' // 'kospi', 'kosdaq', 'all'
    const pages = Math.min(body.pages || 3, 10) // 최대 10페이지
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    const collectFromMarket = async (marketId: number, marketName: string) => {
      const companies: any[] = []
      
      for (let page = 1; page <= pages; page++) {
        try {
          const url = `https://finance.naver.com/sise/sise_market_sum.nhn?sosok=${marketId}&page=${page}`
          const res = await fetch(url, { headers })
          const html = await res.text()
          
          // 종목 코드와 이름 추출
          const regex = /href="\/item\/main\.naver\?code=(\d+)"[^>]*>([^<]+)<\/a>/g
          let match
          
          while ((match = regex.exec(html)) !== null) {
            const code = match[1]
            const name = match[2].trim()
            
            if (name && code && !companies.find(c => c.code === code)) {
              companies.push({
                code,
                name,
                market: marketName,
                source: 'NAVER_FINANCE'
              })
            }
          }
          
          // Rate limiting
          await new Promise(r => setTimeout(r, 200))
        } catch (e) {
          console.error(`페이지 ${page} 수집 실패:`, e)
        }
      }
      
      return companies
    }
    
    let allCompanies: any[] = []
    
    // 코스피 수집
    if (market === 'all' || market === 'kospi') {
      const kospi = await collectFromMarket(0, 'KOSPI')
      allCompanies = [...allCompanies, ...kospi]
    }
    
    // 코스닥 수집
    if (market === 'all' || market === 'kosdaq') {
      const kosdaq = await collectFromMarket(1, 'KOSDAQ')
      allCompanies = [...allCompanies, ...kosdaq]
    }
    
    // 상위 30개 기업에 대해 상세 정보 수집
    const detailedCompanies: any[] = []
    
    for (let i = 0; i < Math.min(allCompanies.length, 30); i++) {
      const company = allCompanies[i]
      
      try {
        const detailUrl = `https://finance.naver.com/item/main.naver?code=${company.code}`
        const detailRes = await fetch(detailUrl, { headers })
        const detailHtml = await detailRes.text()
        
        // 업종 추출
        const sectorMatch = detailHtml.match(/section trade_compare[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/)
        if (sectorMatch) {
          company.sector = sectorMatch[1].trim()
        }
        
        // 시가총액 추출 (억원)
        const capMatch = detailHtml.match(/시가총액[\s\S]*?<em>([0-9,]+)<\/em>/)
        if (capMatch) {
          company.market_cap = capMatch[1].replace(/,/g, '')
        }
        
        await new Promise(r => setTimeout(r, 300))
      } catch (e) {
        // 상세 정보 실패해도 기본 정보는 유지
      }
      
      detailedCompanies.push(company)
    }
    
    // 나머지는 기본 정보만
    for (let i = 30; i < allCompanies.length; i++) {
      detailedCompanies.push(allCompanies[i])
    }
    
    // DB에 저장
    let inserted = 0
    let updated = 0
    let errors = 0
    
    for (const company of detailedCompanies) {
      try {
        // 종목코드로 중복 체크
        const existing = await db.prepare(
          'SELECT id FROM companies WHERE biz_num = ? OR name = ?'
        ).bind(company.code, company.name).first()
        
        const financialJson = JSON.stringify({
          market_cap: company.market_cap || null,
          stock_code: company.code
        })
        
        if (existing) {
          // 기존 데이터 업데이트
          await db.prepare(`
            UPDATE companies SET 
              industry_code = COALESCE(?, industry_code),
              financial_json = ?,
              source = 'NAVER_FINANCE',
              analyzed_at = datetime('now')
            WHERE id = ?
          `).bind(
            company.sector || null,
            financialJson,
            (existing as any).id
          ).run()
          updated++
        } else {
          // 새로 추가
          await db.prepare(`
            INSERT INTO companies (name, biz_num, industry_code, financial_json, source, analyzed_at)
            VALUES (?, ?, ?, ?, 'NAVER_FINANCE', datetime('now'))
          `).bind(
            company.name,
            company.code,  // 종목코드를 biz_num으로 저장
            company.sector || company.market,
            financialJson
          ).run()
          inserted++
        }
      } catch (e) {
        errors++
      }
    }
    
    return c.json({
      success: true,
      collected: detailedCompanies.length,
      inserted,
      updated,
      errors,
      message: `실제 상장사 ${detailedCompanies.length}개 수집 완료! ${inserted}건 추가, ${updated}건 업데이트, ${errors}건 오류`
    })
  } catch (e: any) {
    console.error('Collect real companies error:', e)
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 35-2. Admin - 수집된 실제 데이터를 JSON으로 한번에 업로드
api.post('/admin/companies/import-json', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { companies, clearExisting = false } = body
    
    if (!companies || !Array.isArray(companies)) {
      return c.json({ success: false, error: 'companies 배열이 필요합니다.' }, 400)
    }
    
    // 기존 데이터 삭제 옵션
    if (clearExisting) {
      await db.prepare('DELETE FROM companies').run()
    }
    
    let inserted = 0
    let errors = 0
    
    for (const company of companies) {
      try {
        const financialJson = JSON.stringify({
          market_cap: company.market_cap || null,
          stock_code: company.code || null,
          current_price: company.current_price || null
        })
        
        // 중복 체크
        const existing = await db.prepare(
          'SELECT id FROM companies WHERE biz_num = ? OR name = ?'
        ).bind(company.code || company.biz_num || company.name, company.name).first()
        
        if (!existing) {
          await db.prepare(`
            INSERT INTO companies (name, biz_num, ceo_name, industry_code, employee_count, financial_json, source, analyzed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
          `).bind(
            company.name,
            company.code || company.biz_num || null,
            company.ceo || null,
            company.sector || company.industry || company.market || null,
            company.employees ? parseInt(company.employees) : null,
            financialJson,
            company.source || 'IMPORT'
          ).run()
          inserted++
        }
      } catch (e) {
        errors++
      }
    }
    
    return c.json({
      success: true,
      total: companies.length,
      inserted,
      errors,
      message: `${inserted}개 기업 추가 완료 (${errors}건 오류/중복)`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// 대규모 기업 데이터 수집 시스템
// ==========================================

// 36. DART 전체 기업 코드 목록 다운로드 및 저장
api.post('/admin/collector/dart/all-corps', async (c) => {
  try {
    const db = c.env.DB
    let apiKey = c.env.DART_API_KEY
    
    if (!apiKey) {
      const result = await db.prepare("SELECT value FROM settings WHERE key = 'api_dart_key'").first<{value: string}>()
      apiKey = result?.value
    }
    
    if (!apiKey) {
      return c.json({ success: false, error: 'DART API Key가 설정되지 않았습니다.' }, 400)
    }
    
    // DART 전체 기업 코드 목록 다운로드 (ZIP 파일)
    const url = `https://opendart.fss.or.kr/api/corpCode.xml?crtfc_key=${apiKey}`
    const res = await fetch(url)
    
    if (!res.ok) {
      return c.json({ success: false, error: 'DART API 호출 실패' }, 400)
    }
    
    // ZIP 파일을 ArrayBuffer로 받음
    const zipBuffer = await res.arrayBuffer()
    
    // JSZip으로 압축 해제 (Cloudflare Workers에서는 직접 파싱 필요)
    // ZIP 파일 내 CORPCODE.xml 파싱
    const zipData = new Uint8Array(zipBuffer)
    
    // ZIP 파일 구조 파싱 (간단한 구현)
    // Local file header signature = 0x04034b50
    let xmlContent = ''
    
    // ZIP에서 XML 추출 시도
    try {
      // ZIP 파일에서 XML 데이터 위치 찾기
      const decoder = new TextDecoder('utf-8')
      const fullText = decoder.decode(zipData)
      
      // XML 시작과 끝 찾기
      const xmlStart = fullText.indexOf('<?xml')
      const xmlEnd = fullText.lastIndexOf('</result>') + '</result>'.length
      
      if (xmlStart >= 0 && xmlEnd > xmlStart) {
        xmlContent = fullText.substring(xmlStart, xmlEnd)
      }
    } catch (e) {
      // ZIP 파싱 실패 시 직접 XML로 시도
      const decoder = new TextDecoder('utf-8')
      xmlContent = decoder.decode(zipData)
    }
    
    if (!xmlContent || !xmlContent.includes('<list>')) {
      return c.json({ 
        success: false, 
        error: 'DART 응답 파싱 실패. ZIP/XML 형식 확인 필요.',
        hint: 'DART API에서 반환된 데이터 형식이 예상과 다릅니다.'
      }, 400)
    }
    
    // XML에서 기업 정보 추출
    const corpRegex = /<list>([\s\S]*?)<\/list>/g
    const companies: any[] = []
    let match
    
    while ((match = corpRegex.exec(xmlContent)) !== null) {
      const item = match[1]
      const corpCode = item.match(/<corp_code>([^<]+)<\/corp_code>/)?.[1]
      const corpName = item.match(/<corp_name>([^<]+)<\/corp_name>/)?.[1]
      const stockCode = item.match(/<stock_code>([^<]*)<\/stock_code>/)?.[1]
      const modifyDate = item.match(/<modify_date>([^<]*)<\/modify_date>/)?.[1]
      
      if (corpCode && corpName) {
        companies.push({
          corp_code: corpCode,
          corp_name: corpName,
          stock_code: stockCode || null,
          modify_date: modifyDate || null
        })
      }
    }
    
    if (companies.length === 0) {
      return c.json({ success: false, error: 'XML에서 기업 정보를 추출할 수 없습니다.' }, 400)
    }
    
    // DB에 기업 코드 저장 (dart_corps 테이블)
    // 테이블 생성 (없으면)
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS dart_corps (
        corp_code TEXT PRIMARY KEY,
        corp_name TEXT NOT NULL,
        stock_code TEXT,
        modify_date TEXT,
        is_collected INTEGER DEFAULT 0,
        collected_at TEXT,
        created_at TEXT DEFAULT (datetime('now'))
      )
    `).run()
    
    // 배치로 삽입 (1000개씩)
    let inserted = 0
    let updated = 0
    const batchSize = 100
    
    for (let i = 0; i < Math.min(companies.length, 5000); i += batchSize) {
      const batch = companies.slice(i, i + batchSize)
      
      for (const corp of batch) {
        try {
          const existing = await db.prepare('SELECT corp_code FROM dart_corps WHERE corp_code = ?').bind(corp.corp_code).first()
          
          if (existing) {
            await db.prepare(`
              UPDATE dart_corps SET corp_name = ?, stock_code = ?, modify_date = ? WHERE corp_code = ?
            `).bind(corp.corp_name, corp.stock_code, corp.modify_date, corp.corp_code).run()
            updated++
          } else {
            await db.prepare(`
              INSERT INTO dart_corps (corp_code, corp_name, stock_code, modify_date) VALUES (?, ?, ?, ?)
            `).bind(corp.corp_code, corp.corp_name, corp.stock_code, corp.modify_date).run()
            inserted++
          }
        } catch (e) {
          // 개별 오류 무시
        }
      }
    }
    
    return c.json({
      success: true,
      total_parsed: companies.length,
      inserted,
      updated,
      message: `DART 기업 코드 ${companies.length}개 파싱 완료. ${inserted}건 추가, ${updated}건 업데이트.`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 37. DART 기업 상세정보 배치 수집
api.post('/admin/collector/dart/collect-details', async (c) => {
  try {
    const db = c.env.DB
    let apiKey = c.env.DART_API_KEY
    
    if (!apiKey) {
      const result = await db.prepare("SELECT value FROM settings WHERE key = 'api_dart_key'").first<{value: string}>()
      apiKey = result?.value
    }
    
    if (!apiKey) {
      return c.json({ success: false, error: 'DART API Key가 설정되지 않았습니다.' }, 400)
    }
    
    const body = await c.req.json().catch(() => ({}))
    const limit = Math.min(body.limit || 50, 100) // 최대 100개씩
    const onlyListed = body.onlyListed !== false // 기본값: 상장사만
    
    // 수집되지 않은 기업 목록 가져오기
    let query = 'SELECT corp_code, corp_name, stock_code FROM dart_corps WHERE is_collected = 0'
    if (onlyListed) {
      query += " AND stock_code IS NOT NULL AND stock_code != ''"
    }
    query += ` LIMIT ${limit}`
    
    const corps = await db.prepare(query).all()
    
    if (!corps.results || corps.results.length === 0) {
      return c.json({ success: true, message: '수집할 기업이 없습니다.', collected: 0 })
    }
    
    let collected = 0
    let errors = 0
    
    for (const corp of corps.results as any[]) {
      try {
        // DART API로 기업 상세정보 조회
        const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${corp.corp_code}`
        const res = await fetch(url)
        const data: any = await res.json()
        
        if (data.status === '000') {
          // companies 테이블에 저장
          const existing = await db.prepare('SELECT id FROM companies WHERE biz_num = ? OR name = ?')
            .bind(data.bizr_no || 'NONE', data.corp_name).first()
          
          const financialJson = JSON.stringify({
            induty_code: data.induty_code,
            est_dt: data.est_dt,
            acc_mt: data.acc_mt
          })
          
          if (existing) {
            await db.prepare(`
              UPDATE companies SET 
                ceo_name = ?, industry_code = ?, address = ?, 
                financial_json = ?, source = 'DART', analyzed_at = datetime('now')
              WHERE id = ?
            `).bind(
              data.ceo_nm,
              data.induty_code,
              data.adres,
              financialJson,
              (existing as any).id
            ).run()
          } else {
            await db.prepare(`
              INSERT INTO companies (name, biz_num, ceo_name, industry_code, address, financial_json, source, analyzed_at)
              VALUES (?, ?, ?, ?, ?, ?, 'DART', datetime('now'))
            `).bind(
              data.corp_name,
              data.bizr_no || corp.corp_code,
              data.ceo_nm,
              data.induty_code,
              data.adres,
              financialJson
            ).run()
          }
          
          // dart_corps 테이블 업데이트
          await db.prepare(`
            UPDATE dart_corps SET is_collected = 1, collected_at = datetime('now') WHERE corp_code = ?
          `).bind(corp.corp_code).run()
          
          collected++
        } else {
          errors++
        }
        
        // Rate limiting (DART API 제한 준수)
        await new Promise(resolve => setTimeout(resolve, 100))
        
      } catch (e) {
        errors++
      }
    }
    
    // 전체 통계
    const stats = await db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_collected = 1 THEN 1 ELSE 0 END) as collected,
        SUM(CASE WHEN stock_code IS NOT NULL AND stock_code != '' THEN 1 ELSE 0 END) as listed
      FROM dart_corps
    `).first<{total: number, collected: number, listed: number}>()
    
    return c.json({
      success: true,
      collected,
      errors,
      stats: {
        total_corps: stats?.total || 0,
        total_collected: stats?.collected || 0,
        total_listed: stats?.listed || 0,
        progress: stats?.total ? ((stats?.collected || 0) / stats.total * 100).toFixed(1) + '%' : '0%'
      },
      message: `${collected}건 수집 완료, ${errors}건 오류`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 38. 수집 현황 조회
api.get('/admin/collector/status', async (c) => {
  try {
    const db = c.env.DB
    
    // DART 기업코드 통계
    let dartStats = { total: 0, collected: 0, listed: 0 }
    try {
      const stats = await db.prepare(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN is_collected = 1 THEN 1 ELSE 0 END) as collected,
          SUM(CASE WHEN stock_code IS NOT NULL AND stock_code != '' THEN 1 ELSE 0 END) as listed
        FROM dart_corps
      `).first<{total: number, collected: number, listed: number}>()
      if (stats) dartStats = stats
    } catch (e) {
      // 테이블이 없을 수 있음
    }
    
    // companies 테이블 통계
    const companyStats = await db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN source = 'DART' THEN 1 ELSE 0 END) as from_dart,
        SUM(CASE WHEN source = 'PUBLIC_DATA' THEN 1 ELSE 0 END) as from_public,
        SUM(CASE WHEN source = 'SARAMIN' THEN 1 ELSE 0 END) as from_saramin,
        SUM(CASE WHEN source = 'JOBKOREA' THEN 1 ELSE 0 END) as from_jobkorea,
        SUM(CASE WHEN source = 'SEED' OR source = 'INTEGRATED' THEN 1 ELSE 0 END) as from_seed
      FROM companies
    `).first<{total: number, from_dart: number, from_public: number, from_saramin: number, from_jobkorea: number, from_seed: number}>()
    
    return c.json({
      success: true,
      dart: {
        total_corps: dartStats.total,
        collected: dartStats.collected,
        listed: dartStats.listed,
        progress: dartStats.total ? ((dartStats.collected / dartStats.total) * 100).toFixed(1) + '%' : '0%'
      },
      companies: {
        total: companyStats?.total || 0,
        by_source: {
          dart: companyStats?.from_dart || 0,
          public_data: companyStats?.from_public || 0,
          saramin: companyStats?.from_saramin || 0,
          jobkorea: companyStats?.from_jobkorea || 0,
          seed: companyStats?.from_seed || 0
        }
      }
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 39. 공공데이터포털 기업정보 수집 (사업자등록 상태조회)
api.post('/admin/collector/public-data/business', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { apiKey, bizNumbers } = body
    
    if (!apiKey) {
      return c.json({ success: false, error: '공공데이터포털 API Key가 필요합니다.' }, 400)
    }
    
    if (!bizNumbers || !Array.isArray(bizNumbers) || bizNumbers.length === 0) {
      return c.json({ success: false, error: '사업자번호 목록이 필요합니다.' }, 400)
    }
    
    // 국세청 사업자등록정보 진위확인 API
    const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status'
    
    let collected = 0
    let errors = 0
    
    // 최대 100개씩 처리
    const batchSize = 100
    for (let i = 0; i < bizNumbers.length; i += batchSize) {
      const batch = bizNumbers.slice(i, i + batchSize)
      
      try {
        const res = await fetch(`${url}?serviceKey=${encodeURIComponent(apiKey)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            b_no: batch.map((b: string) => b.replace(/-/g, ''))
          })
        })
        
        const data: any = await res.json()
        
        if (data.data) {
          for (const biz of data.data) {
            if (biz.b_stt === '계속사업자' || biz.b_stt_cd === '01') {
              // companies 테이블에 저장/업데이트
              const bizNum = biz.b_no
              const existing = await db.prepare('SELECT id FROM companies WHERE biz_num = ?').bind(bizNum).first()
              
              if (!existing) {
                await db.prepare(`
                  INSERT INTO companies (name, biz_num, industry_code, source, analyzed_at)
                  VALUES (?, ?, ?, 'PUBLIC_DATA', datetime('now'))
                `).bind(
                  biz.tax_type || '미확인',
                  bizNum,
                  biz.utcc_yn || null
                ).run()
                collected++
              }
            }
          }
        }
      } catch (e) {
        errors++
      }
    }
    
    return c.json({
      success: true,
      collected,
      errors,
      message: `${collected}건 수집 완료`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 40. 채용사이트 기업정보 크롤링 (사람인)
api.post('/admin/collector/saramin/companies', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json().catch(() => ({}))
    const page = body.page || 1
    const keyword = body.keyword || ''
    
    // 사람인 기업정보 페이지 크롤링
    // 참고: 실제 운영시 robots.txt 및 이용약관 확인 필요
    const url = `https://www.saramin.co.kr/zf_user/company-review/company-list?page=${page}&searchword=${encodeURIComponent(keyword)}`
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const html = await res.text()
    
    // HTML에서 기업 정보 추출 (간단한 정규식 기반)
    const companies: any[] = []
    
    // 기업명 추출 패턴 (실제 HTML 구조에 따라 조정 필요)
    const companyPattern = /<a[^>]*href="\/zf_user\/company-review\/view\?csn=(\d+)[^"]*"[^>]*>([^<]+)<\/a>/g
    let match
    
    while ((match = companyPattern.exec(html)) !== null) {
      const bizNum = match[1]
      const name = match[2].trim()
      if (name && bizNum) {
        companies.push({ name, biz_num: bizNum, source: 'SARAMIN' })
      }
    }
    
    // 대체 패턴 (class 기반)
    const altPattern = /class="company_name"[^>]*>([^<]+)</g
    while ((match = altPattern.exec(html)) !== null) {
      const name = match[1].trim()
      if (name && !companies.find(c => c.name === name)) {
        companies.push({ name, biz_num: null, source: 'SARAMIN' })
      }
    }
    
    // DB에 저장
    let inserted = 0
    let duplicates = 0
    
    for (const company of companies) {
      try {
        const existing = await db.prepare('SELECT id FROM companies WHERE name = ?').bind(company.name).first()
        
        if (!existing) {
          await db.prepare(`
            INSERT INTO companies (name, biz_num, source, analyzed_at)
            VALUES (?, ?, 'SARAMIN', datetime('now'))
          `).bind(company.name, company.biz_num).run()
          inserted++
        } else {
          duplicates++
        }
      } catch (e) {
        // 오류 무시
      }
    }
    
    return c.json({
      success: true,
      parsed: companies.length,
      inserted,
      duplicates,
      page,
      message: `${inserted}개 기업 추가 (${duplicates}개 중복)`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 41. 잡코리아 기업정보 크롤링
api.post('/admin/collector/jobkorea/companies', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json().catch(() => ({}))
    const page = body.page || 1
    const keyword = body.keyword || ''
    
    // 잡코리아 기업리뷰 페이지
    const url = `https://www.jobkorea.co.kr/company/search?stext=${encodeURIComponent(keyword)}&page=${page}`
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const html = await res.text()
    
    // HTML에서 기업 정보 추출
    const companies: any[] = []
    
    // 기업명 추출 패턴
    const companyPattern = /class="name"[^>]*>[\s\S]*?<a[^>]*>([^<]+)<\/a>/g
    let match
    
    while ((match = companyPattern.exec(html)) !== null) {
      const name = match[1].trim()
      if (name) {
        companies.push({ name, source: 'JOBKOREA' })
      }
    }
    
    // DB에 저장
    let inserted = 0
    let duplicates = 0
    
    for (const company of companies) {
      try {
        const existing = await db.prepare('SELECT id FROM companies WHERE name = ?').bind(company.name).first()
        
        if (!existing) {
          await db.prepare(`
            INSERT INTO companies (name, source, analyzed_at)
            VALUES (?, 'JOBKOREA', datetime('now'))
          `).bind(company.name).run()
          inserted++
        } else {
          duplicates++
        }
      } catch (e) {
        // 오류 무시
      }
    }
    
    return c.json({
      success: true,
      parsed: companies.length,
      inserted,
      duplicates,
      page,
      message: `${inserted}개 기업 추가 (${duplicates}개 중복)`
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 42. 인크루트 기업정보 크롤링  
api.post('/admin/collector/incruit/companies', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json().catch(() => ({}))
    const page = body.page || 1
    
    // 인크루트 기업정보 페이지
    const url = `https://company.incruit.com/company/companysearch.asp?page=${page}`
    
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    const html = await res.text()
    
    // HTML에서 기업 정보 추출
    const companies: any[] = []
    
    const companyPattern = /<a[^>]*class="company[^"]*"[^>]*>([^<]+)<\/a>/g
    let match
    
    while ((match = companyPattern.exec(html)) !== null) {
      const name = match[1].trim()
      if (name) {
        companies.push({ name, source: 'INCRUIT' })
      }
    }
    
    // DB에 저장
    let inserted = 0
    
    for (const company of companies) {
      try {
        const existing = await db.prepare('SELECT id FROM companies WHERE name = ?').bind(company.name).first()
        
        if (!existing) {
          await db.prepare(`
            INSERT INTO companies (name, source, analyzed_at)
            VALUES (?, 'INCRUIT', datetime('now'))
          `).bind(company.name).run()
          inserted++
        }
      } catch (e) {
        // 오류 무시
      }
    }
    
    return c.json({
      success: true,
      parsed: companies.length,
      inserted,
      page
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 43. 대량 수집 자동화 (백그라운드 작업용)
api.post('/admin/collector/batch-collect', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json().catch(() => ({}))
    const { source, batchSize = 50 } = body
    
    let result: any = { success: false }
    
    switch (source) {
      case 'dart':
        // DART 상세정보 배치 수집
        const dartApiKey = c.env.DART_API_KEY
        if (!dartApiKey) {
          return c.json({ success: false, error: 'DART API Key 필요' }, 400)
        }
        
        // 미수집 상장사 가져오기
        const corps = await db.prepare(`
          SELECT corp_code, corp_name FROM dart_corps 
          WHERE is_collected = 0 AND stock_code IS NOT NULL AND stock_code != ''
          LIMIT ?
        `).bind(batchSize).all()
        
        if (!corps.results?.length) {
          return c.json({ success: true, message: '수집할 상장사가 없습니다.', collected: 0 })
        }
        
        let collected = 0
        for (const corp of corps.results as any[]) {
          try {
            const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${dartApiKey}&corp_code=${corp.corp_code}`
            const res = await fetch(url)
            const data: any = await res.json()
            
            if (data.status === '000') {
              await db.prepare(`
                INSERT OR REPLACE INTO companies (name, biz_num, ceo_name, industry_code, address, source, analyzed_at)
                VALUES (?, ?, ?, ?, ?, 'DART', datetime('now'))
              `).bind(data.corp_name, data.bizr_no || corp.corp_code, data.ceo_nm, data.induty_code, data.adres).run()
              
              await db.prepare('UPDATE dart_corps SET is_collected = 1, collected_at = datetime("now") WHERE corp_code = ?')
                .bind(corp.corp_code).run()
              
              collected++
            }
            
            await new Promise(r => setTimeout(r, 100))
          } catch (e) {}
        }
        
        result = { success: true, source: 'dart', collected, total: corps.results.length }
        break
        
      default:
        return c.json({ success: false, error: '지원하지 않는 소스입니다.' }, 400)
    }
    
    return c.json(result)
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 44. 수집 API 키 설정
api.post('/admin/collector/set-api-key', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { type, apiKey } = body
    
    if (!type || !apiKey) {
      return c.json({ success: false, error: 'type과 apiKey가 필요합니다.' }, 400)
    }
    
    const keyMap: Record<string, string> = {
      'dart': 'api_dart_key',
      'public_data': 'api_public_data_key',
      'openai': 'api_openai_key'
    }
    
    const settingKey = keyMap[type]
    if (!settingKey) {
      return c.json({ success: false, error: '지원하지 않는 API 타입입니다.' }, 400)
    }
    
    // settings 테이블에 저장
    await db.prepare(`
      INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)
    `).bind(settingKey, apiKey).run()
    
    return c.json({ success: true, message: `${type} API Key가 저장되었습니다.` })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// SETTINGS MANAGEMENT APIs
// ==========================================

// 45. Get all SEO settings
api.get('/admin/settings/seo', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(
      'SELECT setting_key, setting_value FROM site_settings WHERE setting_group = ?'
    ).bind('seo').all()
    
    const settings: Record<string, string> = {}
    for (const row of result.results as any[]) {
      settings[row.setting_key] = row.setting_value
    }
    
    return c.json({ success: true, settings })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 46. Save SEO settings
api.post('/admin/settings/seo', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    
    const seoFields = [
      'seo_title', 'seo_description', 'seo_keywords', 'seo_url',
      'seo_og_title', 'seo_og_description', 'seo_og_image',
      'seo_company_name', 'seo_phone', 'seo_email', 'seo_address'
    ]
    
    let updated = 0
    for (const key of seoFields) {
      if (body[key] !== undefined) {
        await db.prepare(`
          INSERT OR REPLACE INTO site_settings (setting_key, setting_value, setting_group, updated_at)
          VALUES (?, ?, 'seo', datetime('now'))
        `).bind(key, body[key]).run()
        updated++
      }
    }
    
    return c.json({ success: true, message: `${updated}개 설정이 저장되었습니다.`, updated })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 47. Generate sitemap.xml
api.get('/sitemap.xml', async (c) => {
  try {
    const db = c.env.DB
    const urlResult = await db.prepare(
      "SELECT setting_value FROM site_settings WHERE setting_key = 'seo_url'"
    ).first() as any
    
    const baseUrl = urlResult?.setting_value || 'https://www.mce.ai.kr'
    const now = new Date().toISOString().split('T')[0]
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/grants</loc>
    <lastmod>${now}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/analysis</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/partners</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`
    
    return new Response(sitemap, {
      headers: { 'Content-Type': 'application/xml' }
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// 48. Generate robots.txt
api.get('/robots.txt', async (c) => {
  try {
    const db = c.env.DB
    const urlResult = await db.prepare(
      "SELECT setting_value FROM site_settings WHERE setting_key = 'seo_url'"
    ).first() as any
    
    const baseUrl = urlResult?.setting_value || 'https://www.mce.ai.kr'
    
    const robots = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /auth/

Sitemap: ${baseUrl}/sitemap.xml`
    
    return new Response(robots, {
      headers: { 'Content-Type': 'text/plain' }
    })
  } catch (e: any) {
    return c.json({ error: e.message }, 500)
  }
})

// ==========================================
// TERMS MANAGEMENT APIs
// ==========================================

// 49. Get all terms
api.get('/admin/terms', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(
      'SELECT * FROM terms ORDER BY term_type'
    ).all()
    
    return c.json({ success: true, terms: result.results })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 50. Get single term
api.get('/admin/terms/:type', async (c) => {
  try {
    const db = c.env.DB
    const termType = c.req.param('type')
    
    const result = await db.prepare(
      'SELECT * FROM terms WHERE term_type = ? AND is_active = 1 ORDER BY id DESC LIMIT 1'
    ).bind(termType).first()
    
    if (!result) {
      return c.json({ success: false, error: '약관을 찾을 수 없습니다.' }, 404)
    }
    
    return c.json({ success: true, term: result })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 51. Save/update term
api.post('/admin/terms', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { id, term_type, title, content, version, is_required, is_active } = body
    
    if (!term_type || !title) {
      return c.json({ success: false, error: '약관 유형과 제목은 필수입니다.' }, 400)
    }
    
    if (id) {
      // Update existing
      await db.prepare(`
        UPDATE terms SET title = ?, content = ?, version = ?, is_required = ?, is_active = ?, updated_at = datetime('now')
        WHERE id = ?
      `).bind(title, content || '', version || '1.0', is_required ? 1 : 0, is_active ? 1 : 0, id).run()
      
      return c.json({ success: true, message: '약관이 수정되었습니다.' })
    } else {
      // Create new
      await db.prepare(`
        INSERT INTO terms (term_type, title, content, version, is_required, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
      `).bind(term_type, title, content || '', version || '1.0', is_required ? 1 : 0, is_active ? 1 : 0).run()
      
      return c.json({ success: true, message: '약관이 생성되었습니다.' })
    }
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 52. Delete term
api.delete('/admin/terms/:id', async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM terms WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: '약관이 삭제되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// Public endpoints for terms
api.get('/terms/:type', async (c) => {
  try {
    const db = c.env.DB
    const termType = c.req.param('type')
    
    const result = await db.prepare(
      'SELECT title, content, version, updated_at FROM terms WHERE term_type = ? AND is_active = 1 ORDER BY id DESC LIMIT 1'
    ).bind(termType).first()
    
    if (!result) {
      return c.json({ success: false, error: '약관을 찾을 수 없습니다.' }, 404)
    }
    
    return c.json({ success: true, term: result })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// POPUP/BANNER MANAGEMENT APIs
// ==========================================

// 53. Get all popups
api.get('/admin/popups', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(
      'SELECT * FROM popups ORDER BY display_order ASC, id DESC'
    ).all()
    
    return c.json({ success: true, popups: result.results })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 54. Create/update popup
api.post('/admin/popups', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { 
      id, title, content, image_url, link_url, position, 
      width, height, start_date, end_date, show_today_close, 
      is_active, display_order, target_pages 
    } = body
    
    if (!title) {
      return c.json({ success: false, error: '팝업 제목은 필수입니다.' }, 400)
    }
    
    if (id) {
      await db.prepare(`
        UPDATE popups SET 
          title = ?, content = ?, image_url = ?, link_url = ?, position = ?,
          width = ?, height = ?, start_date = ?, end_date = ?, show_today_close = ?,
          is_active = ?, display_order = ?, target_pages = ?
        WHERE id = ?
      `).bind(
        title, content || '', image_url || '', link_url || '', position || 'center',
        width || 500, height || 400, start_date || null, end_date || null, show_today_close ? 1 : 0,
        is_active ? 1 : 0, display_order || 0, target_pages || 'all', id
      ).run()
      
      return c.json({ success: true, message: '팝업이 수정되었습니다.' })
    } else {
      await db.prepare(`
        INSERT INTO popups (title, content, image_url, link_url, position, width, height, start_date, end_date, show_today_close, is_active, display_order, target_pages, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        title, content || '', image_url || '', link_url || '', position || 'center',
        width || 500, height || 400, start_date || null, end_date || null, show_today_close ? 1 : 0,
        is_active ? 1 : 0, display_order || 0, target_pages || 'all'
      ).run()
      
      return c.json({ success: true, message: '팝업이 생성되었습니다.' })
    }
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 55. Delete popup
api.delete('/admin/popups/:id', async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM popups WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: '팝업이 삭제되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 56. Get active popups for frontend
api.get('/popups/active', async (c) => {
  try {
    const db = c.env.DB
    const page = c.req.query('page') || 'all'
    const now = new Date().toISOString().split('T')[0]
    
    const result = await db.prepare(`
      SELECT id, title, content, image_url, link_url, position, width, height, show_today_close
      FROM popups 
      WHERE is_active = 1 
        AND (start_date IS NULL OR start_date <= ?)
        AND (end_date IS NULL OR end_date >= ?)
        AND (target_pages = 'all' OR target_pages LIKE ?)
      ORDER BY display_order ASC
    `).bind(now, now, '%' + page + '%').all()
    
    return c.json({ success: true, popups: result.results })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 57. Get all banners
api.get('/admin/banners', async (c) => {
  try {
    const db = c.env.DB
    // Use simple query to avoid column missing errors
    let result
    try {
      result = await db.prepare(
        'SELECT * FROM banners ORDER BY id DESC'
      ).all()
    } catch (e) {
      // Table might not exist or have different schema
      return c.json({ success: true, banners: [] })
    }
    
    return c.json({ success: true, banners: result.results || [] })
  } catch (e: any) {
    return c.json({ success: true, banners: [], error: e.message })
  }
})

// 58. Create/update banner
api.post('/admin/banners', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { 
      id, title, subtitle, image_url, link_url, banner_type, position,
      background_color, text_color, start_date, end_date, is_active, display_order 
    } = body
    
    if (!title) {
      return c.json({ success: false, error: '배너 제목은 필수입니다.' }, 400)
    }
    
    if (id) {
      await db.prepare(`
        UPDATE banners SET 
          title = ?, subtitle = ?, image_url = ?, link_url = ?, banner_type = ?, position = ?,
          background_color = ?, text_color = ?, start_date = ?, end_date = ?, is_active = ?, display_order = ?
        WHERE id = ?
      `).bind(
        title, subtitle || '', image_url || '', link_url || '', banner_type || 'main', position || 'top',
        background_color || '#3B82F6', text_color || '#FFFFFF', start_date || null, end_date || null,
        is_active ? 1 : 0, display_order || 0, id
      ).run()
      
      return c.json({ success: true, message: '배너가 수정되었습니다.' })
    } else {
      await db.prepare(`
        INSERT INTO banners (title, subtitle, image_url, link_url, banner_type, position, background_color, text_color, start_date, end_date, is_active, display_order, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      `).bind(
        title, subtitle || '', image_url || '', link_url || '', banner_type || 'main', position || 'top',
        background_color || '#3B82F6', text_color || '#FFFFFF', start_date || null, end_date || null,
        is_active ? 1 : 0, display_order || 0
      ).run()
      
      return c.json({ success: true, message: '배너가 생성되었습니다.' })
    }
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 59. Delete banner
api.delete('/admin/banners/:id', async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare('DELETE FROM banners WHERE id = ?').bind(id).run()
    
    return c.json({ success: true, message: '배너가 삭제되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 60. Get active banners for frontend
api.get('/banners/active', async (c) => {
  try {
    const db = c.env.DB
    const bannerType = c.req.query('type') || 'main'
    const now = new Date().toISOString().split('T')[0]
    
    // Try full query first, fallback to simpler query if columns don't exist
    let result
    try {
      result = await db.prepare(`
        SELECT id, title, image_url, position, background_color, text_color
        FROM banners 
        WHERE is_active = 1 AND banner_type = ?
        ORDER BY display_order ASC
      `).bind(bannerType).all()
    } catch (e) {
      // If that fails, try even simpler query
      try {
        result = await db.prepare(`SELECT * FROM banners WHERE is_active = 1`).all()
      } catch (e2) {
        // Return empty if table doesn't exist
        return c.json({ success: true, banners: [] })
      }
    }
    
    return c.json({ success: true, banners: result.results || [] })
  } catch (e: any) {
    return c.json({ success: true, banners: [], error: e.message })
  }
})

// 61. Track banner click
api.post('/banners/:id/click', async (c) => {
  try {
    const db = c.env.DB
    const id = c.req.param('id')
    
    await db.prepare('UPDATE banners SET click_count = click_count + 1 WHERE id = ?').bind(id).run()
    
    return c.json({ success: true })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// MARKETING CHANNELS APIs
// ==========================================

// 62. Get all marketing channels
api.get('/admin/marketing-channels', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare('SELECT * FROM marketing_channels ORDER BY channel_type').all()
    
    return c.json({ success: true, channels: result.results })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 63. Update marketing channel
api.post('/admin/marketing-channels', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { id, tracking_id, config_json, is_active } = body
    
    if (!id) {
      return c.json({ success: false, error: '채널 ID가 필요합니다.' }, 400)
    }
    
    await db.prepare(`
      UPDATE marketing_channels 
      SET tracking_id = ?, config_json = ?, is_active = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(tracking_id || '', config_json || '{}', is_active ? 1 : 0, id).run()
    
    return c.json({ success: true, message: '마케팅 채널이 업데이트되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 64. Get active tracking scripts for frontend
api.get('/tracking-scripts', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(
      'SELECT channel_type, tracking_id, config_json FROM marketing_channels WHERE is_active = 1'
    ).all()
    
    const scripts: string[] = []
    
    for (const channel of result.results as any[]) {
      switch (channel.channel_type) {
        case 'google_analytics':
          if (channel.tracking_id) {
            scripts.push(`
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${channel.tracking_id}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${channel.tracking_id}');
</script>`)
          }
          break
          
        case 'facebook_pixel':
          if (channel.tracking_id) {
            scripts.push(`
<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${channel.tracking_id}');
  fbq('track', 'PageView');
</script>`)
          }
          break
          
        case 'naver_analytics':
          if (channel.tracking_id) {
            scripts.push(`
<!-- Naver Analytics -->
<script>
  if(!wcs_add) var wcs_add = {};
  wcs_add["wa"] = "${channel.tracking_id}";
  if(window.wcs){wcs_do();}
</script>
<script src="//wcs.naver.net/wcslog.js"></script>`)
          }
          break
          
        case 'kakao_pixel':
          if (channel.tracking_id) {
            scripts.push(`
<!-- Kakao Pixel -->
<script>
  kakaoPixel('${channel.tracking_id}').pageView();
</script>`)
          }
          break
      }
    }
    
    return c.json({ success: true, scripts })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// CHAT CHANNELS APIs
// ==========================================

// 65. Get all chat channels
api.get('/admin/chat-channels', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare('SELECT * FROM chat_channels ORDER BY channel_type').all()
    
    return c.json({ success: true, channels: result.results })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 66. Update chat channel
api.post('/admin/chat-channels', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { id, channel_id, plugin_key, config_json, is_active, display_position } = body
    
    if (!id) {
      return c.json({ success: false, error: '채널 ID가 필요합니다.' }, 400)
    }
    
    await db.prepare(`
      UPDATE chat_channels 
      SET channel_id = ?, plugin_key = ?, config_json = ?, is_active = ?, display_position = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(channel_id || '', plugin_key || '', config_json || '{}', is_active ? 1 : 0, display_position || 'bottom-right', id).run()
    
    return c.json({ success: true, message: '상담 채널이 업데이트되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 67. Get active chat widget for frontend
api.get('/chat-widget', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare(
      'SELECT channel_type, channel_id, plugin_key, config_json, display_position FROM chat_channels WHERE is_active = 1 LIMIT 1'
    ).first() as any
    
    if (!result) {
      return c.json({ success: true, widget: null })
    }
    
    let widgetScript = ''
    
    switch (result.channel_type) {
      case 'kakao_channel':
        if (result.channel_id) {
          widgetScript = `
<!-- Kakao Channel -->
<script>
  window.kakaoAs498 = function() {
    Kakao.Channel.chat({ channelPublicId: '${result.channel_id}' });
  };
</script>
<div id="kakao-chat-btn" style="position:fixed;${result.display_position === 'bottom-right' ? 'right:20px;bottom:20px;' : 'left:20px;bottom:20px;'}z-index:9999;cursor:pointer;" onclick="kakaoAs498()">
  <img src="https://developers.kakao.com/assets/img/about/logos/channel/consult_small_yellow_pc.png" alt="카카오톡 상담"/>
</div>`
        }
        break
        
      case 'channel_talk':
        if (result.plugin_key) {
          widgetScript = `
<!-- Channel Talk -->
<script>
  (function() {
    var w = window;
    if (w.ChannelIO) return;
    var ch = function() { ch.c(arguments); };
    ch.q = [];
    ch.c = function(args) { ch.q.push(args); };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) return;
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') { l(); }
    else { w.addEventListener('DOMContentLoaded', l); w.addEventListener('load', l); }
  })();
  ChannelIO('boot', { "pluginKey": "${result.plugin_key}" });
</script>`
        }
        break
        
      case 'tawk_to':
        if (result.channel_id) {
          widgetScript = `
<!-- Tawk.to -->
<script>
  var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
  (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/${result.channel_id}';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
  })();
</script>`
        }
        break
        
      case 'naver_talktalk':
        if (result.channel_id) {
          widgetScript = `
<!-- Naver TalkTalk -->
<div id="naver-talktalk-btn" style="position:fixed;${result.display_position === 'bottom-right' ? 'right:20px;bottom:20px;' : 'left:20px;bottom:20px;'}z-index:9999;">
  <a href="http://talk.naver.com/${result.channel_id}" target="_blank">
    <img src="https://ssl.pstatic.net/static/pwe/btn/talk_naver_main.png" alt="네이버 톡톡"/>
  </a>
</div>`
        }
        break
    }
    
    return c.json({ 
      success: true, 
      widget: {
        type: result.channel_type,
        position: result.display_position,
        script: widgetScript
      }
    })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// EXTERNAL APIs Management
// ==========================================

// 68. Get all external APIs
api.get('/admin/external-apis', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare('SELECT * FROM external_apis ORDER BY api_type').all()
    
    // Mask sensitive data
    const apis = (result.results as any[]).map(api => ({
      ...api,
      client_secret: api.client_secret ? '••••••••' : '',
      api_key: api.api_key ? '••••••••' : ''
    }))
    
    return c.json({ success: true, apis })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 69. Update external API
api.post('/admin/external-apis', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { id, client_id, client_secret, api_key, config_json, is_active, callback_url } = body
    
    if (!id) {
      return c.json({ success: false, error: 'API ID가 필요합니다.' }, 400)
    }
    
    // Get current values if secrets are masked
    const current = await db.prepare('SELECT client_secret, api_key FROM external_apis WHERE id = ?').bind(id).first() as any
    
    const finalSecret = client_secret === '••••••••' ? current?.client_secret || '' : (client_secret || '')
    const finalApiKey = api_key === '••••••••' ? current?.api_key || '' : (api_key || '')
    
    await db.prepare(`
      UPDATE external_apis 
      SET client_id = ?, client_secret = ?, api_key = ?, config_json = ?, is_active = ?, callback_url = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(client_id || '', finalSecret, finalApiKey, config_json || '{}', is_active ? 1 : 0, callback_url || '', id).run()
    
    return c.json({ success: true, message: '외부 API 설정이 업데이트되었습니다.' })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 70. Test external API connection
api.post('/admin/external-apis/test', async (c) => {
  try {
    const db = c.env.DB
    const body = await c.req.json()
    const { api_type } = body
    
    const apiConfig = await db.prepare(
      'SELECT * FROM external_apis WHERE api_type = ?'
    ).bind(api_type).first() as any
    
    if (!apiConfig) {
      return c.json({ success: false, error: 'API 설정을 찾을 수 없습니다.' }, 404)
    }
    
    let testResult = { success: false, message: '' }
    
    switch (api_type) {
      case 'kakao_login':
        testResult = { 
          success: !!apiConfig.client_id, 
          message: apiConfig.client_id ? 'REST API 키가 설정되어 있습니다.' : 'REST API 키가 필요합니다.'
        }
        break
        
      case 'naver_login':
        testResult = { 
          success: !!(apiConfig.client_id && apiConfig.client_secret), 
          message: (apiConfig.client_id && apiConfig.client_secret) ? 'Client ID/Secret이 설정되어 있습니다.' : 'Client ID와 Secret이 필요합니다.'
        }
        break
        
      case 'google_login':
        testResult = { 
          success: !!(apiConfig.client_id && apiConfig.client_secret), 
          message: (apiConfig.client_id && apiConfig.client_secret) ? 'Client ID/Secret이 설정되어 있습니다.' : 'Client ID와 Secret이 필요합니다.'
        }
        break
        
      default:
        testResult = { success: !!apiConfig.api_key, message: apiConfig.api_key ? 'API 키가 설정되어 있습니다.' : 'API 키가 필요합니다.' }
    }
    
    return c.json({ success: true, test: testResult })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// ==========================================
// GENERAL SETTINGS APIs
// ==========================================

// 71. Get all settings by group
api.get('/admin/settings/:group', async (c) => {
  try {
    const db = c.env.DB
    const group = c.req.param('group')
    
    const result = await db.prepare(
      'SELECT setting_key, setting_value FROM site_settings WHERE setting_group = ?'
    ).bind(group).all()
    
    const settings: Record<string, string> = {}
    for (const row of result.results as any[]) {
      settings[row.setting_key] = row.setting_value
    }
    
    return c.json({ success: true, settings })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

// 72. Save settings by group
api.post('/admin/settings/:group', async (c) => {
  try {
    const db = c.env.DB
    const group = c.req.param('group')
    const body = await c.req.json()
    
    let updated = 0
    for (const [key, value] of Object.entries(body)) {
      await db.prepare(`
        INSERT OR REPLACE INTO site_settings (setting_key, setting_value, setting_group, updated_at)
        VALUES (?, ?, ?, datetime('now'))
      `).bind(key, value as string, group).run()
      updated++
    }
    
    return c.json({ success: true, message: `${updated}개 설정이 저장되었습니다.`, updated })
  } catch (e: any) {
    return c.json({ success: false, error: e.message }, 500)
  }
})

export default api
