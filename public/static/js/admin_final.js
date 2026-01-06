// Admin Dashboard Logic (Grand Unification: Dashboard + DART)

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || 'overview';
  
  console.log(`[Admin Final] Initializing tab: ${activeTab}`);

  switch(activeTab) {
    case 'overview':
      initDashboard();
      break;
    case 'companies':
      initCompanySearch();
      break;
    case 'grants':
      fetchGrants();
      break;
    case 'logs':
      fetchLogs();
      break;
    case 'partners':
      // Partner approval logic handles itself via inline buttons if needed, or init here
      break;
  }
});

// ==========================================
// 1. Dashboard (Rich Charts & Actions)
// ==========================================
async function initDashboard() {
  try {
    const res = await fetch(`/api/admin/stats?t=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to load stats');
    const data = await res.json();
    
    // 1. Update Metrics
    animateValue('stat-total-users', 0, data.total_users || 1250, 1000);
    animateValue('stat-ai-usage', 0, data.ai_usage || 150, 1000);
    animateValue('stat-crawler-usage', 0, data.crawler_usage || 320, 1000);
    
    const pendingElement = document.getElementById('stat-pending');
    if(pendingElement) pendingElement.innerText = (data.pending_partners || 5).toString();

    // 2. Action Center
    const actionCenter = document.getElementById('action-center');
    if (actionCenter) {
      actionCenter.classList.remove('hidden');
      actionCenter.classList.add('flex'); // Flex to show correctly
      
      const pBtn = document.getElementById('btn-pending-partners');
      const pCount = document.getElementById('count-pending-partners');
      if(pBtn && pCount) {
        pBtn.classList.remove('hidden');
        pBtn.classList.add('flex');
        pCount.innerText = data.pending_partners || 5;
      }
    }

    // 3. Render Charts
    setTimeout(() => renderCharts(data), 100);

  } catch (err) {
    console.error('Dashboard init error:', err);
  }
}

function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  if (!obj) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

function renderCharts(stats) {
  if (typeof Chart === 'undefined') return;

  const ctxGrowth = document.getElementById('growthChart');
  if (ctxGrowth) {
    const existing = Chart.getChart(ctxGrowth);
    if(existing) existing.destroy();

    new Chart(ctxGrowth, {
      type: 'line',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
          label: '방문자',
          data: [15, 22, 18, 25, 30, 45, 60],
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          fill: true,
          tension: 0.4
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
    });
  }

  const ctxAI = document.getElementById('aiChart');
  if (ctxAI) {
    const existing = Chart.getChart(ctxAI);
    if(existing) existing.destroy();

    new Chart(ctxAI, {
      type: 'doughnut',
      data: {
        labels: ['기업진단', '공고매칭', '공급사검색'],
        datasets: [{
          data: [40, 35, 25],
          backgroundColor: ['#3b82f6', '#10b981', '#f97316'],
          borderWidth: 0
        }]
      },
      options: { responsive: true, maintainAspectRatio: false, cutout: '70%', plugins: { legend: { position: 'right' } } }
    });
  }
}

// ==========================================
// 2. DART Integration & Search
// ==========================================
function initCompanySearch() {
  const input = document.getElementById('company-search-input');
  const list = document.getElementById('autocomplete-list');
  const resultArea = document.getElementById('result-area');

  if (!input || !list) return;

  let timeout = null;
  input.addEventListener('input', (e) => {
    const val = e.target.value;
    if (timeout) clearTimeout(timeout);
    if (val.length < 1) {
      list.innerHTML = '';
      list.classList.add('hidden');
      return;
    }
    timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search/company?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        renderAutocomplete(data);
      } catch (err) {}
    }, 300);
  });

  function renderAutocomplete(items) {
    list.innerHTML = '';
    if (items.length === 0) {
      list.classList.add('hidden');
      return;
    }
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'px-6 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-slate-50';
      div.innerHTML = `<span class="font-bold text-sm">${item.name}</span><span class="text-xs text-slate-400">CEO: ${item.ceo}</span>`;
      div.addEventListener('click', () => {
        input.value = item.name;
        list.classList.add('hidden');
        fetchDartData(item.code);
      });
      list.appendChild(div);
    });
    list.classList.remove('hidden');
  }

  async function fetchDartData(code) {
    if(resultArea) resultArea.style.opacity = '0.5';
    try {
      const res = await fetch(`/api/dart/data?code=${code}`);
      const json = await res.json();
      if(json.success && resultArea) {
        fillData(json.data);
        resultArea.style.opacity = '1';
      } else {
        alert(json.message || '데이터 로드 실패');
        if(resultArea) resultArea.style.opacity = '1';
      }
    } catch(e) { alert('오류 발생'); }
  }

  function fillData(data) {
    setText('res-name', data.name);
    setText('res-ceo', data.ceo);
    setText('res-est', data.est_date);
    setText('res-addr', data.address);
    setText('res-scale', data.corp_cls === 'Y' ? 'KOSPI' : 'KOSDAQ/Other');
    setText('res-emp', Math.floor(Math.random() * 500 + 50).toLocaleString()); // Mock
  }
}

function setText(id, val) {
  const el = document.getElementById(id);
  if(el) el.innerText = val || '-';
}

// ==========================================
// 3. Table Renderers
// ==========================================
async function fetchGrants() {
  const tbody = document.getElementById('grant-list');
  if(!tbody) return;
  const res = await fetch('/api/admin/grants');
  const data = await res.json();
  const list = Array.isArray(data) ? data : [];
  tbody.innerHTML = list.map(g => `
    <tr class="border-b border-slate-100 hover:bg-slate-50"><td class="p-4 font-bold">${g.title}</td><td class="p-4 text-slate-600">${g.agency}</td><td class="p-4 text-red-500 text-xs">${g.deadline}</td></tr>
  `).join('');
}

async function fetchLogs() {
  const tbody = document.getElementById('log-list');
  if(!tbody) return;
  const res = await fetch('/api/admin/logs');
  const data = await res.json();
  const list = Array.isArray(data) ? data : [];
  tbody.innerHTML = list.map(l => `
    <tr class="border-b border-slate-100 hover:bg-slate-50"><td class="p-4 text-xs">${new Date(l.created_at).toLocaleDateString()}</td><td class="p-4 font-bold">${l.user_id}</td><td class="p-4 text-blue-600">${l.match_score}점</td><td class="p-4 text-xs text-slate-500 truncate max-w-xs">${l.ai_reasoning}</td></tr>
  `).join('');
}
