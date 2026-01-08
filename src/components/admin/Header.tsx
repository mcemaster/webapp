import { html } from 'hono/html'

export const Header = (props: { title: string; description?: string }) => {
  const { title, description } = props;
  
  return html`
    <div class="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div class="px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-slate-800">${title}</h1>
            ${description ? html`<p class="text-sm text-slate-500 mt-1">${description}</p>` : ''}
          </div>
          <div class="flex items-center space-x-3">
            <button id="refresh-btn" class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <i class="fas fa-sync-alt mr-2"></i>새로고침
            </button>
            <a href="/" class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
              <i class="fas fa-home mr-2"></i>홈으로
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}
