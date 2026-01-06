import { Layout } from '../components/Layout'

export const RfqResult = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-slate-50 min-h-screen py-12" id="result-container">
        
        {/* 1. Loading State (Initially Visible) */}
        <div id="ai-loading" class="max-w-2xl mx-auto px-4 text-center pt-20">
          <div class="relative w-24 h-24 mx-auto mb-8">
            <div class="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            <i class="fas fa-robot absolute inset-0 flex items-center justify-center text-3xl text-blue-600 animate-pulse"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 mb-2">AI가 요청서를 분석하고 있습니다</h2>
          <p class="text-slate-600" id="loading-text">도면 파일에서 형상 정보를 추출하는 중...</p>
          
          <div class="mt-8 bg-white rounded-lg p-4 shadow-sm border border-slate-200 text-left max-w-sm mx-auto">
            <div class="space-y-3">
              <div class="flex items-center text-sm text-slate-500">
                <i class="fas fa-check-circle text-green-500 mr-2"></i> 프로젝트 정보 확인 완료
              </div>
              <div class="flex items-center text-sm text-slate-500" id="step-2">
                <i class="fas fa-circle-notch fa-spin text-blue-500 mr-2" id="icon-2"></i> 제조 공정 적합성 분석 중
              </div>
              <div class="flex items-center text-sm text-slate-400" id="step-3">
                <i class="far fa-circle mr-2" id="icon-3"></i> 파트너 기업 데이터베이스 매칭
              </div>
            </div>
          </div>
        </div>

        {/* 2. Result State (Initially Hidden) */}
        <div id="ai-result" class="hidden max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12">
            <span class="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">AI Smart Matching</span>
            <h1 class="text-3xl font-bold text-slate-900 mt-3 mb-4">최적의 파트너 3곳을 찾았습니다!</h1>
            <p class="text-slate-600">
              요청하신 <span class="font-bold text-slate-900">CNC 알루미늄 가공</span> 프로젝트에 가장 적합한 기업들입니다.
            </p>
          </div>

          {/* AI Analysis Summary */}
          <div class="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-10 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <div class="flex items-start">
              <div class="flex-shrink-0 bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center text-blue-600 text-xl mr-4">
                <i class="fas fa-chart-pie"></i>
              </div>
              <div>
                <h3 class="font-bold text-lg text-slate-900 mb-1">AI 요청서 분석 리포트</h3>
                <p class="text-sm text-slate-600 mb-4">
                  업로드된 도면과 요구사항을 분석한 결과, <strong>#정밀도</strong>와 <strong>#표면처리</strong> 역량이 핵심 성공 요인으로 판단됩니다.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200"># 5축 가공 필수</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200"># 알루미늄 6061</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200"># 아노다이징</span>
                  <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200"># 납기 준수 중요</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Partners Grid */}
          <div class="grid md:grid-cols-3 gap-6">
            
            {/* Recommendation 1 */}
            <div class="bg-white rounded-xl shadow-lg border-2 border-blue-500 overflow-hidden transform hover:-translate-y-1 transition-all relative">
              <div class="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
                AI 추천 1위
              </div>
              <div class="h-32 bg-slate-100 relative">
                <img src="https://images.unsplash.com/photo-1616423640778-2cfd2b96906b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-3 left-4 text-white">
                  <div class="text-xs opacity-90">인천 남동공단</div>
                  <div class="font-bold text-lg">(주)태성정밀</div>
                </div>
              </div>
              <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center text-blue-600 font-bold">
                    <span class="text-2xl mr-1">98</span>
                    <span class="text-sm">% 일치</span>
                  </div>
                  <div class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">경영인증평가원 인증 A+</div>
                </div>
                
                <div class="mb-4">
                  <h4 class="text-xs font-bold text-slate-400 uppercase mb-2">AI 추천 사유</h4>
                  <ul class="text-sm space-y-2">
                    <li class="flex items-start text-slate-700">
                      <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                      <span>유사한 <strong>알루미늄 로봇 부품</strong> 제작 이력이 15건 있습니다.</span>
                    </li>
                    <li class="flex items-start text-slate-700">
                      <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                      <span>보유한 <strong>5축 가공기</strong>가 요청하신 도면 형상에 최적화되어 있습니다.</span>
                    </li>
                  </ul>
                </div>

                <button class="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-md">
                  공급사 매칭 요청 발송
                </button>
              </div>
            </div>

            {/* Recommendation 2 */}
            <div class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden transform hover:-translate-y-1 transition-all">
              <div class="h-32 bg-slate-100 relative">
                <img src="https://images.unsplash.com/photo-1565514020125-9988a719d451?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-3 left-4 text-white">
                  <div class="text-xs opacity-90">경기 시흥</div>
                  <div class="font-bold text-lg">대영플라스틱</div>
                </div>
              </div>
              <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center text-slate-700 font-bold">
                    <span class="text-2xl mr-1">94</span>
                    <span class="text-sm">% 일치</span>
                  </div>
                  <div class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">경영인증평가원 인증 A</div>
                </div>
                
                <div class="mb-4">
                  <h4 class="text-xs font-bold text-slate-400 uppercase mb-2">AI 추천 사유</h4>
                  <ul class="text-sm space-y-2">
                    <li class="flex items-start text-slate-700">
                      <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                      <span><strong>납기 준수율 99%</strong>로 긴급 제작 요청에 적합합니다.</span>
                    </li>
                    <li class="flex items-start text-slate-700">
                      <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                      <span>자체 <strong>후처리 라인</strong>을 보유하여 비용 절감이 예상됩니다.</span>
                    </li>
                  </ul>
                </div>

                <button class="w-full py-2.5 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-bold rounded-lg transition-colors">
                  공급사 매칭 요청 발송
                </button>
              </div>
            </div>

            {/* Recommendation 3 */}
            <div class="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden transform hover:-translate-y-1 transition-all">
              <div class="h-32 bg-slate-100 relative">
                <img src="https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-3 left-4 text-white">
                  <div class="text-xs opacity-90">부산 사상</div>
                  <div class="font-bold text-lg">한일철강</div>
                </div>
              </div>
              <div class="p-5">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center text-slate-700 font-bold">
                    <span class="text-2xl mr-1">89</span>
                    <span class="text-sm">% 일치</span>
                  </div>
                  <div class="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">경영인증평가원 인증 B+</div>
                </div>
                
                <div class="mb-4">
                  <h4 class="text-xs font-bold text-slate-400 uppercase mb-2">AI 추천 사유</h4>
                  <ul class="text-sm space-y-2">
                    <li class="flex items-start text-slate-700">
                      <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                      <span><strong>가격 경쟁력</strong>이 가장 우수한 파트너입니다.</span>
                    </li>
                    <li class="flex items-start text-slate-700">
                      <i class="fas fa-check text-green-500 mt-1 mr-2 text-xs"></i>
                      <span>해당 지역(부산) 내 <strong>당일 배송</strong>이 가능합니다.</span>
                    </li>
                  </ul>
                </div>

                <button class="w-full py-2.5 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-bold rounded-lg transition-colors">
                  공급사 매칭 요청 발송
                </button>
              </div>
            </div>

          </div>

          <div class="mt-12 text-center border-t border-slate-200 pt-8">
            <p class="text-slate-500 text-sm mb-4">마음에 드는 기업이 없으신가요?</p>
            <a href="/partners" class="text-blue-600 font-medium hover:underline">
              전체 파트너 리스트 직접 검색하기 &rarr;
            </a>
          </div>

        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        // AI Simulation Script
        setTimeout(() => {
          // Update Text
          document.getElementById('loading-text').innerText = '유사한 포트폴리오를 가진 기업을 찾는 중...';
          
          // Update Steps
          const step2 = document.getElementById('step-2');
          const icon2 = document.getElementById('icon-2');
          step2.classList.remove('text-slate-500');
          step2.classList.add('text-slate-800', 'font-medium');
          icon2.classList.remove('fa-circle-notch', 'fa-spin', 'text-blue-500');
          icon2.classList.add('fa-check-circle', 'text-green-500');

          const step3 = document.getElementById('step-3');
          const icon3 = document.getElementById('icon-3');
          step3.classList.remove('text-slate-400');
          step3.classList.add('text-slate-500');
          icon3.classList.remove('far', 'fa-circle');
          icon3.classList.add('fas', 'fa-circle-notch', 'fa-spin', 'text-blue-500');
        }, 1500);

        setTimeout(() => {
          // Finish Loading
          document.getElementById('ai-loading').classList.add('hidden');
          document.getElementById('ai-result').classList.remove('hidden');
          document.getElementById('ai-result').classList.add('animate-fade-in-up');
        }, 3500);
      ` }} />
    </Layout>
  )
}
