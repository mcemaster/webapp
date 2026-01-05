import { html } from 'hono/html'

export const Layout = (props: { children: any; title?: string; user?: any }) => {
  const { children, title, user } = props
  
  return (
    <div class="font-sans text-slate-800 antialiased bg-white selection:bg-blue-100 selection:text-blue-900 flex flex-col min-h-screen relative">
      
      {/* ================= TOP NAVIGATION ================= */}
      <nav class="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            {/* Logo */}
            <a href="/" class="flex-shrink-0 flex items-center cursor-pointer">
              <img src="/static/logo-horizontal.png" alt="경영인증평가원" class="h-10 w-auto" />
              <span class="ml-3 text-xl font-extrabold text-slate-800 tracking-tight border-l-2 border-slate-300 pl-3 hidden sm:block">기업지원포털</span>
            </a>

            {/* Desktop Menu */}
            <div class="hidden md:flex items-center space-x-1">
              {/* Menu 1: 평가/인증 */}
              <div class="relative group h-20 flex items-center">
                <button class="px-4 text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors flex items-center">
                  평가/인증 <i class="fas fa-chevron-down ml-1 text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                </button>
                <div class="absolute top-20 left-0 w-48 bg-white rounded-b-xl shadow-xl border-x border-b border-slate-100 overflow-hidden hidden group-hover:block animate-fade-in-up">
                  <div class="py-2">
                    <a href="/services/spec" class="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">기업 SPEC 평가</a>
                    <a href="/services/scm" class="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">2자 심사 (SCM)</a>
                    <a href="http://www.mce.re.kr" target="_blank" class="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">ISO/IATF 인증</a>
                  </div>
                </div>
              </div>

              {/* Menu 2: AI 공급사 찾기 (Blue Pill) */}
              <a href="/rfq" class="px-4 h-20 flex items-center group">
                <span class="text-sm font-bold text-blue-600 group-hover:text-blue-800 transition-colors flex items-center bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 group-hover:bg-blue-100 group-hover:border-blue-200">
                  <i class="fas fa-search-dollar mr-1.5"></i>AI 공급사 찾기
                </span>
              </a>
              
              {/* Menu 3: 정부지원사업 (Indigo Pill + Dot) */}
              <a href="/support-matching" class="px-4 h-20 flex items-center group relative">
                <div class="absolute top-6 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <div class="absolute top-6 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></div>
                <span class="text-sm font-bold text-indigo-600 group-hover:text-indigo-800 transition-colors flex items-center bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 group-hover:bg-indigo-100 group-hover:border-indigo-200">
                  정부지원사업 (AI)
                </span>
              </a>

              {/* Menu 4: 파트너 찾기 */}
              <a href="/partners" class="px-4 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors h-20 flex items-center">
                파트너 찾기
              </a>

              {/* Menu 5: 고객센터 */}
              <div class="relative group h-20 flex items-center">
                <button class="px-4 text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors flex items-center">
                  고객센터 <i class="fas fa-chevron-down ml-1 text-xs opacity-50 group-hover:opacity-100 transition-opacity"></i>
                </button>
                <div class="absolute top-20 left-0 w-48 bg-white rounded-b-xl shadow-xl border-x border-b border-slate-100 overflow-hidden hidden group-hover:block animate-fade-in-up">
                  <div class="py-2">
                    <a href="/faq" class="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">자주 묻는 질문 (FAQ)</a>
                    <a href="/partnership" class="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600">제휴/협력 제안</a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* User Profile / Login (Restored Button) */}
            <div class="hidden md:flex items-center ml-4 pl-4 border-l border-slate-200">
              {user ? (
                <div class="relative group">
                  <button class="flex items-center space-x-2 text-sm font-medium text-slate-700 hover:text-blue-600 focus:outline-none py-2">
                    <img src={user.profileImage} alt={user.name} class="h-8 w-8 rounded-full border border-slate-200 object-cover" />
                    <span>{user.name}님</span>
                    <i class="fas fa-chevron-down text-xs text-slate-400"></i>
                  </button>
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden hidden group-hover:block animate-fade-in-up">
                    <div class="px-4 py-3 border-b border-slate-100 bg-slate-50">
                      <p class="text-sm font-bold text-slate-900">{user.name}</p>
                      <p class="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <div class="py-1">
                      {user.role === 'admin' && (
                        <a href="/admin" class="block px-4 py-2 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 font-medium">관리자 대시보드</a>
                      )}
                      <a href="/logout" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">로그아웃</a>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="flex items-center space-x-4">
                  <a href="/login" class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">로그인</a>
                  <a href="/rfq" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex items-center">
                    <i class="fas fa-search-dollar mr-2"></i> AI 공급사 찾기
                  </a>
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
          <div class="p-4 space-y-4">
            <a href="/rfq" class="block text-sm font-bold text-blue-600 py-2">
              <span class="inline-flex items-center bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                <i class="fas fa-search-dollar mr-2"></i>AI 공급사 찾기
              </span>
            </a>
            <a href="/support-matching" class="block text-sm font-bold text-indigo-600 py-2">
              <span class="inline-flex items-center bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                정부지원사업 (AI)
              </span>
            </a>
            <a href="/partners" class="block text-sm text-slate-600 py-2">파트너 기업 찾기</a>
            <a href="/services/spec" class="block text-sm text-slate-600 py-2">기업 SPEC 평가</a>
            <a href="/services/scm" class="block text-sm text-slate-600 py-2">2자 심사 (SCM)</a>
            {!user ? (
              <a href="/login" class="block w-full text-center px-4 py-3 bg-slate-100 text-slate-700 rounded-lg font-bold mt-4">로그인</a>
            ) : (
              <a href="/logout" class="block w-full text-center px-4 py-3 bg-slate-100 text-red-600 rounded-lg font-bold mt-4">로그아웃</a>
            )}
          </div>
        </div>
      </nav>

      {/* ================= RIGHT QUICK SIDEBAR ================= */}
      <aside class="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        <div class="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 flex flex-col items-center gap-2 w-16">
          <a href="/rfq" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all group relative">
            <i class="fas fa-calculator text-lg mb-1"></i>
            <span class="text-[9px] font-bold">공급사</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">AI 공급사 찾기</span>
          </a>
          <a href="/support-matching" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all group relative">
            <i class="fas fa-hand-holding-usd text-lg mb-1"></i>
            <span class="text-[9px] font-bold">매칭</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">지원사업 매칭</span>
          </a>
          <a href="/partners" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-teal-50 hover:text-teal-600 transition-all group relative">
            <i class="fas fa-search text-lg mb-1"></i>
            <span class="text-[9px] font-bold">기업</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">파트너 찾기</span>
          </a>
          <div class="w-8 h-px bg-slate-100 my-1"></div>
          <button id="quick-chat-btn" class="flex flex-col items-center justify-center w-12 h-12 rounded-xl text-slate-500 hover:bg-yellow-50 hover:text-yellow-600 transition-all group relative">
            <i class="fas fa-comment-dots text-lg mb-1"></i>
            <span class="text-[9px] font-bold">상담</span>
            <span class="absolute right-full mr-3 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">1:1 문의</span>
          </button>
        </div>
        <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="bg-slate-800 text-white w-16 h-10 rounded-xl shadow-lg flex items-center justify-center hover:bg-slate-700 transition-colors text-xs font-bold">
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
          <div class="grid md:grid-cols-4 gap-8 mb-8">
            <div class="col-span-1 md:col-span-2">
              <div class="flex items-center mb-6">
                <img src="/static/logo-horizontal.png" alt="경영인증평가원" class="h-8 w-auto brightness-0 invert" />
              </div>
              <p class="text-slate-400 leading-relaxed max-w-sm mb-6">
                경영인증평가원은 대한민국의 우수 제조 생태계를 만들어갑니다.
                검증된 기업과 안전하게 거래하세요.
              </p>
            </div>
            
            <div>
              <h4 class="text-white font-bold mb-4">서비스</h4>
              <ul class="space-y-2">
                <li><a href="/support-matching" class="hover:text-blue-400 transition-colors">지원사업 매칭</a></li>
                <li><a href="/rfq" class="hover:text-blue-400 transition-colors">공급사 찾기</a></li>
                <li><a href="/partners" class="hover:text-blue-400 transition-colors">파트너 찾기</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="text-white font-bold mb-4">고객센터</h4>
              <ul class="space-y-2">
                <li class="flex items-start"><i class="fas fa-phone mt-1 mr-2 text-blue-500"></i> <span>051-714-0798</span></li>
                <li class="flex items-start"><i class="fas fa-envelope mt-1 mr-2 text-blue-500"></i> <span>mce@mce.re.kr</span></li>
                <li class="flex items-start"><i class="fas fa-clock mt-1 mr-2 text-blue-500"></i> <span>평일 09:00 - 18:00</span></li>
              </ul>
            </div>
          </div>

          <div class="border-t border-slate-800 py-6 flex flex-wrap gap-4 text-slate-300 font-medium">
             <a href="/legal?tab=terms" class="hover:text-white transition-colors">경영인증평가원 서비스 이용약관</a>
             <a href="/legal?tab=privacy" class="font-bold text-white hover:text-blue-400 transition-colors">개인정보처리방침</a>
             <a href="/legal?tab=finance" class="hover:text-white transition-colors">전자금융거래약관</a>
             <a href="#" class="hover:text-white transition-colors">이메일무단수집거부</a>
          </div>

          <div class="text-xs text-slate-500 space-y-1">
             <p>상호명: 경영인증평가원(주) | 대표자: 신솔푸름 (기관장) | 사업자등록번호: 123-45-67890</p>
             <p>주소: 부산광역시 동래구 중앙대로 1367번길 44-15 | 통신판매업신고: 2024-부산동래-0249호 | 개인정보관리책임자: 관리자</p>
             <p>고객센터: 051-714-0798 | 팩스: 051-000-0000 | 이메일: mce@mce.re.kr</p>
             <p class="mt-2 text-slate-600">경영인증평가원은 통신판매중개자로서 거래 당사자가 아니며, 입점 파트너사가 등록한 상품 및 거래에 대해 책임을 지지 않습니다.</p>
             <p class="mt-4">Copyright © 경영인증평가원. All Rights Reserved.</p>
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

      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const btn = document.getElementById('mobile-menu-btn');
          const menu = document.getElementById('mobile-menu');
          if(btn && menu) btn.addEventListener('click', () => menu.classList.toggle('hidden'));

          const chatBtn = document.getElementById('quick-chat-btn');
          const chatWin = document.getElementById('chat-window');
          const closeChat = document.getElementById('close-chat-btn');
          
          if(chatBtn && chatWin) {
            chatBtn.addEventListener('click', (e) => {
              e.preventDefault();
              chatWin.classList.toggle('hidden');
            });
          }
          if(closeChat && chatWin) {
            closeChat.addEventListener('click', () => chatWin.classList.add('hidden'));
          }
        });
      ` }} />
    </div>
  )
}
