import { html } from 'hono/html'

export const LandingPage = () => html`
  <div id="landing-page" class="bg-white min-h-screen">
    <script>
      console.log('LandingPage loaded');
      // Wait for DOM to be ready
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM ready, setting up buttons');
        const btn1 = document.getElementById('btn-start-landing');
        const btn2 = document.getElementById('btn-start-landing-2');
        
        if (btn1) {
          console.log('Button 1 found');
          btn1.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button 1 clicked');
            startApp();
          });
        }
        
        if (btn2) {
          console.log('Button 2 found');
          btn2.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button 2 clicked');
            startApp();
          });
        }
        
        function startApp() {
          console.log('Starting app...');
          window.scrollTo({ top: 0, behavior: 'smooth' });
          const landing = document.getElementById('view-landing');
          const app = document.getElementById('view-app');
          if (landing) landing.classList.add('hidden');
          if (app) app.classList.remove('hidden');
        }
      });
    </script>
    
    <!-- 1. Hero Section (Dark Blue Background like the image) -->
    <div class="bg-slate-900 text-white py-20 px-6 relative overflow-hidden">
      <!-- Background Abstract Pattern -->
      <div class="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#3B82F6" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.4,82.2,23.1,70.6,34.2C59,45.3,47.1,53.8,35,60.8C22.9,67.8,10.6,73.3,-0.8,74.7C-12.2,76.1,-26.4,73.4,-39.3,66.8C-52.2,60.2,-63.8,49.7,-72.1,36.9C-80.4,24.1,-85.4,9,-83.4,-5.2C-81.4,-19.4,-72.4,-32.7,-61.6,-42.6C-50.8,-52.5,-38.2,-59,-25.6,-66.9C-13,-74.8,-0.4,-84.1,13.2,-86.3L26.8,-88.5Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div class="max-w-6xl mx-auto relative z-10">
        <div class="max-w-3xl">
          <span class="text-blue-400 font-bold tracking-wider text-sm mb-4 block uppercase">AI-Powered Grant Matching</span>
          <h1 class="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            기업 데이터 기반<br/>
            <span class="text-blue-400">AI 정부지원사업 정밀 진단</span>
          </h1>
          <p class="text-slate-300 text-lg mb-8 leading-relaxed">
            단순한 검색으로는 찾을 수 없는 <strong>히든 챔피언 공고</strong>를 찾아드립니다.<br/>
            DART 공시 정보와 기업의 내부 데이터를 결합하여, <strong>2026년 합격 확률이 높은 Top 20 사업</strong>을 AI가 직접 분석합니다.
          </p>
          <button id="btn-start-landing" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 px-12 rounded-xl shadow-2xl shadow-blue-900/50 transition transform hover:scale-105 flex items-center text-xl animate-pulse hover:animate-none">
            <i class="fas fa-rocket mr-3"></i>AI 무료 진단 시작하기 <i class="fas fa-arrow-right ml-3"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. Market Issues (Pain Points) -->
    <div class="py-20 px-6 bg-slate-50">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <span class="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2 block">MARKET ISSUES</span>
          <h2 class="text-3xl font-extrabold text-slate-900">기존 지원사업 탐색의 한계</h2>
          <p class="text-slate-500 mt-4">매년 쏟아지는 2만여 개의 공고, 우리 기업은 왜 계속 놓칠까요?</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Card 1 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition duration-300">
            <div class="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl mb-6">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">정보의 홍수와 파편화</h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              K-Startup, 기업마당, 각 지자체 사이트...<br/>
              너무 많은 사이트에 흩어진 정보 때문에 <strong>정작 우리 지역, 우리 업종에 딱 맞는 알짜 공고</strong>를 찾기 어렵습니다.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition duration-300">
            <div class="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl mb-6">
              <i class="fas fa-search-minus"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">형식적인 조건 검색</h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              단순히 '매출액', '업력' 만으로 필터링하면<br/>
              <strong>기업의 기술력이나 성장 잠재력</strong>을 요구하는 R&D 과제나 특화 지원사업은 모두 놓치게 됩니다.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-2 transition duration-300">
            <div class="w-14 h-14 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-2xl mb-6">
              <i class="fas fa-user-times"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-3">전문가 부재</h3>
            <p class="text-slate-500 text-sm leading-relaxed">
              어떤 사업이 우리에게 유리한지 판단하려면<br/>
              사업계획서 작성 경험과 심사 기준을 알아야 하는데, <strong>내부 인력만으로는 전략 수립이 불가능</strong>합니다.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Our Solution (Blue Section) -->
    <div class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-col md:flex-row items-center gap-12">
          
          <div class="w-full md:w-1/2">
            <span class="text-indigo-600 font-bold tracking-widest text-xs uppercase mb-2 block">OUR SOLUTION</span>
            <h2 class="text-3xl font-extrabold text-slate-900 leading-tight mb-6">
              데이터로 증명하는<br/>
              <span class="text-indigo-600">압도적인 매칭 정확도</span>
            </h2>
            <p class="text-slate-500 mb-8 leading-relaxed">
              MCE AI는 단순히 공고를 나열하지 않습니다.<br/>
              귀사의 <strong>DART 재무 데이터, 특허 보유 현황, 인력 구조</strong>를 복합적으로 분석하여
              심사위원이 선호할 만한 최적의 사업을 추천합니다.
            </p>

            <ul class="space-y-4">
              <li class="flex items-start">
                <i class="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <div>
                  <strong class="text-slate-800 block">DART & 공공데이터 실시간 연동</strong>
                  <span class="text-slate-500 text-sm">기업명 검색 한 번으로 재무제표와 기업 현황을 자동 수집합니다.</span>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <div>
                  <strong class="text-slate-800 block">GPT-4o 기반 정성 평가 예측</strong>
                  <span class="text-slate-500 text-sm">사업계획서를 첨부하면 AI가 기술성과 사업성을 미리 평가해줍니다.</span>
                </div>
              </li>
              <li class="flex items-start">
                <i class="fas fa-check-circle text-indigo-500 mt-1 mr-3"></i>
                <div>
                  <strong class="text-slate-800 block">하이브리드 데이터 수집</strong>
                  <span class="text-slate-500 text-sm">자동 수집된 데이터에 기업의 비공개 전략 정보를 더해 정확도를 높입니다.</span>
                </div>
              </li>
            </ul>

            <div class="mt-10">
              <button id="btn-start-landing-2" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition transform hover:scale-105 flex items-center">
                <i class="fas fa-play-circle mr-2"></i>지금 무료 진단 시작 <i class="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>

          <div class="w-full md:w-1/2">
            <!-- Decorative Dashboard Image Simulation -->
            <div class="relative bg-slate-900 rounded-2xl p-2 shadow-2xl transform rotate-1 hover:rotate-0 transition duration-500">
              <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 rounded-2xl"></div>
              <div class="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 relative z-10">
                <div class="flex items-center gap-2 px-4 py-3 border-b border-slate-700 bg-slate-800">
                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <div class="ml-4 h-2 w-32 bg-slate-700 rounded-full"></div>
                </div>
                <div class="p-6">
                  <div class="flex justify-between items-end mb-6">
                    <div>
                      <div class="h-2 w-20 bg-slate-600 rounded mb-2"></div>
                      <div class="h-6 w-32 bg-slate-500 rounded"></div>
                    </div>
                    <div class="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">AI</div>
                  </div>
                  <div class="space-y-3">
                    <div class="h-16 bg-slate-700/50 rounded-lg border-l-4 border-indigo-500 p-3">
                      <div class="h-2 w-2/3 bg-slate-600 rounded mb-2"></div>
                      <div class="h-2 w-1/2 bg-slate-600 rounded"></div>
                    </div>
                    <div class="h-16 bg-slate-700/50 rounded-lg border-l-4 border-purple-500 p-3">
                      <div class="h-2 w-3/4 bg-slate-600 rounded mb-2"></div>
                      <div class="h-2 w-1/3 bg-slate-600 rounded"></div>
                    </div>
                    <div class="h-16 bg-slate-700/50 rounded-lg border-l-4 border-blue-500 p-3">
                      <div class="h-2 w-2/3 bg-slate-600 rounded mb-2"></div>
                      <div class="h-2 w-1/2 bg-slate-600 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
  </div>
`