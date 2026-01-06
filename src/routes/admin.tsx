import { Hono } from 'hono'
import { getCookie } from 'hono/cookie'
import { html } from 'hono/html'

const admin = new Hono()

// --- Admin UI Component ---
const AdminFinal = (props: { user: any, tab?: string }) => {
  const activeTab = props.tab || 'overview';
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <title>관리자 - 경영인증평가원 (FINAL)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>{`.fade-in { animation: fadeIn 0.5s ease-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </head>
      <body class="bg-slate-50 font-sans antialiased text-slate-800">
        <div class="min-h-screen flex">
          {/* Sidebar */}
          <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-20 hidden md:flex flex-col">
            <div class="p-6 border-b border-slate-100 flex items-center justify-center"><img src="/static/logo-horizontal.png" alt="Logo" class="h-8" /></div>
            <div class="flex-1 overflow-y-auto p-4 space-y-6">
              <div><p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</p><a href="/admin?tab=overview" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}><i class="fas fa-chart-pie w-5 text-center mr-2"></i> 대시보드</a></div>
              <div><p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Center</p><div class="space-y-1"><a href="/admin?tab=companies" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'companies' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}><i class="fas fa-building w-5 text-center mr-2"></i> 기업 데이터 수집</a><a href="/admin?tab=grants" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'grants' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}><i class="fas fa-bullhorn w-5 text-center mr-2"></i> 지원사업 공고</a></div></div>
              <div><p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Configuration</p><div class="space-y-1"><a href="/admin?tab=settings" class={`flex items-center px-4 py-2.5 text-sm font-bold rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}`}><i class="fas fa-cog w-5 text-center mr-2"></i> 시스템 설정</a></div></div>
            </div>
            <div class="p-4 border-t border-slate-100"><a href="/" class="flex items-center justify-center w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors"><i class="fas fa-external-link-alt mr-2"></i> 사용자 페이지로 이동</a></div>
          </aside>
          {/* Main */}
          <main class="flex-1 md:ml-64 p-8">
            <header class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600">
              <div><h1 class="text-2xl font-extrabold text-slate-900 flex items-center"><span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs mr-3">ADMIN V3.0</span> 통합 관리자 시스템</h1><p class="text-slate-500 text-sm mt-1 ml-14">기업 데이터, 공고 매칭, AI 분석 현황을 실시간으로 관리합니다.</p></div>
              <div class="flex items-center space-x-4"><div class="text-right mr-4 hidden sm:block"><p class="text-sm font-bold text-slate-800">{props.user.name}</p><p class="text-xs text-slate-500">최고 관리자</p></div><a href="/logout" class="bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors">로그아웃</a></div>
            </header>
            <div class="fade-in">
              {/* Dynamic Content Placeholders */}
              {activeTab === 'overview' && (
                <div class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">총 회원 수</p><h3 id="stat-total-users" class="text-3xl font-extrabold text-slate-800 mt-2">-</h3></div>
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">AI 분석 횟수</p><h3 id="stat-ai-usage" class="text-3xl font-extrabold text-indigo-600 mt-2">-</h3></div>
                     <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><p class="text-xs font-bold text-slate-400 uppercase">수집된 공고</p><h3 id="stat-crawler-usage" class="text-3xl font-extrabold text-emerald-600 mt-2">-</h3></div>
                  </div>
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 class="font-bold text-lg text-slate-800 mb-4">주간 성장 지표</h3><div class="h-64 relative"><canvas id="growthChart"></canvas></div></div>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 class="font-bold text-lg text-slate-800 mb-4">AI 서비스 활용도</h3><div class="h-64 relative"><canvas id="aiChart"></canvas></div></div>
                  </div>
                </div>
              )}
              {activeTab === 'companies' && (
                <div class="space-y-8">
                  <div class="text-center max-w-2xl mx-auto mb-12 relative z-30">
                    <h2 class="text-2xl font-extrabold text-slate-900 mb-2">원클릭 기업 데이터 수집</h2>
                    <div class="relative"><div class="flex shadow-2xl rounded-2xl overflow-hidden border border-slate-200 bg-white"><input type="text" id="company-search-input" placeholder="기업명 입력" class="w-full px-6 py-4 text-lg outline-none" autocomplete="off" /><button class="bg-blue-600 text-white px-8 py-4 font-bold">검색</button></div><div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl mt-2 hidden text-left"></div></div>
                  </div>
                  <div id="result-area" class="grid grid-cols-1 lg:grid-cols-2 gap-8 opacity-50"><div class="bg-white p-8 rounded-2xl border border-slate-200"><h3 class="font-bold mb-4">DART 정보</h3><div id="res-name">-</div></div><div class="bg-white p-8 rounded-2xl border border-slate-200"><h3 class="font-bold mb-4">고용 정보</h3><div id="res-emp">-</div></div></div>
                </div>
              )}
              {activeTab === 'settings' && (
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"><h3 class="font-bold mb-4">DART 연동</h3><button onclick="testDartConnection()" class="bg-slate-800 text-white px-4 py-2 rounded">테스트</button><div id="dart-status" class="mt-2 text-sm text-slate-500">대기...</div></div>
              )}
            </div>
          </main>
        </div>
        <script src="/static/js/core.js"></script>
        <script src="/static/js/admin_final.js"></script>
        <script>{`async function testDartConnection(){const e=document.getElementById("dart-status");e.innerText="연결 중...";try{const t=await fetch("/api/dart/test"),a=await t.json();e.innerText=a.success?"성공: "+a.company:"실패: "+a.message}catch(t){e.innerText="오류"}}`}</script>
      </body>
    </html>
  )
}

// --- Admin Page Route ---
admin.get('/', (c) => {
  const userSession = getCookie(c, 'user_session')
  const user = userSession ? JSON.parse(userSession) : undefined
  if (!user || user.role !== 'admin') return c.redirect('/login')
  const tab = c.req.query('tab')
  return c.render(<AdminFinal user={user} tab={tab} />)
})

export default admin