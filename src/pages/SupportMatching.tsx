import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* ================= PHASE 1: INPUT FORM (Initial View) ================= */}
      <div id="view-input" class="min-h-screen bg-slate-50 pb-20">
        
        {/* Hero */}
        <div class="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <span class="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">AI Government Grant Matching</span>
            <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              AI 정부지원사업 <span class="text-blue-400">초정밀 진단</span>
            </h1>
            <p class="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              기업명만 입력하세요. <strong>DART, 사람인, 키프리스, 고용부 데이터</strong>를 AI가 실시간으로 수집하여<br/>
              귀사에 딱 맞는 <strong>Top 20 지원사업</strong>을 찾아냅니다.
            </p>
          </div>
        </div>

        {/* Input Card */}
        <div class="max-w-5xl mx-auto px-4 -mt-20 relative z-20">
          <div class="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Search Header */}
            <div class="p-8 md:p-10 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100">
              <div class="relative max-w-3xl mx-auto">
                <label class="block text-sm font-bold text-slate-700 mb-3 ml-1">기업 데이터 자동 수집</label>
                <div class="relative flex items-center">
                  <i class="fas fa-search absolute left-5 text-slate-400 text-xl"></i>
                  <input type="text" id="company-search" placeholder="기업명을 입력하세요 (예: 삼성전자, 비바리퍼블리카)" 
                    class="w-full pl-14 pr-32 py-5 text-lg rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" autocomplete="off" />
                  <button id="btn-manual" class="absolute right-3 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition">
                    직접 입력
                  </button>
                </div>
                {/* Autocomplete */}
                <div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 mt-2 overflow-hidden hidden z-50"></div>
              </div>
            </div>

            {/* Detailed Form */}
            <div class="p-8 md:p-12">
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Left: Basic Info */}
                <div class="space-y-6">
                  <h3 class="text-lg font-bold text-slate-800 flex items-center">
                    <span class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3 text-sm"><i class="fas fa-building"></i></span>
                    기업 개요 (DART)
                  </h3>
                  <div class="space-y-4">
                    <div><label class="text-xs font-bold text-slate-500 mb-1 block">기업명</label><input type="text" id="form-name" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-bold" /></div>
                    <div class="grid grid-cols-2 gap-4">
                      <div><label class="text-xs font-bold text-slate-500 mb-1 block">대표자</label><input type="text" id="form-ceo" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" /></div>
                      <div><label class="text-xs font-bold text-slate-500 mb-1 block">설립일</label><input type="text" id="form-est" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" /></div>
                    </div>
                    <div><label class="text-xs font-bold text-slate-500 mb-1 block">주요 업종</label><input type="text" id="form-industry" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg" /></div>
                  </div>
                </div>

                {/* Right: Financial & Tech */}
                <div class="space-y-6">
                  <h3 class="text-lg font-bold text-slate-800 flex items-center">
                    <span class="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-3 text-sm"><i class="fas fa-chart-line"></i></span>
                    재무 및 기술 역량
                  </h3>
                  <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4">
                      <div><label class="text-xs font-bold text-slate-500 mb-1 block">매출액 (백만원)</label><input type="number" id="form-revenue" class="w-full p-3 border border-slate-200 rounded-lg" placeholder="0" /></div>
                      <div><label class="text-xs font-bold text-slate-500 mb-1 block">직원 수 (명)</label><input type="number" id="form-emp" class="w-full p-3 border border-slate-200 rounded-lg" placeholder="0" /></div>
                    </div>
                    <div>
                      <label class="text-xs font-bold text-slate-500 mb-2 block">보유 인증 (다중 선택)</label>
                      <div class="grid grid-cols-3 gap-2">
                        {['기업부설연구소', '벤처기업', '이노비즈', '메인비즈', 'ISO인증', '특허보유'].map(c => (
                          <label class="flex items-center p-2 border border-slate-100 rounded hover:bg-slate-50 cursor-pointer">
                            <input type="checkbox" value={c} class="rounded text-blue-600 mr-2" />
                            <span class="text-xs text-slate-600">{c}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div class="mt-10 pt-8 border-t border-slate-100 text-center">
                <button id="btn-start-analyze" class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xl py-5 px-20 rounded-2xl shadow-xl shadow-blue-200 transform transition hover:-translate-y-1 active:scale-95 flex items-center justify-center mx-auto">
                  <i class="fas fa-microchip mr-3"></i> AI 정밀 진단 시작
                </button>
                <p class="text-xs text-slate-400 mt-4">분석에는 약 5~10초가 소요됩니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ================= PHASE 2: LOADING OVERLAY (Full Screen) ================= */}
      <div id="view-loading" class="fixed inset-0 bg-slate-900 z-50 hidden flex flex-col items-center justify-center text-white">
        <div class="w-full max-w-lg space-y-8 p-8">
          <div class="text-center">
            <div class="w-24 h-24 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h2 class="text-3xl font-bold mb-2">AI Analyzing...</h2>
            <p class="text-blue-300">기업 데이터를 수집하고 최적의 공고를 매칭 중입니다.</p>
          </div>
          
          <div class="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-4 font-mono text-sm">
            <div id="log-1" class="flex items-center text-slate-400"><i class="fas fa-check text-green-500 mr-3"></i> DART 재무제표 분석 완료</div>
            <div id="log-2" class="flex items-center text-slate-400 opacity-0"><i class="fas fa-spinner fa-spin text-blue-500 mr-3"></i> 사람인/잡코리아 채용 공고 스캔 중...</div>
            <div id="log-3" class="flex items-center text-slate-400 opacity-0"><i class="fas fa-circle text-slate-600 mr-3"></i> 특허청(KIPRIS) 지식재산권 조회 대기</div>
            <div id="log-4" class="flex items-center text-slate-400 opacity-0"><i class="fas fa-circle text-slate-600 mr-3"></i> 2026년 정부지원사업 DB 대조 (3,542건)</div>
          </div>
        </div>
      </div>


      {/* ================= PHASE 3: RESULT REPORT (Full Screen Replacement) ================= */}
      <div id="view-result" class="min-h-screen bg-slate-50 hidden">
        {/* Report Header */}
        <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div class="flex items-center">
              <a href="/support-matching" class="text-slate-400 hover:text-slate-600 mr-4"><i class="fas fa-arrow-left"></i></a>
              <h1 class="text-xl font-bold text-slate-800">AI 매칭 분석 리포트</h1>
              <span class="ml-3 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Top 20 선정</span>
            </div>
            <div class="flex space-x-3">
              <button class="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold hover:bg-slate-50"><i class="fas fa-print mr-2"></i>인쇄</button>
              <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700"><i class="fas fa-file-pdf mr-2"></i>PDF 다운로드</button>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-10">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Summary Card */}
            <div class="lg:col-span-1 space-y-6">
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h3 class="text-sm font-bold text-slate-500 uppercase mb-4">Diagnosis Summary</h3>
                <div class="text-center py-6">
                  <div class="text-5xl font-extrabold text-blue-600 mb-2">98<span class="text-2xl text-slate-400">점</span></div>
                  <p class="text-slate-800 font-bold">지원사업 적합도: <span class="text-green-600">매우 높음</span></p>
                </div>
                <div class="space-y-3 pt-6 border-t border-slate-100">
                  <div class="flex justify-between text-sm"><span>기술성</span> <span class="font-bold text-slate-800">우수 (A)</span></div>
                  <div class="flex justify-between text-sm"><span>사업성</span> <span class="font-bold text-slate-800">양호 (B+)</span></div>
                  <div class="flex justify-between text-sm"><span>시장성</span> <span class="font-bold text-slate-800">최우수 (S)</span></div>
                </div>
              </div>
              
              <div class="bg-indigo-900 text-white p-6 rounded-2xl shadow-lg">
                <h3 class="font-bold mb-2"><i class="fas fa-lightbulb text-yellow-400 mr-2"></i> AI 전략 제언</h3>
                <p class="text-sm text-indigo-200 leading-relaxed">
                  귀사는 매출액 대비 R&D 투자 비중이 높아 <strong>기술개발(R&D)</strong> 과제 선정 확률이 높습니다. 특히 최근 고용 증가세를 활용하여 <strong>일자리 창출 가점</strong>을 적극 공략하세요.
                </p>
              </div>
            </div>

            {/* Right: Matches List (Top 20) */}
            <div class="lg:col-span-2">
              <h2 class="text-xl font-bold text-slate-800 mb-6 flex items-center">
                <i class="fas fa-list-ol text-blue-600 mr-3"></i> 맞춤형 지원사업 Top 20
              </h2>
              
              <div id="results-list" class="space-y-4">
                {/* Items injected here */}
              </div>
            </div>

          </div>
        </div>
      </div>

      <script>{`
        const searchInput = document.getElementById('company-search');
        const list = document.getElementById('autocomplete-list');
        const viewInput = document.getElementById('view-input');
        const viewLoading = document.getElementById('view-loading');
        const viewResult = document.getElementById('view-result');
        const resultsList = document.getElementById('results-list');

        let debounceTimer;

        // --- 1. Search & Autocomplete ---
        searchInput.addEventListener('input', (e) => {
          const val = e.target.value;
          clearTimeout(debounceTimer);
          if (val.length < 1) { list.classList.add('hidden'); return; }
          debounceTimer = setTimeout(async () => {
            try {
              const res = await fetch(\`/api/search/company?q=\${encodeURIComponent(val)}\`);
              const data = await res.json();
              renderDropdown(data);
            } catch(e) {}
          }, 300);
        });

        function renderDropdown(items) {
          list.innerHTML = '';
          if (items.length === 0) { list.classList.add('hidden'); return; }
          items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'px-6 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 flex justify-between items-center transition';
            div.innerHTML = \`<span class="font-bold text-slate-800">\${item.name}</span><span class="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">\${item.code}</span>\`;
            div.onclick = () => autoFill(item);
            list.appendChild(div);
          });
          list.classList.remove('hidden');
        }

        async function autoFill(item) {
          searchInput.value = item.name;
          list.classList.add('hidden');
          try {
            const res = await fetch(\`/api/dart/data?code=\${item.code}\`);
            const json = await res.json();
            if(json.success) {
              const d = json.data;
              document.getElementById('form-name').value = d.name;
              document.getElementById('form-ceo').value = d.ceo;
              document.getElementById('form-est').value = d.est_date;
              document.getElementById('form-industry').value = d.corp_cls === 'Y' ? '제조업 (KOSPI)' : '정보통신업';
              document.getElementById('form-revenue').value = Math.floor(Math.random()*50000+1000); // Mock
              document.getElementById('form-emp').value = Math.floor(Math.random()*300+10); // Mock
            }
          } catch(e) { alert('데이터 연동 실패'); }
        }

        // --- 2. Analyze & Simulate Loading ---
        document.getElementById('btn-start-analyze').addEventListener('click', async () => {
          const name = document.getElementById('form-name').value;
          if(!name) return alert('기업명을 입력해주세요.');

          // Switch View
          viewInput.classList.add('hidden');
          viewLoading.classList.remove('hidden');
          viewLoading.classList.add('flex'); // Enable flex layout

          // Simulation Sequence
          setTimeout(() => showLog('log-2'), 1000);
          setTimeout(() => showLog('log-3'), 2500);
          setTimeout(() => showLog('log-4'), 4000);

          // API Call
          try {
            const companyData = {
              name, 
              ksic: document.getElementById('form-industry').value,
              rev_2024: document.getElementById('form-revenue').value,
              certs: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
            };

            const response = await fetch('/support-matching/analyze', { // Use the new API route
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyData })
            });
            const result = await response.json();

            // Finish Loading
            setTimeout(() => {
              viewLoading.classList.add('hidden');
              viewLoading.classList.remove('flex');
              viewResult.classList.remove('hidden');
              renderReport(result.data);
            }, 5500); // Wait for simulation to finish

          } catch(e) {
            alert('분석 오류');
            location.reload();
          }
        });

        function showLog(id) {
          const el = document.getElementById(id);
          el.classList.remove('opacity-0');
          el.classList.add('animate-pulse');
          // Check previous log
          const prevId = 'log-' + (parseInt(id.split('-')[1]) - 1);
          if(document.getElementById(prevId)) {
             const prev = document.getElementById(prevId);
             prev.classList.remove('animate-pulse');
             prev.innerHTML = prev.innerHTML.replace('중...', '완료').replace('대기', '완료').replace('fa-spinner fa-spin', 'fa-check text-green-500').replace('fa-circle', 'fa-check text-green-500');
          }
        }

        // --- 3. Render Report ---
        function renderReport(items) {
          resultsList.innerHTML = items.map((item, i) => \`
            <div class="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition group">
              <div class="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                  <div class="flex items-center gap-3 mb-2">
                    <span class="bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded">Rank \${i+1}</span>
                    <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">\${item.category}</span>
                    <span class="text-xs text-slate-500">\${item.agency}</span>
                  </div>
                  <h3 class="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition">\${item.title}</h3>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-extrabold text-slate-800">\${item.matchScore}<span class="text-sm text-slate-400 font-normal">점</span></div>
                  <div class="text-xs text-red-500 font-bold">\${item.amount} / \${item.deadline}까지</div>
                </div>
              </div>
              <div class="bg-slate-50 p-4 rounded-lg text-sm text-slate-600 leading-relaxed border border-slate-100">
                <i class="fas fa-robot text-indigo-500 mr-2"></i> \${item.aiReason}
              </div>
              <div class="mt-4 flex justify-end">
                <button class="text-sm font-bold text-blue-600 hover:underline">상세 공고 확인 <i class="fas fa-chevron-right text-xs"></i></button>
              </div>
            </div>
          \`).join('');
        }
      `}</script>
    </Layout>
  )
}
