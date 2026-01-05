// [MCE Admin Console Logic]

// Main Entry Point
(async function initAdmin() {
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab') || 'overview';
  
  console.log(`[Admin] Initializing tab: ${tab}`);

  switch (tab) {
    case 'overview':
      await fetchAdminStats();
      break;
    case 'users':
      await fetchUsers();
      break;
    case 'partners':
      await fetchPartners();
      break;
    case 'rfq':
      await fetchRFQs();
      break;
    case 'banners':
      await fetchBanners();
      break;
    case 'policy':
      await fetchPolicy();
      break;
    case 'settings':
      await initSettings();
      break;
  }
})();

// --- 1. Overview Stats ---
async function fetchAdminStats() {
  try {
    const response = await fetch('/api/admin/stats?t=' + new Date().getTime());
    if (!response.ok) return; // Silent fail or show toast
    const data = await response.json();
    
    setText('stat-total-users', (data.total_users || 0).toLocaleString());
    setText('stat-ai-usage', (data.ai_usage || 0).toLocaleString());
    setText('stat-crawler-usage', (data.crawler_usage || 0).toLocaleString());
  } catch (e) { console.error(e); }
}

// --- 2. Users Management ---
async function fetchUsers() {
  const list = document.getElementById('user-list');
  if (!list) return;
  
  try {
    const res = await fetch('/api/admin/users?t=' + new Date().getTime());
    const { results } = await res.json();
    
    list.innerHTML = '';
    if (results.length === 0) {
      list.innerHTML = '<tr><td colspan="7" class="px-6 py-10 text-center text-slate-400">회원이 없습니다.</td></tr>';
      return;
    }

    results.forEach(user => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors';
      tr.innerHTML = `
        <td class="px-4 py-3 text-slate-500 text-xs">${user.id}</td>
        <td class="px-4 py-3 font-medium text-slate-900">${user.name}</td>
        <td class="px-4 py-3 text-slate-500">${user.email}</td>
        <td class="px-4 py-3 text-slate-500">${user.company_name || '-'}</td>
        <td class="px-4 py-3"><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-bold">${user.role}</span></td>
        <td class="px-4 py-3 text-slate-400 text-xs">${new Date(user.created_at).toLocaleDateString()}</td>
        <td class="px-4 py-3 text-center">
          <button class="text-slate-400 hover:text-blue-600 mx-1"><i class="fas fa-edit"></i></button>
        </td>
      `;
      list.appendChild(tr);
    });
  } catch (e) { console.error(e); list.innerHTML = '<tr><td colspan="7" class="text-center text-red-500 py-4">로딩 실패</td></tr>'; }
}

// --- 3. Partners Management ---
async function fetchPartners() {
  const list = document.getElementById('partner-list');
  if (!list) return;

  try {
    const res = await fetch('/api/admin/partners?t=' + new Date().getTime());
    const { results } = await res.json();

    list.innerHTML = '';
    if (results.length === 0) {
      list.innerHTML = '<tr><td colspan="6" class="px-6 py-10 text-center text-slate-400">승인 대기 중인 파트너가 없습니다.</td></tr>';
      return;
    }

    results.forEach(p => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50 transition-colors';
      tr.innerHTML = `
        <td class="px-6 py-4 font-bold text-slate-800">${p.company_name}</td>
        <td class="px-6 py-4">${p.ceo_name}</td>
        <td class="px-6 py-4 text-slate-500">${p.biz_num}</td>
        <td class="px-6 py-4 text-slate-500">${p.phone}</td>
        <td class="px-6 py-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">승인 대기</span></td>
        <td class="px-6 py-4 text-right space-x-2">
          <button onclick="approvePartner(${p.id})" class="text-green-600 font-bold hover:underline">승인</button>
          <span class="text-slate-300">|</span>
          <button class="text-red-500 font-bold hover:underline">반려</button>
        </td>
      `;
      list.appendChild(tr);
    });
  } catch (e) { console.error(e); }
}

async function approvePartner(id) {
  if (!confirm('해당 기업을 파트너로 승인하시겠습니까?')) return;
  try {
    const res = await fetch('/api/admin/partners/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    if (res.ok) {
      alert('승인되었습니다.');
      fetchPartners(); // Reload list
    } else {
      alert('처리 실패');
    }
  } catch (e) { alert('에러 발생'); }
}

// --- 4. RFQ Management ---
async function fetchRFQs() {
  const list = document.getElementById('rfq-list');
  if (!list) return;

  try {
    const res = await fetch('/api/admin/rfqs?t=' + new Date().getTime());
    const { results } = await res.json();

    list.innerHTML = '';
    if (results.length === 0) {
      list.innerHTML = '<div class="p-8 text-center text-slate-400">접수된 견적 요청이 없습니다.</div>';
      return;
    }

    results.forEach(rfq => {
      const div = document.createElement('div');
      div.className = `p-4 cursor-pointer border-l-4 ${rfq.status === 'matching' ? 'bg-blue-50 border-blue-600' : 'hover:bg-slate-50 border-transparent'}`;
      div.innerHTML = `
        <div class="flex justify-between items-start mb-1">
          <span class="${rfq.status === 'matching' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'} text-[10px] font-bold px-2 py-0.5 rounded">
            ${rfq.status === 'matching' ? 'NEW' : '발송완료'}
          </span>
          <span class="text-xs text-slate-400">${new Date(rfq.created_at).toLocaleDateString()}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-sm mb-1">${rfq.title}</h4>
        <p class="text-xs text-slate-500 mb-2">발주사: ${rfq.client_name}</p>
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold ${rfq.status === 'matching' ? 'text-indigo-600' : 'text-green-600'}">
            ${rfq.matched_count}개사 매칭됨
          </span>
        </div>
      `;
      
      // Click event for detail view (Simulation)
      div.onclick = () => {
        // In real app, this would load detail into the right panel
        // For now, simulate sending
        const btn = document.getElementById('send-noti-btn');
        if (btn) btn.onclick = () => sendNotifications(rfq.id);
      };
      
      list.appendChild(div);
    });
  } catch (e) { console.error(e); }
}

