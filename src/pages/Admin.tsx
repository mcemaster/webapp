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
        <script src="https://cdn.tailwindcss.com"></script>
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
                          </tr>
                        </thead>
                        <tbody id="company-table" class="divide-y divide-slate-100">
                          <tr><td colspan="8" class="px-5 py-8 text-center text-slate-400">데이터를 불러오는 중...</td></tr>
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
                    '<tr class="hover:bg-slate-50">' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + (c.name || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600 font-mono text-xs">' + (c.biz_num || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.ceo || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.industry || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.employee_count || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.revenue || '-') + '</td>' +
                    '<td class="px-5 py-3"><span class="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded">' + (c.certifications || '-') + '</span></td>' +
                    '<td class="px-5 py-3 text-slate-500 text-xs">' + (c.created_at || '-') + '</td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="8" class="px-5 py-8 text-center text-slate-400">등록된 기업이 없습니다.</td></tr>';
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
          
          // Initialize on page load
          document.addEventListener('DOMContentLoaded', loadData);
        </script>
      </body>
    </html>
  `
}
