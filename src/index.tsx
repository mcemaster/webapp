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
        <style>{`
          .fade-in { animation: fadeIn 0.5s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .dropdown-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.15); }
        `}</style>
      </head>
      <body class="bg-slate-50 font-sans antialiased text-slate-800">
        <div class="min-h-screen flex">
          
          {/* Standalone Sidebar */}
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
                    <i class="fas fa-building w-5 text-center mr-2"></i> 기업 데이터 수집
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

              {/* Group 4: System */}
              <div>
                <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Configuration</p>
                <div class="space-y-1">
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
            {/* Header */}
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
                          <div><label class="block text-xs font-bold text-slate-400 mb-1">기업명</label><div id="res-name" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800">-</div></div>
                          <div><label class="block text-xs font-bold text-slate-400 mb-1">대표자</label><div id="res-ceo" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-800">-</div></div>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                          <div><label class="block text-xs font-bold text-slate-400 mb-1">설립일</label><div id="res-est" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">-</div></div>
                          <div><label class="block text-xs font-bold text-slate-400 mb-1">기업규모</label><div id="res-scale" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">-</div></div>
                        </div>
                        <div><label class="block text-xs font-bold text-slate-400 mb-1">본점 주소</label><div id="res-addr" class="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-600">-</div></div>
                      </div>
                    </div>
                    {/* Card 2: Employment */}
                    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 relative overflow-hidden">
                      <div class="absolute top-0 right-0 bg-green-50 px-3 py-1 rounded-bl-xl text-[10px] font-bold text-green-600">고용노동부 (고용보험)</div>
                      <h3 class="text-lg font-bold text-slate-800 mb-6 flex items-center"><i class="fas fa-users text-green-600 mr-2"></i> 고용 및 인력 변동 (최근 1년)</h3>
                      <div class="space-y-6">
                        <div class="grid grid-cols-2 gap-6">
                          <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span class="block text-xs text-slate-400 mb-1">총 근로자 수</span><strong id="res-emp" class="text-2xl font-extrabold text-slate-800">-</strong> <span class="text-xs">명</span></div>
                          <div class="text-center p-4 bg-slate-50 rounded-xl border border-slate-100"><span class="block text-xs text-slate-400 mb-1">청년 (만 34세↓)</span><strong id="res-youth" class="text-2xl font-extrabold text-slate-800">-</strong> <span class="text-xs">명</span></div>
                        </div>
                        <div class="flex justify-between items-center p-4 border border-slate-100 rounded-xl">
                          <div class="text-center flex-1 border-r border-slate-100"><span class="block text-[10px] text-slate-400">최근 1년 입사</span><strong class="text-blue-600 text-lg">0명</strong></div>
                          <div class="text-center flex-1 border-r border-slate-100"><span class="block text-[10px] text-slate-400">최근 1년 퇴사</span><strong class="text-red-500 text-lg">0명</strong></div>
                          <div class="text-center flex-1"><span class="block text-[10px] text-slate-400">퇴사율</span><strong class="text-slate-700 text-lg">0%</strong></div>
                        </div>
                        <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-100 flex items-start"><i class="fas fa-lightbulb text-yellow-500 mt-1 mr-3"></i><div><h4 class="text-xs font-bold text-yellow-800 mb-1">고용 유지율 우수 기업</h4><p class="text-[10px] text-yellow-700">일자리 창출 및 고용 안정 자금 추천 대상입니다.</p></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* === Dashboard Tab === */}
              {activeTab === 'overview' && (
                <div class="space-y-6">
                  {/* Action Center */}
                  <div id="action-center" class="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white mb-8 hidden">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse"><i class="fas fa-bell text-2xl"></i></div>
                        <div><h3 class="text-lg font-bold">확인 필요한 업무가 있습니다!</h3><p class="text-indigo-100 text-sm">신속한 처리가 서비스 품질을 높입니다.</p></div>
                      </div>
                      <div class="flex space-x-3">
                        <span id="btn-pending-partners" class="hidden px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm items-center cursor-pointer">파트너 승인 <span class="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full" id="count-pending-partners">0</span></span>
                        <span id="btn-new-rfqs" class="hidden px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm items-center cursor-pointer">신규 견적 <span class="ml-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full" id="count-new-rfqs">0</span></span>
                      </div>
                    </div>
                  </div>
                  {/* Stats & Charts */}
                  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">총 회원 수</p><h3 id="stat-total-users" class="text-3xl font-extrabold text-slate-800 mt-2">-</h3></div>
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">AI 분석 횟수</p><h3 id="stat-ai-usage" class="text-3xl font-extrabold text-indigo-600 mt-2">-</h3></div>
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">수집된 공고</p><h3 id="stat-crawler-usage" class="text-3xl font-extrabold text-emerald-600 mt-2">-</h3></div>
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">파트너 신청</p><h3 class="text-3xl font-extrabold text-orange-500 mt-2" id="stat-pending">0</h3></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 class="font-bold text-lg text-slate-800 mb-4">주간 성장 지표</h3><div class="h-64 relative"><canvas id="growthChart"></canvas></div></div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 class="font-bold text-lg text-slate-800 mb-4">AI 서비스 활용도</h3><div class="h-64 relative"><canvas id="aiChart"></canvas></div></div>
                  </div>
                </div>
              )}

              {/* Other Tabs (Placeholder) */}
              {activeTab === 'grants' && <div class="bg-white p-6 rounded-2xl border border-slate-100"><h3 class="font-bold mb-4">지원사업 공고 목록</h3><table class="w-full text-sm"><tbody id="grant-list"><tr><td class="text-center p-4">로딩중...</td></tr></tbody></table></div>}
              {activeTab === 'logs' && <div class="bg-white p-6 rounded-2xl border border-slate-100"><h3 class="font-bold mb-4">AI 분석 이력</h3><table class="w-full text-sm"><tbody id="log-list"><tr><td class="text-center p-4">로딩중...</td></tr></tbody></table></div>}
              {activeTab === 'partners' && <div class="bg-white p-6 rounded-2xl border border-slate-100"><h3 class="font-bold mb-4">파트너 승인 관리</h3><div class="text-center text-slate-400 py-10">승인 대기 중인 파트너가 없습니다.</div></div>}
              {activeTab === 'rfq' && <div class="bg-white p-6 rounded-2xl border border-slate-100"><h3 class="font-bold mb-4">공급사 매칭 관리</h3><div class="text-center text-slate-400 py-10">신규 견적 요청이 없습니다.</div></div>}
              {activeTab === 'settings' && (
                <div class="space-y-6">
                  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex justify-between items-center mb-4">
                      <div class="flex items-center"><div class="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center font-bold mr-3">D</div><div><h4 class="font-bold text-slate-800">DART 연동 설정</h4><p class="text-xs text-slate-500">API 키 설정 및 테스트</p></div></div>
                      <button onclick="testDartConnection()" class="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-900 transition">연동 테스트</button>
                    </div>
                    <div class="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 font-mono">Status: <span id="dart-status" class="text-slate-400">대기 중...</span></div>
                  </div>
                  <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div class="flex justify-between items-center">
                      <div class="flex items-center"><div class="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold mr-3"><i class="fas fa-rocket"></i></div><div><h4 class="font-bold text-slate-800">시스템 배포 관리</h4><p class="text-xs text-slate-500">최신 코드를 서버에 반영합니다.</p></div></div>
                      <button onclick="triggerDeploy()" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-indigo-700 transition">배포 시작</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
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
            <img src="/static/logo-horizontal.png" alt="경영인증평가원 Logo" class="h-12 mx-auto mb-4" />
            <h1 class="text-2xl font-bold text-gray-800">로그인</h1>
            <p class="text-gray-600 mt-2">서비스 이용을 위해 로그인해주세요</p>
          </div>

          <div class="mb-6">
            <div class="flex border-b border-gray-200 mb-4">
              <button id="tab-enterprise" class="flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold">기업 회원</button>
              <button id="tab-institution" class="flex-1 py-2 text-gray-500">기관/심사원</button>
            </div>
            
            <form action="/auth/login" method="post" class="space-y-4">
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
                <input type="email" name="email" id="email" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors" placeholder="example@company.com" required />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
                <input type="password" name="password" id="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" required />
              </div>
              
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <span class="text-gray-600">로그인 유지</span>
                </label>
                <a href="#" class="text-blue-600 hover:underline">비밀번호 찾기</a>
              </div>
              <button type="submit" id="login-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200 shadow-md transform active:scale-95">
                로그인
              </button>
            </form>
            
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">간편 로그인</span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3">
                <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-[#FEE500] hover:bg-[#FDD835]">
                  <i class="fas fa-comment text-brown-600"></i>
                </a>
                <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-white bg-[#03C75A] hover:bg-[#02B150]">
                  <span class="font-bold">N</span>
                </a>
                <a href="#" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <i class="fab fa-google text-red-500"></i>
                </a>
              </div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="text-center mb-4">
                <span class="text-gray-600 text-sm">아직 회원이 아니신가요?</span>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <a href="/register?type=buyer" class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 group-hover:bg-blue-600 group-hover:text-white transition">
                    <i class="fas fa-user"></i>
                  </div>
                  <span class="text-sm font-bold text-gray-800">일반 회원가입</span>
                  <span class="text-xs text-gray-500 mt-1">공급사 찾기 / 기업 검색</span>
                </a>
                <a href="/register?type=partner" class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 group-hover:bg-green-600 group-hover:text-white transition">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <span class="text-sm font-bold text-gray-800">파트너사 가입</span>
                  <span class="text-xs text-gray-500 mt-1">공급사 / 인증 기업</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </body>
    </html>
  )
})

app.get('/register', (c) => c.render(<Register />))

app.post('/auth/login', async (c) => {
  const body = await c.req.parseBody()
  const email = body['email'] as string
  const password = body['password'] as string
  
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

// Autocomplete API (Mock for now, replacing DART Search due to complexity)
app.get('/api/search/company', (c) => {
  const q = c.req.query('q') || '';
  if (q.length < 1) return c.json([]);

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

export default app