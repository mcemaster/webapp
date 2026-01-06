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
        
        const updateWizard = () => {
          // Hide all steps
          for(let i=1; i<=totalSteps; i++) {
            document.getElementById('step-'+i).classList.add('hidden');
          }
          // Show current
          document.getElementById('step-'+currentStep).classList.remove('hidden');
          
          // Update Header
          document.getElementById('current-step-num').innerText = currentStep;
          document.getElementById('progress-bar').style.width = (currentStep / totalSteps * 100) + '%';
          
          // Update Buttons
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
          
          // Validate Step 1 immediately to enable/disable Next
          if(currentStep === 1) validateStep1();
          else btnNext.disabled = false;
        };

        // Button Handlers
        document.getElementById('btn-prev').onclick = () => { if(currentStep > 1) { currentStep--; updateWizard(); } };
        document.getElementById('btn-next').onclick = () => { if(currentStep < totalSteps) { currentStep++; updateWizard(); } };

        // --- Step 1 Validation ---
        const searchInput = document.getElementById('company-search');
        const validateStep1 = () => {
          const btnNext = document.getElementById('btn-next');
          if(searchInput.value.length > 1) btnNext.disabled = false;
          else btnNext.disabled = true;
        };
        searchInput.addEventListener('input', validateStep1);

        // --- Search Logic ---
        const list = document.getElementById('autocomplete-list');
        let debounceTimer;
        
        searchInput.addEventListener('input', (e) => {
          validateStep1();
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
                div.className = 'px-6 py-4 hover:bg-slate-50 cursor-pointer border-b border-slate-50 text-left';
                div.innerHTML = \`<div class="font-bold text-slate-800 text-lg">\${item.name}</div><div class="text-xs text-slate-500 font-mono">\${item.code} | \${item.ceo}</div>\`;
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
          validateStep1();
          
          try {
            const res = await fetch(\`/api/dart/data?code=\${item.code}\`);
            const json = await res.json();
            if(json.success) {
              const d = json.data;
              setValue('basic-name', d.name);
              setValue('basic-ceo', d.ceo);
              setValue('basic-est', d.est_date);
              setValue('basic-addr', d.address);
              setValue('basic-industry', d.corp_cls === 'Y' ? '제조업 (KOSPI)' : '정보통신업');
              setValue('fin-rev-2024', Math.floor(Math.random()*50000+1000));
              
              // Auto Advance to Step 2
              setTimeout(() => { currentStep = 2; updateWizard(); }, 500);
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
                div.className = 'flex items-center text-sm text-indigo-700 bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100 mt-2 font-bold';
                div.innerHTML = \`<i class="fas fa-check-circle mr-2"></i> \${files[i].name}\`;
                fileList.appendChild(div);
              }
            }
          });
        }

        // --- Submit & Analyze ---
        document.getElementById('btn-submit').addEventListener('click', async () => {
          document.getElementById('wizard-container').classList.add('hidden');
          const loading = document.getElementById('view-loading');
          loading.classList.remove('hidden');
          loading.classList.add('flex');

          animateLoading();

          const companyData = {
            name: document.getElementById('basic-name').value || searchInput.value,
            industry: document.getElementById('basic-industry').value,
            rev_2024: document.getElementById('fin-rev-2024').value,
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
              loading.classList.add('hidden');
              loading.classList.remove('flex');
              document.getElementById('view-result').classList.remove('hidden');
              renderReport(result.data);
            }, 5000); 
          } catch(e) { alert('오류'); location.reload(); }
        });

        function animateLoading() {
          const bar = document.getElementById('loading-bar');
          const per = document.getElementById('loading-percent');
          let w = 0;
          const interval = setInterval(() => {
            w += Math.random() * 2;
            if(w > 100) w = 100;
            if(bar) bar.style.width = w + '%';
            if(per) per.innerText = Math.floor(w) + '%';
            
            if(w > 25) activateStep('step-2');
            if(w > 50) activateStep('step-3');
            if(w > 75) activateStep('step-4');
            
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
