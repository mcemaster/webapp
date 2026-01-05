import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'

import { Home } from './pages/Home'
import { Rfq } from './pages/Rfq'
import { RfqResult } from './pages/RfqResult'
import { Partners } from './pages/Partners'
import { Admin } from './pages/Admin'
import { Register } from './pages/Register'
import { Services } from './pages/Services'
import { SupportMatching } from './pages/SupportMatching'
import { SpecEvaluation } from './pages/SpecEvaluation'
import { SecondPartyAudit } from './pages/SecondPartyAudit'
import { PartnershipProposal } from './pages/PartnershipProposal'
import { FAQ } from './pages/FAQ'
import { Legal } from './pages/Legal'

import { AuditApplication } from './pages/AuditApplication'

import { Certification } from './pages/Certification'

const app = new Hono()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

// Auth Middleware & Routes
// ... (Keep existing routes) ...

app.get('/services/certification', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Certification user={user} />)
})
// ... (Keep existing routes) ...

app.get('/audit/apply', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<AuditApplication user={user} />)
})
app.get('/login', (c) => {
  const userSession = getCookie(c, 'user_session')
  if (userSession) {
    const user = JSON.parse(userSession)
    if (user.role === 'admin') return c.redirect('/admin')
    return c.redirect('/')
  }
  
  return c.html(
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>로그인 - 경영인증평가원</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      </head>
      <body class="bg-gray-50 flex items-center justify-center min-h-screen">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div class="text-center mb-8">
            <img src="/static/logo-horizontal.png" alt="경영인증평가원 Logo" class="h-12 mx-auto mb-4" />
            <h1 class="text-2xl font-bold text-gray-800">로그인</h1>
            <p class="text-gray-600">서비스 이용을 위해 로그인해주세요</p>
          </div>

          <div class="mb-6">
            <div class="flex border-b border-gray-200 mb-4">
              <button id="tab-enterprise" class="flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold" onclick="switchTab('enterprise')">기업 회원</button>
              <button id="tab-institution" class="flex-1 py-2 text-gray-500" onclick="switchTab('institution')">기관/심사원</button>
            </div>
            
            <form action="/auth/login" method="post" class="space-y-4" onsubmit="event.preventDefault(); handleLogin();">
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">아이디 (이메일)</label>
                <input type="email" id="email" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors" placeholder="example@company.com" />
              </div>
              <div>
                <label class="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
                <input type="password" id="password" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors" placeholder="••••••••" />
              </div>
              
              {/* Error Message Area */}
              <div id="error-msg" class="hidden p-3 bg-red-50 border border-red-200 rounded-lg flex items-start animate-fade-in-up">
                <i class="fas fa-exclamation-circle text-red-500 mt-0.5 mr-2 text-sm"></i>
                <span id="error-text" class="text-sm text-red-600 font-medium"></span>
              </div>

              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center">
                  <input type="checkbox" class="mr-2" />
                  <span class="text-gray-600">로그인 유지</span>
                </label>
                <a href="#" class="text-blue-600 hover:underline">비밀번호 찾기</a>
              </div>
              <button type="submit" id="login-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200">
                로그인
              </button>
            </form>
            
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">간편 로그인</span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3">
                <a href="/auth/kakao" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-[#FEE500] hover:bg-[#FDD835]">
                  <i class="fas fa-comment text-brown-600"></i>
                </a>
                <a href="/auth/naver" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-white bg-[#03C75A] hover:bg-[#02B150]">
                  <span class="font-bold">N</span>
                </a>
                <a href="/auth/google" class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <i class="fab fa-google text-red-500"></i>
                </a>
              </div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-gray-200">
              <div class="text-center mb-4">
                <span class="text-gray-600 text-sm">아직 회원이 아니신가요?</span>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <a href="/register?type=buyer" class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer">
                  <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-2 group-hover:bg-blue-600 group-hover:text-white transition">
                    <i class="fas fa-user"></i>
                  </div>
                  <span class="text-sm font-bold text-gray-800">일반 회원가입</span>
                  <span class="text-xs text-gray-500 mt-1">공급사 찾기 / 기업 검색</span>
                </a>
                <a href="/register?type=partner" class="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition group cursor-pointer">
                  <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 group-hover:bg-green-600 group-hover:text-white transition">
                    <i class="fas fa-handshake"></i>
                  </div>
                  <span class="text-sm font-bold text-gray-800">파트너사 가입</span>
                  <span class="text-xs text-gray-500 mt-1">공급사 / 인증 기업</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            function switchTab(type) {
              const entBtn = document.getElementById('tab-enterprise');
              const instBtn = document.getElementById('tab-institution');
              
              if (type === 'enterprise') {
                entBtn.className = 'flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold';
                instBtn.className = 'flex-1 py-2 text-gray-500';
              } else {
                instBtn.className = 'flex-1 py-2 text-blue-600 border-b-2 border-blue-600 font-semibold';
                entBtn.className = 'flex-1 py-2 text-gray-500';
              }
            }

            function handleLogin() {
              const emailInput = document.getElementById('email');
              const passInput = document.getElementById('password');
              const email = emailInput.value;
              const password = passInput.value;
              const btn = document.getElementById('login-btn');
              const errorMsg = document.getElementById('error-msg');
              const errorText = document.getElementById('error-text');
              
              // Reset UI
              errorMsg.classList.add('hidden');
              emailInput.classList.remove('border-red-500', 'bg-red-50');
              passInput.classList.remove('border-red-500', 'bg-red-50');

              // Validation
              if (!email || !password) {
                showError('아이디와 비밀번호를 모두 입력해주세요.');
                return;
              }

              // Loading state
              const originalBtnText = btn.innerHTML;
              btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 로그인 중...';
              btn.disabled = true;

              // Helper to show error
              function showError(msg) {
                errorText.innerText = msg;
                errorMsg.classList.remove('hidden');
                
                // Highlight inputs
                emailInput.classList.add('border-red-500', 'bg-red-50');
                passInput.classList.add('border-red-500', 'bg-red-50');
                
                // Shake animation effect
                const form = document.querySelector('form');
                form.classList.add('animate-pulse');
                setTimeout(() => form.classList.remove('animate-pulse'), 500);

                // Reset button
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
              }

              // Simulate API call logic
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
                   window.location.href = '/auth/kakao'; 
                } 
                // 3. Not Found
                else {
                  showError('등록되지 않은 아이디입니다.\\n회원가입 후 이용해주세요.');
                }
              }, 600);
            }
          `
        }} />
      </body>
    </html>
  )
})

app.get('/auth/:provider', (c) => {
  const provider = c.req.param('provider')
  
  if (provider === 'admin') {
    const adminData = {
      id: 'admin',
      name: '관리자',
      email: 'admin@mce.re.kr',
      role: 'admin',
      isCertified: true,
      profileImage: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
    }
    setCookie(c, 'user_session', JSON.stringify(adminData), {
      path: '/',
      secure: false, // For sandbox http
      httpOnly: true,
      maxAge: 86400,
    })
    return c.redirect('/admin')
  }

  // Mock user login
  const userData = {
    id: '12345',
    name: '홍길동',
    email: 'user@example.com',
    role: 'user',
    isCertified: provider === 'kakao', // Mock: kakao users are certified
    provider: provider,
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
  
  setCookie(c, 'user_session', JSON.stringify(userData), {
    path: '/',
    secure: false,
    httpOnly: true,
    maxAge: 86400,
  })
  
  return c.redirect('/')
})

app.get('/logout', (c) => {
  deleteCookie(c, 'user_session')
  return c.redirect('/')
})

// API Routes
app.post('/api/rfq', async (c) => {
  const body = await c.req.json()
  console.log('RFQ Received:', body)
  return c.json({ 
    success: true, 
    message: '공급사 매칭 요청이 접수되었습니다. 담당자가 검토 후 연락드리겠습니다.',
    data: body 
  })
})

app.post('/api/register', async (c) => {
  const body = await c.req.json()
  console.log('Registration Received:', body)
  return c.json({
    success: true,
    message: '회원가입 완료'
  })
})

// Page Routes
app.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Home user={user} />)
})

app.get('/rfq', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Rfq user={user} />)
})

app.get('/rfq/result', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<RfqResult user={user} />)
})

app.get('/services', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Services user={user} />)
})

app.get('/services/spec', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SpecEvaluation user={user} />)
})

app.get('/services/scm', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SecondPartyAudit user={user} />)
})

app.get('/partners', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Partners user={user} />)
})

app.get('/support-matching', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<SupportMatching user={user} />)
})

app.get('/faq', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<FAQ user={user} />)
})

app.get('/admin', (c) => {
  const userSession = getCookie(c, 'user_session')
  if (!userSession) return c.redirect('/login')
  
  const user = JSON.parse(userSession)
  if (user.role !== 'admin') return c.redirect('/')
    
  return c.render(<Admin user={user} tab={c.req.query('tab')} />)
})

app.get('/partnership', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<PartnershipProposal user={user} />)
})

app.get('/register', (c) => {
  return c.render(<Register />)
})

app.get('/legal', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  return c.render(<Legal user={user} tab={c.req.query('tab')} />)
})

export default app