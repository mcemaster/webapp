import { html } from 'hono/html'

export const AdminSidebar = (props: { activeTab: string }) => {
  const { activeTab } = props;
  
  const menuItem = (tab: string, icon: string, label: string) => html`
    <a href="/admin?tab=${tab}" class="flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-colors ${activeTab === tab ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'}">
      <i class="fas fa-${icon} w-5 text-center mr-2"></i> ${label}
    </a>
  `;

  return html`
    <aside class="w-64 bg-white border-r border-slate-200 fixed h-full z-20 hidden md:flex flex-col">
      <div class="p-6 border-b border-slate-100 flex items-center justify-center">
         <img src="/static/logo-horizontal.png" alt="Logo" class="h-8" />
      </div>
      
      <div class="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</p>
          ${menuItem('overview', 'chart-pie', '대시보드')}
        </div>

        <div>
          <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Center</p>
          <div class="space-y-1">
            ${menuItem('companies', 'building', '기업 DB 관리')}
            ${menuItem('grants', 'bullhorn', '지원사업 공고')}
            ${menuItem('logs', 'history', 'AI 분석 내역')}
          </div>
        </div>

        <div>
          <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Management</p>
          <div class="space-y-1">
            ${menuItem('partners', 'handshake', '파트너 승인')}
            ${menuItem('rfq', 'paper-plane', '공급사 매칭/발송')}
            ${menuItem('users', 'users', '전체 회원 관리')}
          </div>
        </div>

        <div>
          <p class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Configuration</p>
          <div class="space-y-1">
            ${menuItem('settings', 'cog', '시스템 설정')}
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-slate-100">
        <a href="/" class="flex items-center justify-center w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-bold transition-colors">
          <i class="fas fa-external-link-alt mr-2"></i> 사용자 페이지로 이동
        </a>
      </div>
    </aside>
  `
}