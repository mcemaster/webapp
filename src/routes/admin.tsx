import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Admin } from '../pages/Admin'
import { CertificationManagement } from '../pages/admin/CertificationManagement'
import { DatabaseManager } from '../pages/admin/DatabaseManager'

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
// New route: /certification0000_admin
admin.get('/certification0000_admin', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  if (!user || user.role !== 'admin') return c.redirect('/auth/login')
  return c.render(<CertificationManagement />)
})

// --- Database Manager Page ---
// New route: /certification0000_admin/database
admin.get('/certification0000_admin/database', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  if (!user || user.role !== 'admin') return c.redirect('/auth/login')
  return c.render(<DatabaseManager />)
})

// Legacy routes (redirect to new structure)
admin.get('/certifications', (c) => c.redirect('/admin/certification0000_admin'))
admin.get('/database', (c) => c.redirect('/admin/certification0000_admin/database'))

export default admin