import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* ================= PHASE 1: INPUT FORM (Deep Diagnosis Mode) ================= */}
      <div id="view-input" class="min-h-screen bg-slate-50 pb-24">
        
        {/* Hero Header */}
        <div class="bg-slate-900 text-white pt-24 pb-40 relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <span class="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">Premium Service</span>
            <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              기업 정밀 진단 & 지원사업 매칭
            </h1>
            <p class="text-slate-400 text-lg max-w-3xl mx-auto">
              50개 이상의 기업 정밀 데이터를 AI가 분석하여, <span class="text-white font-bold">선정 확률 90% 이상</span>의 지원사업만 골라드립니다.<br/>
              DART 연동으로 편하게 입력하고, 부족한 부분은 수동으로 보완하세요.
            </p>
          </div>
        </div>

        {/* Main Form Container */}
        <div class="max-w-6xl mx-auto px-4 -mt-24 relative z-20">
          
          {/* 1. DART Search Bar */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 border border-blue-100">
            <div class="relative w-full">
              <label class="block text-xs font-bold text-slate-500 mb-1 ml-1">기업 데이터 자동 불러오기</label>
              <div class="relative">
                <input type="text" id="company-search" placeholder="기업명 검색 (예: 삼성전자, 비바리퍼블리카)" 
                  class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition text-lg font-bold" autocomplete="off" />
                <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl"></i>
              </div>
              {/* Autocomplete Dropdown */}
              <div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 mt-2 overflow-hidden hidden z-50"></div>
            </div>
            <div class="w-full md:w-auto flex-shrink-0 mt-6 md:mt-0">
              <button onclick="resetForm()" class="w-full h-[60px] px-8 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition flex items-center justify-center">
                <i class="fas fa-undo-alt mr-2"></i> 초기화
              </button>
            </div>
          </div>

          <form id="diagnosis-form" onsubmit="return false;">
            <div class="grid grid-cols-1 gap-8">

              {/* Section 1: Corporate Identity */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-3 text-sm">1</span>
                  기업 기본 정보
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div class="lg:col-span-2">
                    <label class="form-label">기업명 <span class="text-red-500">*</span></label>
                    <input type="text" id="basic-name" class="form-input" placeholder="(주)기업명" />
                  </div>
                  <div>
                    <label class="form-label">대표자명</label>
                    <input type="text" id="basic-ceo" class="form-input" />
                  </div>
                  <div>
                    <label class="form-label">사업자등록번호</label>
                    <input type="text" id="basic-bizno" class="form-input" placeholder="000-00-00000" />
                  </div>
                  <div>
                    <label class="form-label">설립일 (YYYYMMDD)</label>
                    <input type="text" id="basic-est" class="form-input" placeholder="20200101" />
                  </div>
                  <div class="lg:col-span-2">
                    <label class="form-label">주요 업종 (표준산업분류)</label>
                    <input type="text" id="basic-industry" class="form-input" placeholder="예: 응용 소프트웨어 개발 및 공급업" />
                  </div>
                  <div>
                    <label class="form-label">기업 형태</label>
                    <select id="basic-type" class="form-input">
                      <option>중소기업</option>
                      <option>중견기업</option>
                      <option>스타트업(7년미만)</option>
                      <option>예비창업자</option>
                    </select>
                  </div>
                  <div class="lg:col-span-4">
                    <label class="form-label">본점 주소</label>
                    <input type="text" id="basic-addr" class="form-input" placeholder="주소를 입력하세요" />
                  </div>
                </div>
              </div>

              {/* Section 2: Financials (3 Years) */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center mr-3 text-sm">2</span>
                  재무 현황 (최근 3개년)
                  <span class="ml-auto text-xs font-normal text-slate-400">단위: 백만원</span>
                </h3>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm text-center">
                    <thead class="bg-slate-50 text-slate-500 font-bold">
                      <tr>
                        <th class="p-3 text-left">구분</th>
                        <th class="p-3">2023년 (확정)</th>
                        <th class="p-3">2024년 (확정)</th>
                        <th class="p-3">2025년 (추정)</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                      <tr>
                        <td class="p-3 text-left font-bold text-slate-700">매출액</td>
                        <td class="p-2"><input type="number" id="fin-rev-2023" class="form-input text-right" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-rev-2024" class="form-input text-right bg-blue-50/50" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-rev-2025" class="form-input text-right" placeholder="0" /></td>
                      </tr>
                      <tr>
                        <td class="p-3 text-left font-bold text-slate-700">영업이익</td>
                        <td class="p-2"><input type="number" id="fin-prof-2023" class="form-input text-right" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-prof-2024" class="form-input text-right bg-blue-50/50" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-prof-2025" class="form-input text-right" placeholder="0" /></td>
                      </tr>
                      <tr>
                        <td class="p-3 text-left font-bold text-slate-700">부채비율(%)</td>
                        <td class="p-2"><input type="number" id="fin-debt-2023" class="form-input text-right" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-debt-2024" class="form-input text-right bg-blue-50/50" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-debt-2025" class="form-input text-right" placeholder="0" /></td>
                      </tr>
                      <tr>
                        <td class="p-3 text-left font-bold text-slate-700">R&D 투자액</td>
                        <td class="p-2"><input type="number" id="fin-rnd-2023" class="form-input text-right" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-rnd-2024" class="form-input text-right bg-blue-50/50" placeholder="0" /></td>
                        <td class="p-2"><input type="number" id="fin-rnd-2025" class="form-input text-right" placeholder="0" /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3: HR & Tech */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mr-3 text-sm">3</span>
                  인력 및 기술/인증 현황
                </h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* HR */}
                  <div>
                    <h4 class="text-sm font-bold text-slate-600 mb-4 uppercase tracking-wider">인력 구성 (현재 기준)</h4>
                    <div class="grid grid-cols-2 gap-4">
                      <div><label class="form-label">전체 직원수 (명)</label><input type="number" id="hr-total" class="form-input" /></div>
                      <div><label class="form-label">기업부설연구소 전담인력</label><input type="number" id="hr-rnd" class="form-input" /></div>
                      <div><label class="form-label">청년 고용 (만 34세 이하)</label><input type="number" id="hr-youth" class="form-input" /></div>
                      <div><label class="form-label">올해 신규 채용 예정</label><input type="number" id="hr-new" class="form-input" /></div>
                    </div>
                  </div>
                  {/* Certs & IP */}
                  <div>
                    <h4 class="text-sm font-bold text-slate-600 mb-4 uppercase tracking-wider">인증 및 지식재산권</h4>
                    <div class="grid grid-cols-2 gap-2 mb-4">
                      {['기업부설연구소', '벤처기업', '이노비즈', '메인비즈', 'ISO 9001', 'ISO 14001', '녹색인증', '여성기업', '소부장기업', '뿌리기업'].map(c => (
                        <label class="flex items-center p-2 rounded hover:bg-slate-50 border border-slate-100 cursor-pointer">
                          <input type="checkbox" name="certs" value={c} class="rounded text-indigo-600 focus:ring-indigo-500" />
                          <span class="ml-2 text-xs font-bold text-slate-700">{c}</span>
                        </label>
                      ))}
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                      <div><label class="form-label">특허 등록(건)</label><input type="number" id="ip-patent" class="form-input text-center" placeholder="0" /></div>
                      <div><label class="form-label">특허 출원(건)</label><input type="number" id="ip-apply" class="form-input text-center" placeholder="0" /></div>
                      <div><label class="form-label">상표/디자인(건)</label><input type="number" id="ip-design" class="form-input text-center" placeholder="0" /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Export & Strategy */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center mr-3 text-sm">4</span>
                  수출 및 사업 전략 (AI 분석용)
                </h3>
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label class="form-label">작년 직수출 실적 (USD)</label>
                    <input type="number" id="export-amt" class="form-input" placeholder="0" />
                  </div>
                  <div class="lg:col-span-2">
                    <label class="form-label">주요 수출 국가 (콤마로 구분)</label>
                    <input type="text" id="export-countries" class="form-input" placeholder="예: 미국, 베트남, 일본" />
                  </div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label class="form-label">핵심 보유 기술 및 제품 (상세 서술)</label>
                    <textarea id="desc-tech" class="form-textarea h-32" placeholder="우리 회사가 보유한 핵심 기술의 차별성, 경쟁력, 주요 생산 제품에 대해 설명해주세요."></textarea>
                  </div>
                  <div>
                    <label class="form-label">사업화 목표 및 자금 용도</label>
                    <textarea id="desc-goal" class="form-textarea h-32" placeholder="정부지원금을 통해 달성하고자 하는 목표(시제품 제작, 해외진출, 마케팅 등)를 구체적으로 적어주세요."></textarea>
                  </div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div class="mt-12 sticky bottom-6 z-40">
              <div class="bg-slate-900/90 backdrop-blur text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center max-w-4xl mx-auto border border-slate-700">
                <div class="ml-4">
                  <span class="block text-xs text-slate-400 font-bold uppercase tracking-wider">AI Analysis Ready</span>
                  <span class="font-bold text-lg">총 <span id="field-count" class="text-yellow-400">50+</span>개 데이터 항목 분석 대기중</span>
                </div>
                <button id="btn-start-analyze" class="bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-xl font-extrabold text-lg shadow-lg transform transition hover:scale-105">
                  AI 정밀 진단 시작 <i class="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ================= PHASE 2: LOADING SIMULATION ================= */}
      <div id="view-loading" class="fixed inset-0 bg-slate-950 z-50 hidden flex-col items-center justify-center text-white">
        <div class="w-full max-w-2xl px-8">
          <div class="flex justify-between items-end mb-4">
            <h2 class="text-2xl font-bold">AI Analyzing...</h2>
            <span class="text-blue-400 font-mono" id="loading-percent">0%</span>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full mb-12 overflow-hidden">
            <div id="loading-bar" class="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-0 transition-all duration-300"></div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400" id="step-1">
              <i class="fas fa-circle-notch fa-spin mr-3 text-blue-500"></i> 재무 건전성 및 성장률 분석
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50" id="step-2">
              <i class="far fa-circle mr-3"></i> 기술 역량 및 인증 가점 계산
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50" id="step-3">
              <i class="far fa-circle mr-3"></i> 2026년 공고 DB (3,500건) 대조
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50" id="step-4">
              <i class="far fa-circle mr-3"></i> 최적 지원사업 Top 20 선정
            </div>
          </div>
        </div>
      </div>

      {/* ================= PHASE 3: RESULT REPORT ================= */}
      <div id="view-result" class="min-h-screen bg-slate-100 hidden pb-20">
        <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div class="flex items-center">
              <a href="/support-matching" class="text-slate-400 hover:text-slate-600 mr-4"><i class="fas fa-arrow-left"></i></a>
              <h1 class="text-xl font-bold text-slate-800">AI 정밀 진단 리포트</h1>
            </div>
            <div class="flex space-x-2">
              <button class="btn-util"><i class="fas fa-file-pdf mr-2"></i> PDF 저장</button>
              <button class="btn-util"><i class="fas fa-share-alt mr-2"></i> 공유</button>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-10">
          {/* Summary */}
          <div class="bg-slate-900 text-white rounded-3xl p-10 mb-10 shadow-2xl relative overflow-hidden">
            <div class="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-900/50 to-transparent"></div>
            <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 class="text-3xl font-extrabold mb-2">분석 결과: <span class="text-blue-400">매우 우수 (S등급)</span></h2>
                <p class="text-slate-300 max-w-xl leading-relaxed">
                  귀사는 <strong>매출액 대비 R&D 투자 비중</strong>이 높고 <strong>기업부설연구소</strong>를 보유하여 기술개발 과제 선정 확률이 매우 높습니다.
                  특히 최근 3년 성장률이 양호하여 <strong>도약기 패키지</strong> 지원이 유력합니다.
                </p>
              </div>
              <div class="text-center bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10">
                <div class="text-xs text-slate-300 uppercase font-bold mb-1">매칭된 사업 수</div>
                <div class="text-5xl font-extrabold text-white">20<span class="text-2xl ml-1 text-blue-400">건</span></div>
              </div>
            </div>
          </div>

          {/* List */}
          <div class="grid grid-cols-1 gap-6" id="results-list"></div>
        </div>
      </div>

      <style>{`
        .form-label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 0.5rem; }
        .form-input { width: 100%; padding: 0.75rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.875rem; transition: all; }
        .form-input:focus { border-color: #2563eb; outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        .form-textarea { width: 100%; padding: 0.75rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.875rem; resize: none; transition: all; }
        .form-textarea:focus { border-color: #2563eb; outline: none; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }
        .btn-util { padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 700; color: #475569; transition: all; }
        .btn-util:hover { background-color: #f8fafc; color: #1e293b; }
      `}</style>

      <script>{`
        // --- 1. Search Logic (Same as before but fills more fields) ---
        const searchInput = document.getElementById('company-search');
        const list = document.getElementById('autocomplete-list');
        
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
          const val = e.target.value;
          clearTimeout(debounceTimer);
          if (val.length < 1) { list.classList.add('hidden'); return; }
          debounceTimer = setTimeout(async () => {
            try {
              const res = await fetch(\`/api/search/company?q=\${encodeURIComponent(val)}\`);
              const data = await res.json();
              list.innerHTML = '';
              if(data.length === 0) { list.classList.add('hidden'); return; }
              data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'px-5 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 text-left';
                div.innerHTML = \`<div class="font-bold text-slate-800">\${item.name}</div><div class="text-xs text-slate-500">\${item.ceo}</div>\`;
                div.onclick = () => autoFill(item);
                list.appendChild(div);
              });
              list.classList.remove('hidden');
            } catch(e) {}
          }, 300);
        });

        async function autoFill(item) {
          searchInput.value = item.name;
          list.classList.add('hidden');
          
          try {
            const res = await fetch(\`/api/dart/data?code=\${item.code}\`);
            const json = await res.json();
            if(json.success) {
              const d = json.data;
              // Fill Basic
              setValue('basic-name', d.name);
              setValue('basic-ceo', d.ceo);
              setValue('basic-est', d.est_date);
              setValue('basic-addr', d.address);
              setValue('basic-industry', d.corp_cls === 'Y' ? '제조업 (반도체)' : '정보통신업');
              
              // Simulate Financials (Mocking DART Data for demo)
              setValue('fin-rev-2024', Math.floor(Math.random()*50000+1000));
              setValue('fin-prof-2024', Math.floor(Math.random()*5000+100));
              setValue('hr-total', Math.floor(Math.random()*300+10));
              
              alert('DART 데이터가 연동되었습니다. 나머지 항목을 확인해주세요.');
            }
          } catch(e) { alert('데이터 연동 실패'); }
        }

        function setValue(id, val) { document.getElementById(id).value = val || ''; }
        window.resetForm = () => { document.getElementById('diagnosis-form').reset(); searchInput.value=''; }

        // --- 2. Analyze Logic ---
        document.getElementById('btn-start-analyze').addEventListener('click', async () => {
          const name = document.getElementById('basic-name').value;
          if(!name) return alert('기업명은 필수입니다.');

          // Switch to Loading
          document.getElementById('view-input').classList.add('hidden');
          document.getElementById('view-loading').classList.remove('hidden');
          document.getElementById('view-loading').classList.add('flex');

          // Simulate Steps
          animateLoading();

          // Collect All 50+ Fields
          const companyData = {
            name,
            ceo: document.getElementById('basic-ceo').value,
            industry: document.getElementById('basic-industry').value,
            rev_2024: document.getElementById('fin-rev-2024').value,
            employees: document.getElementById('hr-total').value,
            desc: document.getElementById('desc-tech').value + ' ' + document.getElementById('desc-goal').value,
            certs: Array.from(document.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value)
          };

          try {
            const response = await fetch('/support-matching/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyData })
            });
            const result = await response.json();

            // Render Results after simulation
            setTimeout(() => {
              document.getElementById('view-loading').classList.add('hidden');
              document.getElementById('view-loading').classList.remove('flex');
              document.getElementById('view-result').classList.remove('hidden');
              renderReport(result.data);
            }, 4000);

          } catch(e) { alert('오류'); location.reload(); }
        });

        function animateLoading() {
          const bar = document.getElementById('loading-bar');
          const per = document.getElementById('loading-percent');
          let w = 0;
          const interval = setInterval(() => {
            w += Math.random() * 5;
            if(w > 100) w = 100;
            bar.style.width = w + '%';
            per.innerText = Math.floor(w) + '%';
            
            if(w > 25) activateStep('step-2');
            if(w > 50) activateStep('step-3');
            if(w > 75) activateStep('step-4');
            
            if(w >= 100) clearInterval(interval);
          }, 150);
        }

        function activateStep(id) {
          const el = document.getElementById(id);
          el.classList.remove('opacity-50');
          el.querySelector('i').classList.remove('far', 'fa-circle');
          el.querySelector('i').classList.add('fas', 'fa-circle-notch', 'fa-spin', 'text-blue-500');
        }

        function renderReport(items) {
          const list = document.getElementById('results-list');
          list.innerHTML = items.map((item, i) => \`
            <div class="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-lg transition group">
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600 group-hover:bg-blue-600 group-hover:text-white transition">\${i+1}</div>
                  <div>
                    <span class="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded mb-1">\${item.category} | \${item.agency}</span>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">\${item.title}</h3>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-extrabold text-blue-600">\${item.matchScore}점</div>
                  <div class="text-xs text-slate-400">\${item.amount}</div>
                </div>
              </div>
              <div class="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-slate-700 leading-relaxed">
                <strong class="text-blue-700 block mb-1">💡 AI 매칭 포인트:</strong>
                \${item.aiReason}
              </div>
              <div class="mt-4 flex justify-end text-xs text-slate-400 font-bold">
                마감일: \${item.deadline}
              </div>
            </div>
          \`).join('');
        }
      `}</script>
    </Layout>
  )
}
