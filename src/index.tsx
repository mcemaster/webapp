import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { html } from 'hono/html'

// --- 1. Import Original Pages & Components ---
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Rfq } from './pages/Rfq'
import { RfqResult } from './pages/RfqResult'
import { Partners } from './pages/Partners'
import { Register } from './pages/Register'
import { Services } from './pages/Services'
import { SupportMatching } from './pages/SupportMatching'
import { SpecEvaluation } from './pages/SpecEvaluation'
import { SecondPartyAudit } from './pages/SecondPartyAudit'
import { PartnershipProposal } from './pages/PartnershipProposal'
import { FAQ } from './pages/FAQ'
import { Legal } from './pages/Legal'
import { AuditApplication } from './pages/AuditApplication'
import { Certification } from './pages/Certification'
import puppeteer from '@cloudflare/puppeteer'

// --- 2. Admin Final Component (Standalone Mode - NO LAYOUT) ---
const AdminFinal = (props: { user: any, tab?: string }) => {
  const activeTab = props.tab || 'overview';
  
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 - 경영인증평가원 (FINAL)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      </head>
      <body class="bg-slate-50 font-sans antialiased">
        <div class="min-h-screen flex">
          
          {/* Standalone Sidebar */}
          <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-20 hidden md:block">
            <div class="p-6 border-b border-slate-100 flex items-center">
               <img src="/static/logo-horizontal.png" alt="Logo" class="h-8" />
            </div>
            <div class="p-4 space-y-1">
              <a href="/admin?tab=overview" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-chart-pie w-6"></i> 대시보드
              </a>
              <a href="/admin?tab=companies" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'companies' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-building w-6"></i> 기업 DB 관리
              </a>
              <a href="/admin?tab=grants" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'grants' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-bullhorn w-6"></i> 지원사업 공고
              </a>
              <a href="/admin?tab=logs" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'logs' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-history w-6"></i> AI 분석 내역
              </a>
              <div class="border-t border-slate-100 my-4"></div>
              <a href="/" class="flex items-center px-4 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                <i class="fas fa-home w-6"></i> 사이트로 돌아가기
              </a>
            </div>
          </aside>

          {/* Standalone Main Content */}
          <main class="flex-1 md:ml-64 p-8">
            {/* Header - Professional Blue Style */}
            <header class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900 flex items-center">
                  <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs mr-3">ADMIN V3.0</span>
                  통합 관리자 시스템
                </h1>
                <p class="text-slate-500 text-sm mt-1 ml-14">기업 데이터, 공고 매칭, AI 분석 현황을 실시간으로 관리합니다.</p>
              </div>
              <div class="flex items-center space-x-4">
                 <div class="text-right mr-4 hidden sm:block">
                   <p class="text-sm font-bold text-slate-800">{props.user.name}</p>
                   <p class="text-xs text-slate-500">최고 관리자</p>
                 </div>
                 <a href="/logout" class="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                   로그아웃
                 </a>
              </div>
            </header>

            {/* Action Center */}
            <div id="action-center" class="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white mb-8 hidden animate-fade-in-up">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse">
                    <i class="fas fa-bell text-2xl"></i>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold">확인 필요한 업무가 있습니다!</h3>
                    <p class="text-indigo-100 text-sm">신속한 처리가 서비스 품질을 높입니다.</p>
                  </div>
                </div>
                <div class="flex space-x-3">
                  <span id="btn-pending-partners" class="hidden px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm items-center cursor-pointer">
                    파트너 승인 <span class="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full" id="count-pending-partners">0</span>
                  </span>
                  <span id="btn-new-rfqs" class="hidden px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm items-center cursor-pointer">
                    신규 견적 <span class="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full" id="count-new-rfqs">0</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Dashboard Charts */}
            {activeTab === 'overview' && (
              <div class="space-y-6 animate-fade-in-up">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <p class="text-xs font-bold text-slate-400 uppercase">총 회원 수</p>
                      <h3 id="stat-total-users" class="text-3xl font-extrabold text-slate-800 mt-2">-</h3>
                   </div>
                   <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <p class="text-xs font-bold text-slate-400 uppercase">AI 분석 횟수</p>
                      <h3 id="stat-ai-usage" class="text-3xl font-extrabold text-indigo-600 mt-2">-</h3>
                   </div>
                   <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <p class="text-xs font-bold text-slate-400 uppercase">수집된 공고</p>
                      <h3 id="stat-crawler-usage" class="text-3xl font-extrabold text-emerald-600 mt-2">-</h3>
                   </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 class="font-bold text-lg text-slate-800 mb-4">주간 성장 지표</h3>
                    <div class="h-64 relative"><canvas id="growthChart"></canvas></div>
                  </div>
                  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 class="font-bold text-lg text-slate-800 mb-4">AI 서비스 활용도</h3>
                    <div class="h-64 relative"><canvas id="aiChart"></canvas></div>
                  </div>
                </div>
              </div>
            )}

            {/* Tables Container */}
            {activeTab === 'companies' && (
              <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in-up">
                <h3 class="font-bold text-lg mb-4">기업 DB 목록</h3>
                <div class="overflow-x-auto"><table class="w-full text-sm text-left"><tbody id="company-list"><tr><td class="p-4 text-center">로딩중...</td></tr></tbody></table></div>
              </div>
            )}
            {activeTab === 'grants' && (
              <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in-up">
                <h3 class="font-bold text-lg mb-4">지원사업 공고 목록</h3>
                <div class="overflow-x-auto"><table class="w-full text-sm text-left"><tbody id="grant-list"><tr><td class="p-4 text-center">로딩중...</td></tr></tbody></table></div>
              </div>
            )}
            {activeTab === 'logs' && (
              <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 animate-fade-in-up">
                <h3 class="font-bold text-lg mb-4">AI 분석 이력</h3>
                <div class="overflow-x-auto"><table class="w-full text-sm text-left"><tbody id="log-list"><tr><td class="p-4 text-center">로딩중...</td></tr></tbody></table></div>
              </div>
            )}

          </main>
        </div>
        <script src="/static/js/core.js"></script>
        <script src="/static/js/admin_final.js"></script>
      </body>
    </html>
  )
}

