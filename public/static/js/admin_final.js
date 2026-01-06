// Admin Dashboard Logic (Final Version)

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || 'overview';
  
  console.log(`[Admin Final] Initializing tab: ${activeTab}`);

  // Tab Specific Logic
  switch(activeTab) {
    case 'overview':
      initDashboard();
      break;
    case 'companies':
      fetchCompanies();
      break;
    case 'grants':
      fetchGrants();
      break;
    case 'logs':
      fetchLogs();
      break;
  }
});

// ==========================================
// 1. Dashboard (Overview)
// ==========================================
async function initDashboard() {
  try {
    const res = await fetch(`/api/admin/stats?t=${Date.now()}`);
    if (!res.ok) throw new Error('Failed to load stats');
    const data = await res.json();
    
    // 1. Update Key Metrics (숫자 애니메이션 효과)
    animateValue('stat-total-users', 0, data.total_users || 0, 1000);
    animateValue('stat-ai-usage', 0, data.ai_usage || 0, 1000);
    animateValue('stat-crawler-usage', 0, data.crawler_usage || 0, 1000);

    // 2. Action Center (Morning Briefing)
    const pendingPartners = data.pending_partners || 0;
    const pendingRfqs = data.new_rfqs || 0;
    
    if (pendingPartners > 0 || pendingRfqs > 0) {
      const actionCenter = document.getElementById('action-center');
      if (actionCenter) {
        actionCenter.classList.remove('hidden');
        actionCenter.classList.add('block');
        
        if (pendingPartners > 0) {
          const btn = document.getElementById('btn-pending-partners');
          const count = document.getElementById('count-pending-partners');
          if (btn && count) {
            btn.classList.remove('hidden');
            btn.classList.add('flex');
            count.innerText = pendingPartners;
          }
        }
        
        if (pendingRfqs > 0) {
          const btn = document.getElementById('btn-new-rfqs');
          const count = document.getElementById('count-new-rfqs');
          if (btn && count) {
            btn.classList.remove('hidden');
            btn.classList.add('flex');
            count.innerText = pendingRfqs;
          }
        }
      }
    }

    // 3. Render Charts
    // 약간의 지연을 주어 Canvas가 확실히 렌더링된 후 그립니다.
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
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

function renderCharts(stats) {
  if (typeof Chart === 'undefined') {
    console.error('Chart.js not loaded');
    return;
  }

  // Chart 1: Growth (Line Chart)
  const ctxGrowth = document.getElementById('growthChart');
  if (ctxGrowth) {
    // 기존 차트가 있으면 파괴 (중복 렌더링 방지)
    const existingChart = Chart.getChart(ctxGrowth);
    if (existingChart) existingChart.destroy();

    new Chart(ctxGrowth, {
      type: 'line',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
          label: '신규 가입자',
          data: [12, 19, 8, 15, 22, 10, 25], // Mock data or stats.chart_data
          borderColor: 'rgb(79, 70, 229)', // Indigo 600
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#fff',
          pointBorderColor: 'rgb(79, 70, 229)',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { 
            beginAtZero: true, 
            grid: { color: '#f1f5f9' },
            ticks: { font: { size: 10 } }
          },
          x: { 
            grid: { display: false },
            ticks: { font: { size: 10 } }
          }
        }
      }
    });
  }

  // Chart 2: AI Usage (Doughnut)
  const ctxAI = document.getElementById('aiChart');
  if (ctxAI) {
    const existingChart = Chart.getChart(ctxAI);
    if (existingChart) existingChart.destroy();

    new Chart(ctxAI, {
      type: 'doughnut',
      data: {
        labels: ['기업 정밀 진단', '공고 매칭', '공급사 검색'],
        datasets: [{
          data: [35, 45, 20], 
          backgroundColor: [
            'rgb(59, 130, 246)', // Blue 500
            'rgb(16, 185, 129)', // Emerald 500
            'rgb(249, 115, 22)'  // Orange 500
          ],
          borderWidth: 0,
          hoverOffset: 10
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { 
            position: 'right',
            labels: { boxWidth: 12, font: { size: 11 } }
          }
        }
      }
    });
  }
}

// ==========================================
// 2. Data Fetchers
// ==========================================
async function fetchCompanies() {
  const tbody = document.getElementById('company-list');
  if (!tbody) return;
  renderTable(tbody, '/api/admin/companies', (c) => `
    <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      <td class="px-6 py-4 font-bold text-slate-800">${c.name}</td>
      <td class="px-6 py-4 text-slate-600">${c.ceo || '-'}</td>
      <td class="px-6 py-4 text-slate-600">${c.revenue ? c.revenue.toLocaleString() : '-'}억</td>
      <td class="px-6 py-4">
        ${c.source === 'crawler' 
          ? '<span class="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">자동수집</span>' 
          : '<span class="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">수동등록</span>'}
      </td>
    </tr>
  `);
}

async function fetchGrants() {
  const tbody = document.getElementById('grant-list');
  if (!tbody) return;
  renderTable(tbody, '/api/admin/grants', (g) => `
    <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      <td class="px-6 py-4 font-bold text-slate-800">${g.title}</td>
      <td class="px-6 py-4 text-slate-600">${g.agency || '-'}</td>
      <td class="px-6 py-4 text-red-500 font-bold text-xs">${g.deadline || '상시'}</td>
    </tr>
  `);
}

async function fetchLogs() {
  const tbody = document.getElementById('log-list');
  if (!tbody) return;
  renderTable(tbody, '/api/admin/logs', (l) => `
    <tr class="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
      <td class="px-6 py-4 text-xs text-slate-500">${new Date(l.created_at).toLocaleString()}</td>
      <td class="px-6 py-4 font-bold text-slate-700">${l.user_id}</td>
      <td class="px-6 py-4 text-blue-600 font-bold">${l.match_score}점</td>
      <td class="px-6 py-4 text-slate-600 text-xs truncate max-w-xs">${l.ai_reasoning}</td>
    </tr>
  `);
}

// Helper: Generic Table Renderer
async function renderTable(tbody, url, rowMapper) {
  try {
    const res = await fetch(`${url}?t=${Date.now()}`);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    
    // Check if data is array or object with results
    const list = Array.isArray(data) ? data : (data.results || []);

    if (list.length === 0) {
      tbody.innerHTML = '<tr><td colspan="100%" class="text-center py-12 text-slate-400">데이터가 없습니다.</td></tr>';
      return;
    }
    tbody.innerHTML = list.map(rowMapper).join('');
  } catch (err) {
    console.error(err);
    tbody.innerHTML = '<tr><td colspan="100%" class="text-center py-12 text-red-500">데이터 로딩 실패</td></tr>';
  }
}