import { html } from 'hono/html'

export const Layout = (props: { children: any; title?: string; user?: any }) => {
  const { children, title, user } = props
  
  return (
    <div class="font-sans text-slate-800 antialiased bg-white selection:bg-blue-100 selection:text-blue-900 flex flex-col min-h-screen relative">
      
      {/* ================= TOP NAVIGATION ================= */}
      <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            
            {/* 1. Logo Section */}
            <a href="/" class="flex-shrink-0 flex items-center cursor-pointer group">
              <img src="/static/logo-horizontal.png" alt="경영인증평가원" class="h-9 w-auto transition-transform group-hover:scale-105" />
              <span class="ml-3 text-lg font-extrabold text-slate-800 tracking-tight border-l-2 border-slate-300 pl-3 hidden sm:block">기업지원포털</span>
            </a>

            {/* 2. Desktop Menu (Center) */}
            <div class="hidden md:flex items-center space-x-2">
              
              {/* Menu A: 평가/인증 (Dropdown) */}
              <div class="relative group h-20 flex items-center">
                <button class="px-4 text-[15px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors flex items-center h-full">
                  평가/인증 <i class="fas fa-chevron-down ml-1.5 text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                </button>
                {/* Fixed: Removed animation, used robust visibility transition, stronger bridge */}
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-b-xl shadow-xl border border-slate-100 overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                  <div class="py-2">
                    <a href="/services/spec" class="block px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">기업 SPEC 평가</a>
                    <a href="/services/certification" class="block px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">ISO 인증</a>
                  </div>
                </div>
              </div>

              {/* Menu B: 공급망 관리 (SCM) - Text Only */}
              <a href="/services/scm" class="px-4 h-20 flex items-center text-[15px] font-bold text-slate-600 hover:text-teal-600 transition-colors relative group">
                <span>공급망 관리 (SCM)</span>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-teal-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>

              {/* Menu C: 공급사 찾기 (AI) - Text Only */}
              <a href="/rfq" class="px-4 h-20 flex items-center text-[15px] font-bold text-slate-600 hover:text-blue-600 transition-colors relative group">
                <span>공급사 찾기 (AI)</span>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>
              
              {/* Menu D: 정부지원사업 (AI) - Text Only */}
              <a href="/support-matching" class="px-4 h-20 flex items-center text-[15px] font-bold text-slate-600 hover:text-indigo-600 transition-colors relative group">
                <div class="relative">
                  <span>정부지원사업 (AI)</span>
                  {/* Red Dot Notification */}
                  <span class="absolute -top-1 -right-2 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                </div>
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </a>

              {/* Menu E: 고객센터 (Dropdown) */}
              <div class="relative group h-20 flex items-center">
                <button class="px-4 text-[15px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors flex items-center h-full">
                  고객센터 <i class="fas fa-chevron-down ml-1.5 text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                </button>
                <div class="absolute top-[calc(100%-1px)] left-1/2 transform -translate-x-1/2 w-48 bg-white rounded-b-xl shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block animate-fade-in-up">
                  <div class="py-2">
                    <a href="/faq" class="block px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">자주 묻는 질문 (FAQ)</a>
                    <a href="/partnership" class="block px-5 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">제휴/협력 제안</a>
                  </div>
                </div>
              </div>

            </div>
            
            {/* 3. Right Side: Login | Register (Text Links) */}
            <div class="hidden md:flex items-center ml-6 pl-6">
              {user ? (
                /* Logged In State */
                <div class="relative group h-20 flex items-center">
                  <button class="flex items-center space-x-2 text-sm font-bold text-slate-700 hover:text-blue-600 focus:outline-none py-2 h-full">
                    <div class="relative">
                      <img src={user.profileImage} alt={user.name} class="h-9 w-9 rounded-full border border-slate-200 object-cover shadow-sm" />
                      <div class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <span>{user.name}님</span>
                    <i class="fas fa-chevron-down text-xs text-slate-400"></i>
                  </button>
                  {/* Fixed: Robust transition, stronger bridge */}
                  <div class="absolute top-full right-0 w-64 bg-white rounded-b-xl shadow-xl border border-slate-100 overflow-hidden invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 before:absolute before:-top-6 before:left-0 before:w-full before:h-6 before:content-['']">
                    <div class="px-6 py-5 border-b border-slate-100 bg-slate-50">
                      <p class="text-base font-bold text-slate-900">{user.name}</p>
                      <p class="text-xs text-slate-500 truncate mt-1">{user.email}</p>
                    </div>
                    <div class="py-2">
                      {user.role === 'admin' && (
                        <a href="/admin" class="block px-6 py-3 text-sm text-blue-600 hover:bg-blue-50 font-bold flex items-center">
                          <i class="fas fa-cog w-5"></i> 관리자 모드
                        </a>
                      )}
                      <a href="/auth/logout" class="block px-6 py-3 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center">
                        <i class="fas fa-sign-out-alt w-5"></i> 로그아웃
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* Guest State - Clean Text Links */
                <div class="flex items-center space-x-4 text-sm font-bold">
                  <a href="/auth/login" class="text-slate-500 hover:text-blue-600 transition-colors">로그인</a>
                  <span class="text-slate-300">|</span>
                  <a href="/register" class="text-slate-700 hover:text-blue-600 transition-colors">회원가입</a>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div class="md:hidden flex items-center">
              <button id="mobile-menu-btn" class="text-slate-600 hover:text-slate-900 focus:outline-none p-2">
                <i class="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-slate-100 absolute w-full left-0 shadow-xl max-h-[80vh] overflow-y-auto">
          <div class="p-5 space-y-1">
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-2">Services</div>
            <a href="/services/spec" class="block px-4 py-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-bold">평가/인증</a>
            <a href="/services/scm" class="block px-4 py-3 rounded-lg text-slate-600 hover:bg-teal-50 hover:text-teal-600 font-bold">공급망 관리 (SCM)</a>
            <a href="/rfq" class="block px-4 py-3 rounded-lg text-slate-600 hover:bg-blue-50 hover:text-blue-600 font-bold">공급사 찾기 (AI)</a>
            <a href="/support-matching" class="block px-4 py-3 rounded-lg text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-bold">정부지원사업 (AI)</a>
            
            <div class="border-t border-slate-100 my-2"></div>
            
            <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 pl-2 mt-4">Account</div>
            {!user ? (
              <div class="grid grid-cols-2 gap-3 mt-2">
                <a href="/auth/login" class="block text-center py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200">로그인</a>
                <a href="/register" class="block text-center py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700">회원가입</a>
              </div>
            ) : (
              <a href="/auth/logout" class="block text-center py-3 bg-red-50 text-red-600 rounded-xl font-bold mt-2">로그아웃</a>
            )}
          </div>
        </div>
      </nav>

      {/* ================= RIGHT QUICK SIDEBAR ================= */}
      <aside class="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        <div class="bg-white/90 backdrop-blur rounded-2xl shadow-xl border border-slate-200/60 p-2 flex flex-col items-center gap-2 w-16">
          
          <a href="/services/scm" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all group relative">
            <i class="fas fa-network-wired text-lg mb-1"></i>
            <span class="text-[9px] font-bold">SCM</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">공급망 관리</span>
          </a>

          <a href="/rfq" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all group relative">
            <i class="fas fa-search-dollar text-lg mb-1"></i>
            <span class="text-[9px] font-bold">공급사</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">공급사 찾기</span>
          </a>

          <a href="/support-matching" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all group relative">
            <i class="fas fa-robot text-lg mb-1"></i>
            <span class="text-[9px] font-bold">지원금</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">정부지원사업</span>
          </a>

          <div class="w-8 h-px bg-slate-200 my-1"></div>

          <button id="quick-chat-btn" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-yellow-50 hover:text-yellow-600 transition-all group relative">
            <i class="fas fa-comment-dots text-lg mb-1"></i>
            <span class="text-[9px] font-bold">상담</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">1:1 문의</span>
          </button>

        </div>

        <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="bg-white/90 backdrop-blur text-slate-600 border border-slate-200 w-16 h-10 rounded-xl shadow-lg flex items-center justify-center hover:bg-slate-100 transition-colors text-xs font-bold">
          TOP
        </button>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main class="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer class="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-4 gap-8 mb-10">
            <div class="col-span-1 md:col-span-2">
              <div class="flex items-center mb-6">
                <img src="/static/logo-horizontal.png" alt="경영인증평가원" class="h-8 w-auto brightness-0 invert" />
              </div>
              <p class="text-slate-400 leading-relaxed max-w-sm">
                경영인증평가원은 대한민국의 우수 제조 생태계를 만들어갑니다.<br/>
                검증된 기업과 안전하게 거래하세요.
              </p>
            </div>
            
            <div>
              <h4 class="text-white font-bold mb-4">Service</h4>
              <ul class="space-y-2">
                <li><a href="/services/scm" class="hover:text-teal-400 transition-colors">공급망 관리 (SCM)</a></li>
                <li><a href="/support-matching" class="hover:text-blue-400 transition-colors">지원사업 매칭</a></li>
                <li><a href="/rfq" class="hover:text-blue-400 transition-colors">공급사 찾기</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-white font-bold mb-4">Contact</h4>
              <ul class="space-y-2">
                <li class="flex items-start"><i class="fas fa-phone mt-1 mr-2 text-blue-500 w-4"></i> <span>051-714-0798</span></li>
                <li class="flex items-start"><i class="fas fa-envelope mt-1 mr-2 text-blue-500 w-4"></i> <span>mce@mce.re.kr</span></li>
                <li class="flex items-start"><i class="fas fa-clock mt-1 mr-2 text-blue-500 w-4"></i> <span>평일 09:00 - 18:00</span></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-slate-800 py-6 flex flex-wrap gap-x-6 gap-y-2 text-slate-300 font-medium text-xs">
             <a href="/legal?tab=terms" class="hover:text-white transition-colors">서비스 이용약관</a>
             <a href="/legal?tab=privacy" class="font-bold text-white hover:text-blue-400 transition-colors">개인정보처리방침</a>
             <a href="/legal?tab=finance" class="hover:text-white transition-colors">전자금융거래약관</a>
             <a href="#" class="hover:text-white transition-colors">이메일무단수집거부</a>
          </div>

          <div class="text-[11px] text-slate-500 space-y-1.5 leading-relaxed">
             <p>상호명: 경영인증평가원(주) | 대표자: 신솔푸름 (기관장) | 사업자등록번호: 123-45-67890</p>
             <p>주소: 부산광역시 동래구 중앙대로 1367번길 44-15 | 통신판매업신고: 2024-부산동래-0249호 | 개인정보관리책임자: 관리자</p>
             <p>고객센터: 051-714-0798 | 팩스: 051-000-0000 | 이메일: mce@mce.re.kr</p>
             <p class="mt-2 text-slate-600">경영인증평가원은 통신판매중개자로서 거래 당사자가 아니며, 입점 파트너사가 등록한 상품 및 거래에 대해 책임을 지지 않습니다.</p>
             <p class="mt-4 font-bold">Copyright © 경영인증평가원. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <div id="chat-window" class="fixed bottom-24 right-24 z-50 hidden mb-4 w-80 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-fade-in-up origin-bottom-right">
        <div class="bg-slate-900 p-4 flex items-center justify-between">
          <span class="text-white font-bold ml-2 text-sm">1:1 실시간 상담</span>
          <button id="close-chat-btn" class="text-slate-400 hover:text-white"><i class="fas fa-times"></i></button>
        </div>
        <div class="h-80 bg-slate-50 p-4">
          <div class="bg-white p-3 rounded-lg shadow-sm text-sm text-slate-700">
            안녕하세요! 무엇을 도와드릴까요?
          </div>
        </div>
      </div>

      <script src="/static/js/layout.js"></script>
    </div>
  )
}
