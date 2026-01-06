import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie } from 'hono/cookie'

// Import Modules
import authApp from './routes/auth'
import adminApp from './routes/admin'

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

// 1. Mount Auth Module (Handles /login, /logout, /auth/*)
app.route('/', authApp)

// 2. Mount Admin Module (Handles /admin/*, /api/dart/*)
// Note: We mount it at root level to keep paths like /admin and /api/dart working
app.route('/admin', adminApp) 
app.route('/api', adminApp) // This might conflict if adminApp routes are not prefixed. 
// Better strategy: Let adminApp handle full paths or route specific prefixes.
// adminApp defined paths like '/' (which maps to /admin due to mounting) and '/dart/test' (mapping to /admin/dart/test?)
// Wait, Hono routing: app.route('/admin', subApp) means subApp's '/' becomes '/admin'.
// My admin.tsx defined `admin.get('/', ...)` and `admin.get('/dart/test', ...)`
// So `app.route('/admin', adminApp)` makes `/admin` work.
// But `/api/dart/test`? I defined `admin.get('/dart/test')` inside.
// So it would be `/admin/dart/test`. 
// I should adjust `admin.tsx` or `index.tsx` routing.

// Let's adjust `admin.tsx` to handle `/api` routes explicitly or mount differently.
// Actually, to keep it simple and robust:
// I will mount `adminApp` at `/` and let it handle `/admin` and `/api/dart` internally if I defined them as such?
// No, `admin.tsx` defined `admin.get('/', ...)` which matches the mount point.
// If I mount at `/`, then `admin.get('/')` intercepts the homepage! That's bad.

// Correct approach:
// adminApp should define routes relative to where it's mounted.
// I will update `admin.tsx` to group API routes separately or mount twice.
// Or just keep it simple: Mount adminApp at `/admin` for UI, and create `apiApp` for APIs?
// Let's stick to the user's request: Separate Auth and Admin.

// Re-reading admin.tsx I just wrote:
// `admin.get('/', ...)` -> Dashboard
// `admin.get('/dart/test', ...)` -> API
// If I mount this at `/admin`, then API is `/admin/dart/test`.
// The frontend JS calls `/api/dart/test`.
// So I need to fix the routing.

// Quick Fix: Mount adminApp at `/` but ensure its routes are specific.
// I will modify `src/routes/admin.tsx` to include full paths or use a different structure.
// Actually, I can just mount it twice or add the specific API route in `index.tsx` pointing to the handler in `admin.tsx`? No, that's messy.

// Let's refine `index.tsx` to route correctly.
// I'll leave `app.route('/admin', adminApp)` for the UI.
// And I'll add a separate route for the API in `index.tsx` that delegates to a handler, OR simpler:
// Just add the API route here in `index.tsx` pointing to a function imported from `admin`? No, Hono app is an object.

// Best way: Update `src/routes/admin.tsx` to handle `/admin` AND `/api/dart` correctly?
// No, a sub-app is usually rooted.
// I will mount `adminApp` at `/` and change routes in `admin.tsx` to be absolute:
// `admin.get('/admin', ...)`
// `admin.get('/api/dart/test', ...)`
// This is the safest way to avoid prefix confusion.

// 3. Public Routes
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