import { Layout } from '../components/Layout'

interface LegalProps {
  user?: any;
  tab?: string;
}

export const Legal = (props: LegalProps) => {
  const { user, tab = 'service' } = props;

  const activeClass = "border-blue-600 text-blue-600 font-bold bg-blue-50";
  const inactiveClass = "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300";

  return (
    <Layout user={user} page="legal">
      <div class="bg-slate-50 min-h-screen py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-slate-900">약관 및 정책</h1>
            <p class="mt-2 text-slate-600">경영인증평가원 서비스 이용을 위한 법적 고지 사항입니다.</p>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div class="flex border-b border-slate-200 overflow-x-auto">
              <a href="/legal?tab=service" class={`flex-1 py-4 px-6 text-center border-b-2 text-sm transition-colors whitespace-nowrap ${tab === 'service' ? activeClass : inactiveClass}`}>
                서비스 이용약관
              </a>
              <a href="/legal?tab=privacy" class={`flex-1 py-4 px-6 text-center border-b-2 text-sm transition-colors whitespace-nowrap ${tab === 'privacy' ? activeClass : inactiveClass}`}>
                개인정보처리방침
              </a>
              <a href="/legal?tab=marketing" class={`flex-1 py-4 px-6 text-center border-b-2 text-sm transition-colors whitespace-nowrap ${tab === 'marketing' ? activeClass : inactiveClass}`}>
                마케팅 정보 수신 동의
              </a>
            </div>

            {/* Content Area - Dynamic Loading from DB */}
            <div class="p-8 text-sm text-slate-700 leading-relaxed min-h-[600px]" id="terms-content">
              <div class="text-center py-10">
                <i class="fas fa-spinner fa-spin text-2xl text-slate-400 mb-4"></i>
                <p class="text-slate-500">약관을 불러오는 중...</p>
              </div>
            </div>
          </div>
          
          {/* Dynamic Terms Loading Script */}
          <script dangerouslySetInnerHTML={{
            __html: `
              (async function loadTerms() {
                const tab = '${tab}';
                const contentEl = document.getElementById('terms-content');
                if (!contentEl) return;
                
                try {
                  const res = await fetch('/api/terms/' + tab);
                  if (!res.ok) throw new Error('약관을 불러올 수 없습니다.');
                  
                  const data = await res.json();
                  if (!data.success || !data.term) {
                    contentEl.innerHTML = '<div class="text-center py-10 text-slate-500"><i class="fas fa-file-alt text-4xl mb-4 text-slate-300"></i><p>등록된 약관이 없습니다.</p></div>';
                    return;
                  }
                  
                  const term = data.term;
                  contentEl.innerHTML = 
                    '<div class="space-y-6">' +
                    '<div class="flex items-center justify-between mb-4">' +
                    '<h2 class="text-xl font-bold text-slate-900">' + term.title + '</h2>' +
                    '<span class="text-xs text-slate-400">버전 ' + term.version + ' | 최종 수정: ' + (term.updated_at ? new Date(term.updated_at).toLocaleDateString('ko-KR') : '-') + '</span>' +
                    '</div>' +
                    '<div class="prose prose-sm max-w-none">' + term.content + '</div>' +
                    '</div>';
                    
                } catch(e) {
                  console.log('Terms load error:', e);
                  // Fallback to static content
                  contentEl.innerHTML = '<div class="text-center py-10 text-slate-500"><i class="fas fa-exclamation-triangle text-4xl mb-4 text-amber-400"></i><p>약관을 불러오는 중 오류가 발생했습니다.</p><p class="text-xs mt-2">잠시 후 다시 시도해주세요.</p></div>';
                }
              })();
            `
          }} />
        </div>
      </div>
    </Layout>
  )
}
