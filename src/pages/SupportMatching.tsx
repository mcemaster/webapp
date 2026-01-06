import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* Hero Section */}
      <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-20 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span class="inline-block py-1 px-3 rounded-full bg-indigo-500/30 border border-indigo-400 text-indigo-300 text-xs font-bold mb-4">
            AI-Powered Matching
          </span>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            AI 정부지원사업 매칭 리포트
          </h1>
          <p class="text-slate-300 text-lg max-w-2xl mx-auto">
            우리 기업의 데이터를 분석하여 <span class="text-white font-bold">합격 가능성이 가장 높은 공고</span>를 찾아드립니다.
          </p>
        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4 -mt-10 relative z-20 pb-20">
        
        {/* 1. Input Form Section */}
        <div id="input-section" class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 animate-fade-in-up">
          <div class="flex items-center mb-8">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">1</div>
            <h2 class="text-xl font-bold text-slate-800">기업 정보를 입력해주세요</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">기업명</label>
              <input type="text" id="company-name" placeholder="(주)경영인증평가원" class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">주요 업종 (표준산업분류)</label>
              <input type="text" id="company-industry" placeholder="예: 소프트웨어 개발, 자동차 부품 제조" class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">작년 매출액 (백만원)</label>
              <input type="number" id="company-revenue" placeholder="500" class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
            </div>
            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">직원 수</label>
              <input type="number" id="company-employees" placeholder="10" class="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" />
            </div>
          </div>

          <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
            <h3 class="font-bold text-blue-800 mb-3 text-sm">보유 인증 및 특허 (선택)</h3>
            <div class="flex flex-wrap gap-3">
              <label class="inline-flex items-center bg-white px-4 py-2 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-50 transition">
                <input type="checkbox" class="form-checkbox text-blue-600 rounded" value="기업부설연구소" />
                <span class="ml-2 text-sm text-slate-700">기업부설연구소</span>
              </label>
              <label class="inline-flex items-center bg-white px-4 py-2 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-50 transition">
                <input type="checkbox" class="form-checkbox text-blue-600 rounded" value="벤처기업" />
                <span class="ml-2 text-sm text-slate-700">벤처기업</span>
              </label>
              <label class="inline-flex items-center bg-white px-4 py-2 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-50 transition">
                <input type="checkbox" class="form-checkbox text-blue-600 rounded" value="ISO인증" />
                <span class="ml-2 text-sm text-slate-700">ISO 인증</span>
              </label>
              <label class="inline-flex items-center bg-white px-4 py-2 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-50 transition">
                <input type="checkbox" class="form-checkbox text-blue-600 rounded" value="이노비즈" />
                <span class="ml-2 text-sm text-slate-700">이노비즈</span>
              </label>
            </div>
          </div>

          <div class="text-center">
            <button id="btn-analyze" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center mx-auto w-full md:w-auto">
              <i class="fas fa-magic mr-2"></i> AI 무료 진단 시작하기
            </button>
            <p class="text-xs text-slate-400 mt-4">* 입력하신 정보는 분석 목적으로만 사용되며 저장되지 않습니다.</p>
          </div>
        </div>

        {/* 2. Loading Section (Hidden by default) */}
        <div id="loading-section" class="hidden text-center py-20 bg-white rounded-2xl shadow-xl border border-slate-200 p-10">
          <div class="relative w-24 h-24 mx-auto mb-8">
            <div class="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div class="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            <i class="fas fa-brain absolute inset-0 flex items-center justify-center text-3xl text-blue-600 animate-pulse"></i>
          </div>
          <h2 class="text-2xl font-bold text-slate-800 mb-2">AI가 기업 데이터를 분석 중입니다...</h2>
          <p class="text-slate-500 animate-pulse">적합한 공고 매칭 중 • 가점 요소 계산 중 • 전략 수립 중</p>
        </div>

        {/* 3. Result Section (Hidden by default) */}
        <div id="result-section" class="hidden space-y-8">
          
          <div class="bg-indigo-900 text-white rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <span class="text-indigo-300 font-bold text-sm uppercase">Analysis Complete</span>
              <h2 class="text-2xl font-bold mt-1">분석 결과: <span class="text-yellow-400">매우 적합</span> 공고가 3건 발견되었습니다.</h2>
            </div>
            <button onclick="location.reload()" class="mt-4 md:mt-0 bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg text-sm font-bold backdrop-blur">
              다시 분석하기
            </button>
          </div>

          <div id="results-container" class="grid grid-cols-1 gap-6">
            {/* Results will be injected here via JS */}
          </div>

        </div>

      </div>

      <script>{`
        const btnAnalyze = document.getElementById('btn-analyze');
        const inputSection = document.getElementById('input-section');
        const loadingSection = document.getElementById('loading-section');
        const resultSection = document.getElementById('result-section');
        const resultsContainer = document.getElementById('results-container');

        btnAnalyze.addEventListener('click', async () => {
          // 1. Validate
          const name = document.getElementById('company-name').value;
          const industry = document.getElementById('company-industry').value;
          const revenue = document.getElementById('company-revenue').value;
          const employees = document.getElementById('company-employees').value;
          
          if(!name || !industry) {
            alert('기업명과 업종은 필수 입력 사항입니다.');
            return;
          }

          // 2. Collect Certs
          const certs = [];
          document.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => certs.push(cb.value));

          // 3. UI Transition
          inputSection.classList.add('hidden');
          loadingSection.classList.remove('hidden');
          window.scrollTo({ top: 0, behavior: 'smooth' });

          try {
            // 4. API Call
            const response = await fetch('/api/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                companyData: {
                  name, ksic: industry, rev_2024: revenue, employees, certs, 
                  foundingDate: '20200101', hasLab: certs.includes('기업부설연구소')
                }
              })
            });

            const result = await response.json();

            // 5. Render Results
            setTimeout(() => {
              loadingSection.classList.add('hidden');
              resultSection.classList.remove('hidden');
              renderResults(result.data || result.results); // Handle both real/mock structures
            }, 1500); // Minimum loading time for UX

          } catch (e) {
            alert('분석 중 오류가 발생했습니다. 다시 시도해주세요.');
            location.reload();
          }
        });

        function renderResults(items) {
          if (!items || items.length === 0) {
            resultsContainer.innerHTML = '<div class="p-10 text-center bg-white rounded-xl">추천할 공고가 없습니다.</div>';
            return;
          }

          resultsContainer.innerHTML = items.map((item, index) => {
            const scoreColor = item.matchScore >= 90 ? 'text-blue-600' : (item.matchScore >= 80 ? 'text-green-600' : 'text-orange-500');
            const barColor = item.matchScore >= 90 ? 'bg-blue-600' : (item.matchScore >= 80 ? 'bg-green-600' : 'bg-orange-500');
            
            return \`
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition">
                <div class="p-6 md:p-8 flex flex-col md:flex-row gap-6">
                  
                  <div class="flex-shrink-0 flex flex-col items-center justify-center md:w-32 border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                    <div class="text-sm font-bold text-slate-400 mb-1">매칭 점수</div>
                    <div class="text-4xl font-extrabold \${scoreColor}">\${item.matchScore}</div>
                    <div class="text-xs text-slate-400 mt-1">100점 만점</div>
                  </div>

                  <div class="flex-grow">
                    <div class="flex flex-wrap items-center gap-2 mb-3">
                      <span class="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-bold">\${item.agency || '정부처'}</span>
                      \${index === 0 ? '<span class="px-2.5 py-1 rounded-md bg-red-100 text-red-600 text-xs font-bold animate-pulse">강력 추천</span>' : ''}
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-2">\${item.title}</h3>
                    
                    <div class="bg-slate-50 rounded-xl p-4 mt-4 border border-slate-100">
                      <div class="flex items-start">
                        <i class="fas fa-robot text-indigo-500 mt-1 mr-3"></i>
                        <div>
                          <h4 class="text-sm font-bold text-indigo-900 mb-1">AI 추천 사유</h4>
                          <p class="text-sm text-slate-600 leading-relaxed">\${item.aiReason}</p>
                        </div>
                      </div>
                    </div>

                    <div class="mt-6 flex items-center justify-between">
                      <div class="text-xs text-slate-400">
                        <i class="far fa-clock mr-1"></i> 마감일: <span class="font-bold text-slate-600">\${item.deadline || '상시 접수'}</span>
                      </div>
                      <a href="\${item.link || '#'}" target="_blank" class="flex items-center text-sm font-bold text-blue-600 hover:underline">
                        공고 원문 보기 <i class="fas fa-external-link-alt ml-2"></i>
                      </a>
                    </div>
                  </div>

                </div>
                <div class="h-1.5 w-full bg-slate-100">
                  <div class="h-full \${barColor}" style="width: \${item.matchScore}%"></div>
                </div>
              </div>
            \`;
          }).join('');
        }
      `}</script>
    </Layout>
  )
}
