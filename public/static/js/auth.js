// Auth & Login Logic (Native Form Submission Mode)
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Tab Switching
  const tabEnterprise = MCE.$('#tab-enterprise');
  const tabInstitution = MCE.$('#tab-institution');

  if (tabEnterprise && tabInstitution) {
    tabEnterprise.addEventListener('click', () => switchTab('enterprise'));
    tabInstitution.addEventListener('click', () => switchTab('institution'));
  }

  function switchTab(type) {
    if (type === 'enterprise') {
      tabEnterprise.className = 'flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold transition-colors duration-200';
      tabInstitution.className = 'flex-1 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200';
    } else {
      tabInstitution.className = 'flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold transition-colors duration-200';
      tabEnterprise.className = 'flex-1 py-2 text-gray-500 hover:text-gray-700 transition-colors duration-200';
    }
  }

  // 2. Login Handling
  const loginForm = document.querySelector('form[action="/auth/login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  function handleLogin(e) {
    // 주의: 여기서 e.preventDefault()를 호출하지 않습니다.
    // 유효성 검사가 통과하면 브라우저가 자동으로 서버(/auth/login)로 데이터를 전송합니다.

    const emailInput = MCE.$('#email');
    const passInput = MCE.$('#password');
    const btn = MCE.$('#login-btn');
    const errorMsg = MCE.$('#error-msg');
    const errorText = MCE.$('#error-text');

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    // Reset UI
    if(errorMsg) errorMsg.classList.add('hidden');
    emailInput.classList.remove('border-red-500', 'bg-red-50');
    passInput.classList.remove('border-red-500', 'bg-red-50');

    // [유효성 검사] 실패 시에만 전송을 막습니다.
    if (!email || !password) {
      e.preventDefault(); // 전송 중단
      showError('아이디와 비밀번호를 모두 입력해주세요.');
      
      if(!email) emailInput.classList.add('border-red-500', 'bg-red-50');
      if(!password) passInput.classList.add('border-red-500', 'bg-red-50');
      return;
    }

    // [성공 시] 로딩 UI만 보여주고, 전송은 브라우저에게 맡깁니다.
    if(btn) {
      const originalText = btn.innerText;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>로그인 중...';
      btn.style.opacity = '0.8';
      // 버튼을 disable 하면 전송이 안 될 수 있으므로 클릭만 방지
      btn.style.pointerEvents = 'none';
    }

    // Helper
    function showError(msg) {
      if(errorText) errorText.innerText = msg;
      if(errorMsg) errorMsg.classList.remove('hidden');
      loginForm.classList.add('animate-pulse');
      setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);
    }
  }
});
