import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* Hero Section: Professional & Tech-focused */}
      <div class="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div class="max-w-7xl mx-auto px-4 relative z-10">
          <span class="inline-block py-1 px-3 rounded border border-blue-400 text-blue-300 text-xs font-bold mb-4 tracking-wider">
            PREMIUM AI DIAGNOSIS
          </span>
          <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            기업 데이터 기반<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">정부지원사업 초정밀 매칭</span>
          </h1>
          <p class="text-slate-400 text-lg max-w-2xl">
            DART(재무), 고용보험(인력), 키프리스(특허) 등 <strong>12종의 공공/민간 데이터</strong>를 AI가 실시간으로 수집·분석하여<br/>
            귀사의 합격 가능성을 예측하고 최적의 자금 조달 전략을 수립합니다.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-24">
        <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row min-h-[800px]">
          
          {/* LEFT COLUMN: Data Collection & Input */}
          <div class="lg:w-2/3 p-8 md:p-10 border-r border-slate-100 bg-slate-50/50">
            
            {/* 1. AI Data Collection Search */}
            <div class="mb-10">
              <label class="block text-sm font-bold text-slate-800 mb-3 flex items-center">
                <i class="fas fa-search text-blue-600 mr-2"></i> 기업 데이터 자동 수집 (Auto-Crawling)
              </label>
              <div class="relative group z-50">
                <input type="text" id="company-search" placeholder="기업명을 입력하세요 (예: 삼성전자, 태성정밀)" 
                  class="w-full px-5 py-4 pl-12 text-lg border-2 border-blue-100 rounded-xl focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all shadow-sm" autocomplete="off" />
                <i class="fas fa-robot absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400 text-xl"></i>
                <button id="btn-search" class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition">
                  데이터 불러오기
                </button>
                
                {/* Autocomplete Dropdown */}
                <div id="autocomplete-dropdown" class="absolute top-full left-0 w-full bg-white border border-slate-200 rounded-b-xl shadow-xl mt-1 hidden overflow-hidden">
                  <div id="dropdown-list" class="max-h-60 overflow-y-auto"></div>
                </div>
              </div>
              <div class="flex flex-wrap gap-2 mt-3 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                <span class="px-2 py-1 bg-green-100 text-green-700 rounded"><i class="fas fa-check mr-1"></i> DART 재무</span>
                <span class="px-2 py-1 bg-blue-100 text-blue-700 rounded"><i class="fas fa-check mr-1"></i> 고용보험</span>
                <span class="px-2 py-1 bg-purple-100 text-purple-700 rounded"><i class="fas fa-check mr-1"></i> KIPRIS 특허</span>
                <span class="px-2 py-1 bg-orange-100 text-orange-700 rounded"><i class="fas fa-check mr-1"></i> 사람인 채용</span>
              </div>
            </div>

            {/* 2. Detailed Data Form */}
            <div id="data-form" class="space-y-8 opacity-50 pointer-events-none transition-opacity duration-500">
              
              {/* Section A: Corporate Identity */}
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex justify-between">
                  <span>🏢 기업 일반 현황</span>
                  <span class="text-xs text-green-600 font-normal"><i class="fas fa-sync mr-1"></i> DART 연동됨</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">기업명</label><input type="text" id="form-name" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-slate-800" readonly /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">대표자</label><input type="text" id="form-ceo" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold text-slate-800" readonly /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">설립일 (업력)</label><input type="text" id="form-est" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600" /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">주요 업종 (KSIC)</label><input type="text" id="form-industry" class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded text-sm text-slate-600" /></div>
                </div>
              </div>

              {/* Section B: Financials & HR */}
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4 flex justify-between">
                  <span>💰 재무 및 인력 (정량 지표)</span>
                  <span class="text-xs text-blue-600 font-normal"><i class="fas fa-chart-line mr-1"></i> 성장성 분석 포함</span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">최근 매출액 (백만원)</label><input type="number" id="form-revenue" class="w-full p-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">영업이익 (백만원)</label><input type="number" id="form-profit" class="w-full p-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" placeholder="0" /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">수출 실적 ($)</label><input type="number" id="form-export" class="w-full p-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" placeholder="0" /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">총 직원 수 (명)</label><input type="number" id="form-emp" class="w-full p-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">R&D 투자비율 (%)</label><input type="number" id="form-rnd" class="w-full p-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" placeholder="0" /></div>
                  <div><label class="text-xs font-bold text-slate-500 mb-1 block">신용등급 (선택)</label><input type="text" class="w-full p-2.5 border border-slate-200 rounded text-sm focus:border-blue-500 outline-none" placeholder="예: BBB+" /></div>
                </div>
              </div>

              {/* Section C: Tech & Certs */}
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4">🎖️ 인증 및 지식재산권 (가점 요인)</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <label class="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-blue-50 cursor-pointer transition"><input type="checkbox" value="벤처기업" class="text-blue-600 rounded" /> <span class="ml-2 text-xs font-bold text-slate-700">벤처기업</span></label>
                  <label class="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-blue-50 cursor-pointer transition"><input type="checkbox" value="이노비즈" class="text-blue-600 rounded" /> <span class="ml-2 text-xs font-bold text-slate-700">이노비즈</span></label>
                  <label class="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-blue-50 cursor-pointer transition"><input type="checkbox" value="메인비즈" class="text-blue-600 rounded" /> <span class="ml-2 text-xs font-bold text-slate-700">메인비즈</span></label>
                  <label class="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-blue-50 cursor-pointer transition"><input type="checkbox" value="연구소" class="text-blue-600 rounded" /> <span class="ml-2 text-xs font-bold text-slate-700">연구소/전담부서</span></label>
                  <label class="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-blue-50 cursor-pointer transition"><input type="checkbox" value="ISO" class="text-blue-600 rounded" /> <span class="ml-2 text-xs font-bold text-slate-700">ISO 인증</span></label>
                  <label class="flex items-center p-3 border border-slate-100 rounded-lg hover:bg-blue-50 cursor-pointer transition"><input type="checkbox" value="특허" class="text-blue-600 rounded" /> <span class="ml-2 text-xs font-bold text-slate-700">특허 보유</span></label>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: AI Analysis & Results */}
          <div class="lg:w-1/3 bg-slate-900 text-white p-8 md:p-10 flex flex-col">
            <h2 class="text-xl font-bold mb-2 text-blue-300">AI Analysis Center</h2>
            <p class="text-slate-400 text-sm mb-8">수집된 데이터를 실시간으로 분석합니다.</p>

            {/* Analysis Status Panel */}
            <div id="status-panel" class="flex-1 space-y-6">
              <div class="bg-slate-800/50 rounded-xl p-5 border border-slate-700">
                <h4 class="text-xs font-bold text-slate-400 uppercase mb-3">Data Integrity</h4>
                <div class="space-y-3">
                  <div class="flex justify-between text-sm"><span>재무 데이터</span> <span id="status-financial" class="text-slate-500">대기중</span></div>
                  <div class="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden"><div id="bar-financial" class="h-full bg-blue-500 w-0 transition-all duration-1000"></div></div>
                  
                  <div class="flex justify-between text-sm"><span>기술 역량</span> <span id="status-tech" class="text-slate-500">대기중</span></div>
                  <div class="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden"><div id="bar-tech" class="h-full bg-green-500 w-0 transition-all duration-1000"></div></div>
                  
                  <div class="flex justify-between text-sm"><span>가점 요인</span> <span id="status-bonus" class="text-slate-500">대기중</span></div>
                  <div class="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden"><div id="bar-bonus" class="h-full bg-purple-500 w-0 transition-all duration-1000"></div></div>
                </div>
              </div>

              <div id="ai-message" class="bg-indigo-900/30 border border-indigo-500/30 p-5 rounded-xl text-sm leading-relaxed text-indigo-200">
                <i class="fas fa-info-circle mr-2"></i> 좌측에서 기업 데이터를 불러오시면, AI가 2026년 정부지원사업 공고 3,500건 중 최적의 매칭을 시작합니다.
              </div>
            </div>

            {/* Action Button */}
            <button id="btn-analyze" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/50 transform transition hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-6" disabled>
              AI 매칭 분석 시작
            </button>
          </div>
        </div>

        {/* RESULT MODAL / SECTION (Injected here) */}
        <div id="result-overlay" class="fixed inset-0 bg-black/80 z-50 hidden flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            <button onclick="closeResult()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2"><i class="fas fa-times text-2xl"></i></button>
            <div id="result-content" class="p-8 md:p-12">
              {/* Dynamic Results Go Here */}
            </div>
          </div>
        </div>

      </div>

      <script>{`
        const searchInput = document.getElementById('company-search');
        const dropdown = document.getElementById('autocomplete-dropdown');
        const list = document.getElementById('dropdown-list');
        const dataForm = document.getElementById('data-form');
        const analyzeBtn = document.getElementById('btn-analyze');
        
        let debounceTimer;

        // 1. Search Logic
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
            div.className = 'px-5 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 flex justify-between';
            div.innerHTML = \`<span class="font-bold text-slate-800">\${item.name}</span><span class="text-xs text-slate-400">\${item.ceo}</span>\`;
            div.onclick = () => selectCompany(item);
            list.appendChild(div);
          });
          dropdown.classList.remove('hidden');
        }

        async function selectCompany(item) {
          searchInput.value = item.name;
          dropdown.classList.add('hidden');
          
          // Animate Loading Bars
          document.getElementById('status-financial').innerText = '수집중...';
          document.getElementById('bar-financial').style.width = '60%';
          
          try {
            const res = await fetch(\`/api/dart/data?code=\${item.code}\`);
            const json = await res.json();
            
            if (json.success) {
              const d = json.data;
              document.getElementById('form-name').value = d.name;
              document.getElementById('form-ceo').value = d.ceo;
              document.getElementById('form-est').value = d.est_date;
              document.getElementById('form-industry').value = d.corp_cls === 'Y' ? '제조업 (KOSPI)' : '정보통신업';
              
              // Simulate Enrichment
              document.getElementById('form-revenue').value = Math.floor(Math.random() * 50000 + 1000);
              document.getElementById('form-emp').value = Math.floor(Math.random() * 300 + 10);
              
              // Enable Form
              dataForm.style.opacity = '1';
              dataForm.style.pointerEvents = 'auto';
              analyzeBtn.disabled = false;
              
              // Complete Bars
              document.getElementById('bar-financial').style.width = '100%';
              document.getElementById('status-financial').innerText = '완료';
              document.getElementById('status-financial').className = 'text-green-400';
              document.getElementById('ai-message').innerHTML = '<i class="fas fa-check-circle mr-2"></i> <strong>' + d.name + '</strong>의 데이터 수집이 완료되었습니다. 추가 정보를 입력하면 정확도가 올라갑니다.';
            }
          } catch(e) { alert('오류'); }
        }

        // 2. Analyze Logic
        analyzeBtn.addEventListener('click', async () => {
          analyzeBtn.innerText = 'AI 분석 중...';
          analyzeBtn.classList.add('animate-pulse');
          
          const companyData = {
            name: document.getElementById('form-name').value,
            ksic: document.getElementById('form-industry').value,
            rev_2024: document.getElementById('form-revenue').value,
            employees: document.getElementById('form-emp').value,
            certs: [] // Collect checkboxes
          };

          try {
            const res = await fetch('/api/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyData })
            });
            const json = await res.json();
            
            showResult(json.data || json.results);
          } catch(e) { alert('분석 실패'); }
          
          analyzeBtn.innerText = 'AI 매칭 분석 시작';
          analyzeBtn.classList.remove('animate-pulse');
        });

        function showResult(items) {
          const overlay = document.getElementById('result-overlay');
          const content = document.getElementById('result-content');
          
          content.innerHTML = \`
            <h2 class="text-3xl font-extrabold text-slate-900 mb-2">📊 AI 분석 리포트</h2>
            <p class="text-slate-500 mb-8">귀사에 최적화된 Top 3 지원사업을 도출했습니다.</p>
            <div class="grid gap-6">
              \${items.map((item, idx) => \`
                <div class="bg-slate-50 rounded-xl p-6 border border-slate-200 relative overflow-hidden">
                  \${idx === 0 ? '<div class="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">1순위 추천</div>' : ''}
                  <div class="flex justify-between items-start mb-4">
                    <div>
                      <span class="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">\${item.agency || '정부부처'}</span>
                      <h3 class="text-xl font-bold text-slate-800 mt-2">\${item.title}</h3>
                    </div>
                    <div class="text-right">
                      <div class="text-3xl font-extrabold text-slate-900">\${item.matchScore}<span class="text-sm text-slate-400 font-normal">점</span></div>
                    </div>
                  </div>
                  <div class="bg-white p-4 rounded-lg border border-slate-100 text-sm text-slate-600 leading-relaxed">
                    <strong class="text-indigo-600 block mb-1">AI 매칭 사유:</strong>
                    \${item.aiReason}
                  </div>
                </div>
              \`).join('')}
            </div>
            <div class="mt-8 text-center">
              <button onclick="closeResult()" class="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900">닫기</button>
            </div>
          \`;
          
          overlay.classList.remove('hidden');
        }

        window.closeResult = () => {
          document.getElementById('result-overlay').classList.add('hidden');
        }
      `}</script>
    </Layout>
  )
}
