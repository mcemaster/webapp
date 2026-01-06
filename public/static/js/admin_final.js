// Admin Dashboard Logic (Final Version with DART)

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const activeTab = urlParams.get('tab') || 'overview';
  
  if (activeTab === 'companies') {
    initCompanySearch();
  } else if (activeTab === 'overview') {
    initDashboard();
  }
});

// ==========================================
// 1. Company Search & DART Integration
// ==========================================
function initCompanySearch() {
  const input = document.getElementById('company-search-input');
  const list = document.getElementById('autocomplete-list');
  const resultArea = document.getElementById('result-area');

  if (!input || !list) return;

  // Debounce function
  let timeout = null;
  
  input.addEventListener('input', (e) => {
    const val = e.target.value;
    
    // Clear debounce
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
      } catch (err) {
        console.error('Search Error:', err);
      }
    }, 300); // 300ms delay
  });

  function renderAutocomplete(items) {
    list.innerHTML = '';
    if (items.length === 0) {
      list.classList.add('hidden');
      return;
    }

    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'px-6 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors border-b border-slate-50 last:border-0';
      div.innerHTML = `
        <div>
          <span class="font-bold text-slate-800 text-sm">${item.name}</span>
          <span class="text-xs text-slate-400 ml-2">CEO: ${item.ceo}</span>
        </div>
        <i class="fas fa-chevron-right text-slate-300 text-xs"></i>
      `;
      div.addEventListener('click', () => {
        input.value = item.name;
        list.classList.add('hidden');
        fetchDartData(item.code);
      });
      list.appendChild(div);
    });

    list.classList.remove('hidden');
  }

  async function fetchDartData(corpCode) {
    // Show loading state?
    resultArea.style.opacity = '0.5';
    
    try {
      const res = await fetch(`/api/dart/data?code=${corpCode}`);
      const json = await res.json();

      if (json.success) {
        fillData(json.data);
        resultArea.style.opacity = '1';
        resultArea.style.pointerEvents = 'auto'; // Enable interaction
      } else {
        alert('DART 데이터 로드 실패: ' + json.message);
        resultArea.style.opacity = '0.5';
      }
    } catch (e) {
      alert('서버 통신 오류');
    }
  }

  function fillData(data) {
    setText('res-name', data.name);
    setText('res-ceo', data.ceo);
    setText('res-est', formatDate(data.est_date));
    setText('res-addr', data.address);
    
    // Derived Data (Simulation for Demo)
    setText('res-scale', data.corp_cls === 'Y' ? '유가증권시장(KOSPI)' : '코스닥/기타');
    
    // Employment Data (Mock since we don't have API key for Employment yet)
    // Randomize slightly for demo realism
    const emp = Math.floor(Math.random() * 500) + 50;
    const youth = Math.floor(emp * 0.3);
    
    setText('res-emp', emp.toLocaleString());
    setText('res-youth', youth.toLocaleString());
  }

  function setText(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val || '-';
  }

  function formatDate(str) {
    if (!str || str.length !== 8) return str;
    return `${str.substring(0,4)}-${str.substring(4,6)}-${str.substring(6,8)}`;
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !list.contains(e.target)) {
      list.classList.add('hidden');
    }
  });
}

// ==========================================
// 2. Dashboard (Overview) - Simplified
// ==========================================
async function initDashboard() {
  // Chart rendering logic from previous attempts
  if (typeof Chart !== 'undefined' && document.getElementById('growthChart')) {
     new Chart(document.getElementById('growthChart'), {
      type: 'line',
      data: {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
          label: '방문자',
          data: [12, 19, 3, 5, 2, 3, 10],
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      }
    });
  }
}
