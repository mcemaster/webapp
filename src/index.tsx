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

// --- 2. Admin Final Component (All Features Included) ---
const AdminFinal = (props: { user: any, tab?: string }) => {
  const activeTab = props.tab || 'overview';
  
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>통합 관리자 - 경영인증평가원</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </head>
      <body class="bg-slate-50 font-sans antialiased text-slate-800">
        <div class="min-h-screen flex">
          
          {/* Sidebar */}
          <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-20 hidden md:flex flex-col">
            <div class="p-6 border-b border-slate-100 flex items-center justify-center">
               <img src="/static/logo-horizontal.png" alt="Logo" class="h-8" />
            </div>
            
            <div class="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Group 1: Dashboard */}
              <div>
                <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</p>
                <a href="/admin?tab=overview" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <i class="fas fa-chart-pie w-5 text-center mr-2"></i> 대시보드
                </a>
              </div>

              {/* Group 2: Data */}
              <div>
                <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Center</p>
                <div class="space-y-1">
                  <a href="/admin?tab=companies" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'companies' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-building w-5 text-center mr-2"></i> 기업 DB 관리
                  </a>
                  <a href="/admin?tab=grants" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'grants' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-bullhorn w-5 text-center mr-2"></i> 지원사업 공고
                  </a>
                  <a href="/admin?tab=logs" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'logs' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-history w-5 text-center mr-2"></i> AI 분석 내역
                  </a>
                </div>
              </div>

              {/* Group 3: Management */}
              <div>
                <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Management</p>
                <div class="space-y-1">
                  <a href="/admin?tab=partners" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'partners' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-handshake w-5 text-center mr-2"></i> 파트너 승인
                  </a>
                  <a href="/admin?tab=rfq" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'rfq' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-paper-plane w-5 text-center mr-2"></i> 공급사 매칭/발송
                  </a>
                </div>
              </div>

              {/* Group 4: Marketing & System */}
              <div>
                <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Configuration</p>
                <div class="space-y-1">
                  <a href="/admin?tab=banners" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'banners' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-images w-5 text-center mr-2"></i> 배너/팝업 관리
                  </a>
                  <a href="/admin?tab=seo" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'seo' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fab fa-google w-5 text-center mr-2"></i> SEO/마케팅
                  </a>
                  <a href="/admin?tab=settings" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <i class="fas fa-cog w-5 text-center mr-2"></i> 시스템 설정
                  </a>
                </div>
              </div>
            </div>

            <div class="p-4 border-t border-slate-100">
              <a href="/" class="flex items-center justify-center w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors">
                <i class="fas fa-external-link-alt mr-2"></i> 사용자 페이지로 이동
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main class="flex-1 md:ml-64 p-8">
            {/* Top Header */}
            <header class="flex justify-between items-center mb-8">
              <div>
                <h1 class="text-2xl font-extrabold text-slate-900">
                  {activeTab === 'overview' && '대시보드'}
                  {activeTab === 'companies' && '기업 DB 관리'}
                  {activeTab === 'grants' && '지원사업 공고 관리'}
                  {activeTab === 'logs' && 'AI 분석 이력'}
                  {activeTab === 'partners' && '파트너사 가입 승인'}
                  {activeTab === 'rfq' && '공급사 매칭 및 알림'}
                  {activeTab === 'banners' && '배너 및 팝업 관리'}
                  {activeTab === 'seo' && 'SEO 및 마케팅 설정'}
                  {activeTab === 'settings' && '시스템 설정 (DART/배포)'}
                </h1>
                <p class="text-slate-500 text-sm mt-1">경영인증평가원 통합 관리자 시스템 V3.0</p>
              </div>
              <div class="flex items-center space-x-3">
                 <div class="text-right hidden sm:block">
                   <p class="text-sm font-bold text-slate-800">{props.user.name}</p>
                   <p class="text-xs text-slate-500">최고 관리자</p>
                 </div>
                 <div class="h-8 w-px bg-slate-200 mx-2"></div>
                 <button onclick="location.reload()" class="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition">
                   <i class="fas fa-sync-alt"></i>
                 </button>
                 <a href="/logout" class="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 transition">
                   <i class="fas fa-sign-out-alt"></i>
                 </a>
              </div>
            </header>

            {/* Content Area */}
            <div class="fade-in">
              
              {/* 1. Dashboard */}
              {activeTab === 'overview' && (
                <div class="space-y-6">
                  {/* Action Center */}
                  <div id="action-center" class="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white flex items-center justify-between hidden">
                    <div class="flex items-center space-x-4">
                      <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse"><i class="fas fa-bell text-2xl"></i></div>
                      <div>
                        <h3 class="text-lg font-bold">확인 필요한 업무가 있습니다!</h3>
                        <p class="text-indigo-100 text-sm">파트너 승인 대기 및 신규 견적 요청을 확인하세요.</p>
                      </div>
                    </div>
                    <div class="flex space-x-3">
                      <a href="/admin?tab=partners" class="px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm flex items-center hover:bg-indigo-50">
                        승인 대기 <span class="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full" id="count-pending-partners">0</span>
                      </a>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p class="text-xs font-bold text-slate-400 uppercase">파트너 신청</p>
                        <h3 class="text-3xl font-extrabold text-orange-500 mt-2" id="stat-pending">0</h3>
                     </div>
                  </div>

                  {/* Charts */}
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

              {/* 2. Tables (Companies, Grants, Logs) */}
              {activeTab === 'companies' && (
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="text-xs text-slate-400 uppercase bg-slate-50"><tr><th class="px-6 py-3">기업명</th><th class="px-6 py-3">대표자</th><th class="px-6 py-3">매출액</th><th class="px-6 py-3">구분</th></tr></thead><tbody id="company-list"><tr><td class="p-4 text-center">로딩중...</td></tr></tbody></table></div>
                </div>
              )}
              {activeTab === 'grants' && (
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="text-xs text-slate-400 uppercase bg-slate-50"><tr><th class="px-6 py-3">공고명</th><th class="px-6 py-3">기관</th><th class="px-6 py-3">마감일</th></tr></thead><tbody id="grant-list"><tr><td class="p-4 text-center">로딩중...</td></tr></tbody></table></div>
                </div>
              )}
              {activeTab === 'logs' && (
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div class="overflow-x-auto"><table class="w-full text-sm text-left"><thead class="text-xs text-slate-400 uppercase bg-slate-50"><tr><th class="px-6 py-3">일시</th><th class="px-6 py-3">사용자</th><th class="px-6 py-3">점수</th><th class="px-6 py-3">AI 의견</th></tr></thead><tbody id="log-list"><tr><td class="p-4 text-center">로딩중...</td></tr></tbody></table></div>
                </div>
              )}

              {/* 3. Partner Approval */}
              {activeTab === 'partners' && (
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                      <thead class="text-xs text-slate-400 uppercase bg-slate-50">
                        <tr><th class="px-6 py-3">기업명</th><th class="px-6 py-3">대표자</th><th class="px-6 py-3">신청일</th><th class="px-6 py-3">상태</th><th class="px-6 py-3 text-right">관리</th></tr>
                      </thead>
                      <tbody id="partner-list">
                        {/* Mock Data */}
                        <tr class="border-b border-slate-100">
                          <td class="px-6 py-4 font-bold">(주)미래테크</td><td class="px-6 py-4">김대표</td><td class="px-6 py-4">2026-01-05</td>
                          <td class="px-6 py-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">승인 대기</span></td>
                          <td class="px-6 py-4 text-right"><button class="text-blue-600 font-bold hover:underline">승인</button></td>
                        </tr>
                        <tr class="border-b border-slate-100">
                          <td class="px-6 py-4 font-bold">대영플라스틱</td><td class="px-6 py-4">이영희</td><td class="px-6 py-4">2026-01-04</td>
                          <td class="px-6 py-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">승인 대기</span></td>
                          <td class="px-6 py-4 text-right"><button class="text-blue-600 font-bold hover:underline">승인</button></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. RFQ Management */}
              {activeTab === 'rfq' && (
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div class="col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
                    <h3 class="font-bold text-slate-800 mb-4 px-2">접수된 견적 요청</h3>
                    <div class="space-y-3">
                      <div class="p-4 bg-blue-50 border border-blue-100 rounded-xl cursor-pointer hover:bg-blue-100 transition">
                        <div class="flex justify-between items-center mb-2"><span class="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded font-bold">NEW</span> <span class="text-xs text-slate-400">10분 전</span></div>
                        <h4 class="font-bold text-slate-900 text-sm">전기차 배터리 케이스 가공</h4>
                        <p class="text-xs text-slate-500 mt-1">발주사: (주)한화시스템 1차협력사</p>
                      </div>
                      <div class="p-4 bg-white border border-slate-100 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                        <div class="flex justify-between items-center mb-2"><span class="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded font-bold">대기</span> <span class="text-xs text-slate-400">어제</span></div>
                        <h4 class="font-bold text-slate-900 text-sm">의료기기 임플란트 시제품</h4>
                        <p class="text-xs text-slate-500 mt-1">발주사: 메디컬솔루션</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-center items-center text-center">
                    <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400"><i class="fas fa-mouse-pointer text-2xl"></i></div>
                    <p class="text-slate-500 text-sm">좌측 목록에서 요청서를 선택하면<br/>매칭된 공급사와 발송 옵션이 표시됩니다.</p>
                  </div>
                </div>
              )}

              {/* 5. Banners & Marketing */}
              {(activeTab === 'banners' || activeTab === 'seo') && (
                <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-12 text-center">
                  <div class="w-20 h-20 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i class="fas fa-paint-brush text-3xl"></i>
                  </div>
                  <h3 class="text-xl font-bold text-slate-800 mb-2">디자인 및 마케팅 설정</h3>
                  <p class="text-slate-500">배너 이미지 교체 및 메타 태그 설정 기능이 곧 활성화됩니다.</p>
                </div>
              )}

              {/* 6. System Settings (DART & Deploy) */}
              {activeTab === 'settings' && (
                <div class="space-y-6">
                  {/* DART */}
                  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex justify-between items-center mb-4">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center font-bold mr-3">D</div>
                        <div>
                          <h4 class="font-bold text-slate-800">DART 전자공시시스템</h4>
                          <p class="text-xs text-slate-500">기업 개요 및 재무정보 자동 동기화</p>
                        </div>
                      </div>
                      <button onclick="testDartConnection()" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-900 transition">연동 테스트</button>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 font-mono">Status: <span id="dart-status" class="text-slate-400">대기 중...</span></div>
                  </div>

                  {/* Deploy */}
                  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex justify-between items-center">
                      <div class="flex items-center">
                        <div class="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold mr-3"><i class="fas fa-rocket"></i></div>
                        <div>
                          <h4 class="font-bold text-slate-800">시스템 배포 관리</h4>
                          <p class="text-xs text-slate-500">최신 코드를 서버에 반영합니다.</p>
                        </div>
                      </div>
                      <button onclick="triggerDeploy()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition">배포 시작</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
        
        {/* Scripts */}
        <script>{`
          // DART Test Logic
          async function testDartConnection() {
            const status = document.getElementById('dart-status');
            status.innerHTML = '<span class="text-blue-600">연결 시도 중...</span>';
            try {
              const res = await fetch('/api/dart/test');
              const data = await res.json();
              if (data.success) {
                status.innerHTML = '<span class="text-green-600 font-bold">✅ 연결 성공!</span> (' + data.company + ')';
              } else {
                status.innerHTML = '<span class="text-red-600 font-bold">❌ 실패: ' + data.message + '</span>';
              }
            } catch (e) {
              status.innerHTML = '<span class="text-red-600">오류 발생</span>';
            }
          }

          // Deploy Logic
          async function triggerDeploy() {
            if(!confirm('최신 버전으로 배포하시겠습니까?')) return;
            try {
              const res = await fetch('/api/admin/deploy', { method: 'POST' });
              alert('배포 요청이 전송되었습니다.');
            } catch(e) { alert('배포 요청 실패'); }
          }
        `}</script>
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

// DART API Endpoint
app.get('/api/dart/test', async (c) => {
  const apiKey = c.env.DART_API_KEY;
  if (!apiKey) return c.json({ success: false, message: 'API 키가 설정되지 않았습니다.' });

  try {
    const testCorpCode = '00126380'; 
    const url = `https://opendart.fss.or.kr/api/company.json?crtfc_key=${apiKey}&corp_code=${testCorpCode}`;
    const response = await fetch(url);
    const data: any = await response.json();

    if (data.status === '000') {
      return c.json({ 
        success: true, 
        company: data.corp_name,
        ceo: data.ceo_nm,
        address: data.adres
      });
    } else {
      return c.json({ success: false, message: data.message || 'DART API 오류' });
    }
  } catch (e: any) {
    return c.json({ success: false, message: e.message });
  }
})

export default app