import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Admin } from '../pages/Admin'
import { CertificationManagement } from '../pages/admin/CertificationManagement'

// Environment Bindings
type Bindings = {
  DB: D1Database;
  DART_API_KEY: string;
  DEPLOY_HOOK: string;
}

const admin = new Hono<{ Bindings: Bindings }>()

// --- Admin Page Route ---
// Mounted at /admin in index.tsx, so '/' becomes '/admin'
admin.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  if (!user || user.role !== 'admin') return c.redirect('/auth/login')
  const tab = c.req.query('tab')
  return c.render(<Admin user={user} tab={tab} />)
})

// --- Certification Management Page ---
admin.get('/certifications', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  if (!user || user.role !== 'admin') return c.redirect('/auth/login')
  return c.render(<CertificationManagement />)
})

export default admin