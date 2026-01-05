// Admin Dashboard Logic (Powered by MCE Core)
document.addEventListener('DOMContentLoaded', () => {
  console.log('Admin Logic Module Loaded');

  // --- 1. Notification Center (RFQ) ---
  const sendBtn = document.getElementById('send-noti-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const originalText = sendBtn.innerHTML;
      sendBtn.disabled = true;
      sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 발송 중...';

      setTimeout(() => {
        MCE.ui.toast('선택한 3개 기업에 알림톡 발송을 완료했습니다.', 'success');
        sendBtn.innerHTML = '<i class="fas fa-check mr-2"></i> 발송 완료';
        sendBtn.classList.replace('bg-blue-600', 'bg-green-600');
        sendBtn.classList.replace('hover:bg-blue-700', 'hover:bg-green-700');

        setTimeout(() => {
          sendBtn.innerHTML = originalText;
          sendBtn.disabled = false;
          sendBtn.classList.replace('bg-green-600', 'bg-blue-600');
          sendBtn.classList.replace('hover:bg-green-700', 'hover:bg-blue-700');
        }, 3000);
      }, 1500);
    });
  }

  // --- 2. Partner Approval (List) ---
  // 동적으로 생성되는 버튼들을 위한 위임(Delegation) 처리
  document.body.addEventListener('click', (e) => {
    const target = e.target;
    
    // 승인 버튼
    if (target.matches('.btn-approve') || target.closest('.btn-approve')) {
      if(confirm('해당 파트너사의 가입을 승인하시겠습니까?')) {
        MCE.ui.toast('파트너 승인 처리되었습니다. (알림 발송됨)', 'success');
        const row = target.closest('tr');
        if(row) {
          row.style.opacity = '0.5';
          row.style.pointerEvents = 'none';
          const badge = row.querySelector('.status-badge');
          if(badge) {
            badge.className = 'status-badge bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold';
            badge.innerText = '승인 완료';
          }
        }
      }
    }

    // 반려 버튼
    if (target.matches('.btn-reject') || target.closest('.btn-reject')) {
      const reason = prompt('반려 사유를 입력해주세요.');
      if(reason) {
        MCE.ui.toast(`반려 처리되었습니다. (사유: ${reason})`, 'error');
        const row = target.closest('tr');
        if(row) row.remove();
      }
    }

    // --- User Management Actions ---
    // 회원 수정
    if (target.matches('.btn-user-edit') || target.closest('.btn-user-edit')) {
      MCE.ui.toast('회원 정보 수정 팝업을 엽니다. (기능 준비중)', 'info');
    }

    // 회원 차단
    if (target.matches('.btn-user-block') || target.closest('.btn-user-block')) {
      if(confirm('해당 회원을 차단하시겠습니까?')) {
        MCE.ui.toast('회원이 차단되었습니다.', 'error');
        const row = target.closest('tr');
        if(row) row.classList.add('opacity-50', 'bg-red-50');
      }
    }
  });

  // --- 3. SEO Settings Save ---
  const btnSaveSeo = document.getElementById('btn-save-seo');
  if(btnSaveSeo) {
    btnSaveSeo.addEventListener('click', () => {
      btnSaveSeo.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 저장 중...';
      setTimeout(() => {
        MCE.ui.toast('SEO 설정이 사이트에 반영되었습니다.', 'success');
        btnSaveSeo.innerHTML = '설정 저장';
      }, 1000);
    });
  }

  // --- 4. Banner Management ---
  const btnAddBanner = document.getElementById('btn-add-banner');
  if(btnAddBanner) {
    btnAddBanner.addEventListener('click', () => {
      MCE.ui.toast('배너 등록 팝업을 엽니다. (기능 준비중)', 'info');
    });
  }

  // --- 5. ERP Sync ---
  const btnSyncErp = document.getElementById('btn-sync-erp');
  if(btnSyncErp) {
    btnSyncErp.addEventListener('click', () => {
      btnSyncErp.disabled = true;
      btnSyncErp.innerHTML = '<i class="fas fa-sync fa-spin mr-2"></i> 동기화 중...';
      
      setTimeout(() => {
        MCE.ui.toast('ECOUNT ERP와 데이터 동기화를 완료했습니다.', 'success');
        btnSyncErp.disabled = false;
        btnSyncErp.innerHTML = '<i class="fas fa-sync mr-2"></i> 즉시 동기화';
        
        // Update Stats Mock
        const countEl = document.getElementById('api-call-count');
        if(countEl) countEl.innerText = parseInt(countEl.innerText) + 12;
      }, 2000);
    });
  }
});
