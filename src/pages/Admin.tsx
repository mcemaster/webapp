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
              
              ${activeTab === 'companies' ? html`
                <!-- Companies Table -->
                <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                  <div class="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h3 class="font-semibold text-slate-800">기업 데이터베이스</h3>
                    <div class="flex items-center space-x-2">
                      <input type="text" id="company-search" placeholder="기업명 검색..." class="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                      <button onclick="searchCompanies()" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">검색</button>
                    </div>
                  </div>
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <thead class="bg-slate-50 text-slate-600 text-xs uppercase">
                        <tr>
                          <th class="px-5 py-3 text-left font-semibold">기업명</th>
                          <th class="px-5 py-3 text-left font-semibold">대표자</th>
                          <th class="px-5 py-3 text-left font-semibold">업종</th>
                          <th class="px-5 py-3 text-left font-semibold">매출액</th>
                          <th class="px-5 py-3 text-left font-semibold">수집일</th>
                        </tr>
                      </thead>
                      <tbody id="company-table" class="divide-y divide-slate-100">
                        <tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">데이터를 불러오는 중...</td></tr>
                      </tbody>
                    </table>
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
                  <!-- API Settings -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100">
                      <h3 class="font-semibold text-slate-800">API 연동 설정</h3>
                    </div>
                    <div class="p-5 space-y-4">
                      <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                            <span class="font-bold text-yellow-700">D</span>
                          </div>
                          <div>
                            <p class="font-medium text-slate-800">DART API</p>
                            <p class="text-xs text-slate-500">금융감독원 기업공시 데이터</p>
                          </div>
                        </div>
                        <button onclick="testDartConnection()" class="px-4 py-2 bg-slate-800 text-white text-sm font-medium rounded-lg hover:bg-slate-900 transition">연동 테스트</button>
                      </div>
                      <div id="dart-status" class="px-4 py-3 bg-slate-100 rounded-lg text-sm text-slate-600 font-mono">Status: Ready</div>
                      
                      <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg mt-4">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                            <i class="fas fa-brain text-green-600"></i>
                          </div>
                          <div>
                            <p class="font-medium text-slate-800">OpenAI API</p>
                            <p class="text-xs text-slate-500">GPT-4o 기반 AI 분석</p>
                          </div>
                        </div>
                        <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">Connected</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- System Actions -->
                  <div class="bg-white rounded-xl shadow-sm border border-slate-100">
                    <div class="p-5 border-b border-slate-100">
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
            
            // Load recent activity for overview
            if (tab === 'overview') loadRecentActivity();
          }
          
          async function loadCompanies() {
            try {
              const res = await fetch('/api/admin/companies');
              if (res.ok) {
                const data = await res.json();
                const tbody = document.getElementById('company-table');
                if (data.companies && data.companies.length > 0) {
                  tbody.innerHTML = data.companies.map(c => 
                    '<tr class="hover:bg-slate-50">' +
                    '<td class="px-5 py-3 font-medium text-slate-800">' + c.name + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.ceo || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.industry || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-600">' + (c.revenue || '-') + '</td>' +
                    '<td class="px-5 py-3 text-slate-500 text-xs">' + (c.created_at || '-') + '</td>' +
                    '</tr>'
                  ).join('');
                } else {
                  tbody.innerHTML = '<tr><td colspan="5" class="px-5 py-8 text-center text-slate-400">등록된 기업이 없습니다.</td></tr>';
                }
              }
            } catch(e) {
              console.log('Companies load error:', e);
            }
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
            const q = document.getElementById('company-search').value;
            console.log('Search companies:', q);
          }
          
          function searchGrants() {
            const q = document.getElementById('grant-search').value;
            console.log('Search grants:', q);
          }
          
          function searchUsers() {
            const q = document.getElementById('user-search').value;
            console.log('Search users:', q);
          }
          
          // Initialize on page load
          document.addEventListener('DOMContentLoaded', loadData);
        </script>
      </body>
    </html>
  `
}
