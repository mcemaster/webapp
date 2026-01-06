import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie } from 'hono/cookie'

// Import Modules
import authApp from './routes/auth'
import adminApp from './routes/admin'
import apiApp from './routes/api'

// Import Pages
import { Home } from './pages/Home'
import { Services } from './pages/Services'
import { SpecEvaluation } from './pages/SpecEvaluation'
import { Certification } from './pages/Certification'
import { Rfq } from './pages/Rfq'
import { RfqResult } from './pages/RfqResult'
import { SupportMatching } from './pages/SupportMatching'
import { Partners } from './pages/Partners'
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

// 1. Mount Auth Module
app.route('/', authApp)

// 2. Mount Admin Module
app.route('/admin', adminApp)

// 3. Mount API Module
app.route('/api', apiApp)

// 4. Public Routes
app.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Home user={user} />)
})

app.get('/services/scm', (c) => c.render(<Services />))
app.get('/services/spec', (c) => c.render(<SpecEvaluation />))
app.get('/services/certification', (c) => c.render(<Certification />))
app.get('/rfq', (c) => c.render(<Rfq />))
app.get('/rfq/result', (c) => c.render(<RfqResult />))
app.get('/support-matching', (c) => c.render(<SupportMatching />))
app.get('/partners', (c) => c.render(<Partners />))
app.get('/faq', (c) => c.render(<FAQ />))
app.get('/partnership', (c) => c.render(<PartnershipProposal />))
app.get('/legal', (c) => c.render(<Legal />))
app.get('/audit/apply', (c) => c.render(<AuditApplication />))
app.get('/register', (c) => c.render(<Register />))

export default app