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

// --- 2. Admin Final Component ---
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
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .dropdown-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        `}</style>
      </head>
      <body class="bg-slate-50 font-sans antialiased">
        <div class="min-h-screen flex">
          
          {/* Sidebar */}
          <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-20 hidden md:block">
            <div class="p-6 border-b border-slate-100 flex items-center">
               <img src="/static/logo-horizontal.png" alt="Logo" class="h-8" />
            </div>
            <div class="p-4 space-y-1">
              <a href="/admin?tab=overview" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-chart-pie w-6"></i> 대시보드
              </a>
              <a href="/admin?tab=companies" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'companies' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-building w-6"></i> 기업 데이터 수집
              </a>
              <a href="/admin?tab=grants" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'grants' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-bullhorn w-6"></i> 지원사업 공고
              </a>
              <a href="/admin?tab=logs" class={`flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === 'logs' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                <i class="fas fa-history w-6"></i> AI 분석 내역
              </a>
              <div class="border-t border-slate-100 my-4"></div>
              <a href="/" class="flex items-center px-4 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                <i class="fas fa-home w-6"></i> 사이트로 돌아가기
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main class="flex-1 md:ml-64 p-8">
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

            <div class="fade-in">
              {/* === Companies Tab (Data Collection) === */}
              {activeTab === 'companies' && (
                <div class="space-y-8">
                  {/* Step Indicator */}
                  <div class="flex justify-center mb-10">
                    <div class="flex items-center space-x-4">
                      <div class="flex flex-col items-center">
                        <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-200">1</div>
                        <span class="text-xs font-bold mt-2 text-blue-700">기업식별/인력</span>
                      </div>
                      <div class="w-20 h-1 bg-slate-200 rounded-full"></div>
                      <div class="flex flex-col items-center opacity-50">
                        <div class="w-10 h-10 bg-white border-2 border-slate-300 text-slate-400 rounded-full flex items-center justify-center font-bold">2</div>
                        <span class="text-xs font-bold mt-2 text-slate-500">정밀재무</span>
                      </div>
                      <div class="w-20 h-1 bg-slate-200 rounded-full"></div>
                      <div class="flex flex-col items-center opacity-50">
                        <div class="w-10 h-10 bg-white border-2 border-slate-300 text-slate-400 rounded-full flex items-center justify-center font-bold">3</div>
                        <span class="text-xs font-bold mt-2 text-slate-500">기술/인증</span>
                      </div>
                    </div>
                  </div>

                  {/* Search Section */}
                  <div class="text-center max-w-2xl mx-auto mb-12 relative z-30">
                    <h2 class="text-2xl font-extrabold text-slate-900 mb-2">원클릭 기업 데이터 수집</h2>
                    <p class="text-slate-500 mb-8">기업명만 입력하면 DART, 고용부, 인증협회 데이터를 자동으로 연동합니다.</p>
                    
                    <div class="relative">
                      <div class="flex shadow-2xl rounded-2xl overflow-hidden border border-slate-200 bg-white">
                        <input type="text" id="company-search-input" placeholder="기업명을 입력하세요 (예: 삼성전자, 태성정밀)" 
                          class="w-full px-6 py-4 text-lg outline-none text-slate-700 placeholder-slate-300" autocomplete="off" />
                        <button class="bg-blue-600 text-white px-8 py-4 font-bold text-lg hover:bg-blue-700 transition flex items-center">
                          <i class="fas fa-search mr-2"></i> 데이터 연동
                        </button>
                      </div>

                      {/* Autocomplete Dropdown */}
                      <div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 mt-2 overflow-hidden hidden dropdown-shadow text-left">
                        {/* Items will be injected here via JS */}
                        <div class="p-4 text-center text-slate-400 text-sm">검색어를 입력하세요...</div>
                      </div>
                    </div>

                    <div class="flex justify-center space-x-4 mt-6 text-xs font-bold text-slate-400">
                      <span class="flex items-center text-green-600"><i class="fas fa-check-circle mr-1"></i> DART (재무)</span>
                      <span class="flex items-center text-green-600"><i class="fas fa-check-circle mr-1"></i> 고용보험 (인력)</span>
                      <span class="flex items-center text-green-600"><i class="fas fa-check-circle mr-1"></i> 벤처인 (인증)</span>
                    </div>
                  </div>

                  {/* Result Cards */}
                  <div id="result-area" class="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-50 pointer-events-none transition-opacity duration-500">
                    {/* Card 1: Overview */}
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
                      <div class="absolute top-0 right-0 bg-slate-100 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-slate-500">DART + 등기소</div>
                      <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center"><i class="fas fa-building text-blue-600 mr-2"></i> 기업 개요 및 신용</h3>
                      
                      <div class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">기업명</label>
                            <div id="res-name" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800">-</div>
                          </div>
                          <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">대표자</label>
                            <div id="res-ceo" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800">-</div>
                          </div>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                          <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">설립일</label>
                            <div id="res-est" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">-</div>
                          </div>
                          <div>
                            <label class="block text-xs font-bold text-slate-400 mb-1">기업규모</label>
                            <div id="res-scale" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">-</div>
                          </div>
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-400 mb-1">본점 주소</label>
                          <div id="res-addr" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">-</div>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Employment */}
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
                      <div class="absolute top-0 right-0 bg-green-50 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-green-600">고용노동부 (고용보험)</div>
                      <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center"><i class="fas fa-users text-green-600 mr-2"></i> 고용 및 인력 변동 (최근 1년)</h3>
                      
                      <div class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                          <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <span class="block text-xs text-slate-400 mb-1">총 근로자 수</span>
                            <strong id="res-emp" class="text-2xl font-extrabold text-slate-800">-</strong> <span class="text-xs">명</span>
                          </div>
                          <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <span class="block text-xs text-slate-400 mb-1">청년 (만 34세↓)</span>
                            <strong id="res-youth" class="text-2xl font-extrabold text-slate-800">-</strong> <span class="text-xs">명</span>
                          </div>
                        </div>
                        
                        <div class="flex justify-between items-center p-4 border border-slate-100 rounded-xl">
                          <div class="text-center flex-1 border-r border-slate-100">
                            <span class="block text-[10px] text-slate-400">최근 1년 입사</span>
                            <strong class="text-blue-600 text-lg">0명</strong>
                          </div>
                          <div class="text-center flex-1 border-r border-slate-100">
                            <span class="block text-[10px] text-slate-400">최근 1년 퇴사</span>
                            <strong class="text-red-500 text-lg">0명</strong>
                          </div>
                          <div class="text-center flex-1">
                            <span class="block text-[10px] text-slate-400">퇴사율</span>
                            <strong class="text-slate-700 text-lg">0%</strong>
                          </div>
                        </div>

                        <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start">
                          <i class="fas fa-lightbulb text-yellow-500 mt-1 mr-3"></i>
                          <div>
                            <h4 class="text-xs font-bold text-yellow-800 mb-1">고용 유지율 우수 기업</h4>
                            <p class="text-[10px] text-yellow-700">일자리 창출 및 고용 안정 자금 추천 대상입니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Other Tabs (Placeholder) */}
              {activeTab === 'overview' && <div class="text-center py-20 text-slate-400">대시보드 로딩 중... (admin_final.js)</div>}
              {activeTab !== 'companies' && activeTab !== 'overview' && <div class="text-center py-20 text-slate-400">해당 기능 준비 중...</div>}
            </div>
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
  DART_API_KEY: string;
  MYBROWSER: any;
  DEPLOY_HOOK: string;
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

// --- 4. Public Routes ---
app.get('/', (c) => c.render(<Home />))
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

// --- 5. Auth & Admin Routes ---
app.get('/login', (c) => {
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <title>로그인</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-50 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg w-96">
          <h1 class="text-2xl font-bold mb-6 text-center">로그인</h1>
          <form action="/auth/login" method="post" class="space-y-4">
            <input type="email" name="email" placeholder="이메일" class="w-full p-2 border rounded" required />
            <input type="password" name="password" placeholder="비밀번호" class="w-full p-2 border rounded" required />
            <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded font-bold">로그인</button>
          </form>
        </div>
      </body>
    </html>
  )
})

