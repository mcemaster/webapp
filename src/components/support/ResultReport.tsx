import { html } from 'hono/html'

export const ResultReport = () => html`
  <div id="view-result" class="min-h-screen bg-slate-100 hidden pb-20">
    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center">
        <div class="flex items-center">
          <button onclick="location.reload()" class="text-slate-400 hover:text-slate-600 mr-4"><i class="fas fa-arrow-left"></i></button>
          <h1 class="text-xl font-bold text-slate-800">AI 정밀 진단 리포트</h1>
        </div>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700"><i class="fas fa-file-pdf mr-2"></i> PDF 저장</button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-10">
      <div class="bg-slate-900 text-white rounded-3xl p-10 mb-10 shadow-2xl relative overflow-hidden">
        <div class="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-900/50 to-transparent"></div>
        <div class="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 class="text-3xl font-extrabold mb-2">분석 결과: <span class="text-blue-400">최우수 (S등급)</span></h2>
            <p class="text-slate-300 max-w-xl leading-relaxed">
              귀사의 <strong>성장 잠재력</strong>과 <strong>기술 역량</strong>이 우수하여 기술개발(R&D) 및 사업화 자금 확보 가능성이 매우 높습니다.
            </p>
          </div>
          <div class="text-center bg-white/10 backdrop-blur p-6 rounded-2xl border border-white/10">
            <div class="text-xs text-slate-300 uppercase font-bold mb-1">매칭된 사업</div>
            <div class="text-5xl font-extrabold text-white">20<span class="text-2xl ml-1 text-blue-400">건</span></div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6" id="results-list">
        {/* Results injected by JS */}
      </div>
    </div>
  </div>
`
