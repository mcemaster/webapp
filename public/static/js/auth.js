// Auth & Login Logic
document.addEventListener('DOMContentLoaded', () => {
  console.log('Auth Module Loaded');

  // --- Tab Switching Logic ---
  const tabEnterprise = document.getElementById('tab-enterprise');
  const tabInstitution = document.getElementById('tab-institution');

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

  // --- Login Form Handling ---
  const loginForm = document.querySelector('form[action="/auth/login"]');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission

    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    const btn = document.getElementById('login-btn');
    const errorMsg = document.getElementById('error-msg');
    const errorText = document.getElementById('error-text');

    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    // Reset UI
    if(errorMsg) errorMsg.classList.add('hidden');
    emailInput.classList.remove('border-red-500', 'bg-red-50');
    passInput.classList.remove('border-red-500', 'bg-red-50');

    // Validation
    if (!email || !password) {
      showError('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    // Loading state
    const originalBtnText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>로그인 중...';
    btn.disabled = true;
    btn.classList.add('opacity-75', 'cursor-not-allowed');

    // Helper to show error
    function showError(msg) {
      if(errorText) errorText.innerText = msg;
      if(errorMsg) errorMsg.classList.remove('hidden');
      
      // Highlight inputs
      emailInput.classList.add('border-red-500', 'bg-red-50');
      passInput.classList.add('border-red-500', 'bg-red-50');
      
      // Shake animation effect
      loginForm.classList.add('animate-pulse');
      setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);

      // Reset button
      btn.innerHTML = originalBtnText;
      btn.disabled = false;
      btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }

    // Simulate API call logic (Secure & Stable)
    setTimeout(() => {
      // 1. Admin Check
      if (email === 'mce@mce.re.kr') {
        if (password === '1q2w3e4r5t!') {
          window.location.href = '/auth/admin';
        } else {
          showError('비밀번호가 일치하지 않습니다.');
        }
      } 
      // 2. Mock User Check (Allows 'user' or 'test' in email for demo)
      else if (email.includes('user') || email.includes('test')) {
         // In a real app, this would be a POST request to /auth/login
         // verifying credentials and receiving a JWT/Cookie.
         window.location.href = '/auth/kakao'; 
      } 
      // 3. Not Found / Fallback
      else {
        showError('등록되지 않은 아이디입니다. (데모: mce@mce.re.kr / user@test.com)');
      }
    }, 800); // Slight delay for UX
  }
});
