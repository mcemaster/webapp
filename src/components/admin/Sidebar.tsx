import { html } from 'hono/html'

export const Sidebar = (props: { activeTab: string; userName: string }) => {
  const { activeTab, userName } = props;
  
  const menuClass = (tab: string) => activeTab === tab 
    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
    : 'text-slate-600 hover:bg-slate-50 border-l-4 border-transparent';

  return html`
    <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-30 hidden lg:flex flex-col shadow-sm">
      <!-- Logo -->
      <div class="h-16 flex items-center justify-center border-b border-slate-100 bg-slate-50">
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">M</span>
          </div>
          <span class="font-bold text-slate-800">MCE Admin</span>
        </a>
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1 sidebar-scroll overflow-y-auto">
        <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">대시보드</p>
        <a href="/admin?tab=overview" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('overview')}">
          <i class="fas fa-chart-pie w-5 mr-3 text-center"></i> 통합 현황
        </a>
        
        <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">데이터 관리</p>
        <a href="/admin?tab=collector" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('collector')}">
          <i class="fas fa-download w-5 mr-3 text-center"></i> 기업 데이터 수집
        </a>
        <a href="/admin?tab=companies" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('companies')}">
          <i class="fas fa-building w-5 mr-3 text-center"></i> 기업 DB
        </a>
        <a href="/admin?tab=grants" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('grants')}">
          <i class="fas fa-bullhorn w-5 mr-3 text-center"></i> 지원사업 공고
        </a>
        <a href="/admin?tab=logs" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('logs')}">
          <i class="fas fa-robot w-5 mr-3 text-center"></i> AI 분석 이력
        </a>
        
        <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">운영 관리</p>
        <a href="/admin?tab=partners" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('partners')}">
          <i class="fas fa-handshake w-5 mr-3 text-center"></i> 파트너 승인
        </a>
        <a href="/admin?tab=users" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('users')}">
          <i class="fas fa-users w-5 mr-3 text-center"></i> 회원 관리
        </a>
        
        <p class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-4">설정</p>
        <a href="/admin?tab=settings" class="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${menuClass('settings')}">
          <i class="fas fa-cog w-5 mr-3 text-center"></i> 시스템 설정
        </a>
      </nav>
      
      <!-- User & Logout -->
      <div class="p-4 border-t border-slate-100 bg-slate-50">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fas fa-user text-blue-600 text-sm"></i>
            </div>
            <div class="ml-3">
              <p class="text-sm font-semibold text-slate-700">${userName}</p>
              <p class="text-xs text-slate-500">관리자</p>
            </div>
          </div>
          <a href="/auth/logout" class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition" title="로그아웃">
            <i class="fas fa-sign-out-alt"></i>
          </a>
        </div>
      </div>
    </aside>
  `;
}
