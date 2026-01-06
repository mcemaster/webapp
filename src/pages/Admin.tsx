import { html } from 'hono/html'
import { AdminSidebar } from '../components/admin/layout/AdminSidebar'
import { AdminHeader } from '../components/admin/layout/AdminHeader'
import { AdminOverview } from '../components/admin/dashboard/Overview'
import { DataTable } from '../components/admin/tables/DataTable'

export const Admin = (props: { user: any, tab?: string }) => {
  const activeTab = props.tab || 'overview';
  
  return html`
    <!DOCTYPE html>
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>관리자 - 경영인증평가원 (FINAL)</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <style>
          .fade-in { animation: fadeIn 0.5s ease-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        </style>
      </head>
      <body class="bg-slate-50 font-sans antialiased text-slate-800">
        <div class="min-h-screen flex">
          
          <${AdminSidebar} activeTab="${activeTab}" />

          <main class="flex-1 md:ml-64 p-8">
            <${AdminHeader} user="${props.user}" title="${
              activeTab === 'overview' ? '통합 대시보드' :
              activeTab === 'companies' ? '기업 DB 관리' :
              activeTab === 'grants' ? '지원사업 공고 관리' :
              activeTab === 'logs' ? 'AI 분석 이력' :
              activeTab === 'partners' ? '파트너 승인 관리' :
              '시스템 설정'
            }" />

            <div class="fade-in">
              ${activeTab === 'overview' ? AdminOverview() : ''}
              
              ${activeTab === 'companies' ? DataTable({ title: '수집된 기업 데이터', id: 'company-list', headers: ['기업명', '대표자', '매출액', '수집경로'] }) : ''}
              
              ${activeTab === 'grants' ? DataTable({ title: '정부지원사업 공고', id: 'grant-list', headers: ['공고명', '전담기관', '마감일'] }) : ''}
              
              ${activeTab === 'logs' ? DataTable({ title: 'AI 정밀 진단 이력', id: 'log-list', headers: ['분석일시', '사용자ID', '매칭점수', 'AI 종합의견'] }) : ''}
              
              ${activeTab === 'partners' ? DataTable({ title: '가입 승인 대기', id: 'partner-list', headers: ['기업명', '대표자', '신청일', '상태', '관리'] }) : ''}

              ${activeTab === 'settings' ? html`
                <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
                  <div class="flex justify-between items-center border-b border-slate-50 pb-6">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center font-bold mr-3">D</div>
                      <div><h4 class="font-bold">DART 연동 설정</h4><p class="text-xs text-slate-500">API 키 설정 및 연결 테스트</p></div>
                    </div>
                    <button onclick="testDartConnection()" class="bg-slate-800 text-white px-4 py-2 rounded text-xs font-bold hover:bg-slate-900 transition">연동 테스트</button>
                  </div>
                  <div id="dart-status" class="bg-slate-50 p-3 rounded text-xs text-slate-500 font-mono">Status: Ready</div>
                  
                  <div class="flex justify-between items-center pt-2">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-lg flex items-center justify-center font-bold mr-3"><i class="fas fa-rocket"></i></div>
                      <div><h4 class="font-bold">시스템 배포</h4><p class="text-xs text-slate-500">최신 코드 반영</p></div>
                    </div>
                    <button onclick="triggerDeploy()" class="bg-indigo-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-indigo-700 transition">배포 시작</button>
                  </div>
                </div>
              ` : ''}
            </div>
          </main>
        </div>
        
        <script src="/static/js/core.js"></script>
        <script src="/static/js/admin_final.js"></script>
        <script>{`
          async function testDartConnection() {
            const el = document.getElementById('dart-status');
            el.innerHTML = '<span class="text-blue-500">Connecting...</span>';
            try {
              const res = await fetch('/api/dart/test');
              const json = await res.json();
              el.innerHTML = json.success ? '<span class="text-green-600 font-bold">✅ Success: ' + json.company + '</span>' : '<span class="text-red-500">❌ Failed: ' + json.message + '</span>';
            } catch(e) { el.innerHTML = '<span class="text-red-500">Error</span>'; }
          }
          async function triggerDeploy() {
            if(confirm('배포하시겠습니까?')) {
              await fetch('/api/admin/deploy', { method: 'POST' });
              alert('요청 전송됨');
            }
          }
        `}</script>
      </body>
    </html>
  `
}
