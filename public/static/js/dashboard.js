document.addEventListener('DOMContentLoaded', () => {
  fetchDashboardData();
});

async function fetchDashboardData() {
  try {
    const response = await fetch('/api/history');
    if (!response.ok) throw new Error('데이터 로딩 실패');
    
    const { results } = await response.json();
    
    // Update Stats
    document.getElementById('stat-count').innerText = results.length + '회';
    document.getElementById('stat-latest').innerText = results[0]?.title || '분석 이력 없음';
    
    renderHistoryTable(results);

  } catch (e) {
    console.error(e);
  }
}

function renderHistoryTable(data) {
  const tbody = document.getElementById('history-list');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center py-8 text-gray-500">아직 분석 이력이 없습니다.</td></tr>`;
    return;
  }

  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.className = 'hover:bg-slate-50 transition';
    
    const date = new Date(item.created_at).toLocaleDateString();
    
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${date}</td>
      <td class="px-6 py-4">
        <div class="text-sm font-bold text-gray-900">${item.title}</div>
        <div class="text-xs text-blue-600">${item.agency}</div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-center">
        <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          ${item.match_score}%
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button class="text-blue-600 hover:text-blue-900 btn-detail" data-id="${item.id}">
          상세보기
        </button>
      </td>
    `;
    tbody.appendChild(tr);

    // Attach click event for detail
    tr.querySelector('.btn-detail').addEventListener('click', () => openDetailModal(item));
  });
}

let currentChart = null;

function openDetailModal(item) {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('hidden');

  // Parse stored JSON result (if available) or use basic data
  let details = {};
  if (item.result_json) {
    try {
      // result_json is an array of results, we need the specific one that matched this grant_id
      // But we stored the whole array in the column for the *first* recommendation row.
      // Actually, my schema insert logic puts `JSON.stringify(aiResult)` (array) into the row.
      // And we are looking at a specific row that corresponds to the top recommendation.
      // Let's assume the first item in the array is the one we want to show, or find by ID.
      const parsed = JSON.parse(item.result_json);
      // Find the specific grant details in the array if possible, or just take the first one
      details = parsed.find(r => r.id === item.grant_id) || parsed[0];
    } catch(e) { console.error("JSON Parse Error", e); }
  }

  // Populate Text
  document.getElementById('modal-agency').innerText = item.agency || details.agency || '-';
  document.getElementById('modal-title').innerText = item.title || details.title || '-';
  document.getElementById('modal-score').innerText = (item.match_score || 0) + '%';
  document.getElementById('modal-reason').innerHTML = item.ai_reasoning || details.aiReason || '-';
  document.getElementById('modal-link').href = details.link || '#';

  // Populate Strategies
  const stratList = document.getElementById('modal-strategies');
  stratList.innerHTML = '';
  if (details.strategies && details.strategies.length > 0) {
    details.strategies.forEach(s => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-sm text-slate-600';
      li.innerHTML = `<i class="fas fa-check-circle text-green-500 mt-1 mr-2"></i> <span>${s}</span>`;
      stratList.appendChild(li);
    });
  } else {
    stratList.innerHTML = '<li class="text-sm text-gray-400">추가 전략 정보가 없습니다.</li>';
  }

  // Render Chart
  const ctx = document.getElementById('modal-chart').getContext('2d');
  
  // Destroy old chart if exists
  if (currentChart) currentChart.destroy();

  const radarData = details.radarData || { tech: 50, biz: 50, market: 50, infra: 50, bonus: 50 };

  currentChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['기술성', '사업성', '시장성', '인프라', '가점요소'],
      datasets: [{
        label: '매칭 적합성',
        data: [radarData.tech, radarData.biz, radarData.market, radarData.infra, radarData.bonus],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgb(59, 130, 246)',
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)'
      }]
    },
    options: {
      elements: {
        line: { borderWidth: 3 }
      },
      scales: {
        r: {
          angleLines: { display: true },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: { display: false } // Hide numbers for cleaner look
        }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

function downloadPDF() {
  alert('PDF 다운로드 기능은 실제 배포 환경에서 jspdf 라이브러리를 통해 동작합니다.\n(현재 데모에서는 알림으로 대체)');
  // window.print(); // Simple alternative for now
}