async function sendNotifications(id) {
  if (!id) { alert('먼저 좌측 목록에서 견적 요청을 선택해주세요.'); return; }
  if (!confirm('매칭된 공급사들에게 알림톡을 발송하시겠습니까?')) return;
  
  try {
    const res = await fetch('/api/admin/rfqs/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, channels: ['kakao'] })
    });
    const json = await res.json();
    alert(json.message);
    fetchRFQs();
  } catch (e) { alert('발송 실패'); }
}

// --- 5. Banners Management ---
async function fetchBanners() {
  const list = document.getElementById('banner-list');
  if (!list) return;
  
  try {
    const res = await fetch('/api/admin/banners?t=' + new Date().getTime());
    const { results } = await res.json();
    
    list.innerHTML = '';
    results.forEach(b => {
      const div = document.createElement('div');
      div.className = `border border-slate-200 rounded-lg overflow-hidden group relative ${b.is_active ? '' : 'opacity-60'}`;
      div.innerHTML = `
        <img src="${b.image_url}" class="w-full h-32 object-cover" />
        <div class="p-3 bg-slate-50 flex justify-between items-center">
          <span class="text-xs font-bold text-slate-700">${b.title}</span>
          <span class="${b.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-500'} text-[10px] px-2 py-0.5 rounded font-bold">
            ${b.is_active ? '노출중' : '비활성'}
          </span>
        </div>
      `;
      list.appendChild(div);
    });
  } catch (e) { console.error(e); }
}

// --- 6. Policy Management ---
async function fetchPolicy() {
  const editor = document.getElementById('policy-editor');
  if (!editor) return;
  
  // Default load 'terms'
  loadPolicyContent('terms');
  
  // Bind buttons
  document.getElementById('btn-policy-terms').onclick = () => loadPolicyContent('terms');
  document.getElementById('btn-policy-privacy').onclick = () => loadPolicyContent('privacy');
  document.getElementById('btn-policy-finance').onclick = () => loadPolicyContent('finance');
  
  document.getElementById('btn-save-policy').onclick = savePolicy;
}

let currentPolicyType = 'terms';

async function loadPolicyContent(type) {
  currentPolicyType = type;
  // Update buttons UI
  ['terms', 'privacy', 'finance'].forEach(t => {
    const btn = document.getElementById(`btn-policy-${t}`);
    if(btn) {
      if(t === type) btn.classList.add('bg-blue-50', 'text-blue-600', 'border-blue-200');
      else btn.classList.remove('bg-blue-50', 'text-blue-600', 'border-blue-200');
    }
  });

  const editor = document.getElementById('policy-editor');
  editor.value = '로딩 중...';
  
  try {
    const res = await fetch(`/api/admin/policy/${type}?t=${new Date().getTime()}`);
    const json = await res.json();
    editor.value = json.content || '';
  } catch(e) { editor.value = '로딩 실패'; }
}

async function savePolicy() {
  const content = document.getElementById('policy-editor').value;
  try {
    const res = await fetch('/api/admin/policy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: currentPolicyType, content })
    });
    if(res.ok) alert('저장되었습니다.');
    else alert('저장 실패');
  } catch(e) { alert('에러 발생'); }
}

// --- 7. Settings & Integrations ---
async function initSettings() {
  // Imweb Sync
  const btnSyncImweb = document.getElementById('btn-sync-imweb');
  if (btnSyncImweb) {
    btnSyncImweb.onclick = async () => {
      if (!confirm('아임웹 회원 정보를 동기화하시겠습니까?')) return;
      
      const originalText = btnSyncImweb.innerText;
      btnSyncImweb.disabled = true;
      btnSyncImweb.innerText = '동기화 중...';
      btnSyncImweb.classList.add('opacity-50', 'cursor-not-allowed');
      
      try {
        const res = await fetch('/api/imweb/users/sync', { method: 'POST' });
        const json = await res.json();
        
        if (res.ok) {
          alert(`동기화 성공!\n- 전체: ${json.total}\n- 추가됨: ${json.added}\n- 업데이트됨: ${json.updated}`);
        } else {
          alert('동기화 실패: ' + (json.error || '알 수 없는 오류'));
        }
      } catch (e) {
        alert('에러 발생: ' + e.message);
      } finally {
        btnSyncImweb.disabled = false;
        btnSyncImweb.innerText = originalText;
        btnSyncImweb.classList.remove('opacity-50', 'cursor-not-allowed');
      }
    };
  }
}

// --- Helper Functions ---
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val;
}

// Deploy Button Logic
async function triggerDeploy() {
  if (!confirm('정말 배포를 시작하시겠습니까?')) return;
  try {
    const res = await fetch('/api/admin/deploy', { method: 'POST' });
    const json = await res.json();
    alert(json.message);
  } catch(e) {
    alert('배포 요청 실패');
  }
}
