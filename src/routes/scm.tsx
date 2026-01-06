import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { Services } from '../pages/Services'
import { Partners } from '../pages/Partners'

type Bindings = {
  DB: D1Database;
}

const scm = new Hono<{ Bindings: Bindings }>()

// UI Routes
scm.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Services user={user} />)
})

scm.get('/partners', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Partners user={user} />)
})

// API: Register Partner (Connected to Admin > Partners Tab)
scm.post('/partners/register', async (c) => {
  const body = await c.req.json();
  // await c.env.DB.prepare('INSERT INTO partners ...').run();
  return c.json({ success: true, message: "파트너 가입 신청이 완료되었습니다. 관리자 승인 후 활동 가능합니다." });
})

export default scm