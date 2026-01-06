import { html } from 'hono/html'

export const AdminOverview = () => html`
  <div class="space-y-6 animate-fade-in-up">
    {/* Action Center */}
    <div id="action-center" class="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white flex items-center justify-between hidden">
      <div class="flex items-center space-x-4">
        <div class="p-3 bg-white/20 rounded-xl backdrop-blur-sm animate-pulse">
          <i class="fas fa-bell text-2xl"></i>
        </div>
        <div>
          <h3 class="text-lg font-bold">확인 필요한 업무가 있습니다!</h3>
          <p class="text-indigo-100 text-sm">파트너 승인 대기 및 신규 견적 요청을 확인하세요.</p>
        </div>
      </div>
      <div class="flex space-x-3">
        <a href="/admin?tab=partners" class="px-4 py-2 bg-white text-indigo-700 rounded-lg font-bold text-sm flex items-center hover:bg-indigo-50 transition">
          승인 대기 <span class="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full" id="count-pending-partners">0</span>
        </a>
      </div>
    </div>

    {/* Stats Cards */}
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-blue-200 transition">
          <p class="text-xs font-bold text-slate-400 uppercase">총 회원 수</p>
          <h3 id="stat-total-users" class="text-3xl font-extrabold text-slate-800 mt-2 group-hover:text-blue-600 transition">-</h3>
       </div>
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-indigo-200 transition">
          <p class="text-xs font-bold text-slate-400 uppercase">AI 분석 횟수</p>
          <h3 id="stat-ai-usage" class="text-3xl font-extrabold text-indigo-600 mt-2">-</h3>
       </div>
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-emerald-200 transition">
          <p class="text-xs font-bold text-slate-400 uppercase">수집된 공고</p>
          <h3 id="stat-crawler-usage" class="text-3xl font-extrabold text-emerald-600 mt-2">-</h3>
       </div>
       <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:border-orange-200 transition">
          <p class="text-xs font-bold text-slate-400 uppercase">파트너 신청</p>
          <h3 class="text-3xl font-extrabold text-orange-500 mt-2" id="stat-pending">0</h3>
       </div>
    </div>

    {/* Charts */}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="font-bold text-lg text-slate-800 mb-4">주간 성장 지표</h3>
        <div class="h-64 relative"><canvas id="growthChart"></canvas></div>
      </div>
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 class="font-bold text-lg text-slate-800 mb-4">AI 서비스 활용도</h3>
        <div class="h-64 relative"><canvas id="aiChart"></canvas></div>
      </div>
    </div>
  </div>
`