app.get('/register', (c) => c.render(<Register />))

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
  const userData = { id: 'user1', name: '김철수', email: email, role: 'user', profileImage: 'https://ui-avatars.com/api/?name=User' }
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

// --- 6. API Endpoints (DART & Autocomplete) ---

// Autocomplete API (Mock for now, replacing DART Search due to complexity)
app.get('/api/search/company', (c) => {
  const q = c.req.query('q') || '';
  if (q.length < 1) return c.json([]);

  // Mock Database of popular companies
  const mockDB = [
    { name: '삼성전자', code: '00126380', ceo: '한종희, 경계현' },
    { name: '삼성에스디아이', code: '00126362', ceo: '최윤호' },
    { name: '삼성전기', code: '00126326', ceo: '장덕현' },
    { name: '삼성바이오로직스', code: '00872870', ceo: '존림' },
    { name: '태성정밀', code: '00123456', ceo: '김철수' },
    { name: '현대자동차', code: '00164779', ceo: '정의선' },
    { name: 'LG에너지솔루션', code: '01515337', ceo: '권영수' }
  ];

  const results = mockDB.filter(c => c.name.includes(q));
  return c.json(results);
})

// DART Data Proxy
app.get('/api/dart/data', async (c) => {
  const code = c.req.query('code'); // corp_code
  const apiKey = c.env.DART_API_KEY;
  
  if (!apiKey) return c.json({ error: 'API Key Missing' });
  if (!code) return c.json({ error: 'Company Code Missing' });

  try {
    // Call OpenDART
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${code}`;
    const res = await fetch(url);
    const data: any = await res.json();

    if (data.status === '000') {
      return c.json({
        success: true,
        data: {
          name: data.corp_name,
          ceo: data.ceo_nm,
          est_date: data.est_dt,
          address: data.adres,
          corp_cls: data.corp_cls // Y: 유가, K: 코스닥, N: 코넥스, E: 기타
        }
      });
    } else {
      return c.json({ success: false, message: data.message });
    }
  } catch (e: any) {
    return c.json({ success: false, message: e.message });
  }
})

app.get('/api/admin/stats', (c) => c.json({ total_users: 1234, ai_usage: 56, crawler_usage: 890, pending_partners: 2, new_rfqs: 5 }))

export default app