// --- 3. App Setup ---
type Bindings = {
  DB: D1Database;
  OPENAI_API_KEY: string;
  MYBROWSER: any;
  DEPLOY_HOOK: string;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

// --- 4. Public Routes (Restored) ---
app.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Home user={user} />)
})

app.get('/services/scm', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Services user={user} />)
})

app.get('/services/spec', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SpecEvaluation user={user} />)
})

app.get('/services/certification', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Certification user={user} />)
})

app.get('/rfq', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Rfq user={user} />)
})

app.get('/rfq/result', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<RfqResult user={user} />)
})

app.get('/support-matching', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SupportMatching user={user} />)
})

app.get('/partners', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Partners user={user} />)
})

app.get('/faq', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<FAQ user={user} />)
})

app.get('/partnership', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<PartnershipProposal user={user} />)
})

app.get('/legal', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Legal user={user} />)
})

app.get('/audit/apply', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<AuditApplication user={user} />)
})

// --- 5. Auth & Admin Routes ---
app.get('/login', (c) => {
  const userSession = getCookie(c, 'user_session')
  if (userSession) return c.redirect('/')
  
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>로그인</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div class="text-center mb-8">
            <h1 class="text-2xl font-bold text-gray-800">로그인</h1>
            <p class="text-gray-600 mt-2">서비스 이용을 위해 로그인해주세요</p>
          </div>
          <form action="/auth/login" method="post" class="space-y-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" name="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
              <input type="password" name="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" required />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">로그인</button>
          </form>
          <div class="mt-6 text-center">
            <span class="text-gray-500 text-sm">계정이 없으신가요?</span>
            <a href="/register" class="text-blue-600 font-bold text-sm ml-2 hover:underline">회원가입</a>
          </div>
        </div>
      </body>
    </html>
  )
})

app.get('/register', (c) => {
  return c.render(<Register />)
})

app.post('/auth/login', async (c) => {
  const body = await c.req.parseBody()
  const email = body['email'] as string
  
  if (email.includes('admin') || email.includes('mce')) {
    const adminData = {
      id: 'admin',
      name: '최고관리자',
      email: email,
      role: 'admin',
      profileImage: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
    }
    setCookie(c, 'user_session', JSON.stringify(adminData), { path: '/', httpOnly: true })
    return c.redirect('/admin')
  }

  const userData = {
    id: 'user1',
    name: '김철수',
    email: email,
    role: 'user',
    profileImage: 'https://ui-avatars.com/api/?name=User'
  }
  setCookie(c, 'user_session', JSON.stringify(userData), { path: '/', httpOnly: true })
  return c.redirect('/')
})

app.get('/logout', (c) => {
  deleteCookie(c, 'user_session')
  return c.redirect('/')
})

app.get('/admin', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  if (!user || user.role !== 'admin') return c.redirect('/login')
  const tab = c.req.query('tab')
  return c.render(<AdminFinal user={user} tab={tab} />)
})

// --- 6. API Endpoints ---
app.get('/api/admin/stats', async (c) => {
  // Use DB in real app, mock for now to ensure rendering
  return c.json({
    ai_usage: 150,
    crawler_usage: 320,
    total_users: 1250,
    pending_partners: 5,
    new_rfqs: 3,
    chart_data: { labels: [], users: [] }
  })
})

app.get('/api/admin/companies', (c) => c.json([{name:'(주)테스트기업', ceo:'김대표', revenue:100, source:'crawler'}]))
app.get('/api/admin/grants', (c) => c.json([{title:'2026 AI 바우처 지원사업', agency:'NIPA', deadline:'2026-05-01'}]))
app.get('/api/admin/logs', (c) => c.json([{created_at: new Date(), user_id:'user1', match_score:95, ai_reasoning:'적합함'}]))

export default app