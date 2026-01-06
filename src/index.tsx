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
app.get('/legal', (c) => c.render(<Legal />))
app.get('/audit/apply', (c) => c.render(<AuditApplication />))
app.get('/register', (c) => c.render(<Register />))

export default app