import { Layout } from '../components/Layout'
import { InputForm } from '../components/support/InputForm'
import { LoadingScreen } from '../components/support/LoadingScreen'
import { ResultReport } from '../components/support/ResultReport'
import { html } from 'hono/html'

export const SupportMatching = (props: { user: any }) => {
  return (
    <Layout user={props.user}>
      <InputForm />
      <LoadingScreen />
      <ResultReport />

      <script>{`
        // --- Wizard Logic ---
        let currentStep = 1;
        const totalSteps = 5;
        
        function updateWizard() {
          for(let i=1; i<=totalSteps; i++) {
            document.getElementById('step-'+i).classList.add('hidden');
          }
          document.getElementById('step-'+currentStep).classList.remove('hidden');
          
          document.getElementById('current-step-num').innerText = currentStep;
          document.getElementById('progress-bar').style.width = (currentStep / totalSteps * 100) + '%';
          
          const btnPrev = document.getElementById('btn-prev');
          const btnNext = document.getElementById('btn-next');
          const btnSubmit = document.getElementById('btn-submit');
          
          if(currentStep === 1) btnPrev.classList.add('hidden');
          else btnPrev.classList.remove('hidden');
          
          if(currentStep === totalSteps) {
            btnNext.classList.add('hidden');
            btnSubmit.classList.remove('hidden');
          } else {
            btnNext.classList.remove('hidden');
            btnSubmit.classList.add('hidden');
          }
          
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        document.getElementById('btn-prev').onclick = () => { if(currentStep > 1) { currentStep--; updateWizard(); } };
        document.getElementById('btn-next').onclick = () => { if(currentStep < totalSteps) { currentStep++; updateWizard(); } };

        // --- Search Logic (with Mapping) ---
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
                div.className = 'px-5 py-3 hover:bg-indigo-50 cursor-pointer border-b border-slate-100 text-left transition';
                div.innerHTML = \`<div class="font-bold text-slate-800">\${item.name}</div><div class="text-xs text-slate-500">\${item.code} | \${item.ceo}</div>\`;
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
              setValue('basic-type', '중소기업'); // Mock
              setValue('basic-industry', d.corp_cls === 'Y' ? '제조업 (KOSPI)' : '정보통신업');
              
              // Mock Financials (3 Years)
              setValue('fin-0-2024', Math.floor(Math.random()*50000+5000)); // Revenue
              setValue('fin-1-2024', Math.floor(Math.random()*5000+100)); // Profit
              setValue('fin-5-2024', Math.floor(Math.random()*10000+1000)); // Capital
              setValue('fin-0-2023', Math.floor(Math.random()*40000+4000));
              
              // Mock HR
              setValue('hr-total', Math.floor(Math.random()*200+10));
              setValue('hr-rnd', Math.floor(Math.random()*20+2));
              
              alert('DART 데이터가 연동되었습니다. 상세 정보를 확인해주세요.');
            }
          } catch(e) { alert('연동 실패'); }
        }

        function setValue(id, val) { const el = document.getElementById(id); if(el) el.value = val || ''; }

        // --- File Upload ---
        const fileInput = document.getElementById('file-input');
        const fileList = document.getElementById('file-list');
        let uploadedFiles = [];
        if(fileInput) {
          fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
              for (let i = 0; i < files.length; i++) {
                uploadedFiles.push(files[i].name);
                const div = document.createElement('div');
                div.className = 'flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg text-sm shadow-sm';
                div.innerHTML = \`<span class="font-bold text-indigo-700"><i class="fas fa-file-alt mr-2"></i>\${files[i].name}</span><button type="button" class="text-slate-400 hover:text-red-500"><i class="fas fa-times"></i></button>\`;
                div.querySelector('button').onclick = () => { div.remove(); };
                fileList.appendChild(div);
              }
            }
          });
        }

        // --- Submit & Analyze (The Big Payload) ---
        document.getElementById('btn-submit').addEventListener('click', async () => {
          document.getElementById('wizard-container').classList.add('hidden');
          const loading = document.getElementById('view-loading');
          loading.classList.remove('hidden');
          loading.classList.add('flex');

          animateLoading();

          // 1. Gather Basic
          const basic = {
            name: getValue('basic-name'),
            ceo: getValue('basic-ceo'),
            bizno: getValue('basic-bizno'),
            est: getValue('basic-est'),
            type: getValue('basic-type'),
            addr: getValue('basic-addr'),
            industry: getValue('basic-industry'),
            website: getValue('basic-url')
          };

          // 2. Gather Financials (Dynamic)
          const financial = {};
          ['2023', '2024', '2025'].forEach(year => {
            financial[year] = {
              revenue: getValue('fin-0-'+year),
              profit: getValue('fin-1-'+year),
              netIncome: getValue('fin-2-'+year),
              assets: getValue('fin-3-'+year),
              debt: getValue('fin-4-'+year),
              capital: getValue('fin-5-'+year),
              rnd: getValue('fin-6-'+year),
              export: getValue('fin-7-'+year)
            };
          });

          // 3. Gather HR & Tech
          const hr = {
            total: getValue('hr-total'),
            rnd: getValue('hr-rnd'),
            youth: getValue('hr-youth'),
            female: getValue('hr-female'),
            newHire: getValue('hr-last-hire'),
            planHire: getValue('hr-plan-hire')
          };
          
          const certs = Array.from(document.querySelectorAll('input[name="certs"]:checked')).map(cb => cb.value);
          
          const tech = {
            tcb: getValue('tech-tcb'),
            patents: {
              reg: getValue('ip-reg'),
              app: getValue('ip-app')
            },
            certs: certs
          };

          // 4. Strategy
          const strategy = {
            product: getValue('biz-product'),
            target: getValue('biz-target'),
            exportCountry: getValue('biz-export-country'),
            descTech: getValue('desc-tech'),
            descGoal: getValue('desc-goal'),
            descFund: getValue('desc-fund')
          };

          // Combine into Massive JSON
          const companyData = {
            ...basic,
            financial,
            hr,
            tech,
            strategy,
            documents: uploadedFiles
          };

          try {
            const response = await fetch('/support-matching/analyze', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ companyData })
            });
            const result = await response.json();

            // Clear loading immediately after AI finishes
            loading.classList.add('hidden');
            loading.classList.remove('flex');
            document.getElementById('view-result').classList.remove('hidden');
            renderReport(result.data);
          } catch(e) { alert('분석 중 오류가 발생했습니다.'); location.reload(); }
        });

        function getValue(id) {
          const el = document.getElementById(id);
          return el ? el.value : '';
        }

        function animateLoading() {
          const bar = document.getElementById('loading-bar');
          const per = document.getElementById('loading-percent');
          let w = 0;
          const interval = setInterval(() => {
            w += Math.random() * 2;
            if(w > 100) w = 100;
            if(bar) bar.style.width = w + '%';
            if(per) per.innerText = Math.floor(w) + '%';
            
            if(w > 20) activateStep('step-2');
            if(w > 50) activateStep('step-3');
            if(w > 80) activateStep('step-4');
            
            if(w >= 100) clearInterval(interval);
          }, 100);
        }

        function activateStep(id) {
          const el = document.getElementById(id);
          if(el) {
            el.classList.remove('opacity-50');
            const icon = el.querySelector('i');
            if(icon) icon.className = 'fas fa-circle-notch fa-spin mr-3 text-indigo-500';
          }
        }

        function renderReport(items) {
          const list = document.getElementById('results-list');
          if(!list) return;
          list.innerHTML = items.map((item, i) => \`
            <div class="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-400 hover:shadow-lg transition group">
              <div class="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-extrabold text-slate-500 text-xl group-hover:bg-indigo-600 group-hover:text-white transition">\${i+1}</div>
                  <div>
                    <span class="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded mb-1">\${item.category} | \${item.agency}</span>
                    <h3 class="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition leading-tight">\${item.title}</h3>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="text-3xl font-extrabold text-indigo-600">\${item.matchScore}<span class="text-sm text-slate-400 ml-1 font-medium">점</span></div>
                  <div class="text-xs text-slate-500 font-bold">\${item.amount}</div>
                </div>
              </div>
              <div class="bg-indigo-50/50 p-5 rounded-xl border border-indigo-100 text-sm text-slate-700 leading-relaxed relative">
                <i class="fas fa-quote-left absolute top-3 left-3 text-indigo-200 text-2xl -z-10"></i>
                <strong class="text-indigo-700 block mb-1">AI 매칭 분석:</strong>
                \${item.aiReason}
              </div>
              <div class="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span class="text-xs text-slate-400 font-bold"><i class="far fa-clock mr-1"></i> 마감: \${item.deadline}</span>
                <button class="text-sm font-bold text-indigo-600 hover:underline">공고 상세 보기 <i class="fas fa-arrow-right ml-1"></i></button>
              </div>
            </div>
          \`).join('');
        }
      `}</script>
    </Layout>
  )
}
