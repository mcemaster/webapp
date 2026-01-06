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
        // --- 1. File Upload ---
        const fileInput = document.getElementById('file-input');
        const fileList = document.getElementById('file-list');
        let uploadedFiles = [];

        if(fileInput) {
          fileInput.addEventListener('change', (e) => {
            const files = e.target.files;
            if (files.length > 0) {
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                uploadedFiles.push(file.name);
                const div = document.createElement('div');
                div.className = 'flex items-center text-xs text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-100';
                div.innerHTML = \`<i class="fas fa-check mr-2"></i> \${file.name}\`;
                fileList.appendChild(div);
              }
            }
          });
        }

        // --- 2. Search & Auto-fill ---
        const searchInput = document.getElementById('company-search');
        const list = document.getElementById('autocomplete-list');
        let debounceTimer;

        if(searchInput) {
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
                  div.className = 'px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 text-sm font-bold text-slate-700';
                  div.innerText = item.name;
                  div.onclick = () => autoFill(item);
                  list.appendChild(div);
                });
                list.classList.remove('hidden');
              } catch(e) {}
            }, 300);
          });
        }

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
              setValue('basic-industry', d.corp_cls === 'Y' ? '제조업' : '정보통신업');
              setValue('fin-rev-2024', Math.floor(Math.random()*50000+1000)); // Mock
              alert('데이터가 연동되었습니다.');
            }
          } catch(e) { alert('연동 실패'); }
        }

        function setValue(id, val) { const el = document.getElementById(id); if(el) el.value = val || ''; }
        window.resetForm = () => { document.getElementById('diagnosis-form').reset(); uploadedFiles=[]; if(fileList) fileList.innerHTML=''; if(searchInput) searchInput.value=''; }

        // --- 3. Analyze ---
        const btnAnalyze = document.getElementById('btn-start-analyze');
        if(btnAnalyze) {
          btnAnalyze.addEventListener('click', async () => {
            const name = document.getElementById('basic-name').value;
            if(!name) return alert('기업명은 필수입니다.');

            document.getElementById('view-input').classList.add('hidden');
            const loading = document.getElementById('view-loading');
            loading.classList.remove('hidden');
            loading.classList.add('flex');

            animateLoading();

            const companyData = {
              name,
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
              }, 4000);
            } catch(e) { alert('오류'); location.reload(); }
          });
        }

        function animateLoading() {
          const bar = document.getElementById('loading-bar');
          const per = document.getElementById('loading-percent');
          let w = 0;
          const interval = setInterval(() => {
            w += Math.random() * 4;
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
            if(icon) {
               icon.className = 'fas fa-circle-notch fa-spin mr-3 text-indigo-500';
               const prevId = 'step-' + (parseInt(id.split('-')[1]) - 1);
               const prev = document.getElementById(prevId);
               if(prev) prev.querySelector('i').className = 'fas fa-check mr-3 text-green-500';
            }
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
