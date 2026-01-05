import { html } from 'hono/html'

export const Register = () => {
  return (
    <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <div class="flex justify-center">
          <a href="/">
            <img src="/static/logo-horizontal.png" alt="경영인증평가원" class="h-12 w-auto" />
          </a>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-slate-900">
          회원가입
        </h2>
        <p class="mt-2 text-center text-sm text-slate-600">
          경영인증평가원의 다양한 제조 네트워크를 경험해보세요
        </p>
      </div>

      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-200">
          
          {/* Step 0: User Type Selection (Always Visible initially) */}
          <div id="step-type-selection" class="space-y-4 mb-6">
            <h3 class="text-lg font-bold text-slate-900 mb-2 text-center">어떤 회원으로 가입하시겠습니까?</h3>
            <div class="grid grid-cols-2 gap-4">
              <button id="btn-buyer" class="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center group">
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-2 group-hover:bg-blue-100 group-hover:text-blue-600">
                  <i class="fas fa-shopping-cart text-xl"></i>
                </div>
                <span class="font-bold text-slate-800">일반 회원 (발주사)</span>
                <span class="text-xs text-slate-500 mt-1">견적 요청 및 기업 검색</span>
              </button>
              
              <button id="btn-partner" class="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center group">
                <div class="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 mb-2 group-hover:bg-blue-100 group-hover:text-blue-600">
                  <i class="fas fa-industry text-xl"></i>
                </div>
                <span class="font-bold text-slate-800">파트너사 (공급사)</span>
                <span class="text-xs text-slate-500 mt-1">인증 기업만 가입 가능</span>
              </button>
            </div>
          </div>

          {/* Step 1: Verification (Only for Partner) */}
          <div id="step-verification" class="hidden">
            <div class="flex items-center mb-4 pb-2 border-b border-slate-100">
              <button id="back-to-type-from-verify" class="text-slate-400 hover:text-slate-600 mr-3">
                <i class="fas fa-arrow-left"></i>
              </button>
              <h3 class="text-lg font-bold text-slate-900">
                <i class="fas fa-certificate mr-2 text-blue-600"></i>인증 기업 확인
              </h3>
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">사업자등록번호</label>
                <input type="text" id="biz-no" placeholder="'-' 없이 숫자만 입력" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">경영인증평가원 인증 번호</label>
                <input type="text" id="cert-no" placeholder="예) 경인평-2025-001" class="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <button id="verify-btn" class="w-full py-3 bg-slate-800 text-white font-bold rounded-md hover:bg-slate-700 transition-colors">
                인증 내역 조회
              </button>
            </div>

            <div class="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
              <i class="fas fa-info-circle mr-1"></i>
              파트너사 가입은 경영인증평가원 심사를 통해 인증이 완료된 기업만 가능합니다.<br/>
              인증 문의: 051-714-0798
            </div>
          </div>

          {/* Step 2: Registration Form (Common) */}
          <form id="registerForm" class="space-y-6 hidden animate-fade-in-up">
            <div class="flex items-center mb-4 pb-2 border-b border-slate-100">
              <button type="button" id="back-to-type-from-form" class="text-slate-400 hover:text-slate-600 mr-3">
                <i class="fas fa-arrow-left"></i>
              </button>
              <h3 class="text-lg font-bold text-slate-900" id="form-title">정보 입력</h3>
            </div>

            <input type="hidden" name="userType" id="userTypeInput" value="buyer" />
            
            {/* Verification Badge (Only for Partner) */}
            <div id="verification-badge" class="hidden p-3 bg-green-50 border border-green-200 rounded-md flex items-start">
              <i class="fas fa-check-circle text-green-600 mt-0.5 mr-2"></i>
              <div>
                <p class="text-sm font-bold text-green-800">인증 기업 확인됨</p>
                <p class="text-xs text-green-700 mt-1" id="verified-company-name">(주)테스트기업</p>
              </div>
            </div>

            {/* Email */}
            <div>
              <label for="email" class="block text-sm font-medium text-slate-700">
                아이디 (이메일)
              </label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label for="password" class="block text-sm font-medium text-slate-700">
                비밀번호
              </label>
              <div class="mt-1">
                <input id="password" name="password" type="password" autocomplete="new-password" required class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="8자 이상 입력" />
              </div>
            </div>

            {/* Password Confirm */}
            <div>
              <label for="passwordConfirm" class="block text-sm font-medium text-slate-700">
                비밀번호 확인
              </label>
              <div class="mt-1">
                <input id="passwordConfirm" name="passwordConfirm" type="password" required class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div class="border-t border-slate-200 my-4"></div>

            {/* Name */}
            <div>
              <label for="name" class="block text-sm font-medium text-slate-700">
                담당자명
              </label>
              <div class="mt-1">
                <input id="name" name="name" type="text" required class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label for="companyName" class="block text-sm font-medium text-slate-700">
                회사명
              </label>
              <div class="mt-1">
                <input id="companyName" name="companyName" type="text" required class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label for="phone" class="block text-sm font-medium text-slate-700">
                담당자 휴대전화
              </label>
              <div class="mt-1">
                <input id="phone" name="phone" type="tel" required class="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="010-0000-0000" />
              </div>
            </div>

            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="terms" name="terms" type="checkbox" required class="focus:ring-blue-500 h-4 w-4 text-blue-600 border-slate-300 rounded" />
              </div>
              <div class="ml-3 text-sm">
                <label for="terms" class="font-medium text-slate-700">
                  <a href="#" class="text-blue-600 hover:text-blue-500">이용약관</a> 및 <a href="#" class="text-blue-600 hover:text-blue-500">개인정보처리방침</a>에 동의합니다.
                </label>
              </div>
            </div>

            <div>
              <button type="submit" class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                회원가입 완료
              </button>
            </div>
          </form>

          <div class="mt-6 border-t border-slate-200 pt-6">
            <div class="text-center">
              <span class="text-sm text-slate-600">이미 계정이 있으신가요? </span>
              <a href="/login" class="font-medium text-blue-600 hover:text-blue-500 ml-1">
                로그인하기
              </a>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        // Type Selection Logic
        const stepType = document.getElementById('step-type-selection');
        const stepVerify = document.getElementById('step-verification');
        const form = document.getElementById('registerForm');
        
        document.getElementById('btn-buyer').addEventListener('click', () => {
          stepType.classList.add('hidden');
          form.classList.remove('hidden');
          document.getElementById('userTypeInput').value = 'buyer';
          document.getElementById('form-title').innerText = '일반 회원(발주사) 정보 입력';
          document.getElementById('verification-badge').classList.add('hidden');
          // Enable company name input for manual entry
          document.getElementById('companyName').readOnly = false;
          document.getElementById('companyName').value = '';
        });

        document.getElementById('btn-partner').addEventListener('click', () => {
          stepType.classList.add('hidden');
          stepVerify.classList.remove('hidden');
          document.getElementById('userTypeInput').value = 'partner';
        });

        // Back Buttons
        document.getElementById('back-to-type-from-verify').addEventListener('click', () => {
          stepVerify.classList.add('hidden');
          stepType.classList.remove('hidden');
        });

        document.getElementById('back-to-type-from-form').addEventListener('click', () => {
          form.classList.add('hidden');
          stepType.classList.remove('hidden');
          // Reset if coming back from partner flow
          stepVerify.classList.add('hidden'); 
        });

                // Verification Logic (Only for Partner)
        
        // Auto-select based on query param
        const urlParams = new URLSearchParams(window.location.search);
        const type = urlParams.get('type');
        if (type === 'buyer') {
          setTimeout(() => document.getElementById('btn-buyer').click(), 100);
        } else if (type === 'partner') {
          setTimeout(() => document.getElementById('btn-partner').click(), 100);
        }

        document.getElementById('verify-btn').addEventListener('click', () => {
          const bizNo = document.getElementById('biz-no').value;
          const certNo = document.getElementById('cert-no').value;
          const btn = document.getElementById('verify-btn');

          if(!bizNo || !certNo) {
            alert('사업자등록번호와 인증번호를 모두 입력해주세요.');
            return;
          }

          btn.disabled = true;
          btn.innerText = '조회 중...';

          // Simulate API Check
          setTimeout(() => {
            // For demo: Accept any input
            stepVerify.classList.add('hidden');
            form.classList.remove('hidden');
            document.getElementById('form-title').innerText = '파트너사(공급사) 정보 입력';
            document.getElementById('verification-badge').classList.remove('hidden');
            document.getElementById('verified-company-name').innerText = '인증번호: ' + certNo;
            
            // Auto-fill company name (Simulated)
            document.getElementById('companyName').value = '(주)인증된파트너';
            document.getElementById('companyName').readOnly = true; // Prevent changing verified name
          }, 1000);
        });

        // Registration Logic
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const form = e.target;
          const password = form.password.value;
          const passwordConfirm = form.passwordConfirm.value;

          if (password !== passwordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
          }

          const btn = form.querySelector('button[type="submit"]');
          const originalText = btn.textContent;
          btn.disabled = true;
          btn.textContent = '등록 처리 중...';

          try {
            const response = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(Object.fromEntries(new FormData(form))),
            });

            if (response.ok) {
              const type = document.getElementById('userTypeInput').value;
              const msg = type === 'partner' 
                ? '파트너사 회원가입이 완료되었습니다!\\n관리자 승인 후 활동이 가능합니다.'
                : '일반 회원가입이 완료되었습니다!\\n로그인 후 바로 견적 요청이 가능합니다.';
              
              alert(msg);
              window.location.href = '/login';
            } else {
              alert('오류가 발생했습니다.');
            }
          } catch (error) {
            alert('네트워크 오류가 발생했습니다.');
          } finally {
            btn.disabled = false;
            btn.textContent = originalText;
          }
        });
      ` }} />
    </div>
  )
}
