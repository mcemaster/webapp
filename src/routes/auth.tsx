import { Hono } from 'hono'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { html } from 'hono/html'

const auth = new Hono()

// 1. Login Page UI - Mounted at /auth/login
auth.get('/login', (c) => {
  const userSession = getCookie(c, 'user_session')
  if (userSession) return c.redirect('/')
  
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
            <p class="text-gray-600 mt-2">서비스 이용을 위해 로그인해주세요</p>
          </div>

          <form action="/auth/login" method="post" class="space-y-4">
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">이메일</label>
              <input type="email" name="email" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="admin@test.com" required />
            </div>
            <div>
              <label class="block text-gray-700 text-sm font-bold mb-2">비밀번호</label>
              <input type="password" name="password" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder="••••••••" required />
            </div>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition duration-200">
              로그인
            </button>
          </form>
          
          <div class="mt-6 text-center">
            <span class="text-gray-500 text-sm">계정이 없으신가요?</span>
            <a href="/register" class="text-blue-600 font-bold text-sm ml-2 hover:underline">회원가입</a>
          </div>
        </div>
      </body>
    </html>
  )
})

// 2. Login Process (POST)
auth.post('/login', async (c) => {
  try {
    const body = await c.req.parseBody()
    const email = body['email'] as string
    
    // Admin Login Logic
    if (email.includes('admin') || email.includes('mce')) {
      const adminData = {
        id: 'admin',
        name: '최고관리자',
        email: email,
        role: 'admin',
        profileImage: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
      }
      setCookie(c, 'user_session', JSON.stringify(adminData), { path: '/', httpOnly: true, maxAge: 86400 })
      return c.redirect('/admin')
    }

    // User Login Logic
    const userData = {
      id: 'user1',
      name: '김철수',
      email: email,
      role: 'user',
      profileImage: 'https://ui-avatars.com/api/?name=User'
    }
    setCookie(c, 'user_session', JSON.stringify(userData), { path: '/', httpOnly: true, maxAge: 86400 })
    return c.redirect('/')
    
  } catch (e) {
    return c.text('Login Failed', 400)
  }
})

// 3. Logout
auth.get('/logout', (c) => {
  deleteCookie(c, 'user_session', { path: '/' })
  return c.redirect('/auth/login')
})

// 4. Register - redirect to main register page
auth.get('/register', (c) => {
  return c.redirect('/register')
})

export default auth