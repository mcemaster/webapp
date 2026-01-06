import { html } from 'hono/html'

export const AdminHeader = (props: { user: any, title: string }) => html`
  <header class="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-600">
    <div>
      <h1 class="text-2xl font-extrabold text-slate-900 flex items-center">
        <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs mr-3">ADMIN V3.0</span>
        ${props.title}
      </h1>
      <p class="text-slate-500 text-sm mt-1 ml-14">실시간 데이터 통합 관리 및 모니터링 시스템</p>
    </div>
    <div class="flex items-center space-x-4">
       <div class="text-right mr-4 hidden sm:block">
         <p class="text-sm font-bold text-slate-800">${props.user.name}</p>
         <p class="text-xs text-slate-500">최고 관리자</p>
       </div>
       <div class="h-8 w-px bg-slate-200 mx-2"></div>
       <button onclick="location.reload()" class="p-2 text-slate-400 hover:text-blue-600 rounded-full hover:bg-blue-50 transition" title="새로고침">
         <i class="fas fa-sync-alt"></i>
       </button>
       <a href="/logout" class="p-2 text-red-400 hover:text-red-600 rounded-full hover:bg-red-50 transition" title="로그아웃">
         <i class="fas fa-sign-out-alt"></i>
       </a>
    </div>
  </header>
`