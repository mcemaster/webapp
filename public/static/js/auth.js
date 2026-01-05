// Auth & Login Logic (Powered by MCE Core)
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Tab Switching (안전한 요소 선택 사용)
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

  // 2. Login Handling (방어적 코딩 적용)
  const loginForm = document.querySelector('form[action="/auth/login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  function handleLogin(e) {
    e.preventDefault(); // 폼 기본 동작 차단

    const emailInput = MCE.$('#email');
    const passInput = MCE.$('#password');
    
    // 요소가 없으면 중단 (안전장치)
    if (!emailInput || !passInput) {
      MCE.ui.toast('로그인 입력창을 찾을 수 없습니다.', 'error');
      return;
    }

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    // 유효성 검사
    if (!email || !password) {
      MCE.ui.toast('아이디와 비밀번호를 입력해주세요.', 'error');
      highlightError(emailInput, passInput);
      return;
    }

    // 로딩 시작
    const btn = MCE.$('#login-btn');
    const originalText = btn ? btn.innerHTML : '로그인';
    if(btn) {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>인증 중...';
      btn.disabled = true;
    }

    // 로그인 시뮬레이션 (서버 통신 대용)
    setTimeout(() => {
      // Admin Logic
      if (email === 'mce@mce.re.kr') {
        if (password === '1q2w3e4r5t!') {
          MCE.ui.toast('최고관리자님 환영합니다.', 'success');
          window.location.href = '/auth/admin';
        } else {
          loginFailed('비밀번호가 일치하지 않습니다.');
        }
      } 
      // Mock User
      else if (email.includes('user') || email.includes('test')) {
         window.location.href = '/auth/kakao'; 
      } 
      // Fail
      else {
        loginFailed('등록되지 않은 계정입니다.');
      }
    }, 800);

    function loginFailed(msg) {
      MCE.ui.toast(msg, 'error');
      highlightError(emailInput, passInput);
      if(btn) {
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    }

    function highlightError(...inputs) {
      inputs.forEach(input => {
        input.classList.add('border-red-500', 'bg-red-50', 'animate-pulse');
        setTimeout(() => input.classList.remove('border-red-500', 'bg-red-50', 'animate-pulse'), 1500);
      });
    }
  }
});
