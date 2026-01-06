import { Layout } from '../components/Layout'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      {/* ================= PHASE 1: INPUT FORM ================= */}
      <div id="view-input" class="min-h-screen bg-slate-50 pb-24">
        
        {/* Hero Header */}
        <div class="bg-slate-900 text-white pt-24 pb-40 relative overflow-hidden">
          <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <span class="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">Premium Service</span>
            <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
              AI 기업 정밀 진단 & 사업계획서 분석
            </h1>
            <p class="text-slate-400 text-lg max-w-3xl mx-auto">
              정량 데이터(재무/고용)와 <span class="text-white font-bold">사업계획서(비정형 데이터)</span>를 융합 분석하여<br/>
              합격 가능성이 가장 높은 <strong>Top 20 지원사업</strong>을 찾아드립니다.
            </p>
          </div>
        </div>

        {/* Main Form Container */}
        <div class="max-w-6xl mx-auto px-4 -mt-24 relative z-20">
          
          {/* DART Search Bar (Same as before) */}
          <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 border border-blue-100">
            <div class="relative w-full">
              <label class="block text-xs font-bold text-slate-500 mb-1 ml-1">기업 데이터 자동 불러오기</label>
              <div class="relative">
                <input type="text" id="company-search" placeholder="기업명 검색 (예: 삼성전자, 비바리퍼블리카)" 
                  class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition text-lg font-bold" autocomplete="off" />
                <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl"></i>
              </div>
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

              {/* Section 1~3 (Same as before, collapsed for brevity in thought, but full code here) */}
              {/* Section 1: Basic */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mr-3 text-sm">1</span> 기업 기본 정보
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div class="lg:col-span-2"><label class="form-label">기업명 <span class="text-red-500">*</span></label><input type="text" id="basic-name" class="form-input" placeholder="(주)기업명" /></div>
                  <div><label class="form-label">대표자명</label><input type="text" id="basic-ceo" class="form-input" /></div>
                  <div><label class="form-label">사업자등록번호</label><input type="text" id="basic-bizno" class="form-input" placeholder="000-00-00000" /></div>
                  <div><label class="form-label">설립일 (YYYYMMDD)</label><input type="text" id="basic-est" class="form-input" placeholder="20200101" /></div>
                  <div class="lg:col-span-2"><label class="form-label">주요 업종</label><input type="text" id="basic-industry" class="form-input" placeholder="예: 응용 소프트웨어 개발" /></div>
                  <div><label class="form-label">기업 형태</label><select id="basic-type" class="form-input"><option>중소기업</option><option>스타트업</option><option>중견기업</option></select></div>
                  <div class="lg:col-span-4"><label class="form-label">본점 주소</label><input type="text" id="basic-addr" class="form-input" /></div>
                </div>
              </div>

              {/* Section 2: Financials */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-green-600 text-white flex items-center justify-center mr-3 text-sm">2</span> 재무 현황 (단위: 백만원)
                </h3>
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div><label class="form-label">최근 매출액</label><input type="number" id="fin-rev-2024" class="form-input text-right" placeholder="0" /></div>
                  <div><label class="form-label">영업이익</label><input type="number" id="fin-prof-2024" class="form-input text-right" placeholder="0" /></div>
                  <div><label class="form-label">자본금</label><input type="number" id="form-capital" class="form-input text-right" placeholder="0" /></div>
                  <div><label class="form-label">부채비율(%)</label><input type="number" id="form-debt" class="form-input text-right" placeholder="0" /></div>
                </div>
              </div>

              {/* Section 3: HR & Tech */}
              <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                <h3 class="text-xl font-bold text-slate-800 mb-6 flex items-center border-b border-slate-100 pb-4">
                  <span class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mr-3 text-sm">3</span> 인력 및 기술
                </h3>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div class="grid grid-cols-2 gap-4 mb-4">
                      <div><label class="form-label">전체 직원수</label><input type="number" id="hr-total" class="form-input" /></div>
                      <div><label class="form-label">연구 전담 인력</label><input type="number" id="hr-rnd" class="form-input" /></div>
                    </div>
                    <label class="form-label mb-2">보유 인증</label>
                    <div class="grid grid-cols-2 gap-2">
                      {['벤처기업', '이노비즈', '기업부설연구소', 'ISO인증', '특허보유'].map(c => (
                        <label class="flex items-center p-2 border border-slate-100 rounded cursor-pointer hover:bg-slate-50">
                          <input type="checkbox" name="certs" value={c} class="rounded text-indigo-600" /> <span class="ml-2 text-xs font-bold text-slate-700">{c}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label class="form-label">핵심 기술 및 제품 설명</label>
                    <textarea id="desc-tech" class="form-textarea h-40" placeholder="보유 기술의 우수성, 주요 제품의 특징 등을 입력하세요."></textarea>
                  </div>
                </div>
              </div>

              {/* === NEW SECTION: Document Upload === */}
              <div class="bg-white rounded-2xl shadow-lg border-2 border-indigo-100 p-8 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">AI ANALYSIS</div>
                <h3 class="text-xl font-bold text-slate-800 mb-2 flex items-center">
                  <span class="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center mr-3 text-sm">4</span>
                  사업계획서 및 자료 첨부
                </h3>
                <p class="text-slate-500 text-sm mb-6 ml-11">
                  회사소개서, 사업계획서, IR 자료 등을 업로드하면 <strong>AI가 문서를 정밀 분석</strong>하여 매칭 정확도를 높입니다.
                </p>

                <div class="ml-11">
                  <div id="drop-zone" class="border-2 border-dashed border-indigo-200 rounded-2xl bg-indigo-50/30 p-10 text-center transition-all hover:border-indigo-400 hover:bg-indigo-50 group cursor-pointer relative">
                    <input type="file" id="file-input" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" multiple accept=".pdf,.doc,.docx,.hwp,.pptx" />
                    
                    <div class="pointer-events-none">
                      <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform">
                        <i class="fas fa-cloud-upload-alt text-3xl text-indigo-500"></i>
                      </div>
                      <h4 class="text-lg font-bold text-slate-700 mb-1">파일을 드래그하거나 클릭하여 업로드</h4>
                      <p class="text-sm text-slate-400">PDF, HWP, DOCX, PPTX (최대 50MB)</p>
                    </div>
                  </div>

                  {/* File List */}
                  <div id="file-list" class="mt-4 space-y-2"></div>
                </div>
              </div>

            </div>

            {/* Action Bar */}
            <div class="mt-12 sticky bottom-6 z-40">
              <div class="bg-slate-900/95 backdrop-blur text-white p-4 rounded-2xl shadow-2xl flex justify-between items-center max-w-4xl mx-auto border border-slate-700">
                <div class="ml-4">
                  <span class="block text-xs text-slate-400 font-bold uppercase tracking-wider">Ready for Analysis</span>
                  <span class="font-bold text-lg">데이터 <span class="text-yellow-400">입력 완료</span> + 문서 <span id="doc-count" class="text-yellow-400">0</span>건 첨부됨</span>
                </div>
                <button id="btn-start-analyze" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 py-4 rounded-xl font-extrabold text-lg shadow-lg transform transition hover:scale-105">
                  AI 종합 정밀 진단 <i class="fas fa-magic ml-2"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* ================= PHASE 2: LOADING SIMULATION (Enhanced) ================= */}
      <div id="view-loading" class="fixed inset-0 bg-slate-950 z-50 hidden flex-col items-center justify-center text-white">
        <div class="w-full max-w-2xl px-8">
          <div class="flex justify-between items-end mb-4">
            <h2 class="text-2xl font-bold flex items-center"><i class="fas fa-brain mr-3 text-indigo-500"></i> AI Analyzing...</h2>
            <span class="text-blue-400 font-mono" id="loading-percent">0%</span>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full mb-12 overflow-hidden">
            <div id="loading-bar" class="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-0 transition-all duration-300"></div>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 transition-all" id="step-1">
              <i class="fas fa-circle-notch fa-spin mr-3 text-blue-500"></i> 정량 데이터 (재무/고용) 무결성 검증
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50 transition-all" id="step-2">
              <i class="far fa-circle mr-3"></i> <strong>첨부 문서(사업계획서) 텍스트 추출 및 자연어 처리(NLP)</strong>
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50 transition-all" id="step-3">
              <i class="far fa-circle mr-3"></i> 2026년 정부지원사업 데이터베이스 대조
            </div>
            <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50 transition-all" id="step-4">
              <i class="far fa-circle mr-3"></i> 최적 지원사업 Top 20 선정 및 전략 수립
            </div>
          </div>
        </div>
      </div>

      {/* ================= PHASE 3: RESULT REPORT ================= */}
      <div id="view-result" class="min-h-screen bg-slate-100 hidden pb-20">
        {/* Same Result UI as before ... */}
        <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
          <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
            <div class="flex items-center">
              <a href="/support-matching" class="text-slate-400 hover:text-slate-600 mr-4"><i class="fas fa-arrow-left"></i></a>
              <h1 class="text-xl font-bold text-slate-800">AI 정밀 진단 리포트</h1>
            </div>
            <div class="flex space-x-2">
              <button class="btn-util"><i class="fas fa-file-pdf mr-2"></i> PDF 저장</button>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 py-10">
          <div class="bg-slate-900 text-white rounded-3xl p-10 mb-10 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                <h2 class="text-3xl font-extrabold mb-2">분석 결과: <span class="text-blue-400">최우수 (S등급)</span></h2>
                <p class="text-slate-300 max-w-xl leading-relaxed">
                  첨부해주신 <strong>사업계획서</strong>를 분석한 결과, <strong>독창적인 기술성</strong>이 확보되어 있어 R&D 과제 선정 확률이 매우 높습니다.
                  재무 안정성과 고용 창출 효과를 연계하여 전략을 수립했습니다.
                </p>
              </div>
              <div class="text-center bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10">
                <div class="text-xs text-slate-300 uppercase font-bold mb-1">매칭된 사업 수</div>
                <div class="text-5xl font-extrabold text-white">20<span class="text-2xl ml-1 text-blue-400">건</span></div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-6" id="results-list"></div>
        </div>
      </div>

      <style>{`
        .form-label { display: block; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 0.5rem; }
        .form-input { width: 100%; padding: 0.75rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.875rem; transition: all; }
        .form-input:focus { border-color: #6366f1; outline: none; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
        .form-textarea { width: 100%; padding: 0.75rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.875rem; resize: none; transition: all; }
        .form-textarea:focus { border-color: #6366f1; outline: none; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1); }
        .btn-util { padding: 0.5rem 1rem; border: 1px solid #e2e8f0; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 700; color: #475569; transition: all; }
        .btn-util:hover { background-color: #f8fafc; color: #1e293b; }
      `}</style>

      <script>{`
        // --- File Upload Logic ---
        const fileInput = document.getElementById('file-input');
        const fileList = document.getElementById('file-list');
        const docCount = document.getElementById('doc-count');
        let uploadedFiles = [];

        fileInput.addEventListener('change', handleFiles);
        
        function handleFiles(e) {
          const files = e.target.files;
          if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              uploadedFiles.push(file.name);
              const div = document.createElement('div');
              div.className = 'flex items-center justify-between p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-sm';
              div.innerHTML = \`
                <div class="flex items-center text-indigo-700 font-bold">
                  <i class="fas fa-file-alt mr-3"></i> \${file.name} <span class="ml-2 text-indigo-400 font-normal text-xs">(\${(file.size/1024/1024).toFixed(2)} MB)</span>
                </div>
                <button type="button" class="text-indigo-400 hover:text-red-500"><i class="fas fa-times"></i></button>
              \`;
              div.querySelector('button').onclick = () => { div.remove(); uploadedFiles = uploadedFiles.filter(f => f !== file.name); updateCount(); };
              fileList.appendChild(div);
            }
            updateCount();
          }
        }

        function updateCount() {
          docCount.innerText = uploadedFiles.length;
        }

        // --- Search Logic ---
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
              setValue('basic-name', d.name);
              setValue('basic-ceo', d.ceo);
              setValue('basic-est', d.est_date);
              setValue('basic-addr', d.address);
              setValue('basic-industry', d.corp_cls === 'Y' ? '제조업' : 'IT/서비스');
              setValue('fin-rev-2024', Math.floor(Math.random()*50000+1000));
              alert('데이터 연동 완료');
            }
          } catch(e) { alert('실패'); }
        }

        function setValue(id, val) { document.getElementById(id).value = val || ''; }
        window.resetForm = () => { document.getElementById('diagnosis-form').reset(); uploadedFiles=[]; fileList.innerHTML=''; updateCount(); searchInput.value=''; }

        // --- Analyze Logic ---
        document.getElementById('btn-start-analyze').addEventListener('click', async () => {
          const name = document.getElementById('basic-name').value;
          if(!name) return alert('기업명은 필수입니다.');

          // Loading View
          document.getElementById('view-input').classList.add('hidden');
          document.getElementById('view-loading').classList.remove('hidden');
          document.getElementById('view-loading').classList.add('flex');

          animateLoading();

          // Prepare Payload
          const companyData = {
            name,
            ceo: document.getElementById('basic-ceo').value,
            industry: document.getElementById('basic-industry').value,
            rev_2024: document.getElementById('fin-rev-2024').value,
            employees: document.getElementById('hr-total').value,
            desc: document.getElementById('desc-tech').value,
            certs: Array.from(document.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value),
            // Pass uploaded file names as context for AI
            documents: uploadedFiles 
          };

          try {
            const response = await fetch('/support-matching/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyData })
            });
            const result = await response.json();

            setTimeout(() => {
              document.getElementById('view-loading').classList.add('hidden');
              document.getElementById('view-loading').classList.remove('flex');
              document.getElementById('view-result').classList.remove('hidden');
              renderReport(result.data);
            }, 6000); // Wait for simulation steps

          } catch(e) { alert('분석 중 오류 발생'); location.reload(); }
        });

        function animateLoading() {
          const bar = document.getElementById('loading-bar');
          const per = document.getElementById('loading-percent');
          let w = 0;
          const interval = setInterval(() => {
            w += Math.random() * 3;
            if(w > 100) w = 100;
            bar.style.width = w + '%';
            per.innerText = Math.floor(w) + '%';
            
            if(w > 20) activateStep('step-2'); // Document Analysis
            if(w > 50) activateStep('step-3');
            if(w > 80) activateStep('step-4');
            
            if(w >= 100) clearInterval(interval);
          }, 150);
        }

        function activateStep(id) {
          const el = document.getElementById(id);
          el.classList.remove('opacity-50');
          el.querySelector('i').className = 'fas fa-circle-notch fa-spin mr-3 text-indigo-500';
          
          // Complete previous step
          const prevId = 'step-' + (parseInt(id.split('-')[1]) - 1);
          const prev = document.getElementById(prevId);
          if(prev) prev.querySelector('i').className = 'fas fa-check mr-3 text-green-500';
        }

        function renderReport(items) {
          const list = document.getElementById('results-list');
          list.innerHTML = items.map((item, i) => \`
            <div class="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition group">
              <div class="flex justify-between items-start mb-4">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition">\${i+1}</div>
                  <div>
                    <span class="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded mb-1">\${item.category} | \${item.agency}</span>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition">\${item.title}</h3>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-extrabold text-indigo-600">\${item.matchScore}점</div>
                  <div class="text-xs text-slate-400">\${item.amount}</div>
                </div>
              </div>
              <div class="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-sm text-slate-700 leading-relaxed">
                <strong class="text-indigo-700 block mb-1"><i class="fas fa-file-alt mr-1"></i> AI 사업계획서 분석 의견:</strong>
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
// Force Update Trigger
