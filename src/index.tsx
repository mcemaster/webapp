import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie } from 'hono/cookie'

// Import Feature Modules
import authApp from './routes/auth'
import adminApp from './routes/admin'
import apiApp from './routes/api'
import rfqApp from './routes/rfq'
import supportApp from './routes/support'
import scmApp from './routes/scm'

// Import Static Pages (Simple Pages)
import { Home } from './pages/Home'
import { SpecEvaluation } from './pages/SpecEvaluation'
import { Certification } from './pages/Certification'
import { FAQ } from './pages/FAQ'
import { PartnershipProposal } from './pages/PartnershipProposal'
import { Legal } from './pages/Legal'
import { AuditApplication } from './pages/AuditApplication'
import { Register } from './pages/Register'
import { CertificationSearch } from './pages/CertificationSearch'
import { CertificationDetail } from './pages/CertificationDetail'

type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
  DART_API_KEY: string;
  MYBROWSER: any;
  DEPLOY_HOOK: string;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

// ==========================================
// 1. Mount Feature Modules (The "Microservices")
// ==========================================

// 🔐 Authentication (Login, Register, Logout)
app.route('/auth', authApp)

// 🖥️ Admin Dashboard (Central Control)
app.route('/admin', adminApp)

// ⚙️ Shared APIs (DART, Utils)
app.route('/api', apiApp)

// 🏭 Supply Chain Management (SCM)
app.route('/services/scm', scmApp) // Maps /services/scm -> scmApp
// Note: scmApp also handles /partners, so we need to route specific paths or mount multiple times if needed.
// Simplest way: Mount scmApp at root and let it handle specific paths? 
// No, mounting at specific paths is cleaner.
app.route('/partners', scmApp) // Maps /partners -> scmApp (requires logic in scm.tsx to handle path)

// 🔍 Supplier Search AI (RFQ)
app.route('/rfq', rfqApp) // Maps /rfq -> rfqApp

// 💰 Gov Support AI (Matching)
app.route('/support-matching', supportApp) // Maps /support-matching -> supportApp


// ==========================================
// 2. Static Pages & Root
// ==========================================
app.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Home user={user} />)
})

app.get('/services/spec', (c) => c.render(<SpecEvaluation />))
app.get('/services/certification', (c) => c.render(<Certification />))
app.get('/faq', (c) => c.render(<FAQ />))
app.get('/partnership', (c) => c.render(<PartnershipProposal />))
app.get('/legal', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  const tab = c.req.query('tab') || 'service'
  return c.render(<Legal user={user} tab={tab} />)
})
app.get('/audit/apply', (c) => c.render(<AuditApplication />))
app.get('/register', (c) => c.render(<Register />))
app.get('/certification-search', (c) => c.render(<CertificationSearch />))

// Certification detail page
app.get('/certifications/:id', async (c) => {
  const id = c.req.param('id')
  try {
    const db = c.env.DB
    const response = await fetch(`${c.req.url.replace(/\/certifications\/\d+/, '')}/api/certifications/${id}/detail`)
    const data = await response.json()
    
    if (data.success) {
      return c.render(<CertificationDetail cert={data.cert} files={data.files} />)
    } else {
      return c.text('인증서를 찾을 수 없습니다.', 404)
    }
  } catch (e) {
    return c.text('오류가 발생했습니다.', 500)
  }
})

// ==========================================
// 3. SEO - Sitemap & Robots
// ==========================================
app.get('/sitemap.xml', async (c) => {
  try {
    const db = c.env.DB
    const result = await db.prepare("SELECT value FROM settings WHERE key = 'sitemap_xml'").first<{value: string}>()
    
    if (result?.value) {
      return c.text(result.value, 200, { 'Content-Type': 'application/xml' })
    }
    
    // Default sitemap
    const baseUrl = 'https://www.mce.or.kr'
    const pages = ['/', '/support-matching', '/rfq', '/services/certification', '/services/spec', '/services/scm', '/faq', '/partnership', '/register']
    const now = new Date().toISOString().split('T')[0]
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    pages.forEach(p => {
      xml += `  <url><loc>${baseUrl}${p}</loc><lastmod>${now}</lastmod></url>\n`
    })
    xml += '</urlset>'
    
    return c.text(xml, 200, { 'Content-Type': 'application/xml' })
  } catch (e) {
    return c.text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>', 200, { 'Content-Type': 'application/xml' })
  }
})

app.get('/robots.txt', (c) => {
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /auth

Sitemap: https://www.mce.or.kr/sitemap.xml`
  return c.text(robots, 200, { 'Content-Type': 'text/plain' })
})

export default app