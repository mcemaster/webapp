import { html } from 'hono/html'

export const Dashboard = (props: { user: any }) => {
  return html`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>마이 대시보드 - MCE</title>
      <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
      <script>
        tailwind.config = {
          theme: {
            extend: {}
          }
        }
      </script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
      <!-- Chart.js for Visualization -->
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <style>
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        * { font-family: Pretendard, sans-serif; }
      </style>
    </head>
    <body class="bg-slate-50">
      <!-- Header -->
      <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex">
              <div class="flex-shrink-0 flex items-center">
                <a href="/" class="flex items-center">
                  <img src="/static/logo-horizontal.png" alt="MCE" class="h-8 w-auto" />
                </a>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-600">${props.user?.name || '게스트'}님 환영합니다</span>
              <a href="/auth/logout" class="text-sm text-gray-500 hover:text-gray-900">로그아웃</a>
            </div>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <!-- Welcome Section -->
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-gray-900">마이 대시보드</h1>
          <p class="text-gray-600 mt-1">기업 분석 이력과 추천 지원사업을 한눈에 확인하세요.</p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">이번 달 분석 횟수</h3>
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i class="fas fa-chart-line"></i>
              </div>
            </div>
            <p class="text-3xl font-bold text-gray-900" id="stat-count">-</p>
            <p class="text-xs text-gray-500 mt-2">무료 이용 한도: 월 20회</p>
          </div>
          
          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">최근 추천 사업</h3>
              <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <i class="fas fa-thumbs-up"></i>
              </div>
            </div>
            <p class="text-lg font-bold text-gray-900 truncate" id="stat-latest">-</p>
            <p class="text-xs text-gray-500 mt-2">가장 최근 분석 결과</p>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-500">기업 인증 상태</h3>
              <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <i class="fas fa-certificate"></i>
              </div>
            </div>
            <p class="text-lg font-bold text-gray-900" id="stat-cert">인증 필요</p>
            <p class="text-xs text-gray-500 mt-2"><a href="/services/certification" class="text-purple-600 hover:underline">인증 신청하기 &rarr;</a></p>
          </div>
        </div>

        <!-- Recent Analysis History -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 class="text-lg font-bold text-gray-900">최근 분석 이력</h2>
            <a href="/support-matching" class="text-sm text-blue-600 hover:text-blue-800 font-medium">+ 새 분석 시작하기</a>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">분석 일시</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">추천 사업명</th>
                  <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">매칭 점수</th>
                  <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200" id="history-list">
                <!-- JS will populate this -->
                <tr>
                  <td colspan="4" class="px-6 py-10 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <i class="fas fa-spinner fa-spin mb-2"></i>
                      데이터를 불러오는 중입니다...
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <!-- Detail Modal -->
      <div id="detail-modal" class="fixed inset-0 bg-black bg-opacity-50 z-[100] hidden flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all">
          <div class="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
            <div>
              <span class="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded mb-1" id="modal-agency">전담기관</span>
              <h2 class="text-xl font-bold text-gray-900" id="modal-title">사업명</h2>
            </div>
            <button onclick="document.getElementById('detail-modal').classList.add('hidden')" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Left: Radar Chart -->
            <div>
              <h3 class="text-sm font-bold text-gray-500 mb-4 uppercase">매칭 적합성 분석</h3>
              <div class="bg-slate-50 p-4 rounded-xl aspect-square relative">
                <canvas id="modal-chart"></canvas>
              </div>
              <div class="mt-4 text-center">
                 <p class="text-3xl font-bold text-blue-600" id="modal-score">0%</p>
                 <p class="text-sm text-gray-500">종합 매칭률</p>
              </div>
            </div>

            <!-- Right: Details -->
            <div>
              <h3 class="text-sm font-bold text-gray-500 mb-4 uppercase">AI 컨설턴트 의견</h3>
              <div class="bg-blue-50 p-5 rounded-xl border border-blue-100 mb-6">
                <div class="flex items-start">
                   <i class="fas fa-quote-left text-blue-300 mr-3 mt-1"></i>
                   <p class="text-slate-700 text-sm leading-relaxed" id="modal-reason">분석 내용...</p>
                </div>
              </div>

              <h3 class="text-sm font-bold text-gray-500 mb-2 uppercase">전략 제언</h3>
              <ul class="space-y-2 mb-6" id="modal-strategies">
                 <!-- List -->
              </ul>

              <div class="flex space-x-3 mt-8">
                <a href="#" target="_blank" id="modal-link" class="flex-1 bg-slate-900 text-white text-center py-3 rounded-xl font-bold hover:bg-slate-800 transition">
                   <i class="fas fa-external-link-alt mr-2"></i>공고 확인
                </a>
                <button onclick="downloadPDF()" class="flex-1 border border-slate-300 text-slate-700 text-center py-3 rounded-xl font-bold hover:bg-slate-50 transition">
                   <i class="fas fa-file-pdf mr-2"></i>리포트 저장
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script src="/static/js/dashboard.js"></script>
    </body>
    </html>
  `
}
