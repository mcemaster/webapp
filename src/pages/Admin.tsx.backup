import { html } from 'hono/html'

export const Admin = (props: { user: any, tab?: string }) => {
  const activeTab = props.tab || 'overview';
  const userName = props.user?.name || '관리자';
  
  // Menu item helper
  const menuClass = (tab: string) => activeTab === tab 
    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
    : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent';

  return html`
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 대시보드 - MCE 경영인증평가원</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css" rel="stylesheet">
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(10px); } 
            to { opacity: 1; transform: translateY(0); } 
          }
          .fade-in { animation: fadeIn 0.4s ease-out; }
          .sidebar-scroll::-webkit-scrollbar { width: 4px; }
          .sidebar-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        </style>
      </head>
      <body class="bg-slate-100 font-sans antialiased">
        <div class="min-h-screen flex">
          
          <!-- Sidebar -->
          <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-30 hidden lg:flex flex-col shadow-sm">
            <!-- Logo -->
            <div class="h-16 flex items-center justify-center border-b border-slate-100 bg-slate-50">
              <a href="/" class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-sm">M</span>
                </div>
                <span class="font-bold text-slate-800">MCE Admin</span>
              </a>
            </div>
            
            <!-- Navigation -->
            <nav class="flex-1 p-4 space-y-1 sidebar-scroll overflow-y-auto">
              <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">대시보드</p>
              <a href="/admin?tab=overview" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('overview')}">
                <i class="fas fa-chart-pie w-5 mr-3 text-center"></i> 통합 현황
              </a>
              
              <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">데이터 관리</p>
              <a href="/admin?tab=collector" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('collector')}">
                <i class="fas fa-download w-5 mr-3 text-center"></i> 기업 데이터 수집
              </a>
              <a href="/admin?tab=companies" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('companies')}">
                <i class="fas fa-building w-5 mr-3 text-center"></i> 기업 DB
              </a>
              <a href="/admin?tab=grants" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('grants')}">
                <i class="fas fa-bullhorn w-5 mr-3 text-center"></i> 지원사업 공고
              </a>
              <a href="/admin?tab=logs" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('logs')}">
                <i class="fas fa-robot w-5 mr-3 text-center"></i> AI 분석 이력
              </a>
              
              <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">운영 관리</p>
              <a href="/admin?tab=partners" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('partners')}">
                <i class="fas fa-handshake w-5 mr-3 text-center"></i> 파트너 승인
              </a>
              <a href="/admin?tab=users" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('users')}">
                <i class="fas fa-users w-5 mr-3 text-center"></i> 회원 관리
              </a>
              
              <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">설정</p>
              <a href="/admin?tab=settings" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('settings')}">
                <i class="fas fa-cog w-5 mr-3 text-center"></i> 시스템 설정
              </a>
            </nav>
            
            <!-- User & Logout -->
            <div class="p-4 border-t border-slate-100 bg-slate-50">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-blue-600 text-sm"></i>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-semibold text-slate-700">${userName}</p>
                    <p class="text-xs text-slate-500">관리자</p>
                  </div>
                </div>
                <a href="/auth/logout" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="로그아웃">
                  <i class="fas fa-sign-out-alt"></i>
                </a>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <main class="flex-1 lg:ml-64">
            <!-- Top Header -->
            <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-20">
              <div class="flex items-center">
                <!-- Mobile menu button -->
                <button id="mobile-menu-btn" class="lg:hidden p-2 mr-3 text-slate-500 hover:bg-slate-100 rounded-lg">
                  <i class="fas fa-bars"></i>
                </button>
                <div>
                  <h1 class="text-lg font-bold text-slate-800">
                    ${activeTab === 'overview' ? '통합 대시보드' :
                      activeTab === 'companies' ? '기업 DB 관리' :
                      activeTab === 'grants' ? '지원사업 공고 관리' :
                      activeTab === 'logs' ? 'AI 분석 이력' :
                      activeTab === 'partners' ? '파트너 승인 관리' :
                      activeTab === 'users' ? '회원 관리' :
                      '시스템 설정'}
                  </h1>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <a href="/" class="text-sm text-slate-500 hover:text-blue-600 flex items-center">
                  <i class="fas fa-external-link-alt mr-1.5"></i> 사이트 보기
                </a>
                <button onclick="location.reload()" class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                  <i class="fas fa-sync-alt"></i>
                </button>
              </div>
            </header>
            
            <!-- Page Content -->
            <div class="p-6 fade-in">
              
              ${activeTab === 'overview' ? html`
                <!-- Overview Dashboard -->
                <div class="space-y-6">
                  <!-- Stats Grid -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">총 회원</p>
                          <p class="text-2xl font-bold text-slate-800 mt-1" id="stat-users">-</p>
                        </div>
                        <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-users text-blue-500 text-lg"></i>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">AI 분석</p>
                          <p class="text-2xl font-bold text-indigo-600 mt-1" id="stat-ai">-</p>
                        </div>
                        <div class="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-robot text-indigo-500 text-lg"></i>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">등록 공고</p>
                          <p class="text-2xl font-bold text-emerald-600 mt-1" id="stat-grants">-</p>
                        </div>
                        <div class="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-bullhorn text-emerald-500 text-lg"></i>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase tracking-wide">승인 대기</p>
                          <p class="text-2xl font-bold text-orange-500 mt-1" id="stat-pending">-</p>
                        </div>
                        <div class="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-clock text-orange-500 text-lg"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- 전체 서비스 사용량 대시보드 -->
                  <div class="space-y-4">
                    <!-- 총 비용 요약 -->
                    <div class="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-6 text-white">
                      <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-bold flex items-center">
                          <i class="fas fa-wallet mr-2"></i>
                          전체 서비스 사용량 & 비용
                        </h3>
                        <button onclick="refreshAllUsage()" class="px-3 py-1 bg-white/20 rounded-lg text-sm hover:bg-white/30 transition">
                          <i class="fas fa-sync-alt mr-1"></i> 새로고침
                        </button>
                      </div>
                      
                      <!-- 총 비용 카드 -->
                      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div class="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl p-4">
                          <p class="text-emerald-100 text-sm">이번달 총 비용</p>
                          <p class="text-3xl font-bold mt-1" id="total-month-cost">$0.00</p>
                          <p class="text-emerald-200 text-xs mt-1">예상 월말: <span id="total-estimated">$0.00</span></p>
                        </div>
                        <div class="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4">
                          <p class="text-blue-100 text-sm">누적 총 비용</p>
                          <p class="text-3xl font-bold mt-1" id="total-all-cost">$0.00</p>
                          <p class="text-blue-200 text-xs mt-1">서비스 시작일부터</p>
                        </div>
                        <div class="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4">
                          <p class="text-amber-100 text-sm">오늘 API 호출</p>
                          <p class="text-3xl font-bold mt-1" id="total-today-calls">0</p>
                          <p class="text-amber-200 text-xs mt-1">전체 서비스 합계</p>
                        </div>
                        <div class="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4">
                          <p class="text-purple-100 text-sm">이번달 API 호출</p>
                          <p class="text-3xl font-bold mt-1" id="total-month-calls">0</p>
                          <p class="text-purple-200 text-xs mt-1">전체 서비스 합계</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Cloudflare 사용량 -->
                    <div class="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-lg p-6 text-white">
                      <div class="flex items-center mb-4">
                        <img src="https://www.cloudflare.com/favicon.ico" class="w-6 h-6 mr-2" alt="CF" onerror="this.style.display='none'">
                        <h3 class="text-lg font-bold">Cloudflare 사용량</h3>
                        <span class="ml-auto px-2 py-1 bg-white/20 rounded text-xs">Pages + D1 + Workers</span>
                      </div>
                      
                      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
                        <!-- Pages 요청 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-orange-100 text-sm">Pages 요청</span>
                            <i class="fas fa-globe text-orange-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="cf-pages-requests">-</p>
                          <p class="text-xs text-orange-200">이번달 / 무제한</p>
                          <p class="text-sm text-green-300 mt-1">무료</p>
                        </div>
                        
                        <!-- D1 읽기 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-orange-100 text-sm">D1 읽기</span>
                            <i class="fas fa-database text-orange-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="cf-d1-reads">-</p>
                          <p class="text-xs text-orange-200">/ 5M (무료)</p>
                          <div class="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div id="cf-d1-reads-bar" class="h-full bg-green-400 rounded-full" style="width: 0%"></div>
                          </div>
                        </div>
                        
                        <!-- D1 쓰기 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-orange-100 text-sm">D1 쓰기</span>
                            <i class="fas fa-pen text-orange-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="cf-d1-writes">-</p>
                          <p class="text-xs text-orange-200">/ 100K (무료)</p>
                          <div class="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div id="cf-d1-writes-bar" class="h-full bg-green-400 rounded-full" style="width: 0%"></div>
                          </div>
                        </div>
                        
                        <!-- D1 저장용량 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-orange-100 text-sm">D1 저장용량</span>
                            <i class="fas fa-hdd text-orange-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="cf-d1-storage">-</p>
                          <p class="text-xs text-orange-200">/ 5GB (무료)</p>
                          <div class="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div id="cf-d1-storage-bar" class="h-full bg-green-400 rounded-full" style="width: 0%"></div>
                          </div>
                        </div>
                        
                        <!-- Workers 요청 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-orange-100 text-sm">Workers 요청</span>
                            <i class="fas fa-bolt text-orange-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="cf-workers-requests">-</p>
                          <p class="text-xs text-orange-200">/ 100K/일 (무료)</p>
                          <div class="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div id="cf-workers-bar" class="h-full bg-green-400 rounded-full" style="width: 0%"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div class="mt-4 p-3 bg-white/10 rounded-lg text-sm">
                        <span class="text-orange-100">💡 Cloudflare 예상 비용:</span>
                        <span class="font-bold ml-2" id="cf-estimated-cost">$0.00</span>
                        <span class="text-orange-200 text-xs ml-2">(무료 티어 초과시에만 과금)</span>
                      </div>
                    </div>
                    
                    <!-- OpenAI 사용량 -->
                    <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                      <div class="flex items-center mb-4">
                        <i class="fas fa-brain text-2xl mr-2"></i>
                        <h3 class="text-lg font-bold">OpenAI 사용량</h3>
                        <span class="ml-auto px-2 py-1 bg-white/20 rounded text-xs">GPT-4o-mini</span>
                      </div>
                      
                      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-emerald-100 text-sm">오늘 토큰</span>
                            <i class="fas fa-calendar-day text-emerald-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="openai-today-tokens">0</p>
                          <p class="text-lg font-semibold text-green-300 mt-1" id="openai-today-cost">$0.00</p>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-emerald-100 text-sm">이번달 토큰</span>
                            <i class="fas fa-calendar text-emerald-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="openai-month-tokens">0</p>
                          <p class="text-lg font-semibold text-blue-300 mt-1" id="openai-month-cost">$0.00</p>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-emerald-100 text-sm">누적 토큰</span>
                            <i class="fas fa-coins text-emerald-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="openai-total-tokens">0</p>
                          <p class="text-lg font-semibold text-amber-300 mt-1" id="openai-total-cost">$0.00</p>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-emerald-100 text-sm">API 호출</span>
                            <i class="fas fa-plug text-emerald-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="openai-total-calls">0</p>
                          <p class="text-sm text-emerald-200">총 호출 횟수</p>
                        </div>
                      </div>
                      
                      <div class="mt-4 p-3 bg-white/10 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        <div><span class="text-emerald-200">Input:</span> <span class="font-mono">$0.15/1M</span></div>
                        <div><span class="text-emerald-200">Output:</span> <span class="font-mono">$0.60/1M</span></div>
                        <div><span class="text-emerald-200">평균 호출당:</span> <span class="font-mono" id="openai-avg-cost">$0.00</span></div>
                        <div><span class="text-emerald-200">예상 월비용:</span> <span class="font-mono" id="estimated-monthly">$0.00</span></div>
                      </div>
                    </div>
                    
                    <!-- DART API 사용량 -->
                    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                      <div class="flex items-center mb-4">
                        <i class="fas fa-landmark text-2xl mr-2"></i>
                        <h3 class="text-lg font-bold">DART API 사용량</h3>
                        <span class="ml-auto px-2 py-1 bg-white/20 rounded text-xs">금융감독원 공시</span>
                        <span class="ml-2 px-2 py-1 bg-green-400/30 rounded text-xs text-green-200">무료</span>
                      </div>
                      
                      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-blue-100 text-sm">오늘 호출</span>
                            <i class="fas fa-clock text-blue-200"></i>
                          </div>
                          <p class="text-2xl font-bold"><span id="dart-today-calls">0</span></p>
                          <p class="text-xs text-blue-200">/ 10,000 (일일 제한)</p>
                          <div class="mt-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                            <div id="dart-today-bar" class="h-full bg-cyan-400 rounded-full" style="width: 0%"></div>
                          </div>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-blue-100 text-sm">이번달 호출</span>
                            <i class="fas fa-calendar text-blue-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="dart-month-calls">0</p>
                          <p class="text-xs text-blue-200">월간 누적</p>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-blue-100 text-sm">수집 기업수</span>
                            <i class="fas fa-building text-blue-200"></i>
                          </div>
                          <p class="text-2xl font-bold" id="dart-companies">-</p>
                          <p class="text-xs text-blue-200">DART 출처</p>
                        </div>
                        
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-blue-100 text-sm">마지막 수집</span>
                            <i class="fas fa-sync text-blue-200"></i>
                          </div>
                          <p class="text-lg font-bold" id="dart-last-sync">-</p>
                          <p class="text-xs text-blue-200">최근 업데이트</p>
                        </div>
                      </div>
                    </div>
                    
                    <!-- 기타 API 사용량 -->
                    <div class="bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl shadow-lg p-6 text-white">
                      <div class="flex items-center mb-4">
                        <i class="fas fa-plug text-2xl mr-2"></i>
                        <h3 class="text-lg font-bold">기타 API / 서비스</h3>
                      </div>
                      
                      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- 공공데이터포털 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-slate-200 text-sm">공공데이터포털</span>
                            <i class="fas fa-database text-slate-300"></i>
                          </div>
                          <p class="text-lg font-bold" id="public-data-calls">대기중</p>
                          <p class="text-xs text-slate-300">승인 후 사용 가능</p>
                          <span class="inline-block mt-2 px-2 py-0.5 bg-yellow-500/30 rounded text-xs text-yellow-200">승인 대기</span>
                        </div>
                        
                        <!-- 네이버 금융 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-slate-200 text-sm">네이버 금융</span>
                            <i class="fas fa-chart-line text-green-300"></i>
                          </div>
                          <p class="text-lg font-bold" id="naver-crawl-count">-</p>
                          <p class="text-xs text-slate-300">크롤링 기업 수</p>
                          <span class="inline-block mt-2 px-2 py-0.5 bg-green-500/30 rounded text-xs text-green-200">무료</span>
                        </div>
                        
                        <!-- GitHub -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-slate-200 text-sm">GitHub</span>
                            <i class="fab fa-github text-slate-300"></i>
                          </div>
                          <p class="text-lg font-bold" id="github-deploys">-</p>
                          <p class="text-xs text-slate-300">이번달 배포 횟수</p>
                          <span class="inline-block mt-2 px-2 py-0.5 bg-green-500/30 rounded text-xs text-green-200">무료</span>
                        </div>
                        
                        <!-- 도메인 -->
                        <div class="bg-white/10 backdrop-blur rounded-xl p-4">
                          <div class="flex items-center justify-between mb-2">
                            <span class="text-slate-200 text-sm">커스텀 도메인</span>
                            <i class="fas fa-globe text-slate-300"></i>
                          </div>
                          <p class="text-lg font-bold">mce.ai.kr</p>
                          <p class="text-xs text-slate-300">연간 도메인 비용</p>
                          <span class="inline-block mt-2 px-2 py-0.5 bg-blue-500/30 rounded text-xs text-blue-200">~₩20,000/년</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Charts -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                      <h3 class="font-semibold text-slate-800 mb-4">주간 활동 현황</h3>
                      <div class="h-64"><canvas id="weeklyChart"></canvas></div>
                    </div>
                    <div class="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                      <h3 class="font-semibold text-slate-800 mb-4">서비스별 이용 현황</h3>
                      <div class="h-64"><canvas id="serviceChart"></canvas></div>
                    </div>
                  </div>
                  
                  <!-- Recent Activity -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100">
                      <h3 class="font-semibold text-slate-800">최근 활동</h3>
                    </div>
                    <div class="divide-y divide-slate-100" id="recent-activity">
                      <div class="p-4 text-center text-slate-400 text-sm">데이터를 불러오는 중...</div>
                    </div>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'collector' ? html`
                <!-- Data Collector Dashboard -->
                <div class="space-y-6">
                  <!-- Header -->
                  <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg p-6 text-white">
                    <h2 class="text-2xl font-bold flex items-center">
                      <i class="fas fa-database mr-3"></i>
                      전국 기업 데이터 수집 시스템
                    </h2>
                    <p class="text-emerald-100 mt-2">DART, 공공데이터포털, 채용사이트에서 실시간으로 기업 정보를 수집합니다</p>
                  </div>
                  
                  <!-- Collection Status -->
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase">총 수집 기업</p>
                          <p class="text-3xl font-bold text-slate-800 mt-1" id="collector-total">-</p>
                        </div>
                        <div class="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-building text-emerald-500 text-xl"></i>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase">DART 기업코드</p>
                          <p class="text-3xl font-bold text-blue-600 mt-1" id="collector-dart">-</p>
                        </div>
                        <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-file-alt text-blue-500 text-xl"></i>
                        </div>
                      </div>
                      <p class="text-xs text-slate-400 mt-2" id="collector-dart-progress">-</p>
                    </div>
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase">상장사</p>
                          <p class="text-3xl font-bold text-indigo-600 mt-1" id="collector-listed">-</p>
                        </div>
                        <div class="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-chart-line text-indigo-500 text-xl"></i>
                        </div>
                      </div>
                    </div>
                    <div class="bg-white rounded-xl p-5 shadow-sm border border-slate-100">
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="text-xs font-medium text-slate-500 uppercase">채용사이트</p>
                          <p class="text-3xl font-bold text-purple-600 mt-1" id="collector-jobs">-</p>
                        </div>
                        <div class="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
                          <i class="fas fa-briefcase text-purple-500 text-xl"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Data Sources -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- DART Section -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                      <div class="p-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                        <h3 class="font-bold text-lg flex items-center">
                          <i class="fas fa-landmark mr-2"></i>
                          DART (금융감독원 전자공시)
                        </h3>
                        <p class="text-blue-100 text-sm mt-1">상장법인 및 등록법인 약 9만개 기업</p>
                      </div>
                      <div class="p-5 space-y-4">
                        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span class="text-sm text-slate-600">1단계: 전체 기업코드 다운로드</span>
                          <button onclick="downloadDartCorps()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-download mr-1"></i> 다운로드
                          </button>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span class="text-sm text-slate-600">2단계: 상세정보 수집 (배치)</span>
                          <button onclick="collectDartDetails()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                            <i class="fas fa-sync-alt mr-1"></i> 수집 시작
                          </button>
                        </div>
                        <div id="dart-status" class="p-3 bg-blue-50 rounded-lg text-sm text-blue-700 hidden">
                          <i class="fas fa-spinner fa-spin mr-2"></i>
                          <span id="dart-status-text">처리 중...</span>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Public Data Section -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                      <div class="p-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                        <h3 class="font-bold text-lg flex items-center">
                          <i class="fas fa-database mr-2"></i>
                          공공데이터포털
                        </h3>
                        <p class="text-green-100 text-sm mt-1">전국 사업자등록 정보 800만+ 건</p>
                      </div>
                      <div class="p-5 space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-2">공공데이터포털 API Key</label>
                          <input type="password" id="public-data-key" placeholder="API Key 입력" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm">
                          <a href="https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15081808" target="_blank" class="text-xs text-green-600 hover:underline mt-1 inline-block">
                            <i class="fas fa-external-link-alt mr-1"></i> API Key 발급받기
                          </a>
                        </div>
                        <button onclick="collectPublicData()" class="w-full px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition">
                          <i class="fas fa-cloud-download-alt mr-2"></i> 사업자정보 수집
                        </button>
                      </div>
                    </div>
                    
                    <!-- Job Sites Section -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                      <div class="p-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        <h3 class="font-bold text-lg flex items-center">
                          <i class="fas fa-briefcase mr-2"></i>
                          채용사이트 크롤링
                        </h3>
                        <p class="text-purple-100 text-sm mt-1">사람인, 잡코리아, 인크루트 기업정보</p>
                      </div>
                      <div class="p-5 space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-2">검색 키워드 (선택)</label>
                          <input type="text" id="crawl-keyword" placeholder="예: IT, 제조, 반도체" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm">
                        </div>
                        <div class="grid grid-cols-3 gap-2">
                          <button onclick="crawlSaramin()" class="px-3 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition">
                            <i class="fas fa-spider mr-1"></i> 사람인
                          </button>
                          <button onclick="crawlJobkorea()" class="px-3 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition">
                            <i class="fas fa-spider mr-1"></i> 잡코리아
                          </button>
                          <button onclick="crawlIncruit()" class="px-3 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">
                            <i class="fas fa-spider mr-1"></i> 인크루트
                          </button>
                        </div>
                        <div id="crawl-status" class="p-3 bg-purple-50 rounded-lg text-sm text-purple-700 hidden"></div>
                      </div>
                    </div>
                    
                    <!-- Auto Collection -->
                    <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                      <div class="p-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                        <h3 class="font-bold text-lg flex items-center">
                          <i class="fas fa-robot mr-2"></i>
                          자동 수집 스케줄러
                        </h3>
                        <p class="text-orange-100 text-sm mt-1">정기적으로 자동 업데이트</p>
                      </div>
                      <div class="p-5 space-y-4">
                        <div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p class="font-medium text-slate-700">DART 상장사 자동 수집</p>
                            <p class="text-xs text-slate-500">매일 50개씩 상세정보 수집</p>
                          </div>
                          <button onclick="startBatchCollect('dart')" class="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition">
                            <i class="fas fa-play mr-1"></i> 실행
                          </button>
                        </div>
                        <div id="batch-status" class="p-3 bg-orange-50 rounded-lg text-sm text-orange-700 hidden"></div>
                        <div class="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p class="text-xs text-amber-700">
                            <i class="fas fa-info-circle mr-1"></i>
                            <strong>참고:</strong> Cloudflare Workers는 10분 이상 실행이 제한됩니다. 대량 수집은 여러 번 나눠서 실행하세요.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Collection Log -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <h3 class="font-semibold text-slate-800">
                        <i class="fas fa-history text-slate-400 mr-2"></i>
                        수집 로그
                      </h3>
                      <button onclick="refreshCollectorStatus()" class="text-sm text-blue-600 hover:text-blue-700">
                        <i class="fas fa-sync-alt mr-1"></i> 새로고침
                      </button>
                    </div>
                    <div id="collector-log" class="p-5 max-h-64 overflow-y-auto font-mono text-xs bg-slate-900 text-green-400">
                      <div>[시스템] 데이터 수집 시스템 준비 완료</div>
                    </div>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'companies' ? html`
                <!-- Companies Table -->
                <div class="space-y-4">
                  <!-- Quick Actions Section -->
                  <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-sm p-5 text-white">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 class="font-bold text-lg flex items-center">
                          <i class="fas fa-magic mr-2"></i>
                          기업 DB 빠른 설정
                        </h3>
                        <p class="text-indigo-100 text-sm mt-1">30개의 기본 기업 데이터로 시작하거나 AI로 더 많은 기업을 생성하세요</p>
                      </div>
                      <div class="flex flex-wrap items-center gap-2">
                        <button onclick="seedCompanies()" class="px-4 py-2 bg-white text-indigo-600 text-sm font-bold rounded-lg hover:bg-indigo-50 transition flex items-center shadow">
                          <i class="fas fa-seedling mr-2"></i> 기본 데이터 추가 (30개)
                        </button>
                        <button onclick="generateCompaniesWithAI()" class="px-4 py-2 bg-indigo-700 text-white text-sm font-bold rounded-lg hover:bg-indigo-800 transition flex items-center border border-indigo-400">
                          <i class="fas fa-robot mr-2"></i> AI로 기업 생성
                        </button>
                        <button onclick="clearAllCompanies()" class="px-3 py-2 bg-red-500/20 text-white text-sm font-medium rounded-lg hover:bg-red-500/40 transition border border-red-400/50">
                          <i class="fas fa-trash-alt mr-1"></i> 전체 삭제
                        </button>
                      </div>
                    </div>
                    <!-- Action Status -->
                    <div id="quick-action-status" class="hidden mt-4 p-3 bg-white/10 rounded-lg backdrop-blur">
                      <div id="quick-action-message" class="text-sm"></div>
                    </div>
                  </div>
                  
                  <!-- Company Detail Modal -->
                  <div id="company-detail-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center overflow-y-auto py-8">
                    <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                      <div class="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-xl">
                        <div class="flex items-center justify-between">
                          <div>
                            <h3 id="modal-company-name" class="font-bold text-xl">기업명</h3>
                            <p id="modal-company-code" class="text-blue-200 text-sm mt-1">종목코드: -</p>
                          </div>
                          <button onclick="closeCompanyModal()" class="p-2 hover:bg-white/20 rounded-lg transition">
                            <i class="fas fa-times text-xl"></i>
                          </button>
                        </div>
                      </div>
                      
                      <div class="p-6 space-y-6">
                        <!-- 기본 정보 -->
                        <div class="bg-slate-50 rounded-xl p-5">
                          <h4 class="font-semibold text-slate-800 mb-4 flex items-center">
                            <i class="fas fa-building text-blue-600 mr-2"></i> 기본 정보
                          </h4>
                          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div><span class="text-slate-500">대표이사</span><p id="modal-ceo" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">설립일</span><p id="modal-founding" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">업종</span><p id="modal-industry" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">주소</span><p id="modal-address" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">전화번호</span><p id="modal-phone" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">홈페이지</span><p id="modal-website" class="font-medium text-slate-800 mt-1">-</p></div>
                          </div>
                        </div>
                        
                        <!-- 재무 정보 -->
                        <div class="bg-emerald-50 rounded-xl p-5">
                          <h4 class="font-semibold text-slate-800 mb-4 flex items-center">
                            <i class="fas fa-chart-line text-emerald-600 mr-2"></i> 재무 정보
                          </h4>
                          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div><span class="text-slate-500">매출액</span><p id="modal-revenue" class="font-medium text-emerald-700 mt-1 text-lg">-</p></div>
                            <div><span class="text-slate-500">영업이익</span><p id="modal-operating" class="font-medium text-emerald-700 mt-1 text-lg">-</p></div>
                            <div><span class="text-slate-500">당기순이익</span><p id="modal-net-income" class="font-medium text-emerald-700 mt-1 text-lg">-</p></div>
                            <div><span class="text-slate-500">자산총계</span><p id="modal-assets" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">부채총계</span><p id="modal-liabilities" class="font-medium text-slate-800 mt-1">-</p></div>
                            <div><span class="text-slate-500">자본총계</span><p id="modal-equity" class="font-medium text-slate-800 mt-1">-</p></div>
                          </div>
                        </div>
                        
                        <!-- 직원 정보 -->
                        <div class="bg-purple-50 rounded-xl p-5">
                          <h4 class="font-semibold text-slate-800 mb-4 flex items-center">
                            <i class="fas fa-users text-purple-600 mr-2"></i> 직원 정보
                          </h4>
                          <div class="grid grid-cols-2 gap-4 text-sm">
                            <div><span class="text-slate-500">직원수</span><p id="modal-employees" class="font-medium text-purple-700 mt-1 text-lg">-</p></div>
                            <div><span class="text-slate-500">평균급여</span><p id="modal-avg-salary" class="font-medium text-purple-700 mt-1 text-lg">-</p></div>
                          </div>
                        </div>
                        
                        <!-- 임원 정보 -->
                        <div class="bg-amber-50 rounded-xl p-5">
                          <h4 class="font-semibold text-slate-800 mb-4 flex items-center">
                            <i class="fas fa-user-tie text-amber-600 mr-2"></i> 임원 정보
                          </h4>
                          <div id="modal-executives" class="space-y-2 text-sm">
                            <p class="text-slate-400">임원 정보 없음</p>
                          </div>
                        </div>
                        
                        <!-- 주주 정보 -->
                        <div class="bg-cyan-50 rounded-xl p-5">
                          <h4 class="font-semibold text-slate-800 mb-4 flex items-center">
                            <i class="fas fa-hand-holding-usd text-cyan-600 mr-2"></i> 주요 주주
                          </h4>
                          <div id="modal-shareholders" class="space-y-2 text-sm">
                            <p class="text-slate-400">주주 정보 없음</p>
                          </div>
                        </div>
                        
                        <!-- AI 매칭 버튼 -->
                        <div class="flex justify-center pt-4">
                          <button onclick="runAIMatching()" id="ai-match-btn" class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg flex items-center">
                            <i class="fas fa-robot mr-2"></i> AI 지원사업 매칭 실행
                          </button>
                        </div>
                        
                        <!-- AI 매칭 결과 -->
                        <div id="ai-match-result" class="hidden bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-200">
                          <h4 class="font-semibold text-indigo-800 mb-4 flex items-center">
                            <i class="fas fa-magic text-indigo-600 mr-2"></i> AI 추천 지원사업
                          </h4>
                          <div id="ai-match-content" class="space-y-3">
                            <!-- AI 결과가 여기에 표시됨 -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- AI Generation Modal -->
                  <div id="ai-gen-modal" class="hidden fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                    <div class="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6">
                      <h3 class="font-bold text-lg text-slate-800 mb-4 flex items-center">
                        <i class="fas fa-robot text-indigo-600 mr-2"></i>
                        AI 기업 데이터 생성
                      </h3>
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">업종 분야</label>
                          <select id="ai-industry" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="제조업">제조업 (금속/기계/전자)</option>
                            <option value="IT/소프트웨어">IT/소프트웨어</option>
                            <option value="바이오/헬스케어">바이오/헬스케어</option>
                            <option value="물류/유통">물류/유통</option>
                            <option value="건설/엔지니어링">건설/엔지니어링</option>
                            <option value="식품/농업">식품/농업</option>
                          </select>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">지역</label>
                          <select id="ai-region" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="전국">전국</option>
                            <option value="서울/경기">서울/경기</option>
                            <option value="인천/경기 서부">인천/경기 서부</option>
                            <option value="부산/경남">부산/경남</option>
                            <option value="대구/경북">대구/경북</option>
                            <option value="대전/충청">대전/충청</option>
                          </select>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">생성 개수</label>
                          <select id="ai-count" class="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            <option value="5">5개</option>
                            <option value="10" selected>10개</option>
                            <option value="20">20개</option>
                          </select>
                        </div>
                        <div id="ai-gen-status" class="hidden p-3 bg-indigo-50 rounded-lg text-sm text-indigo-800"></div>
                      </div>
                      <div class="flex justify-end space-x-2 mt-6">
                        <button onclick="closeAIModal()" class="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition">취소</button>
                        <button onclick="executeAIGeneration()" id="ai-gen-btn" class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition">
                          <i class="fas fa-sparkles mr-1"></i> 생성하기
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- DART API Import Section -->
                  <div class="bg-white rounded-xl shadow-sm border border-blue-100 p-5">
                    <div class="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <h3 class="font-semibold text-slate-800 flex items-center">
                          <i class="fas fa-database text-blue-600 mr-2"></i>
                          DART 기업 수집
                        </h3>
                        <p class="text-xs text-slate-500 mt-1">금융감독원 DART에서 기업 정보를 자동으로 가져옵니다</p>
                      </div>
                      <div class="flex flex-col space-y-2">
                        <div class="flex items-center space-x-2">
                          <input type="text" id="dart-corp-codes" placeholder="기업코드 (쉼표로 구분)" class="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
                          <button onclick="fetchFromDart()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition flex items-center">
                            <i class="fas fa-cloud-download-alt mr-2"></i> DART 수집
                          </button>
                        </div>
                        <div class="flex items-center space-x-2">
                          <button onclick="showSampleCodes()" class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded hover:bg-slate-200 transition">
                            <i class="fas fa-lightbulb mr-1"></i> 샘플 코드 보기
                          </button>
                          <a href="https://dart.fss.or.kr" target="_blank" class="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded hover:bg-slate-200 transition flex items-center">
                            <i class="fas fa-external-link-alt mr-1"></i> DART 사이트
                          </a>
                        </div>
                      </div>
                    </div>
                    <!-- DART Status -->
                    <div id="dart-fetch-status" class="hidden mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <div id="dart-fetch-message" class="text-sm text-blue-800"></div>
                    </div>
                    <!-- Sample Codes -->
                    <div id="sample-codes" class="hidden mt-4 p-4 bg-slate-50 rounded-lg">
                      <p class="text-xs font-medium text-slate-700 mb-2">주요 기업 코드 예시:</p>
                      <div class="flex flex-wrap gap-2" id="sample-codes-list">
                        <!-- JS will populate -->
                      </div>
                    </div>
                  </div>
                  
                  <!-- Excel Upload Section -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-5">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <h3 class="font-semibold text-slate-800 flex items-center">
                          <i class="fas fa-file-excel text-green-600 mr-2"></i>
                          엑셀 업로드
                        </h3>
                        <p class="text-xs text-slate-500 mt-1">기업명, 사업자번호, 대표자, 업종코드, 설립일, 직원수, 매출액, 인증현황 컬럼 필요</p>
                      </div>
                      <div class="flex items-center space-x-2">
                        <input type="file" id="excel-file" accept=".xlsx,.xls,.csv" class="hidden" onchange="handleExcelUpload(event)" />
                        <button onclick="document.getElementById('excel-file').click()" class="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition flex items-center">
                          <i class="fas fa-upload mr-2"></i> 엑셀 파일 선택
                        </button>
                        <button onclick="downloadTemplate()" class="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition flex items-center">
                          <i class="fas fa-download mr-2"></i> 템플릿 다운로드
                        </button>
                      </div>
                    </div>
                    <!-- Upload Status -->
                    <div id="upload-status" class="hidden mt-4 p-4 rounded-lg">
                      <div id="upload-message" class="text-sm"></div>
                      <div id="upload-progress" class="hidden mt-2">
                        <div class="w-full bg-slate-200 rounded-full h-2">
                          <div id="progress-bar" class="bg-blue-600 h-2 rounded-full transition-all" style="width: 0%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Data Table -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div class="flex items-center space-x-3">
                        <h3 class="font-semibold text-slate-800">기업 데이터베이스</h3>
                        <span id="company-count" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">0건</span>
                      </div>
                      <div class="flex items-center space-x-2">
                        <input type="text" id="company-search" placeholder="기업명 검색..." class="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" onkeyup="if(event.key==='Enter')searchCompanies()" />
                        <button onclick="searchCompanies()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">검색</button>
                      </div>
                    </div>
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm">
                        <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                          <tr>
                            <th class="px-5 py-3 text-left font-semibold">기업명</th>
                            <th class="px-5 py-3 text-left font-semibold">사업자번호</th>
                            <th class="px-5 py-3 text-left font-semibold">대표자</th>
                            <th class="px-5 py-3 text-left font-semibold">업종</th>
                            <th class="px-5 py-3 text-left font-semibold">직원수</th>
                            <th class="px-5 py-3 text-left font-semibold">매출액</th>
                            <th class="px-5 py-3 text-left font-semibold">인증</th>
                            <th class="px-5 py-3 text-left font-semibold">등록일</th>
                            <th class="px-5 py-3 text-center font-semibold">액션</th>
                          </tr>
                        </thead>
                        <tbody id="company-table" class="divide-y divide-slate-100">
                          <tr><td colspan="9" class="px-5 py-8 text-center text-slate-400">데이터를 불러오는 중...</td></tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- Pagination -->
                    <div class="p-4 border-t border-slate-100 flex items-center justify-between">
                      <p class="text-sm text-slate-500">총 <span id="total-companies">0</span>개 기업</p>
                      <div class="flex items-center space-x-1">
                        <button onclick="loadCompanies(currentPage-1)" id="prev-page" class="px-3 py-1 text-sm border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>이전</button>
                        <span id="page-info" class="px-3 py-1 text-sm text-slate-600">1 / 1</span>
                        <button onclick="loadCompanies(currentPage+1)" id="next-page" class="px-3 py-1 text-sm border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-50" disabled>다음</button>
                      </div>
                    </div>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'grants' ? html`
                <!-- Grants Table -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                  <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h3 class="font-semibold text-slate-800">정부지원사업 공고</h3>
                    <div class="flex items-center space-x-2">
                      <input type="text" id="grant-search" placeholder="공고명 검색..." class="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      <button onclick="searchGrants()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">검색</button>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th class="px-5 py-3 text-left font-semibold">공고명</th>
                          <th class="px-5 py-3 text-left font-semibold">전담기관</th>
                          <th class="px-5 py-3 text-left font-semibold">지원규모</th>
                          <th class="px-5 py-3 text-left font-semibold">마감일</th>
                          <th class="px-5 py-3 text-left font-semibold">상태</th>
                        </tr>
                      </thead>
                      <tbody id="grant-table" class="divide-y divide-slate-100">
                        <tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">데이터를 불러오는 중...</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'logs' ? html`
                <!-- AI Logs Table -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                  <div class="p-5 border-b border-slate-100">
                    <h3 class="font-semibold text-slate-800">AI 분석 이력</h3>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th class="px-5 py-3 text-left font-semibold">분석일시</th>
                          <th class="px-5 py-3 text-left font-semibold">사용자</th>
                          <th class="px-5 py-3 text-left font-semibold">기업명</th>
                          <th class="px-5 py-3 text-left font-semibold">매칭 결과</th>
                          <th class="px-5 py-3 text-left font-semibold">토큰 사용량</th>
                        </tr>
                      </thead>
                      <tbody id="log-table" class="divide-y divide-slate-100">
                        <tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">데이터를 불러오는 중...</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'partners' ? html`
                <!-- Partners Approval Table -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                  <div class="p-5 border-b border-slate-100">
                    <h3 class="font-semibold text-slate-800">파트너 가입 승인 대기</h3>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th class="px-5 py-3 text-left font-semibold">기업명</th>
                          <th class="px-5 py-3 text-left font-semibold">대표자</th>
                          <th class="px-5 py-3 text-left font-semibold">연락처</th>
                          <th class="px-5 py-3 text-left font-semibold">신청일</th>
                          <th class="px-5 py-3 text-left font-semibold">상태</th>
                          <th class="px-5 py-3 text-center font-semibold">관리</th>
                        </tr>
                      </thead>
                      <tbody id="partner-table" class="divide-y divide-slate-100">
                        <tr><td colspan="6" class="px-5 py-8 text-center text-slate-400">승인 대기 중인 파트너가 없습니다.</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'users' ? html`
                <!-- Users Management Table -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                  <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h3 class="font-semibold text-slate-800">전체 회원 관리</h3>
                    <div class="flex items-center space-x-2">
                      <input type="text" id="user-search" placeholder="이름 또는 이메일..." class="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      <button onclick="searchUsers()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">검색</button>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th class="px-5 py-3 text-left font-semibold">이름</th>
                          <th class="px-5 py-3 text-left font-semibold">이메일</th>
                          <th class="px-5 py-3 text-left font-semibold">역할</th>
                          <th class="px-5 py-3 text-left font-semibold">가입일</th>
                          <th class="px-5 py-3 text-left font-semibold">AI 사용량</th>
                        </tr>
                      </thead>
                      <tbody id="user-table" class="divide-y divide-slate-100">
                        <tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">데이터를 불러오는 중...</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ` : ''}
              
              ${activeTab === 'settings' ? html`
                <!-- Settings -->
                <div class="space-y-6">
                  
                  <!-- SEO Settings -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-search text-blue-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">SEO 설정 (검색엔진 최적화)</h3>
                      </div>
                      <button onclick="saveSeoSettings()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                        <i class="fas fa-save mr-2"></i>저장
                      </button>
                    </div>
                    <div class="p-5 space-y-5">
                      <!-- Basic SEO -->
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">사이트 제목</label>
                          <input type="text" id="seo-title" placeholder="MCE 경영인증평가원 | 기업 맞춤 정부지원사업 매칭" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          <p class="text-xs text-slate-400 mt-1">권장: 50-60자 이내</p>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-slate-700 mb-1">사이트 URL</label>
                          <input type="text" id="seo-url" placeholder="https://www.mce.or.kr" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">메타 설명 (Description)</label>
                        <textarea id="seo-description" rows="3" placeholder="AI 기반 기업 맞춤형 정부지원사업 매칭, ISO 인증, 공급사 찾기 서비스를 제공합니다. 30,000건 이상의 지원사업 데이터베이스에서 최적의 지원사업을 찾아드립니다." class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        <p class="text-xs text-slate-400 mt-1">권장: 150-160자 이내 (Google 검색결과에 표시됨)</p>
                      </div>
                      
                      <div>
                        <label class="block text-sm font-medium text-slate-700 mb-1">키워드 (Keywords)</label>
                        <input type="text" id="seo-keywords" placeholder="정부지원사업, ISO인증, 기업평가, AI매칭, 경영컨설팅, 스마트공장, R&D지원" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <p class="text-xs text-slate-400 mt-1">쉼표로 구분 (예: 키워드1, 키워드2, 키워드3)</p>
                      </div>
                      
                      <!-- Open Graph Tags -->
                      <div class="pt-4 border-t border-slate-100">
                        <h4 class="font-medium text-slate-800 mb-3 flex items-center">
                          <i class="fab fa-facebook text-blue-500 mr-2"></i>
                          소셜 미디어 공유 설정 (Open Graph)
                        </h4>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">OG 제목</label>
                            <input type="text" id="seo-og-title" placeholder="MCE 경영인증평가원" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">OG 이미지 URL</label>
                            <input type="text" id="seo-og-image" placeholder="https://www.mce.or.kr/static/og-image.png" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                        </div>
                        <div class="mt-4">
                          <label class="block text-sm font-medium text-slate-700 mb-1">OG 설명</label>
                          <textarea id="seo-og-description" rows="2" placeholder="AI 기반 기업 맞춤형 정부지원사업 매칭 서비스" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>
                      </div>
                      
                      <!-- Structured Data -->
                      <div class="pt-4 border-t border-slate-100">
                        <h4 class="font-medium text-slate-800 mb-3 flex items-center">
                          <i class="fas fa-code text-purple-500 mr-2"></i>
                          구조화된 데이터 (Schema.org)
                        </h4>
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">회사명</label>
                            <input type="text" id="seo-company-name" placeholder="경영인증평가원" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">전화번호</label>
                            <input type="text" id="seo-phone" placeholder="051-714-0798" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">이메일</label>
                            <input type="text" id="seo-email" placeholder="mce@mce.re.kr" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div>
                            <label class="block text-sm font-medium text-slate-700 mb-1">주소</label>
                            <input type="text" id="seo-address" placeholder="부산광역시 동래구 중앙대로 1367번길 44-15" class="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                        </div>
                      </div>
                      
                      <!-- SEO Preview -->
                      <div class="pt-4 border-t border-slate-100">
                        <h4 class="font-medium text-slate-800 mb-3 flex items-center">
                          <i class="fab fa-google text-red-500 mr-2"></i>
                          Google 검색 결과 미리보기
                        </h4>
                        <div class="p-4 bg-slate-50 rounded-lg">
                          <p id="preview-title" class="text-blue-700 text-lg font-medium hover:underline cursor-pointer">MCE 경영인증평가원 | 기업 맞춤 정부지원사업 매칭</p>
                          <p id="preview-url" class="text-green-700 text-sm">https://www.mce.or.kr</p>
                          <p id="preview-desc" class="text-slate-600 text-sm mt-1">AI 기반 기업 맞춤형 정부지원사업 매칭, ISO 인증, 공급사 찾기 서비스를 제공합니다...</p>
                        </div>
                      </div>
                      
                      <div id="seo-status" class="hidden p-4 rounded-lg"></div>
                    </div>
                  </div>
                  
                  <!-- API Key Management -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-key text-amber-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">API 키 관리</h3>
                      </div>
                      <button onclick="saveApiKeys()" class="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition">
                        <i class="fas fa-save mr-2"></i>저장
                      </button>
                    </div>
                    <div class="p-5 space-y-4">
                      <!-- DART API -->
                      <div class="p-4 bg-slate-50 rounded-lg">
                        <div class="flex items-center justify-between mb-3">
                          <div class="flex items-center">
                            <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                              <span class="font-bold text-yellow-700">D</span>
                            </div>
                            <div>
                              <p class="font-medium text-slate-800">DART API</p>
                              <p class="text-xs text-slate-500">금융감독원 기업공시 데이터</p>
                            </div>
                          </div>
                          <button onclick="testDartConnection()" class="px-3 py-1.5 bg-slate-800 text-white text-xs font-medium rounded-lg hover:bg-slate-900 transition">
                            <i class="fas fa-plug mr-1"></i>연결 테스트
                          </button>
                        </div>
                        <div class="flex items-center space-x-2">
                          <input type="password" id="api-dart-key" placeholder="DART API 키 입력..." class="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 font-mono text-sm" />
                          <button onclick="togglePassword('api-dart-key')" class="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-100">
                            <i class="fas fa-eye text-slate-500"></i>
                          </button>
                        </div>
                        <div id="dart-status" class="mt-2 px-3 py-2 bg-slate-100 rounded text-xs text-slate-600 font-mono">Status: Ready</div>
                        <p class="text-xs text-slate-400 mt-2">
                          <a href="https://opendart.fss.or.kr" target="_blank" class="text-blue-500 hover:underline">
                            <i class="fas fa-external-link-alt mr-1"></i>DART API 키 발급받기
                          </a>
                        </p>
                      </div>
                      
                      <!-- OpenAI API -->
                      <div class="p-4 bg-slate-50 rounded-lg">
                        <div class="flex items-center justify-between mb-3">
                          <div class="flex items-center">
                            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                              <i class="fas fa-brain text-green-600"></i>
                            </div>
                            <div>
                              <p class="font-medium text-slate-800">OpenAI API</p>
                              <p class="text-xs text-slate-500">GPT-4o 기반 AI 분석</p>
                            </div>
                          </div>
                          <button onclick="testOpenAIConnection()" class="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition">
                            <i class="fas fa-plug mr-1"></i>연결 테스트
                          </button>
                        </div>
                        <div class="flex items-center space-x-2">
                          <input type="password" id="api-openai-key" placeholder="sk-..." class="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 font-mono text-sm" />
                          <button onclick="togglePassword('api-openai-key')" class="px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-100">
                            <i class="fas fa-eye text-slate-500"></i>
                          </button>
                        </div>
                        <div id="openai-status" class="mt-2 px-3 py-2 bg-slate-100 rounded text-xs text-slate-600 font-mono">Status: Ready</div>
                        <p class="text-xs text-slate-400 mt-2">
                          <a href="https://platform.openai.com/api-keys" target="_blank" class="text-blue-500 hover:underline">
                            <i class="fas fa-external-link-alt mr-1"></i>OpenAI API 키 발급받기
                          </a>
                        </p>
                      </div>
                      
                      <div id="api-status" class="hidden p-4 rounded-lg"></div>
                    </div>
                  </div>
                  
                  <!-- System Actions -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center">
                      <i class="fas fa-cogs text-slate-600 mr-3"></i>
                      <h3 class="font-semibold text-slate-800">시스템 관리</h3>
                    </div>
                    <div class="p-5 space-y-4">
                      <div class="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-rocket text-indigo-600"></i>
                          </div>
                          <div>
                            <p class="font-medium text-slate-800">시스템 배포</p>
                            <p class="text-xs text-slate-500">최신 코드를 프로덕션에 배포</p>
                          </div>
                        </div>
                        <button onclick="triggerDeploy()" class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition">배포 시작</button>
                      </div>
                      
                      <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-database text-slate-600"></i>
                          </div>
                          <div>
                            <p class="font-medium text-slate-800">캐시 초기화</p>
                            <p class="text-xs text-slate-500">시스템 캐시 데이터 삭제</p>
                          </div>
                        </div>
                        <button onclick="clearCache()" class="px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition">초기화</button>
                      </div>
                      
                      <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-sitemap text-red-600"></i>
                          </div>
                          <div>
                            <p class="font-medium text-slate-800">Sitemap 생성</p>
                            <p class="text-xs text-slate-500">검색엔진용 사이트맵 갱신</p>
                          </div>
                        </div>
                        <button onclick="generateSitemap()" class="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition">생성</button>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Terms Management (약관 관리) -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-file-contract text-cyan-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">약관 관리</h3>
                      </div>
                      <button onclick="openTermModal()" class="px-4 py-2 bg-cyan-600 text-white text-sm font-medium rounded-lg hover:bg-cyan-700 transition">
                        <i class="fas fa-plus mr-2"></i>새 약관
                      </button>
                    </div>
                    <div class="p-5">
                      <div id="terms-list" class="space-y-3">
                        <div class="text-center text-slate-400 py-4">약관을 불러오는 중...</div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Popup/Banner Management (팝업/배너 관리) -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-window-restore text-pink-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">팝업/배너 관리</h3>
                      </div>
                      <div class="flex space-x-2">
                        <button onclick="openPopupModal()" class="px-3 py-2 bg-pink-600 text-white text-sm font-medium rounded-lg hover:bg-pink-700 transition">
                          <i class="fas fa-plus mr-1"></i>팝업
                        </button>
                        <button onclick="openBannerModal()" class="px-3 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition">
                          <i class="fas fa-plus mr-1"></i>배너
                        </button>
                      </div>
                    </div>
                    <div class="p-5">
                      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <!-- Popups -->
                        <div>
                          <h4 class="font-medium text-slate-700 mb-3 flex items-center">
                            <i class="fas fa-window-maximize text-pink-500 mr-2"></i>팝업 목록
                          </h4>
                          <div id="popups-list" class="space-y-2 max-h-64 overflow-y-auto">
                            <div class="text-center text-slate-400 py-4 text-sm">팝업을 불러오는 중...</div>
                          </div>
                        </div>
                        <!-- Banners -->
                        <div>
                          <h4 class="font-medium text-slate-700 mb-3 flex items-center">
                            <i class="fas fa-image text-orange-500 mr-2"></i>배너 목록
                          </h4>
                          <div id="banners-list" class="space-y-2 max-h-64 overflow-y-auto">
                            <div class="text-center text-slate-400 py-4 text-sm">배너를 불러오는 중...</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Marketing Channels (마케팅 채널) -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-chart-bar text-violet-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">마케팅 채널 관리</h3>
                      </div>
                      <button onclick="saveMarketingChannels()" class="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition">
                        <i class="fas fa-save mr-2"></i>저장
                      </button>
                    </div>
                    <div class="p-5">
                      <div id="marketing-channels" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Google Analytics -->
                        <div class="p-4 bg-slate-50 rounded-lg">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="fab fa-google text-orange-600"></i>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">Google Analytics 4</p>
                                <p class="text-xs text-slate-500">웹 트래픽 분석</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="ga4-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                            </label>
                          </div>
                          <input type="text" id="ga4-tracking-id" placeholder="G-XXXXXXXXXX" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
                        </div>
                        
                        <!-- Facebook Pixel -->
                        <div class="p-4 bg-slate-50 rounded-lg">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="fab fa-facebook text-blue-600"></i>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">Facebook Pixel</p>
                                <p class="text-xs text-slate-500">광고 전환 추적</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="fb-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <input type="text" id="fb-pixel-id" placeholder="Facebook Pixel ID" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        
                        <!-- Naver Analytics -->
                        <div class="p-4 bg-slate-50 rounded-lg">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                <span class="font-bold text-green-600">N</span>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">네이버 애널리틱스</p>
                                <p class="text-xs text-slate-500">국내 트래픽 분석</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="naver-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                          <input type="text" id="naver-analytics-id" placeholder="네이버 애널리틱스 ID" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        
                        <!-- Kakao Pixel -->
                        <div class="p-4 bg-slate-50 rounded-lg">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                                <i class="fas fa-comment text-yellow-600"></i>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">카카오 픽셀</p>
                                <p class="text-xs text-slate-500">카카오 광고 전환 추적</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="kakao-pixel-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                          <input type="text" id="kakao-pixel-id" placeholder="카카오 픽셀 ID" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                        </div>
                      </div>
                      <div id="marketing-status" class="hidden mt-4 p-3 rounded-lg text-sm"></div>
                    </div>
                  </div>
                  
                  <!-- Chat Channels (상담 채널) -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-comments text-teal-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">상담 채널 연동</h3>
                      </div>
                      <button onclick="saveChatChannels()" class="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition">
                        <i class="fas fa-save mr-2"></i>저장
                      </button>
                    </div>
                    <div class="p-5">
                      <div id="chat-channels" class="space-y-4">
                        <!-- Kakao Channel -->
                        <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-yellow-200 rounded-lg flex items-center justify-center mr-3">
                                <img src="https://developers.kakao.com/assets/img/about/logos/channel/consult_small_yellow_pc.png" class="w-8 h-8" />
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">카카오톡 채널</p>
                                <p class="text-xs text-slate-500">카카오톡으로 실시간 상담</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="kakao-chat-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                          <input type="text" id="kakao-channel-id" placeholder="카카오톡 채널 공개 ID (예: _xkxkNb)" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500" />
                          <p class="text-xs text-slate-400 mt-2">
                            <a href="https://business.kakao.com/dashboard/" target="_blank" class="text-blue-500 hover:underline">
                              <i class="fas fa-external-link-alt mr-1"></i>카카오톡 채널 관리자센터에서 확인
                            </a>
                          </p>
                        </div>
                        
                        <!-- Naver TalkTalk -->
                        <div class="p-4 bg-green-50 rounded-lg border border-green-100">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-green-200 rounded-lg flex items-center justify-center mr-3">
                                <span class="font-bold text-green-700">N</span>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">네이버 톡톡</p>
                                <p class="text-xs text-slate-500">네이버 톡톡 실시간 상담</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="naver-talk-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                            </label>
                          </div>
                          <input type="text" id="naver-talk-id" placeholder="네이버 톡톡 ID" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                        </div>
                        
                        <!-- Channel Talk -->
                        <div class="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-indigo-200 rounded-lg flex items-center justify-center mr-3">
                                <i class="fas fa-headset text-indigo-700"></i>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">채널톡 (Channel.io)</p>
                                <p class="text-xs text-slate-500">전문 고객상담 솔루션</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="channel-talk-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                          <input type="text" id="channel-talk-key" placeholder="채널톡 Plugin Key" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                          <p class="text-xs text-slate-400 mt-2">
                            <a href="https://channel.io" target="_blank" class="text-blue-500 hover:underline">
                              <i class="fas fa-external-link-alt mr-1"></i>채널톡 가입하기
                            </a>
                          </p>
                        </div>
                        
                        <!-- Tawk.to -->
                        <div class="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                          <div class="flex items-center justify-between mb-3">
                            <div class="flex items-center">
                              <div class="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center mr-3">
                                <i class="fas fa-comments text-emerald-700"></i>
                              </div>
                              <div>
                                <p class="font-medium text-slate-800">Tawk.to</p>
                                <p class="text-xs text-slate-500">무료 실시간 채팅</p>
                              </div>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="tawk-active" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                            </label>
                          </div>
                          <input type="text" id="tawk-id" placeholder="Tawk.to Property ID" class="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                          <p class="text-xs text-slate-400 mt-2">
                            <a href="https://www.tawk.to" target="_blank" class="text-blue-500 hover:underline">
                              <i class="fas fa-external-link-alt mr-1"></i>Tawk.to 무료 가입
                            </a>
                          </p>
                        </div>
                      </div>
                      <div id="chat-status" class="hidden mt-4 p-3 rounded-lg text-sm"></div>
                    </div>
                  </div>
                  
                  <!-- External API Integration (외부 서비스 연동) -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div class="flex items-center">
                        <i class="fas fa-plug text-rose-600 mr-3"></i>
                        <h3 class="font-semibold text-slate-800">외부 서비스 연동 (API)</h3>
                      </div>
                      <button onclick="saveExternalApis()" class="px-4 py-2 bg-rose-600 text-white text-sm font-medium rounded-lg hover:bg-rose-700 transition">
                        <i class="fas fa-save mr-2"></i>저장
                      </button>
                    </div>
                    <div class="p-5">
                      <!-- Social Login -->
                      <h4 class="font-medium text-slate-700 mb-3 flex items-center">
                        <i class="fas fa-sign-in-alt text-slate-500 mr-2"></i>소셜 로그인
                      </h4>
                      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <!-- Kakao Login -->
                        <div class="p-4 bg-yellow-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">카카오 로그인</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="kakao-login-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                          <input type="text" id="kakao-rest-key" placeholder="REST API 키" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="kakao-secret" placeholder="Client Secret" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                        
                        <!-- Naver Login -->
                        <div class="p-4 bg-green-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">네이버 로그인</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="naver-login-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          </div>
                          <input type="text" id="naver-client-id" placeholder="Client ID" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="naver-client-secret" placeholder="Client Secret" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                        
                        <!-- Google Login -->
                        <div class="p-4 bg-red-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">구글 로그인</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="google-login-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-500"></div>
                            </label>
                          </div>
                          <input type="text" id="google-client-id" placeholder="Client ID" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="google-client-secret" placeholder="Client Secret" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                      </div>
                      
                      <!-- Notification Services -->
                      <h4 class="font-medium text-slate-700 mb-3 flex items-center">
                        <i class="fas fa-bell text-slate-500 mr-2"></i>알림 서비스
                      </h4>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <!-- Kakao Alimtalk -->
                        <div class="p-4 bg-yellow-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">카카오 알림톡</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="alimtalk-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-yellow-500"></div>
                            </label>
                          </div>
                          <input type="text" id="alimtalk-sender-key" placeholder="발신 프로필 키" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="alimtalk-api-key" placeholder="API Key" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                        
                        <!-- NHN SMS -->
                        <div class="p-4 bg-blue-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">NHN SMS</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="nhn-sms-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                          <input type="text" id="nhn-app-key" placeholder="AppKey" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="nhn-secret-key" placeholder="SecretKey" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                      </div>
                      
                      <!-- Payment Services -->
                      <h4 class="font-medium text-slate-700 mb-3 flex items-center">
                        <i class="fas fa-credit-card text-slate-500 mr-2"></i>결제 서비스
                      </h4>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- Toss Payments -->
                        <div class="p-4 bg-blue-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">토스페이먼츠</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="toss-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-500"></div>
                            </label>
                          </div>
                          <input type="text" id="toss-client-key" placeholder="Client Key" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="toss-secret-key" placeholder="Secret Key" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                        
                        <!-- NicePay -->
                        <div class="p-4 bg-green-50 rounded-lg">
                          <div class="flex items-center justify-between mb-2">
                            <span class="font-medium text-slate-700">나이스페이</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" id="nice-active" class="sr-only peer">
                              <div class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                            </label>
                          </div>
                          <input type="text" id="nice-merchant-id" placeholder="Merchant ID" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs mb-2" />
                          <input type="password" id="nice-merchant-key" placeholder="Merchant Key" class="w-full px-3 py-1.5 border border-slate-200 rounded text-xs" />
                        </div>
                      </div>
                      <div id="api-integration-status" class="hidden mt-4 p-3 rounded-lg text-sm"></div>
                    </div>
                  </div>
                </div>
              ` : ''}
              
            </div>
          </main>
        </div>
        
        <!-- Mobile Sidebar Overlay -->
        <div id="mobile-sidebar-overlay" class="fixed inset-0 bg-black/50 z-40 hidden lg:hidden" onclick="closeMobileSidebar()"></div>
        
        <!-- Mobile Sidebar -->
        <aside id="mobile-sidebar" class="fixed inset-y-0 left-0 w-64 bg-white z-50 transform -translate-x-full transition-transform lg:hidden">
          <div class="h-16 flex items-center justify-between px-4 border-b border-slate-100">
            <span class="font-bold text-slate-800">MCE Admin</span>
            <button onclick="closeMobileSidebar()" class="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <nav class="p-4 space-y-1">
            <a href="/admin?tab=overview" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('overview')}">
              <i class="fas fa-chart-pie w-5 mr-3"></i> 통합 현황
            </a>
            <a href="/admin?tab=companies" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('companies')}">
              <i class="fas fa-building w-5 mr-3"></i> 기업 DB
            </a>
            <a href="/admin?tab=grants" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('grants')}">
              <i class="fas fa-bullhorn w-5 mr-3"></i> 지원사업 공고
            </a>
            <a href="/admin?tab=logs" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('logs')}">
              <i class="fas fa-robot w-5 mr-3"></i> AI 분석 이력
            </a>
            <a href="/admin?tab=partners" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('partners')}">
              <i class="fas fa-handshake w-5 mr-3"></i> 파트너 승인
            </a>
            <a href="/admin?tab=users" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('users')}">
              <i class="fas fa-users w-5 mr-3"></i> 회원 관리
            </a>
            <a href="/admin?tab=settings" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${menuClass('settings')}">
              <i class="fas fa-cog w-5 mr-3"></i> 시스템 설정
            </a>
          </nav>
        </aside>
        
        <script>
          // Mobile sidebar toggle
          document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
            document.getElementById('mobile-sidebar').classList.remove('-translate-x-full');
            document.getElementById('mobile-sidebar-overlay').classList.remove('hidden');
          });
          
          function closeMobileSidebar() {
            document.getElementById('mobile-sidebar').classList.add('-translate-x-full');
            document.getElementById('mobile-sidebar-overlay').classList.add('hidden');
          }
          
          // API Functions
          async function testDartConnection() {
            const el = document.getElementById('dart-status');
            el.innerHTML = '<span class="text-blue-600">연결 중...</span>';
            try {
              const res = await fetch('/api/dart/test');
              const json = await res.json();
              el.innerHTML = json.success 
                ? '<span class="text-green-600">✅ 연결 성공: ' + (json.company || 'OK') + '</span>' 
                : '<span class="text-red-600">❌ 연결 실패: ' + (json.message || 'Error') + '</span>';
            } catch(e) { 
              el.innerHTML = '<span class="text-red-600">❌ 연결 오류</span>'; 
            }
          }
          
          async function triggerDeploy() {
            if(confirm('프로덕션에 배포하시겠습니까?')) {
              try {
                await fetch('/api/admin/deploy', { method: 'POST' });
                alert('배포 요청이 전송되었습니다.');
              } catch(e) {
                alert('배포 요청 실패');
              }
            }
          }
          
          function clearCache() {
            if(confirm('캐시를 초기화하시겠습니까?')) {
              alert('캐시가 초기화되었습니다.');
            }
          }
          
          // Load data based on current tab
          async function loadData() {
            const tab = '${activeTab}';
            
            // Load stats for overview
            if (tab === 'overview') {
              try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                  const data = await res.json();
                  document.getElementById('stat-users').textContent = data.users || '0';
                  document.getElementById('stat-ai').textContent = data.aiUsage || '0';
                  document.getElementById('stat-grants').textContent = data.grants || '0';
                  document.getElementById('stat-pending').textContent = data.pending || '0';
                }
              } catch(e) {
                console.log('Stats load error:', e);
              }
              
              // Initialize charts
              initCharts();
              
              // Load API usage stats
              refreshApiUsage();
            }
            
            // Load table data
            if (tab === 'companies') loadCompanies();
            if (tab === 'grants') loadGrants();
            if (tab === 'logs') loadLogs();
            if (tab === 'users') loadUsers();
            if (tab === 'partners') loadPartners();
            if (tab === 'collector') refreshCollectorStatus();
            
            // Load recent activity for overview
            if (tab === 'overview') loadRecentActivity();
          }
          
          // ========== API Usage Functions ==========
          async function refreshApiUsage() {
            await refreshAllUsage();
          }
          
          async function refreshAllUsage() {
            try {
              const res = await fetch('/api/admin/api-usage');
              const data = await res.json();
              
              if (data.success) {
                // ========== OpenAI 사용량 ==========
                const todayEl = document.getElementById('openai-today-tokens');
                const todayCostEl = document.getElementById('openai-today-cost');
                if (todayEl) todayEl.textContent = (data.openai?.today?.total_tokens || 0).toLocaleString();
                if (todayCostEl) todayCostEl.textContent = '$' + (data.openai?.today?.cost_usd || 0).toFixed(4);
                
                const monthEl = document.getElementById('openai-month-tokens');
                const monthCostEl = document.getElementById('openai-month-cost');
                if (monthEl) monthEl.textContent = (data.openai?.month?.total_tokens || 0).toLocaleString();
                if (monthCostEl) monthCostEl.textContent = '$' + (data.openai?.month?.cost_usd || 0).toFixed(4);
                
                const totalEl = document.getElementById('openai-total-tokens');
                const totalCostEl = document.getElementById('openai-total-cost');
                const totalCallsEl = document.getElementById('openai-total-calls');
                if (totalEl) totalEl.textContent = (data.openai?.total?.total_tokens || 0).toLocaleString();
                if (totalCostEl) totalCostEl.textContent = '$' + (data.openai?.total?.cost_usd || 0).toFixed(4);
                if (totalCallsEl) totalCallsEl.textContent = (data.openai?.total?.calls || 0).toLocaleString();
                
                // 평균 호출당 비용
                const avgCostEl = document.getElementById('openai-avg-cost');
                if (avgCostEl && data.openai?.total?.calls > 0) {
                  const avgCost = (data.openai.total.cost_usd / data.openai.total.calls);
                  avgCostEl.textContent = '$' + avgCost.toFixed(6);
                }
                
                // ========== DART 사용량 ==========
                const dartTodayEl = document.getElementById('dart-today-calls');
                const dartMonthEl = document.getElementById('dart-month-calls');
                const dartCompaniesEl = document.getElementById('dart-companies');
                const dartLastSyncEl = document.getElementById('dart-last-sync');
                
                if (dartTodayEl) dartTodayEl.textContent = (data.dart?.today?.calls || 0).toLocaleString();
                if (dartMonthEl) dartMonthEl.textContent = (data.dart?.month?.calls || 0).toLocaleString();
                if (dartCompaniesEl) dartCompaniesEl.textContent = (data.dart?.companies || 0).toLocaleString();
                if (dartLastSyncEl) dartLastSyncEl.textContent = data.dart?.lastSync || '-';
                
                // DART 일일 진행바
                const dartBarEl = document.getElementById('dart-today-bar');
                if (dartBarEl) {
                  const dartPercent = Math.min(100, ((data.dart?.today?.calls || 0) / 10000) * 100);
                  dartBarEl.style.width = dartPercent + '%';
                  dartBarEl.classList.toggle('bg-red-400', dartPercent > 80);
                  dartBarEl.classList.toggle('bg-yellow-400', dartPercent > 50 && dartPercent <= 80);
                }
                
                // ========== Cloudflare 사용량 ==========
                const cf = data.cloudflare || {};
                
                // Pages 요청
                const cfPagesEl = document.getElementById('cf-pages-requests');
                if (cfPagesEl) cfPagesEl.textContent = (cf.pages?.requests || 0).toLocaleString();
                
                // D1 읽기
                const cfD1ReadsEl = document.getElementById('cf-d1-reads');
                const cfD1ReadsBarEl = document.getElementById('cf-d1-reads-bar');
                const d1Reads = cf.d1?.reads || 0;
                const d1ReadsLimit = 5000000;
                if (cfD1ReadsEl) cfD1ReadsEl.textContent = formatLargeNumber(d1Reads);
                if (cfD1ReadsBarEl) {
                  const readsPercent = Math.min(100, (d1Reads / d1ReadsLimit) * 100);
                  cfD1ReadsBarEl.style.width = readsPercent + '%';
                  cfD1ReadsBarEl.classList.toggle('bg-red-400', readsPercent > 80);
                  cfD1ReadsBarEl.classList.toggle('bg-yellow-400', readsPercent > 50 && readsPercent <= 80);
                }
                
                // D1 쓰기
                const cfD1WritesEl = document.getElementById('cf-d1-writes');
                const cfD1WritesBarEl = document.getElementById('cf-d1-writes-bar');
                const d1Writes = cf.d1?.writes || 0;
                const d1WritesLimit = 100000;
                if (cfD1WritesEl) cfD1WritesEl.textContent = formatLargeNumber(d1Writes);
                if (cfD1WritesBarEl) {
                  const writesPercent = Math.min(100, (d1Writes / d1WritesLimit) * 100);
                  cfD1WritesBarEl.style.width = writesPercent + '%';
                  cfD1WritesBarEl.classList.toggle('bg-red-400', writesPercent > 80);
                  cfD1WritesBarEl.classList.toggle('bg-yellow-400', writesPercent > 50 && writesPercent <= 80);
                }
                
                // D1 저장용량
                const cfD1StorageEl = document.getElementById('cf-d1-storage');
                const cfD1StorageBarEl = document.getElementById('cf-d1-storage-bar');
                const d1Storage = cf.d1?.storage_mb || 0;
                const d1StorageLimit = 5120; // 5GB in MB
                if (cfD1StorageEl) cfD1StorageEl.textContent = d1Storage >= 1024 ? (d1Storage / 1024).toFixed(2) + ' GB' : d1Storage.toFixed(2) + ' MB';
                if (cfD1StorageBarEl) {
                  const storagePercent = Math.min(100, (d1Storage / d1StorageLimit) * 100);
                  cfD1StorageBarEl.style.width = storagePercent + '%';
                  cfD1StorageBarEl.classList.toggle('bg-red-400', storagePercent > 80);
                  cfD1StorageBarEl.classList.toggle('bg-yellow-400', storagePercent > 50 && storagePercent <= 80);
                }
                
                // Workers 요청
                const cfWorkersEl = document.getElementById('cf-workers-requests');
                const cfWorkersBarEl = document.getElementById('cf-workers-bar');
                const workersRequests = cf.workers?.requests || 0;
                const workersLimit = 100000;
                if (cfWorkersEl) cfWorkersEl.textContent = formatLargeNumber(workersRequests);
                if (cfWorkersBarEl) {
                  const workersPercent = Math.min(100, (workersRequests / workersLimit) * 100);
                  cfWorkersBarEl.style.width = workersPercent + '%';
                  cfWorkersBarEl.classList.toggle('bg-red-400', workersPercent > 80);
                  cfWorkersBarEl.classList.toggle('bg-yellow-400', workersPercent > 50 && workersPercent <= 80);
                }
                
                // Cloudflare 예상 비용
                const cfCostEl = document.getElementById('cf-estimated-cost');
                if (cfCostEl) cfCostEl.textContent = '$' + (cf.estimated_cost || 0).toFixed(2);
                
                // ========== 총 비용 계산 ==========
                const openaiMonthCost = data.openai?.month?.cost_usd || 0;
                const openaiTotalCost = data.openai?.total?.cost_usd || 0;
                const cfTotalCost = cf.estimated_cost || 0;
                
                const totalMonthCost = openaiMonthCost + cfTotalCost;
                const totalAllCost = openaiTotalCost + cfTotalCost;
                
                // 총 API 호출
                const totalTodayCalls = (data.openai?.today?.calls || 0) + (data.dart?.today?.calls || 0);
                const totalMonthCalls = (data.openai?.month?.calls || 0) + (data.dart?.month?.calls || 0);
                
                const totalMonthCostEl = document.getElementById('total-month-cost');
                const totalAllCostEl = document.getElementById('total-all-cost');
                const totalTodayCallsEl = document.getElementById('total-today-calls');
                const totalMonthCallsEl = document.getElementById('total-month-calls');
                
                if (totalMonthCostEl) totalMonthCostEl.textContent = '$' + totalMonthCost.toFixed(2);
                if (totalAllCostEl) totalAllCostEl.textContent = '$' + totalAllCost.toFixed(2);
                if (totalTodayCallsEl) totalTodayCallsEl.textContent = totalTodayCalls.toLocaleString();
                if (totalMonthCallsEl) totalMonthCallsEl.textContent = totalMonthCalls.toLocaleString();
                
                // 예상 월말 비용
                const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
                const currentDay = new Date().getDate();
                const estimatedMonthly = (totalMonthCost / currentDay) * daysInMonth;
                const totalEstimatedEl = document.getElementById('total-estimated');
                const estimatedEl = document.getElementById('estimated-monthly');
                if (totalEstimatedEl) totalEstimatedEl.textContent = '$' + estimatedMonthly.toFixed(2);
                if (estimatedEl) estimatedEl.textContent = '$' + estimatedMonthly.toFixed(2);
                
                // ========== 기타 서비스 ==========
                // 네이버 크롤링 기업 수
                const naverEl = document.getElementById('naver-crawl-count');
                if (naverEl) naverEl.textContent = (data.naver?.companies || 0).toLocaleString();
                
                // GitHub 배포 횟수
                const githubEl = document.getElementById('github-deploys');
                if (githubEl) githubEl.textContent = (data.github?.deploys || 0).toLocaleString();
              }
            } catch (e) {
              console.error('API usage load error:', e);
            }
          }
          
          // 큰 숫자 포맷팅 헬퍼
          function formatLargeNumber(num) {
            if (num >= 1000000) return (num / 1000000).toFixed(2) + 'M';
            if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
            return num.toLocaleString();
          }
          
          // ========== Data Collector Functions ==========
          function addCollectorLog(message, type = 'info') {
            const log = document.getElementById('collector-log');
            if (!log) return;
            const time = new Date().toLocaleTimeString('ko-KR');
            const colorClass = type === 'success' ? 'text-green-400' : type === 'error' ? 'text-red-400' : 'text-blue-400';
            log.innerHTML += '<div class="' + colorClass + '">[' + time + '] ' + message + '</div>';
            log.scrollTop = log.scrollHeight;
          }
          
          async function refreshCollectorStatus() {
            try {
              const res = await fetch('/api/admin/collector/status');
              const data = await res.json();
              
              if (data.success) {
                document.getElementById('collector-total').textContent = (data.companies?.total || 0).toLocaleString();
                document.getElementById('collector-dart').textContent = (data.dart?.total_corps || 0).toLocaleString();
                document.getElementById('collector-listed').textContent = (data.dart?.listed || 0).toLocaleString();
                document.getElementById('collector-dart-progress').textContent = '수집 진행: ' + (data.dart?.progress || '0%');
                
                const jobsCount = (data.companies?.by_source?.saramin || 0) + 
                                  (data.companies?.by_source?.jobkorea || 0);
                document.getElementById('collector-jobs').textContent = jobsCount.toLocaleString();
              }
            } catch (e) {
              console.error('Collector status error:', e);
            }
          }
          
          async function downloadDartCorps() {
            const statusEl = document.getElementById('dart-status');
            statusEl.classList.remove('hidden');
            document.getElementById('dart-status-text').textContent = 'DART 전체 기업코드 다운로드 중... (약 9만건)';
            addCollectorLog('DART 기업코드 다운로드 시작...', 'info');
            
            try {
              const res = await fetch('/api/admin/collector/dart/all-corps', { method: 'POST' });
              const data = await res.json();
              
              if (data.success) {
                document.getElementById('dart-status-text').textContent = '완료! ' + data.message;
                addCollectorLog('DART 기업코드 다운로드 완료: ' + data.total_parsed + '건 파싱, ' + data.inserted + '건 추가', 'success');
                refreshCollectorStatus();
              } else {
                document.getElementById('dart-status-text').textContent = '오류: ' + data.error;
                addCollectorLog('DART 다운로드 실패: ' + data.error, 'error');
              }
            } catch (e) {
              document.getElementById('dart-status-text').textContent = '네트워크 오류';
              addCollectorLog('DART 다운로드 오류: ' + e.message, 'error');
            }
          }
          
          async function collectDartDetails() {
            const statusEl = document.getElementById('dart-status');
            statusEl.classList.remove('hidden');
            document.getElementById('dart-status-text').textContent = 'DART 상장사 상세정보 수집 중... (50건 배치)';
            addCollectorLog('DART 상세정보 배치 수집 시작...', 'info');
            
            try {
              const res = await fetch('/api/admin/collector/dart/collect-details', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ limit: 50, onlyListed: true })
              });
              const data = await res.json();
              
              if (data.success) {
                document.getElementById('dart-status-text').textContent = '완료! ' + data.collected + '건 수집 (' + data.stats.progress + ')';
                addCollectorLog('DART 상세정보 수집 완료: ' + data.collected + '건 (전체 진행률: ' + data.stats.progress + ')', 'success');
                refreshCollectorStatus();
              } else {
                document.getElementById('dart-status-text').textContent = '오류: ' + data.error;
                addCollectorLog('DART 수집 실패: ' + data.error, 'error');
              }
            } catch (e) {
              document.getElementById('dart-status-text').textContent = '네트워크 오류';
              addCollectorLog('DART 수집 오류: ' + e.message, 'error');
            }
          }
          
          async function collectPublicData() {
            const apiKey = document.getElementById('public-data-key').value;
            if (!apiKey) {
              alert('공공데이터포털 API Key를 입력해주세요.');
              return;
            }
            addCollectorLog('공공데이터포털 연동은 추가 구현이 필요합니다.', 'info');
            alert('공공데이터포털 API Key가 저장되었습니다. 사업자번호 목록이 필요합니다.');
          }
          
          async function crawlSaramin() {
            const keyword = document.getElementById('crawl-keyword')?.value || '';
            const statusEl = document.getElementById('crawl-status');
            statusEl.classList.remove('hidden');
            statusEl.textContent = '사람인 기업정보 수집 중...';
            addCollectorLog('사람인 크롤링 시작 (키워드: ' + (keyword || '전체') + ')', 'info');
            
            try {
              const res = await fetch('/api/admin/collector/saramin/companies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 1, keyword })
              });
              const data = await res.json();
              
              statusEl.textContent = data.success ? '완료: ' + data.message : '오류: ' + data.error;
              addCollectorLog(data.success ? '사람인 수집 완료: ' + data.inserted + '개 추가' : '사람인 수집 실패', data.success ? 'success' : 'error');
              refreshCollectorStatus();
            } catch (e) {
              statusEl.textContent = '크롤링 오류';
              addCollectorLog('사람인 크롤링 오류: ' + e.message, 'error');
            }
          }
          
          async function crawlJobkorea() {
            const keyword = document.getElementById('crawl-keyword')?.value || '';
            const statusEl = document.getElementById('crawl-status');
            statusEl.classList.remove('hidden');
            statusEl.textContent = '잡코리아 기업정보 수집 중...';
            addCollectorLog('잡코리아 크롤링 시작', 'info');
            
            try {
              const res = await fetch('/api/admin/collector/jobkorea/companies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 1, keyword })
              });
              const data = await res.json();
              
              statusEl.textContent = data.success ? '완료: ' + data.message : '오류: ' + data.error;
              addCollectorLog(data.success ? '잡코리아 수집 완료: ' + data.inserted + '개 추가' : '잡코리아 수집 실패', data.success ? 'success' : 'error');
              refreshCollectorStatus();
            } catch (e) {
              statusEl.textContent = '크롤링 오류';
              addCollectorLog('잡코리아 크롤링 오류: ' + e.message, 'error');
            }
          }
          
          async function crawlIncruit() {
            const statusEl = document.getElementById('crawl-status');
            statusEl.classList.remove('hidden');
            statusEl.textContent = '인크루트 기업정보 수집 중...';
            addCollectorLog('인크루트 크롤링 시작', 'info');
            
            try {
              const res = await fetch('/api/admin/collector/incruit/companies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: 1 })
              });
              const data = await res.json();
              
              statusEl.textContent = data.success ? '완료: ' + data.inserted + '개 추가' : '오류: ' + data.error;
              addCollectorLog(data.success ? '인크루트 수집 완료: ' + data.inserted + '개 추가' : '인크루트 수집 실패', data.success ? 'success' : 'error');
              refreshCollectorStatus();
            } catch (e) {
              statusEl.textContent = '크롤링 오류';
              addCollectorLog('인크루트 크롤링 오류: ' + e.message, 'error');
            }
          }
          
          async function startBatchCollect(source) {
            const statusEl = document.getElementById('batch-status');
            statusEl.classList.remove('hidden');
            statusEl.textContent = source.toUpperCase() + ' 배치 수집 실행 중...';
            addCollectorLog(source.toUpperCase() + ' 배치 자동 수집 시작', 'info');
            
            try {
              const res = await fetch('/api/admin/collector/batch-collect', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ source, batchSize: 50 })
              });
              const data = await res.json();
              
              statusEl.textContent = data.success ? '완료: ' + data.collected + '건 수집' : '오류: ' + (data.error || data.message);
              addCollectorLog(data.success ? '배치 수집 완료: ' + data.collected + '건' : '배치 수집 실패: ' + (data.error || data.message), data.success ? 'success' : 'error');
              refreshCollectorStatus();
            } catch (e) {
              statusEl.textContent = '실행 오류';
              addCollectorLog('배치 수집 오류: ' + e.message, 'error');
            }
          }
          
          // Pagination state
          let currentPage = 1;
          let totalPages = 1;
          let searchQuery = '';
          
          async function loadCompanies(page = 1) {
            currentPage = page;
            const query = searchQuery ? '&q=' + encodeURIComponent(searchQuery) : '';
            try {
              const res = await fetch('/api/admin/companies?page=' + page + '&limit=20' + query);
              if (res.ok) {
                const data = await res.json();
                const tbody = document.getElementById('company-table');
                const countEl = document.getElementById('company-count');
                const totalEl = document.getElementById('total-companies');
                const pageInfo = document.getElementById('page-info');
                const prevBtn = document.getElementById('prev-page');
                const nextBtn = document.getElementById('next-page');
                
                totalPages = data.totalPages || 1;
                const total = data.total || 0;
                
                if (countEl) countEl.textContent = total + '건';
                if (totalEl) totalEl.textContent = total;
                if (pageInfo) pageInfo.textContent = currentPage + ' / ' + totalPages;
                if (prevBtn) prevBtn.disabled = currentPage <= 1;
                if (nextBtn) nextBtn.disabled = currentPage >= totalPages;
                
                if (data.companies && data.companies.length > 0) {
                  tbody.innerHTML = data.companies.map(c => 
                    '<tr class="hover:bg-slate-50 cursor-pointer" onclick="openCompanyDetail(' + c.id + ')">' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + (c.name || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600 font-mono text-xs">' + (c.biz_num || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.ceo || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.industry || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.employee_count || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.revenue || '-') + '</td>' +
                    '<td class="px-5 py-3"><span class="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">' + (c.certifications || '-') + '</span></td>' +
                    '<td class="px-5 py-3 text-slate-500 text-xs">' + (c.created_at || '-') + '</td>' +
                    '<td class="px-5 py-3 text-center" onclick="event.stopPropagation()">' +
                    '<button onclick="openCompanyDetail(' + c.id + ')" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded hover:bg-blue-200 mr-1" title="상세보기"><i class="fas fa-eye"></i></button>' +
                    '<button onclick="quickAIMatch(' + c.id + ')" class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded hover:bg-purple-200" title="AI 매칭"><i class="fas fa-robot"></i></button>' +
                    '</td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="9" class="px-5 py-8 text-center text-slate-400">등록된 기업이 없습니다.</td></tr>';
                }
              }
            } catch(e) {
              console.log('Companies load error:', e);
            }
          }
          
          // Excel Upload Functions
          async function handleExcelUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const statusEl = document.getElementById('upload-status');
            const messageEl = document.getElementById('upload-message');
            const progressEl = document.getElementById('upload-progress');
            const progressBar = document.getElementById('progress-bar');
            
            statusEl.classList.remove('hidden', 'bg-green-50', 'bg-red-50', 'bg-blue-50');
            statusEl.classList.add('bg-blue-50');
            messageEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>파일을 읽는 중...';
            progressEl.classList.remove('hidden');
            progressBar.style.width = '10%';
            
            try {
              const formData = new FormData();
              formData.append('file', file);
              
              progressBar.style.width = '30%';
              messageEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>서버에 업로드 중...';
              
              const res = await fetch('/api/admin/companies/upload', {
                method: 'POST',
                body: formData
              });
              
              progressBar.style.width = '80%';
              
              const result = await res.json();
              
              progressBar.style.width = '100%';
              
              if (result.success) {
                statusEl.classList.remove('bg-blue-50');
                statusEl.classList.add('bg-green-50');
                messageEl.innerHTML = '<i class="fas fa-check-circle text-green-600 mr-2"></i>' +
                  '<span class="text-green-700">업로드 완료! ' + result.inserted + '건 추가, ' + result.duplicates + '건 중복(스킵), ' + result.errors + '건 오류</span>';
                
                // Reload the company list
                loadCompanies(1);
              } else {
                statusEl.classList.remove('bg-blue-50');
                statusEl.classList.add('bg-red-50');
                messageEl.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>' +
                  '<span class="text-red-700">업로드 실패: ' + (result.error || '알 수 없는 오류') + '</span>';
              }
            } catch(e) {
              statusEl.classList.remove('bg-blue-50');
              statusEl.classList.add('bg-red-50');
              messageEl.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>' +
                '<span class="text-red-700">업로드 오류: ' + e.message + '</span>';
            }
            
            // Reset file input
            event.target.value = '';
            
            // Hide progress after 3 seconds
            setTimeout(() => {
              progressEl.classList.add('hidden');
            }, 3000);
          }
          
          function downloadTemplate() {
            // Create CSV template
            const headers = ['기업명', '사업자번호', '대표자', '업종코드', '설립일', '직원수', '매출액', '인증현황'];
            const sample = ['(주)예시기업', '123-45-67890', '홍길동', 'C29', '2020-01-15', '50', '5000000000', 'ISO9001,ISO14001'];
            
            const csvContent = headers.join(',') + '\\n' + sample.join(',');
            const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = '기업DB_업로드_템플릿.csv';
            link.click();
          }
          
          async function loadGrants() {
            try {
              const res = await fetch('/api/admin/grants');
              if (res.ok) {
                const data = await res.json();
                const tbody = document.getElementById('grant-table');
                if (data.grants && data.grants.length > 0) {
                  tbody.innerHTML = data.grants.map(g => 
                    '<tr class="hover:bg-slate-50">' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + g.title + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (g.agency || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (g.amount || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (g.deadline || '-') + '</td>' +
                    '<td class="px-5 py-3"><span class="px-2 py-1 text-xs rounded-full ' + (g.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600') + '">' + (g.status === 'active' ? '진행중' : '마감') + '</span></td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">등록된 공고가 없습니다.</td></tr>';
                }
              }
            } catch(e) {
              console.log('Grants load error:', e);
            }
          }
          
          async function loadLogs() {
            try {
              const res = await fetch('/api/admin/logs');
              if (res.ok) {
                const data = await res.json();
                const tbody = document.getElementById('log-table');
                if (data.logs && data.logs.length > 0) {
                  tbody.innerHTML = data.logs.map(l => 
                    '<tr class="hover:bg-slate-50">' +
                    '<td class="px-5 py-3 text-slate-600 text-xs">' + l.created_at + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (l.user_email || '-') + '</td>' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + (l.company_name || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (l.match_count || 0) + '건 매칭</td>' +
                    '<td class="px-5 py-3 text-slate-500 text-xs">' + (l.tokens_used || '-') + '</td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">분석 이력이 없습니다.</td></tr>';
                }
              }
            } catch(e) {
              console.log('Logs load error:', e);
            }
          }
          
          async function loadUsers() {
            try {
              const res = await fetch('/api/admin/users');
              if (res.ok) {
                const data = await res.json();
                const tbody = document.getElementById('user-table');
                if (data.users && data.users.length > 0) {
                  tbody.innerHTML = data.users.map(u => 
                    '<tr class="hover:bg-slate-50">' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + u.name + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + u.email + '</td>' +
                    '<td class="px-5 py-3"><span class="px-2 py-1 text-xs rounded-full ' + (u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600') + '">' + u.role + '</span></td>' +
                    '<td class="px-5 py-3 text-slate-500 text-xs">' + (u.created_at || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (u.ai_usage || 0) + '회</td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">등록된 회원이 없습니다.</td></tr>';
                }
              }
            } catch(e) {
              console.log('Users load error:', e);
            }
          }
          
          async function loadPartners() {
            try {
              const res = await fetch('/api/admin/partners');
              if (res.ok) {
                const data = await res.json();
                const tbody = document.getElementById('partner-table');
                if (data.partners && data.partners.length > 0) {
                  tbody.innerHTML = data.partners.map(p => 
                    '<tr class="hover:bg-slate-50">' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + (p.company_name || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (p.ceo_name || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (p.phone || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-500 text-xs">' + (p.applied_at || '-') + '</td>' +
                    '<td class="px-5 py-3"><span class="px-2 py-1 text-xs rounded-full ' + 
                      (p.status === 'approved' ? 'bg-green-100 text-green-700' : 
                       p.status === 'rejected' ? 'bg-red-100 text-red-700' : 
                       'bg-yellow-100 text-yellow-700') + '">' + 
                      (p.status === 'approved' ? '승인됨' : p.status === 'rejected' ? '거절됨' : '대기중') + '</span></td>' +
                    '<td class="px-5 py-3 text-center">' +
                      (p.status === 'pending' ? 
                        '<button onclick="approvePartner(' + p.id + ')" class="px-2 py-1 bg-green-600 text-white text-xs rounded mr-1 hover:bg-green-700">승인</button>' +
                        '<button onclick="rejectPartner(' + p.id + ')" class="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700">거절</button>'
                      : '-') +
                    '</td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="6" class="px-5 py-8 text-center text-slate-400">승인 대기 중인 파트너가 없습니다.</td></tr>';
                }
              }
            } catch(e) {
              console.log('Partners load error:', e);
            }
          }
          
          async function approvePartner(id) {
            if (confirm('이 파트너를 승인하시겠습니까?')) {
              try {
                const res = await fetch('/api/admin/partners/' + id + '/approve', { method: 'POST' });
                if (res.ok) {
                  alert('승인되었습니다.');
                  loadPartners();
                }
              } catch(e) {
                alert('승인 처리 중 오류가 발생했습니다.');
              }
            }
          }
          
          async function rejectPartner(id) {
            if (confirm('이 파트너를 거절하시겠습니까?')) {
              try {
                const res = await fetch('/api/admin/partners/' + id + '/reject', { method: 'POST' });
                if (res.ok) {
                  alert('거절되었습니다.');
                  loadPartners();
                }
              } catch(e) {
                alert('거절 처리 중 오류가 발생했습니다.');
              }
            }
          }
          
          async function loadRecentActivity() {
            const el = document.getElementById('recent-activity');
            try {
              const [logsRes, usersRes] = await Promise.all([
                fetch('/api/admin/logs'),
                fetch('/api/admin/users')
              ]);
              
              let activities = [];
              
              if (logsRes.ok) {
                const logsData = await logsRes.json();
                if (logsData.logs && logsData.logs.length > 0) {
                  logsData.logs.slice(0, 3).forEach(l => {
                    activities.push({
                      icon: 'fa-robot',
                      iconBg: 'bg-indigo-100',
                      iconColor: 'text-indigo-600',
                      title: 'AI 분석 완료',
                      desc: (l.company_name || '기업') + ' - ' + (l.match_count || 0) + '건 매칭',
                      time: l.created_at || '-'
                    });
                  });
                }
              }
              
              if (usersRes.ok) {
                const usersData = await usersRes.json();
                if (usersData.users && usersData.users.length > 0) {
                  usersData.users.slice(0, 2).forEach(u => {
                    activities.push({
                      icon: 'fa-user-plus',
                      iconBg: 'bg-green-100',
                      iconColor: 'text-green-600',
                      title: '신규 회원 가입',
                      desc: u.name + ' (' + u.email + ')',
                      time: u.created_at || '-'
                    });
                  });
                }
              }
              
              if (activities.length > 0) {
                el.innerHTML = activities.slice(0, 5).map(a => 
                  '<div class="flex items-center p-4 hover:bg-slate-50">' +
                  '<div class="w-10 h-10 ' + a.iconBg + ' rounded-full flex items-center justify-center mr-4">' +
                  '<i class="fas ' + a.icon + ' ' + a.iconColor + '"></i></div>' +
                  '<div class="flex-1"><p class="text-sm font-medium text-slate-800">' + a.title + '</p>' +
                  '<p class="text-xs text-slate-500">' + a.desc + '</p></div>' +
                  '<span class="text-xs text-slate-400">' + a.time + '</span></div>'
                ).join('');
              } else {
                el.innerHTML = '<div class="p-4 text-center text-slate-400 text-sm">최근 활동이 없습니다.</div>';
              }
            } catch(e) {
              console.log('Recent activity load error:', e);
              el.innerHTML = '<div class="p-4 text-center text-slate-400 text-sm">데이터를 불러올 수 없습니다.</div>';
            }
          }
          
          async function initCharts() {
            // Weekly Activity Chart - Load from API
            const weeklyCtx = document.getElementById('weeklyChart');
            if (weeklyCtx) {
              let weeklyLabels = ['월', '화', '수', '목', '금', '토', '일'];
              let aiData = [0, 0, 0, 0, 0, 0, 0];
              let visitorData = [0, 0, 0, 0, 0, 0, 0];
              
              try {
                const res = await fetch('/api/admin/chart/weekly');
                if (res.ok) {
                  const data = await res.json();
                  weeklyLabels = data.labels || weeklyLabels;
                  aiData = data.aiAnalysis || aiData;
                  visitorData = data.visitors || visitorData;
                }
              } catch(e) {
                console.log('Weekly chart data load error:', e);
              }
              
              new Chart(weeklyCtx, {
                type: 'line',
                data: {
                  labels: weeklyLabels,
                  datasets: [{
                    label: '회원 활동',
                    data: visitorData,
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                  }, {
                    label: 'AI 분석',
                    data: aiData,
                    borderColor: '#8b5cf6',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } },
                  scales: { y: { beginAtZero: true } }
                }
              });
            }
            
            // Service Usage Chart - Load from API
            const serviceCtx = document.getElementById('serviceChart');
            if (serviceCtx) {
              let serviceLabels = ['지원사업 매칭', '공급사 찾기', 'ISO 인증', 'SPEC 평가'];
              let serviceData = [0, 0, 0, 0];
              
              try {
                const res = await fetch('/api/admin/chart/services');
                if (res.ok) {
                  const data = await res.json();
                  serviceLabels = data.labels || serviceLabels;
                  serviceData = data.data || serviceData;
                }
              } catch(e) {
                console.log('Services chart data load error:', e);
              }
              
              new Chart(serviceCtx, {
                type: 'doughnut',
                data: {
                  labels: serviceLabels,
                  datasets: [{
                    data: serviceData,
                    backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }
              });
            }
          }
          
          // Search functions
          function searchCompanies() {
            searchQuery = document.getElementById('company-search').value;
            loadCompanies(1);
          }
          
          function searchGrants() {
            const q = document.getElementById('grant-search').value;
            console.log('Search grants:', q);
          }
          
          function searchUsers() {
            const q = document.getElementById('user-search').value;
            console.log('Search users:', q);
          }
          
          // ==========================================
          // Company Detail Modal & AI Matching
          // ==========================================
          
          let currentCompanyId = null;
          let currentCompanyData = null;
          
          async function openCompanyDetail(id) {
            currentCompanyId = id;
            const modal = document.getElementById('company-detail-modal');
            modal.classList.remove('hidden');
            
            // Reset UI
            document.getElementById('ai-match-result').classList.add('hidden');
            document.getElementById('ai-match-btn').disabled = false;
            document.getElementById('ai-match-btn').innerHTML = '<i class="fas fa-robot mr-2"></i> AI 지원사업 매칭 실행';
            
            try {
              const res = await fetch('/api/admin/companies/' + id + '/detail');
              if (res.ok) {
                const data = await res.json();
                if (data.success && data.company) {
                  currentCompanyData = data.company;
                  renderCompanyDetail(data.company);
                }
              }
            } catch (e) {
              console.error('Company detail error:', e);
            }
          }
          
          function closeCompanyModal() {
            document.getElementById('company-detail-modal').classList.add('hidden');
            currentCompanyId = null;
            currentCompanyData = null;
          }
          
          function formatNumber(num) {
            if (!num) return '-';
            const n = parseInt(num);
            if (isNaN(n)) return num;
            if (n >= 100000000) return (n / 100000000).toFixed(1) + '억원';
            if (n >= 10000) return (n / 10000).toFixed(0) + '만원';
            return n.toLocaleString() + '원';
          }
          
          function renderCompanyDetail(c) {
            // 기본 정보
            document.getElementById('modal-company-name').textContent = c.name || '-';
            document.getElementById('modal-company-code').textContent = '종목코드: ' + (c.biz_num || '-');
            document.getElementById('modal-ceo').textContent = c.ceo_name || '-';
            document.getElementById('modal-founding').textContent = c.founding_date || '-';
            document.getElementById('modal-industry').textContent = c.industry_code || '-';
            
            // 상세 정보
            const detail = c.detail || {};
            document.getElementById('modal-address').textContent = detail.adres || '-';
            document.getElementById('modal-phone').textContent = detail.phn_no || '-';
            const website = detail.hm_url;
            if (website && website !== '-') {
              document.getElementById('modal-website').innerHTML = '<a href="' + (website.startsWith('http') ? website : 'http://' + website) + '" target="_blank" class="text-blue-600 hover:underline">' + website + '</a>';
            } else {
              document.getElementById('modal-website').textContent = '-';
            }
            
            // 재무 정보
            const fin = c.financial || {};
            document.getElementById('modal-revenue').textContent = formatNumber(fin.revenue);
            document.getElementById('modal-operating').textContent = formatNumber(fin.operating_profit);
            document.getElementById('modal-net-income').textContent = formatNumber(fin.net_income);
            document.getElementById('modal-assets').textContent = formatNumber(fin.total_assets);
            document.getElementById('modal-liabilities').textContent = formatNumber(fin.total_liabilities);
            document.getElementById('modal-equity').textContent = formatNumber(fin.total_equity);
            
            // 직원 정보
            document.getElementById('modal-employees').textContent = c.employee_count ? c.employee_count.toLocaleString() + '명' : '-';
            document.getElementById('modal-avg-salary').textContent = detail.avg_salary ? formatNumber(detail.avg_salary) : '-';
            
            // 임원 정보
            const execs = c.executives || [];
            if (execs.length > 0) {
              document.getElementById('modal-executives').innerHTML = execs.map(e => 
                '<div class="flex items-center justify-between p-2 bg-white rounded-lg">' +
                '<span class="font-medium text-slate-800">' + (e.name || '-') + '</span>' +
                '<span class="text-slate-500">' + (e.position || '-') + ' / ' + (e.role || '-') + '</span>' +
                '</div>'
              ).join('');
            } else {
              document.getElementById('modal-executives').innerHTML = '<p class="text-slate-400">임원 정보 없음</p>';
            }
            
            // 주주 정보
            const shareholders = c.shareholders || [];
            if (shareholders.length > 0) {
              document.getElementById('modal-shareholders').innerHTML = shareholders.map(s => 
                '<div class="flex items-center justify-between p-2 bg-white rounded-lg">' +
                '<span class="font-medium text-slate-800">' + (s.name || '-') + '</span>' +
                '<span class="text-cyan-700">' + (s.ratio || '-') + '%</span>' +
                '</div>'
              ).join('');
            } else {
              document.getElementById('modal-shareholders').innerHTML = '<p class="text-slate-400">주주 정보 없음</p>';
            }
          }
          
          async function runAIMatching() {
            if (!currentCompanyData) return;
            
            const btn = document.getElementById('ai-match-btn');
            const resultDiv = document.getElementById('ai-match-result');
            const contentDiv = document.getElementById('ai-match-content');
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> AI 분석 중...';
            
            try {
              const res = await fetch('/api/support/ai-match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  companyId: currentCompanyId,
                  companyInfo: {
                    name: currentCompanyData.name,
                    industry: currentCompanyData.industry_code,
                    employeeCount: currentCompanyData.employee_count,
                    revenue: currentCompanyData.financial?.revenue,
                    foundingDate: currentCompanyData.founding_date,
                    certifications: currentCompanyData.certifications
                  }
                })
              });
              
              const data = await res.json();
              
              if (data.success && data.matches) {
                resultDiv.classList.remove('hidden');
                
                // AI 분석 여부 표시
                let headerHtml = '';
                if (data.aiPowered) {
                  headerHtml = '<div class="mb-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200">' +
                    '<div class="flex items-center justify-between">' +
                    '<span class="text-green-700 font-medium"><i class="fas fa-brain mr-2"></i>GPT-4o-mini AI 분석 완료</span>' +
                    '<span class="text-xs text-green-600">' + (data.tokensUsed || 0) + ' 토큰 사용</span>' +
                    '</div>' +
                    (data.analysis ? '<p class="text-sm text-green-800 mt-2">' + data.analysis + '</p>' : '') +
                    '</div>';
                } else {
                  headerHtml = '<div class="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">' +
                    '<span class="text-amber-700 text-sm"><i class="fas fa-info-circle mr-2"></i>기본 매칭 알고리즘 사용 중. 관리자 설정에서 OpenAI API 키를 추가하면 더 정교한 AI 분석이 가능합니다.</span>' +
                    '</div>';
                }
                
                contentDiv.innerHTML = headerHtml + data.matches.map((m, i) => 
                  '<div class="p-4 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition">' +
                  '<div class="flex items-start justify-between">' +
                  '<div class="flex-1">' +
                  '<h5 class="font-semibold text-slate-800">' + (i+1) + '. ' + m.title + '</h5>' +
                  '<p class="text-sm text-slate-600 mt-1"><i class="fas fa-building text-slate-400 mr-1"></i>' + (m.agency || '-') + '</p>' +
                  (m.description ? '<p class="text-sm text-slate-500 mt-2">' + (m.description || '').substring(0, 150) + '...</p>' : '') +
                  '</div>' +
                  '<div class="ml-4 text-right">' +
                  '<div class="w-16 h-16 rounded-full bg-gradient-to-br ' + (m.score >= 80 ? 'from-green-400 to-emerald-500' : m.score >= 60 ? 'from-blue-400 to-indigo-500' : 'from-amber-400 to-orange-500') + ' flex items-center justify-center">' +
                  '<span class="text-white font-bold text-lg">' + m.score + '</span>' +
                  '</div>' +
                  '<p class="text-xs text-slate-500 mt-1">매칭 점수</p>' +
                  '</div>' +
                  '</div>' +
                  '<div class="mt-3 p-2 bg-indigo-50 rounded-lg">' +
                  '<p class="text-sm text-indigo-700"><i class="fas fa-lightbulb text-amber-500 mr-2"></i>' + (m.reason || 'AI 추천') + '</p>' +
                  '</div>' +
                  '</div>'
                ).join('');
                
                if (data.message) {
                  contentDiv.innerHTML += '<p class="text-center text-slate-500 text-sm mt-4">' + data.message + '</p>';
                }
              } else {
                resultDiv.classList.remove('hidden');
                contentDiv.innerHTML = '<p class="text-slate-500 text-center py-4">매칭 결과가 없습니다. 지원사업 데이터를 추가해주세요.</p>';
              }
            } catch (e) {
              resultDiv.classList.remove('hidden');
              contentDiv.innerHTML = '<p class="text-red-500 text-center py-4">AI 매칭 오류: ' + e.message + '</p>';
            }
            
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-robot mr-2"></i> AI 지원사업 매칭 실행';
          }
          
          async function quickAIMatch(id) {
            openCompanyDetail(id);
            // 모달이 열리고 데이터 로드 후 자동 매칭
            setTimeout(() => {
              if (currentCompanyData) {
                runAIMatching();
              }
            }, 1000);
          }
          
          // ==========================================
          // SEO Management Functions
          // ==========================================
          
          async function loadSeoSettings() {
            try {
              const res = await fetch('/api/admin/seo');
              if (res.ok) {
                const data = await res.json();
                if (data.settings) {
                  const s = data.settings;
                  document.getElementById('seo-title').value = s.title || '';
                  document.getElementById('seo-url').value = s.url || '';
                  document.getElementById('seo-description').value = s.description || '';
                  document.getElementById('seo-keywords').value = s.keywords || '';
                  document.getElementById('seo-og-title').value = s.og_title || '';
                  document.getElementById('seo-og-image').value = s.og_image || '';
                  document.getElementById('seo-og-description').value = s.og_description || '';
                  document.getElementById('seo-company-name').value = s.company_name || '';
                  document.getElementById('seo-phone').value = s.phone || '';
                  document.getElementById('seo-email').value = s.email || '';
                  document.getElementById('seo-address').value = s.address || '';
                  updateSeoPreview();
                }
              }
            } catch(e) {
              console.log('SEO settings load error:', e);
            }
          }
          
          function updateSeoPreview() {
            const title = document.getElementById('seo-title').value || 'MCE 경영인증평가원';
            const url = document.getElementById('seo-url').value || 'https://www.mce.or.kr';
            const desc = document.getElementById('seo-description').value || '사이트 설명...';
            
            document.getElementById('preview-title').textContent = title;
            document.getElementById('preview-url').textContent = url;
            document.getElementById('preview-desc').textContent = desc.length > 160 ? desc.substring(0, 157) + '...' : desc;
          }
          
          async function saveSeoSettings() {
            const statusEl = document.getElementById('seo-status');
            statusEl.classList.remove('hidden', 'bg-green-50', 'bg-red-50');
            statusEl.classList.add('bg-blue-50');
            statusEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>저장 중...';
            
            const settings = {
              title: document.getElementById('seo-title').value,
              url: document.getElementById('seo-url').value,
              description: document.getElementById('seo-description').value,
              keywords: document.getElementById('seo-keywords').value,
              og_title: document.getElementById('seo-og-title').value,
              og_image: document.getElementById('seo-og-image').value,
              og_description: document.getElementById('seo-og-description').value,
              company_name: document.getElementById('seo-company-name').value,
              phone: document.getElementById('seo-phone').value,
              email: document.getElementById('seo-email').value,
              address: document.getElementById('seo-address').value
            };
            
            try {
              const res = await fetch('/api/admin/seo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings)
              });
              
              if (res.ok) {
                statusEl.classList.remove('bg-blue-50');
                statusEl.classList.add('bg-green-50');
                statusEl.innerHTML = '<i class="fas fa-check-circle text-green-600 mr-2"></i><span class="text-green-700">SEO 설정이 저장되었습니다.</span>';
              } else {
                throw new Error('저장 실패');
              }
            } catch(e) {
              statusEl.classList.remove('bg-blue-50');
              statusEl.classList.add('bg-red-50');
              statusEl.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i><span class="text-red-700">저장 실패: ' + e.message + '</span>';
            }
            
            setTimeout(() => { statusEl.classList.add('hidden'); }, 3000);
          }
          
          // Add event listeners for real-time preview
          if (document.getElementById('seo-title')) {
            ['seo-title', 'seo-url', 'seo-description'].forEach(id => {
              const el = document.getElementById(id);
              if (el) el.addEventListener('input', updateSeoPreview);
            });
          }
          
          // ==========================================
          // API Key Management Functions
          // ==========================================
          
          function togglePassword(inputId) {
            const input = document.getElementById(inputId);
            const icon = input.nextElementSibling.querySelector('i');
            if (input.type === 'password') {
              input.type = 'text';
              icon.classList.remove('fa-eye');
              icon.classList.add('fa-eye-slash');
            } else {
              input.type = 'password';
              icon.classList.remove('fa-eye-slash');
              icon.classList.add('fa-eye');
            }
          }
          
          async function loadApiKeys() {
            try {
              const res = await fetch('/api/admin/api-keys');
              if (res.ok) {
                const data = await res.json();
                if (data.dart_key) {
                  document.getElementById('api-dart-key').value = data.dart_key;
                }
                if (data.openai_key) {
                  document.getElementById('api-openai-key').value = data.openai_key;
                }
              }
            } catch(e) {
              console.log('API keys load error:', e);
            }
          }
          
          async function saveApiKeys() {
            const statusEl = document.getElementById('api-status');
            statusEl.classList.remove('hidden', 'bg-green-50', 'bg-red-50');
            statusEl.classList.add('bg-blue-50');
            statusEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>저장 중...';
            
            const keys = {
              dart_key: document.getElementById('api-dart-key').value,
              openai_key: document.getElementById('api-openai-key').value
            };
            
            try {
              const res = await fetch('/api/admin/api-keys', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(keys)
              });
              
              if (res.ok) {
                statusEl.classList.remove('bg-blue-50');
                statusEl.classList.add('bg-green-50');
                statusEl.innerHTML = '<i class="fas fa-check-circle text-green-600 mr-2"></i><span class="text-green-700">API 키가 저장되었습니다.</span>';
              } else {
                throw new Error('저장 실패');
              }
            } catch(e) {
              statusEl.classList.remove('bg-blue-50');
              statusEl.classList.add('bg-red-50');
              statusEl.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i><span class="text-red-700">저장 실패: ' + e.message + '</span>';
            }
            
            setTimeout(() => { statusEl.classList.add('hidden'); }, 3000);
          }
          
          async function testOpenAIConnection() {
            const el = document.getElementById('openai-status');
            el.innerHTML = '<span class="text-blue-600">연결 테스트 중...</span>';
            try {
              const res = await fetch('/api/admin/openai/test');
              const json = await res.json();
              el.innerHTML = json.success 
                ? '<span class="text-green-600">✅ 연결 성공: ' + (json.model || 'GPT-4o') + '</span>' 
                : '<span class="text-red-600">❌ 연결 실패: ' + (json.message || 'Error') + '</span>';
            } catch(e) { 
              el.innerHTML = '<span class="text-red-600">❌ 연결 오류</span>'; 
            }
          }
          
          async function generateSitemap() {
            if(confirm('사이트맵을 생성하시겠습니까?')) {
              try {
                const res = await fetch('/api/admin/sitemap', { method: 'POST' });
                const json = await res.json();
                if (json.success) {
                  alert('사이트맵이 생성되었습니다.\\n' + json.url);
                } else {
                  alert('사이트맵 생성 실패: ' + (json.error || '알 수 없는 오류'));
                }
              } catch(e) {
                alert('사이트맵 생성 오류');
              }
            }
          }
          
          // Load settings if on settings tab
          if ('${activeTab}' === 'settings') {
            loadSeoSettings();
            loadApiKeys();
          }
          
          // ==========================================
          // 기업 DB 빠른 설정 Functions
          // ==========================================
          
          async function seedCompanies() {
            if (!confirm('30개의 기본 기업 데이터를 추가하시겠습니까?\\n(중복 데이터는 자동으로 스킵됩니다)')) return;
            
            const statusEl = document.getElementById('quick-action-status');
            const messageEl = document.getElementById('quick-action-message');
            statusEl.classList.remove('hidden');
            messageEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>기본 기업 데이터를 추가하는 중...';
            
            try {
              const res = await fetch('/api/admin/companies/seed', { method: 'POST' });
              const result = await res.json();
              
              if (result.success) {
                messageEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + result.message;
                loadCompanies(1);
              } else {
                messageEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>오류: ' + (result.error || '알 수 없는 오류');
              }
            } catch(e) {
              messageEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>오류: ' + e.message;
            }
            
            setTimeout(() => { statusEl.classList.add('hidden'); }, 5000);
          }
          
          function generateCompaniesWithAI() {
            document.getElementById('ai-gen-modal').classList.remove('hidden');
          }
          
          function closeAIModal() {
            document.getElementById('ai-gen-modal').classList.add('hidden');
            document.getElementById('ai-gen-status').classList.add('hidden');
          }
          
          async function executeAIGeneration() {
            const industry = document.getElementById('ai-industry').value;
            const region = document.getElementById('ai-region').value;
            const count = parseInt(document.getElementById('ai-count').value);
            
            const statusEl = document.getElementById('ai-gen-status');
            const btn = document.getElementById('ai-gen-btn');
            
            statusEl.classList.remove('hidden');
            statusEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>AI가 ' + industry + ' 분야의 기업 ' + count + '개를 생성 중... (약 10-30초 소요)';
            btn.disabled = true;
            btn.classList.add('opacity-50', 'cursor-not-allowed');
            
            try {
              const res = await fetch('/api/admin/companies/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ industry, region, count })
              });
              const result = await res.json();
              
              if (result.success) {
                statusEl.innerHTML = '<i class="fas fa-check-circle text-green-600 mr-2"></i>' + result.message;
                loadCompanies(1);
                
                // Close modal after 2 seconds on success
                setTimeout(() => {
                  closeAIModal();
                  // Show message in quick action status
                  const quickStatus = document.getElementById('quick-action-status');
                  const quickMsg = document.getElementById('quick-action-message');
                  quickStatus.classList.remove('hidden');
                  quickMsg.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + result.message;
                  setTimeout(() => { quickStatus.classList.add('hidden'); }, 5000);
                }, 2000);
              } else {
                statusEl.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>' + (result.error || '생성 실패');
              }
            } catch(e) {
              statusEl.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>오류: ' + e.message;
            }
            
            btn.disabled = false;
            btn.classList.remove('opacity-50', 'cursor-not-allowed');
          }
          
          async function clearAllCompanies() {
            if (!confirm('⚠️ 정말로 모든 기업 데이터를 삭제하시겠습니까?\\n\\n이 작업은 되돌릴 수 없습니다.')) return;
            if (!confirm('마지막 확인: 전체 기업 DB가 삭제됩니다. 계속하시겠습니까?')) return;
            
            const statusEl = document.getElementById('quick-action-status');
            const messageEl = document.getElementById('quick-action-message');
            statusEl.classList.remove('hidden');
            messageEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>모든 기업 데이터를 삭제하는 중...';
            
            try {
              const res = await fetch('/api/admin/companies/clear', { method: 'POST' });
              const result = await res.json();
              
              if (result.success) {
                messageEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>' + result.message;
                loadCompanies(1);
              } else {
                messageEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>오류: ' + (result.error || '알 수 없는 오류');
              }
            } catch(e) {
              messageEl.innerHTML = '<i class="fas fa-exclamation-circle mr-2"></i>오류: ' + e.message;
            }
            
            setTimeout(() => { statusEl.classList.add('hidden'); }, 5000);
          }
          
          // ==========================================
          // DART API Integration Functions
          // ==========================================
          
          async function fetchFromDart() {
            const codesInput = document.getElementById('dart-corp-codes').value.trim();
            if (!codesInput) {
              alert('기업코드를 입력해주세요.\\n쉼표로 구분하여 여러 개 입력 가능합니다.');
              return;
            }
            
            const codes = codesInput.split(',').map(c => c.trim()).filter(c => c);
            if (codes.length === 0) {
              alert('유효한 기업코드를 입력해주세요.');
              return;
            }
            
            const statusEl = document.getElementById('dart-fetch-status');
            statusEl.classList.remove('hidden');
            document.getElementById('dart-fetch-message').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>DART에서 기업 정보를 수집하는 중... (' + codes.length + '개 기업)';
            
            try {
              const res = await fetch('/api/admin/dart/fetch-companies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ corp_codes: codes })
              });
              
              const result = await res.json();
              
              if (result.success) {
                document.getElementById('dart-fetch-message').innerHTML = 
                  '<i class="fas fa-check-circle text-green-600 mr-2"></i>' +
                  '<span class="text-green-800">수집 완료! ' + result.inserted + '건 추가, ' + result.updated + '건 업데이트, ' + result.errors + '건 오류</span>';
                
                // Reload the company list
                loadCompanies(1);
              } else {
                document.getElementById('dart-fetch-message').innerHTML = 
                  '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>' +
                  '<span class="text-red-800">수집 실패: ' + (result.error || '알 수 없는 오류') + '</span>';
              }
            } catch(e) {
              document.getElementById('dart-fetch-message').innerHTML = 
                '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>' +
                '<span class="text-red-800">오류: ' + e.message + '</span>';
            }
          }
          
          async function showSampleCodes() {
            const sampleDiv = document.getElementById('sample-codes');
            const listDiv = document.getElementById('sample-codes-list');
            
            if (!sampleDiv.classList.contains('hidden')) {
              sampleDiv.classList.add('hidden');
              return;
            }
            
            try {
              const res = await fetch('/api/admin/dart/sample-codes');
              const data = await res.json();
              
              if (data.codes && data.codes.length > 0) {
                listDiv.innerHTML = data.codes.map(c => 
                  '<button type="button" onclick="addDartCode(\\'' + c.code + '\\')" class="px-2 py-1 bg-white border border-slate-200 rounded text-xs hover:bg-blue-50 hover:border-blue-300 transition">' +
                  '<span class="font-mono text-blue-600">' + c.code + '</span> ' + c.name +
                  '</button>'
                ).join('');
              }
              
              sampleDiv.classList.remove('hidden');
            } catch(e) {
              console.log('Sample codes load error:', e);
            }
          }
          
          function addDartCode(code) {
            const input = document.getElementById('dart-corp-codes');
            const current = input.value.trim();
            if (current) {
              // Check if already exists
              const existing = current.split(',').map(c => c.trim());
              if (!existing.includes(code)) {
                input.value = current + ',' + code;
              }
            } else {
              input.value = code;
            }
          }
          
          // Clear cache function
          async function clearCache() {
            if(confirm('캐시를 초기화하시겠습니까?')) {
              try {
                const res = await fetch('/api/admin/cache/clear', { method: 'POST' });
                const json = await res.json();
                alert(json.success ? '캐시가 초기화되었습니다.' : '캐시 초기화 실패');
              } catch(e) {
                alert('캐시 초기화 오류');
              }
            }
          }
          
          // ==========================================
          // Terms Management Functions
          // ==========================================
          let termsData = [];
          
          async function loadTerms() {
            try {
              const res = await fetch('/api/admin/terms');
              if (res.ok) {
                const data = await res.json();
                termsData = data.terms || [];
                renderTermsList();
              }
            } catch(e) {
              console.log('Terms load error:', e);
            }
          }
          
          function renderTermsList() {
            const el = document.getElementById('terms-list');
            if (!el) return;
            
            if (termsData.length === 0) {
              el.innerHTML = '<div class="text-center text-slate-400 py-4">등록된 약관이 없습니다.</div>';
              return;
            }
            
            el.innerHTML = termsData.map(t => 
              '<div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">' +
              '<div class="flex items-center">' +
              '<span class="px-2 py-1 text-xs rounded ' + 
                (t.term_type === 'service' ? 'bg-blue-100 text-blue-700' : 
                 t.term_type === 'privacy' ? 'bg-green-100 text-green-700' : 
                 'bg-purple-100 text-purple-700') + '">' +
                (t.term_type === 'service' ? '이용약관' : t.term_type === 'privacy' ? '개인정보' : '마케팅') + '</span>' +
              '<span class="ml-3 font-medium text-slate-800">' + t.title + '</span>' +
              '<span class="ml-2 text-xs text-slate-400">v' + t.version + '</span>' +
              (t.is_active ? '<span class="ml-2 w-2 h-2 bg-green-500 rounded-full"></span>' : '') +
              '</div>' +
              '<div class="flex space-x-2">' +
              '<button onclick="editTerm(' + t.id + ')" class="px-3 py-1.5 text-xs bg-slate-200 text-slate-700 rounded hover:bg-slate-300">수정</button>' +
              '<button onclick="deleteTerm(' + t.id + ')" class="px-3 py-1.5 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200">삭제</button>' +
              '</div></div>'
            ).join('');
          }
          
          function openTermModal(term = null) {
            const html = '<div id="term-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">' +
              '<div class="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">' +
              '<div class="p-5 border-b flex justify-between items-center">' +
              '<h3 class="text-lg font-semibold">' + (term ? '약관 수정' : '새 약관 등록') + '</h3>' +
              '<button onclick="closeTermModal()" class="p-2 hover:bg-slate-100 rounded-lg"><i class="fas fa-times"></i></button>' +
              '</div>' +
              '<div class="p-5 space-y-4">' +
              '<input type="hidden" id="term-id" value="' + (term?.id || '') + '">' +
              '<div class="grid grid-cols-2 gap-4">' +
              '<div><label class="block text-sm font-medium mb-1">약관 유형</label>' +
              '<select id="term-type" class="w-full px-3 py-2 border rounded-lg">' +
              '<option value="service"' + (term?.term_type === 'service' ? ' selected' : '') + '>이용약관</option>' +
              '<option value="privacy"' + (term?.term_type === 'privacy' ? ' selected' : '') + '>개인정보처리방침</option>' +
              '<option value="marketing"' + (term?.term_type === 'marketing' ? ' selected' : '') + '>마케팅 동의</option>' +
              '</select></div>' +
              '<div><label class="block text-sm font-medium mb-1">버전</label>' +
              '<input type="text" id="term-version" value="' + (term?.version || '1.0') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '</div>' +
              '<div><label class="block text-sm font-medium mb-1">제목</label>' +
              '<input type="text" id="term-title" value="' + (term?.title || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">내용 (HTML 지원)</label>' +
              '<textarea id="term-content" rows="12" class="w-full px-3 py-2 border rounded-lg font-mono text-sm">' + (term?.content || '') + '</textarea></div>' +
              '<div class="flex items-center space-x-4">' +
              '<label class="flex items-center"><input type="checkbox" id="term-required"' + (term?.is_required ? ' checked' : '') + ' class="mr-2">필수 동의</label>' +
              '<label class="flex items-center"><input type="checkbox" id="term-active"' + (term?.is_active !== 0 ? ' checked' : '') + ' class="mr-2">활성화</label>' +
              '</div></div>' +
              '<div class="p-5 border-t flex justify-end space-x-2">' +
              '<button onclick="closeTermModal()" class="px-4 py-2 border rounded-lg hover:bg-slate-50">취소</button>' +
              '<button onclick="saveTerm()" class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700">저장</button>' +
              '</div></div></div>';
            
            document.body.insertAdjacentHTML('beforeend', html);
          }
          
          function closeTermModal() {
            document.getElementById('term-modal')?.remove();
          }
          
          function editTerm(id) {
            const term = termsData.find(t => t.id === id);
            if (term) openTermModal(term);
          }
          
          async function saveTerm() {
            const term = {
              id: document.getElementById('term-id').value || null,
              term_type: document.getElementById('term-type').value,
              title: document.getElementById('term-title').value,
              content: document.getElementById('term-content').value,
              version: document.getElementById('term-version').value,
              is_required: document.getElementById('term-required').checked,
              is_active: document.getElementById('term-active').checked
            };
            
            try {
              const res = await fetch('/api/admin/terms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(term)
              });
              
              if (res.ok) {
                closeTermModal();
                loadTerms();
                alert('약관이 저장되었습니다.');
              }
            } catch(e) {
              alert('저장 실패: ' + e.message);
            }
          }
          
          async function deleteTerm(id) {
            if (!confirm('이 약관을 삭제하시겠습니까?')) return;
            
            try {
              const res = await fetch('/api/admin/terms/' + id, { method: 'DELETE' });
              if (res.ok) {
                loadTerms();
                alert('삭제되었습니다.');
              }
            } catch(e) {
              alert('삭제 실패');
            }
          }
          
          // ==========================================
          // Popup/Banner Management Functions
          // ==========================================
          let popupsData = [];
          let bannersData = [];
          
          async function loadPopups() {
            try {
              const res = await fetch('/api/admin/popups');
              if (res.ok) {
                const data = await res.json();
                popupsData = data.popups || [];
                renderPopupsList();
              }
            } catch(e) { console.log('Popups load error:', e); }
          }
          
          async function loadBanners() {
            try {
              const res = await fetch('/api/admin/banners');
              if (res.ok) {
                const data = await res.json();
                bannersData = data.banners || [];
                renderBannersList();
              }
            } catch(e) { console.log('Banners load error:', e); }
          }
          
          function renderPopupsList() {
            const el = document.getElementById('popups-list');
            if (!el) return;
            if (popupsData.length === 0) {
              el.innerHTML = '<div class="text-center text-slate-400 py-4 text-sm">등록된 팝업이 없습니다.</div>';
              return;
            }
            el.innerHTML = popupsData.map(p => 
              '<div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">' +
              '<div>' +
              '<span class="font-medium text-slate-800">' + p.title + '</span>' +
              (p.is_active ? '<span class="ml-2 text-xs text-green-600">● 활성</span>' : '<span class="ml-2 text-xs text-slate-400">○ 비활성</span>') +
              '</div>' +
              '<div class="flex space-x-1">' +
              '<button onclick="editPopup(' + p.id + ')" class="p-1.5 text-slate-500 hover:bg-slate-200 rounded"><i class="fas fa-edit"></i></button>' +
              '<button onclick="deletePopup(' + p.id + ')" class="p-1.5 text-red-500 hover:bg-red-100 rounded"><i class="fas fa-trash"></i></button>' +
              '</div></div>'
            ).join('');
          }
          
          function renderBannersList() {
            const el = document.getElementById('banners-list');
            if (!el) return;
            if (bannersData.length === 0) {
              el.innerHTML = '<div class="text-center text-slate-400 py-4 text-sm">등록된 배너가 없습니다.</div>';
              return;
            }
            el.innerHTML = bannersData.map(b => 
              '<div class="flex items-center justify-between p-3 bg-slate-50 rounded-lg text-sm">' +
              '<div>' +
              '<span class="font-medium text-slate-800">' + b.title + '</span>' +
              '<span class="ml-2 text-xs text-slate-500">' + b.banner_type + '</span>' +
              (b.is_active ? '<span class="ml-2 text-xs text-green-600">● 활성</span>' : '') +
              '</div>' +
              '<div class="flex space-x-1">' +
              '<button onclick="editBanner(' + b.id + ')" class="p-1.5 text-slate-500 hover:bg-slate-200 rounded"><i class="fas fa-edit"></i></button>' +
              '<button onclick="deleteBanner(' + b.id + ')" class="p-1.5 text-red-500 hover:bg-red-100 rounded"><i class="fas fa-trash"></i></button>' +
              '</div></div>'
            ).join('');
          }
          
          function openPopupModal(popup = null) {
            const html = '<div id="popup-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">' +
              '<div class="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">' +
              '<div class="p-5 border-b flex justify-between items-center">' +
              '<h3 class="text-lg font-semibold">' + (popup ? '팝업 수정' : '새 팝업') + '</h3>' +
              '<button onclick="closePopupModal()" class="p-2 hover:bg-slate-100 rounded-lg"><i class="fas fa-times"></i></button>' +
              '</div>' +
              '<div class="p-5 space-y-4">' +
              '<input type="hidden" id="popup-id" value="' + (popup?.id || '') + '">' +
              '<div><label class="block text-sm font-medium mb-1">제목</label>' +
              '<input type="text" id="popup-title" value="' + (popup?.title || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">내용</label>' +
              '<textarea id="popup-content" rows="4" class="w-full px-3 py-2 border rounded-lg">' + (popup?.content || '') + '</textarea></div>' +
              '<div class="grid grid-cols-2 gap-4">' +
              '<div><label class="block text-sm font-medium mb-1">이미지 URL</label>' +
              '<input type="text" id="popup-image" value="' + (popup?.image_url || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">링크 URL</label>' +
              '<input type="text" id="popup-link" value="' + (popup?.link_url || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '</div>' +
              '<div class="grid grid-cols-3 gap-4">' +
              '<div><label class="block text-sm font-medium mb-1">너비(px)</label>' +
              '<input type="number" id="popup-width" value="' + (popup?.width || 500) + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">높이(px)</label>' +
              '<input type="number" id="popup-height" value="' + (popup?.height || 400) + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">위치</label>' +
              '<select id="popup-position" class="w-full px-3 py-2 border rounded-lg">' +
              '<option value="center"' + (popup?.position === 'center' ? ' selected' : '') + '>가운데</option>' +
              '<option value="top"' + (popup?.position === 'top' ? ' selected' : '') + '>상단</option>' +
              '<option value="bottom"' + (popup?.position === 'bottom' ? ' selected' : '') + '>하단</option>' +
              '</select></div></div>' +
              '<div class="grid grid-cols-2 gap-4">' +
              '<div><label class="block text-sm font-medium mb-1">시작일</label>' +
              '<input type="date" id="popup-start" value="' + (popup?.start_date || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">종료일</label>' +
              '<input type="date" id="popup-end" value="' + (popup?.end_date || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '</div>' +
              '<div class="flex items-center space-x-4">' +
              '<label class="flex items-center"><input type="checkbox" id="popup-today-close"' + (popup?.show_today_close ? ' checked' : '') + ' class="mr-2">오늘 하루 안보기</label>' +
              '<label class="flex items-center"><input type="checkbox" id="popup-active"' + (popup?.is_active !== 0 ? ' checked' : '') + ' class="mr-2">활성화</label>' +
              '</div></div>' +
              '<div class="p-5 border-t flex justify-end space-x-2">' +
              '<button onclick="closePopupModal()" class="px-4 py-2 border rounded-lg hover:bg-slate-50">취소</button>' +
              '<button onclick="savePopup()" class="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">저장</button>' +
              '</div></div></div>';
            document.body.insertAdjacentHTML('beforeend', html);
          }
          
          function closePopupModal() { document.getElementById('popup-modal')?.remove(); }
          function editPopup(id) { const p = popupsData.find(x => x.id === id); if (p) openPopupModal(p); }
          
          async function savePopup() {
            const popup = {
              id: document.getElementById('popup-id').value || null,
              title: document.getElementById('popup-title').value,
              content: document.getElementById('popup-content').value,
              image_url: document.getElementById('popup-image').value,
              link_url: document.getElementById('popup-link').value,
              width: parseInt(document.getElementById('popup-width').value),
              height: parseInt(document.getElementById('popup-height').value),
              position: document.getElementById('popup-position').value,
              start_date: document.getElementById('popup-start').value,
              end_date: document.getElementById('popup-end').value,
              show_today_close: document.getElementById('popup-today-close').checked,
              is_active: document.getElementById('popup-active').checked
            };
            
            try {
              const res = await fetch('/api/admin/popups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(popup)
              });
              if (res.ok) { closePopupModal(); loadPopups(); alert('팝업이 저장되었습니다.'); }
            } catch(e) { alert('저장 실패'); }
          }
          
          async function deletePopup(id) {
            if (!confirm('이 팝업을 삭제하시겠습니까?')) return;
            try {
              const res = await fetch('/api/admin/popups/' + id, { method: 'DELETE' });
              if (res.ok) { loadPopups(); }
            } catch(e) { alert('삭제 실패'); }
          }
          
          function openBannerModal(banner = null) {
            const html = '<div id="banner-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">' +
              '<div class="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto m-4">' +
              '<div class="p-5 border-b flex justify-between items-center">' +
              '<h3 class="text-lg font-semibold">' + (banner ? '배너 수정' : '새 배너') + '</h3>' +
              '<button onclick="closeBannerModal()" class="p-2 hover:bg-slate-100 rounded-lg"><i class="fas fa-times"></i></button>' +
              '</div>' +
              '<div class="p-5 space-y-4">' +
              '<input type="hidden" id="banner-id" value="' + (banner?.id || '') + '">' +
              '<div><label class="block text-sm font-medium mb-1">제목</label>' +
              '<input type="text" id="banner-title" value="' + (banner?.title || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">부제목</label>' +
              '<input type="text" id="banner-subtitle" value="' + (banner?.subtitle || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div class="grid grid-cols-2 gap-4">' +
              '<div><label class="block text-sm font-medium mb-1">이미지 URL</label>' +
              '<input type="text" id="banner-image" value="' + (banner?.image_url || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '<div><label class="block text-sm font-medium mb-1">링크 URL</label>' +
              '<input type="text" id="banner-link" value="' + (banner?.link_url || '') + '" class="w-full px-3 py-2 border rounded-lg"></div>' +
              '</div>' +
              '<div class="grid grid-cols-2 gap-4">' +
              '<div><label class="block text-sm font-medium mb-1">배너 유형</label>' +
              '<select id="banner-type" class="w-full px-3 py-2 border rounded-lg">' +
              '<option value="main"' + (banner?.banner_type === 'main' ? ' selected' : '') + '>메인</option>' +
              '<option value="sub"' + (banner?.banner_type === 'sub' ? ' selected' : '') + '>서브</option>' +
              '<option value="sidebar"' + (banner?.banner_type === 'sidebar' ? ' selected' : '') + '>사이드바</option>' +
              '</select></div>' +
              '<div><label class="block text-sm font-medium mb-1">배경색</label>' +
              '<input type="color" id="banner-bg-color" value="' + (banner?.background_color || '#3B82F6') + '" class="w-full h-10 border rounded-lg"></div>' +
              '</div>' +
              '<div class="flex items-center"><label class="flex items-center"><input type="checkbox" id="banner-active"' + (banner?.is_active !== 0 ? ' checked' : '') + ' class="mr-2">활성화</label></div>' +
              '</div>' +
              '<div class="p-5 border-t flex justify-end space-x-2">' +
              '<button onclick="closeBannerModal()" class="px-4 py-2 border rounded-lg hover:bg-slate-50">취소</button>' +
              '<button onclick="saveBanner()" class="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">저장</button>' +
              '</div></div></div>';
            document.body.insertAdjacentHTML('beforeend', html);
          }
          
          function closeBannerModal() { document.getElementById('banner-modal')?.remove(); }
          function editBanner(id) { const b = bannersData.find(x => x.id === id); if (b) openBannerModal(b); }
          
          async function saveBanner() {
            const banner = {
              id: document.getElementById('banner-id').value || null,
              title: document.getElementById('banner-title').value,
              subtitle: document.getElementById('banner-subtitle').value,
              image_url: document.getElementById('banner-image').value,
              link_url: document.getElementById('banner-link').value,
              banner_type: document.getElementById('banner-type').value,
              background_color: document.getElementById('banner-bg-color').value,
              is_active: document.getElementById('banner-active').checked
            };
            
            try {
              const res = await fetch('/api/admin/banners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(banner)
              });
              if (res.ok) { closeBannerModal(); loadBanners(); alert('배너가 저장되었습니다.'); }
            } catch(e) { alert('저장 실패'); }
          }
          
          async function deleteBanner(id) {
            if (!confirm('이 배너를 삭제하시겠습니까?')) return;
            try {
              const res = await fetch('/api/admin/banners/' + id, { method: 'DELETE' });
              if (res.ok) { loadBanners(); }
            } catch(e) { alert('삭제 실패'); }
          }
          
          // ==========================================
          // Marketing Channels Functions
          // ==========================================
          let marketingData = [];
          
          async function loadMarketingChannels() {
            try {
              const res = await fetch('/api/admin/marketing-channels');
              if (res.ok) {
                const data = await res.json();
                marketingData = data.channels || [];
                renderMarketingChannels();
              }
            } catch(e) { console.log('Marketing load error:', e); }
          }
          
          function renderMarketingChannels() {
            marketingData.forEach(ch => {
              switch(ch.channel_type) {
                case 'google_analytics':
                  document.getElementById('ga4-tracking-id').value = ch.tracking_id || '';
                  document.getElementById('ga4-active').checked = ch.is_active === 1;
                  break;
                case 'facebook_pixel':
                  document.getElementById('fb-pixel-id').value = ch.tracking_id || '';
                  document.getElementById('fb-active').checked = ch.is_active === 1;
                  break;
                case 'naver_analytics':
                  document.getElementById('naver-analytics-id').value = ch.tracking_id || '';
                  document.getElementById('naver-active').checked = ch.is_active === 1;
                  break;
                case 'kakao_pixel':
                  document.getElementById('kakao-pixel-id').value = ch.tracking_id || '';
                  document.getElementById('kakao-pixel-active').checked = ch.is_active === 1;
                  break;
              }
            });
          }
          
          async function saveMarketingChannels() {
            const statusEl = document.getElementById('marketing-status');
            statusEl.classList.remove('hidden');
            statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-blue-50 text-blue-700';
            statusEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>저장 중...';
            
            const channels = [
              { type: 'google_analytics', tracking_id: document.getElementById('ga4-tracking-id').value, is_active: document.getElementById('ga4-active').checked },
              { type: 'facebook_pixel', tracking_id: document.getElementById('fb-pixel-id').value, is_active: document.getElementById('fb-active').checked },
              { type: 'naver_analytics', tracking_id: document.getElementById('naver-analytics-id').value, is_active: document.getElementById('naver-active').checked },
              { type: 'kakao_pixel', tracking_id: document.getElementById('kakao-pixel-id').value, is_active: document.getElementById('kakao-pixel-active').checked }
            ];
            
            try {
              for (const ch of channels) {
                const existing = marketingData.find(m => m.channel_type === ch.type);
                if (existing) {
                  await fetch('/api/admin/marketing-channels', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: existing.id, tracking_id: ch.tracking_id, is_active: ch.is_active })
                  });
                }
              }
              statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-green-50 text-green-700';
              statusEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>마케팅 채널 설정이 저장되었습니다.';
            } catch(e) {
              statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-700';
              statusEl.innerHTML = '<i class="fas fa-times-circle mr-2"></i>저장 실패';
            }
            setTimeout(() => { statusEl.classList.add('hidden'); }, 3000);
          }
          
          // ==========================================
          // Chat Channels Functions
          // ==========================================
          let chatData = [];
          
          async function loadChatChannels() {
            try {
              const res = await fetch('/api/admin/chat-channels');
              if (res.ok) {
                const data = await res.json();
                chatData = data.channels || [];
                renderChatChannels();
              }
            } catch(e) { console.log('Chat load error:', e); }
          }
          
          function renderChatChannels() {
            chatData.forEach(ch => {
              switch(ch.channel_type) {
                case 'kakao_channel':
                  document.getElementById('kakao-channel-id').value = ch.channel_id || '';
                  document.getElementById('kakao-chat-active').checked = ch.is_active === 1;
                  break;
                case 'naver_talktalk':
                  document.getElementById('naver-talk-id').value = ch.channel_id || '';
                  document.getElementById('naver-talk-active').checked = ch.is_active === 1;
                  break;
                case 'channel_talk':
                  document.getElementById('channel-talk-key').value = ch.plugin_key || '';
                  document.getElementById('channel-talk-active').checked = ch.is_active === 1;
                  break;
                case 'tawk_to':
                  document.getElementById('tawk-id').value = ch.channel_id || '';
                  document.getElementById('tawk-active').checked = ch.is_active === 1;
                  break;
              }
            });
          }
          
          async function saveChatChannels() {
            const statusEl = document.getElementById('chat-status');
            statusEl.classList.remove('hidden');
            statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-blue-50 text-blue-700';
            statusEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>저장 중...';
            
            const channels = [
              { type: 'kakao_channel', channel_id: document.getElementById('kakao-channel-id').value, is_active: document.getElementById('kakao-chat-active').checked },
              { type: 'naver_talktalk', channel_id: document.getElementById('naver-talk-id').value, is_active: document.getElementById('naver-talk-active').checked },
              { type: 'channel_talk', plugin_key: document.getElementById('channel-talk-key').value, is_active: document.getElementById('channel-talk-active').checked },
              { type: 'tawk_to', channel_id: document.getElementById('tawk-id').value, is_active: document.getElementById('tawk-active').checked }
            ];
            
            try {
              for (const ch of channels) {
                const existing = chatData.find(m => m.channel_type === ch.type);
                if (existing) {
                  await fetch('/api/admin/chat-channels', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: existing.id, channel_id: ch.channel_id, plugin_key: ch.plugin_key, is_active: ch.is_active })
                  });
                }
              }
              statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-green-50 text-green-700';
              statusEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>상담 채널 설정이 저장되었습니다.';
            } catch(e) {
              statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-700';
              statusEl.innerHTML = '<i class="fas fa-times-circle mr-2"></i>저장 실패';
            }
            setTimeout(() => { statusEl.classList.add('hidden'); }, 3000);
          }
          
          // ==========================================
          // External APIs Functions
          // ==========================================
          let externalApisData = [];
          
          async function loadExternalApis() {
            try {
              const res = await fetch('/api/admin/external-apis');
              if (res.ok) {
                const data = await res.json();
                externalApisData = data.apis || [];
                // Render if needed
              }
            } catch(e) { console.log('External APIs load error:', e); }
          }
          
          async function saveExternalApis() {
            const statusEl = document.getElementById('api-integration-status');
            statusEl.classList.remove('hidden');
            statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-blue-50 text-blue-700';
            statusEl.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>저장 중...';
            
            // Save each API config
            const configs = [
              { type: 'kakao_login', client_id: document.getElementById('kakao-rest-key')?.value, client_secret: document.getElementById('kakao-secret')?.value, is_active: document.getElementById('kakao-login-active')?.checked },
              { type: 'naver_login', client_id: document.getElementById('naver-client-id')?.value, client_secret: document.getElementById('naver-client-secret')?.value, is_active: document.getElementById('naver-login-active')?.checked },
              { type: 'google_login', client_id: document.getElementById('google-client-id')?.value, client_secret: document.getElementById('google-client-secret')?.value, is_active: document.getElementById('google-login-active')?.checked },
              { type: 'kakao_alimtalk', client_id: document.getElementById('alimtalk-sender-key')?.value, api_key: document.getElementById('alimtalk-api-key')?.value, is_active: document.getElementById('alimtalk-active')?.checked },
              { type: 'toss_payments', client_id: document.getElementById('toss-client-key')?.value, client_secret: document.getElementById('toss-secret-key')?.value, is_active: document.getElementById('toss-active')?.checked }
            ];
            
            try {
              for (const cfg of configs) {
                const existing = externalApisData.find(a => a.api_type === cfg.type);
                if (existing) {
                  await fetch('/api/admin/external-apis', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: existing.id, ...cfg })
                  });
                }
              }
              statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-green-50 text-green-700';
              statusEl.innerHTML = '<i class="fas fa-check-circle mr-2"></i>외부 API 설정이 저장되었습니다.';
            } catch(e) {
              statusEl.className = 'mt-4 p-3 rounded-lg text-sm bg-red-50 text-red-700';
              statusEl.innerHTML = '<i class="fas fa-times-circle mr-2"></i>저장 실패';
            }
            setTimeout(() => { statusEl.classList.add('hidden'); }, 3000);
          }
          
          // Load settings data when on settings tab
          if ('${activeTab}' === 'settings') {
            loadTerms();
            loadPopups();
            loadBanners();
            loadMarketingChannels();
            loadChatChannels();
            loadExternalApis();
          }
          
          // Initialize on page load
          document.addEventListener('DOMContentLoaded', loadData);
        </script>
      </body>
    </html>
  `
}
