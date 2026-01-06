import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* Hero Section */}
      <div class="bg-slate-900 text-white pt-24 pb-48 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <span class="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2">AI Corporate Diagnosis</span>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            기업 데이터 종합 분석 및 매칭
          </h1>
          <p class="text-slate-400 text-lg max-w-2xl mx-auto">
            DART 공시 정보와 사용자가 입력한 정밀 데이터를 결합하여<br/>
            가장 적합한 정부지원사업을 AI가 찾아냅니다.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 -mt-32 relative z-20 pb-20">
        
        {/* Main Interface Container */}
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
          
          {/* 1. Search Bar Area */}
          <div class="p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div class="relative w-full md:w-2/3">
              <input type="text" id="company-search" placeholder="기업명을 검색하여 데이터 자동 채우기 (예: 삼성전자)" 
                class="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition text-lg shadow-sm" autocomplete="off" />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl"></i>
              
              {/* Autocomplete Dropdown */}
              <div id="autocomplete-dropdown" class="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-xl shadow-2xl mt-2 hidden overflow-hidden z-50">
                <div id="dropdown-list" class="max-h-60 overflow-y-auto"></div>
              </div>
            </div>

            <div class="w-full md:w-auto flex-shrink-0">
              <button onclick="resetForm()" class="w-full py-4 px-6 bg-white border border-slate-300 text-slate-600 font-bold rounded-xl hover:bg-slate-100 transition flex items-center justify-center">
                <i class="fas fa-pen mr-2"></i> 직접 입력 모드
              </button>
            </div>
          </div>

          {/* 2. Comprehensive Data Form */}
          <div class="p-8 md:p-12 bg-white">
            <div class="flex items-center mb-8">
              <h2 class="text-xl font-extrabold text-slate-800 flex items-center">
                <span class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center mr-3 text-sm"><i class="fas fa-database"></i></span>
                기업 정밀 데이터 입력
              </h2>
              <span class="ml-4 text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold hidden" id="dart-badge">
                <i class="fas fa-link mr-1"></i> DART 데이터 연동됨
              </span>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
              
              {/* Left Column: Basic & Financial */}
              <div class="space-y-8">
                {/* Section A: Corporate Identity */}
                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 class="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">🏢 기업 기본 정보</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="col-span-2 md:col-span-1">
                      <label class="block text-xs font-bold text-slate-500 mb-1">기업명 <span class="text-red-500">*</span></label>
                      <input type="text" id="form-name" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" placeholder="(주)기업명" />
                    </div>
                    <div class="col-span-2 md:col-span-1">
                      <label class="block text-xs font-bold text-slate-500 mb-1">대표자명</label>
                      <input type="text" id="form-ceo" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" />
                    </div>
                    <div class="col-span-2">
                      <label class="block text-xs font-bold text-slate-500 mb-1">사업자등록번호</label>
                      <input type="text" id="form-bizno" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" placeholder="000-00-00000" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">설립일</label>
                      <input type="date" id="form-est" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">주요 업종 (표준산업분류)</label>
                      <input type="text" id="form-industry" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" placeholder="예: 소프트웨어 개발" />
                    </div>
                    <div class="col-span-2">
                      <label class="block text-xs font-bold text-slate-500 mb-1">본점 주소</label>
                      <input type="text" id="form-addr" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" />
                    </div>
                  </div>
                </div>

                {/* Section B: Financials */}
                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 class="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2 flex justify-between">
                    <span>💰 재무 현황 (최근 결산 기준)</span>
                    <span class="text-xs font-normal text-slate-400">단위: 백만원</span>
                  </h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">매출액</label>
                      <input type="number" id="form-revenue" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white text-right" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">영업이익</label>
                      <input type="number" id="form-profit" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white text-right" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">자본금</label>
                      <input type="number" id="form-capital" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white text-right" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">부채비율 (%)</label>
                      <input type="number" id="form-debt" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white text-right" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">수출액 (USD)</label>
                      <input type="number" id="form-export" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white text-right" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">R&D 투자액</label>
                      <input type="number" id="form-rnd" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white text-right" placeholder="0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: HR, Tech, Description */}
              <div class="space-y-8">
                {/* Section C: HR & Tech */}
                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h3 class="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">👥 인력 및 기술 보유</h3>
                  <div class="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">전체 직원수</label>
                      <input type="number" id="form-emp" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">연구 전담 인력</label>
                      <input type="number" id="form-researchers" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" placeholder="0" />
                    </div>
                    <div>
                      <label class="block text-xs font-bold text-slate-500 mb-1">청년 고용 인원</label>
                      <input type="number" id="form-youth" class="w-full p-3 border border-slate-300 rounded-lg focus:border-blue-500 outline-none bg-white" placeholder="0" />
                    </div>
                  </div>
                  
                  <label class="block text-xs font-bold text-slate-500 mb-2">보유 인증/지식재산권 (다중 선택)</label>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['벤처기업', '이노비즈', '메인비즈', '기업부설연구소', 'ISO인증', '특허 보유', '녹색인증', '수출유망중소'].map(c => (
                      <label class="flex items-center p-2 bg-white border border-slate-200 rounded cursor-pointer hover:border-blue-400 transition">
                        <input type="checkbox" value={c} class="form-checkbox text-blue-600 rounded" />
                        <span class="ml-2 text-xs font-bold text-slate-700">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section D: Business Description (Vital for AI) */}
                <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-full flex flex-col">
                  <h3 class="font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">📝 주요 사업 내용 (AI 분석 핵심)</h3>
                  <div class="flex-grow">
                    <textarea id="form-desc" class="w-full h-40 p-4 border border-slate-300 rounded-xl focus:border-blue-500 outline-none bg-white resize-none text-sm"
                      placeholder="우리 기업의 주력 제품, 핵심 기술, 향후 사업화 계획 등을 자유롭게 입력해주세요. (AI가 이 내용을 분석하여 적합한 공고를 매칭합니다)"></textarea>
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div class="mt-10 pt-10 border-t border-slate-100 flex justify-center">
              <button id="btn-analyze" class="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xl py-5 px-16 rounded-2xl shadow-xl shadow-blue-200 transform transition hover:-translate-y-1 active:scale-95 flex items-center">
                <span class="mr-3">🚀</span> AI 분석 및 매칭 시작
              </button>
            </div>

          </div>
        </div>

        {/* Loading & Results Modals (Same Logic) */}
        <div id="loading-overlay" class="fixed inset-0 bg-white/90 backdrop-blur z-50 hidden flex flex-col items-center justify-center">
          <div class="w-24 h-24 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
          <h2 class="text-2xl font-bold text-slate-800 animate-pulse">기업 데이터를 다각도로 분석 중입니다...</h2>
          <p class="text-slate-500 mt-2">DART 재무제표 • 기술성 평가 • 유사 과제 매칭율 계산</p>
        </div>

        <div id="result-overlay" class="fixed inset-0 bg-slate-900/95 z-50 hidden flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl w-full max-w-5xl h-[90vh] overflow-hidden flex flex-col">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 class="text-xl font-bold text-slate-800"><i class="fas fa-check-circle text-green-500 mr-2"></i> 매칭 분석 결과 리포트</h2>
              <button onclick="closeResult()" class="text-slate-400 hover:text-slate-800"><i class="fas fa-times text-2xl"></i></button>
            </div>
            <div id="results-content" class="p-8 overflow-y-auto bg-slate-50 flex-grow grid gap-6">
              {/* Cards Injected Here */}
            </div>
          </div>
        </div>

      </div>

      <script>{`
        const searchInput = document.getElementById('company-search');
        const dropdown = document.getElementById('autocomplete-dropdown');
        const list = document.getElementById('dropdown-list');
        let debounceTimer;

        // Search Autocomplete
        searchInput.addEventListener('input', (e) => {
          const val = e.target.value;
          clearTimeout(debounceTimer);
          if (val.length < 1) { dropdown.classList.add('hidden'); return; }
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
          if (items.length === 0) { dropdown.classList.add('hidden'); return; }
          items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'px-5 py-3 hover:bg-blue-50 cursor-pointer border-b border-slate-50 text-left';
            div.innerHTML = \`<div class="font-bold text-slate-800">\${item.name}</div><div class="text-xs text-slate-500">\${item.ceo} | \${item.code}</div>\`;
            div.onclick = () => autoFill(item);
            list.appendChild(div);
          });
          dropdown.classList.remove('hidden');
        }

        async function autoFill(item) {
          searchInput.value = item.name;
          dropdown.classList.add('hidden');
          document.getElementById('dart-badge').classList.remove('hidden');
          
          try {
            const res = await fetch(\`/api/dart/data?code=\${item.code}\`);
            const json = await res.json();
            if (json.success) {
              const d = json.data;
              setValue('form-name', d.name);
              setValue('form-ceo', d.ceo);
              setValue('form-est', formatDate(d.est_date));
              setValue('form-addr', d.address);
              setValue('form-industry', d.corp_cls === 'Y' ? '제조업 (KOSPI)' : '정보통신업');
              
              // Mock Enrichment
              setValue('form-revenue', Math.floor(Math.random()*50000+1000));
              setValue('form-emp', Math.floor(Math.random()*300+10));
              setValue('form-profit', Math.floor(Math.random()*5000+100));
              
              // Highlight Updated Fields
              highlightFields();
            }
          } catch(e) { alert('데이터 연동 실패'); }
        }

        function resetForm() {
          document.querySelectorAll('input, textarea').forEach(el => {
            if(el.id !== 'company-search') el.value = '';
            el.style.backgroundColor = 'white';
          });
          document.querySelectorAll('input[type="checkbox"]').forEach(el => el.checked = false);
          document.getElementById('dart-badge').classList.add('hidden');
          searchInput.value = '';
          searchInput.focus();
        }

        function setValue(id, val) {
          document.getElementById(id).value = val || '';
        }
        
        function formatDate(str) {
          if(!str || str.length!==8) return str;
          return \`\${str.substring(0,4)}-\${str.substring(4,6)}-\${str.substring(6,8)}\`;
        }

        function highlightFields() {
          document.querySelectorAll('#form-name, #form-ceo, #form-revenue').forEach(el => {
            el.classList.add('bg-blue-50');
            setTimeout(() => el.classList.remove('bg-blue-50'), 1000);
          });
        }

        // Analyze
        document.getElementById('btn-analyze').addEventListener('click', async () => {
          const name = document.getElementById('form-name').value;
          if(!name) return alert('기업명은 필수입니다.');
          
          document.getElementById('loading-overlay').classList.remove('hidden');
          
          // Gather Data
          const companyData = {
            name, 
            ceo: document.getElementById('form-ceo').value,
            industry: document.getElementById('form-industry').value,
            revenue: document.getElementById('form-revenue').value,
            employees: document.getElementById('form-emp').value,
            desc: document.getElementById('form-desc').value,
            certs: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
          };

          try {
            const res = await fetch('/api/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyData })
            });
            const result = await res.json();
            
            setTimeout(() => {
              document.getElementById('loading-overlay').classList.add('hidden');
              document.getElementById('result-overlay').classList.remove('hidden');
              renderResults(result.data || result.results);
            }, 2000);
          } catch(e) {
            alert('분석 오류');
            location.reload();
          }
        });

        function renderResults(items) {
          const container = document.getElementById('results-content');
          container.innerHTML = items.map((item, idx) => \`
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span class="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">\${item.agency || '정부부처'}</span>
                    \${idx === 0 ? '<span class="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold">1순위 추천</span>' : ''}
                  </div>
                  <h3 class="text-xl font-bold text-slate-900">\${item.title}</h3>
                </div>
                <div class="text-right">
                  <div class="text-3xl font-extrabold text-blue-600">\${item.matchScore}</div>
                  <div class="text-xs text-slate-400">적합도</div>
                </div>
              </div>
              <div class="bg-indigo-50 p-4 rounded-lg text-sm text-slate-700 leading-relaxed">
                <strong class="text-indigo-700 block mb-1"><i class="fas fa-robot mr-1"></i> AI 분석 의견:</strong>
                \${item.aiReason}
              </div>
              <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>마감일: \${item.deadline || '상시'}</span>
                <a href="#" class="text-blue-600 font-bold hover:underline">공고 원문 보기 -></a>
              </div>
            </div>
          \`).join('');
        }

        window.closeResult = () => document.getElementById('result-overlay').classList.add('hidden');
        document.addEventListener('click', (e) => {
          if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) dropdown.classList.add('hidden');
        });
      `}</script>
    </Layout>
  )
}
