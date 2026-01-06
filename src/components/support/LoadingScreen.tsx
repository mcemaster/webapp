import { html } from 'hono/html'

export const LoadingScreen = () => html`
  <div id="view-loading" class="fixed inset-0 bg-slate-950 z-50 hidden flex-col items-center justify-center text-white">
    <div class="w-full max-w-lg px-8">
      <div class="flex justify-between items-end mb-4">
        <h2 class="text-2xl font-bold flex items-center"><i class="fas fa-brain mr-3 text-indigo-500 animate-pulse"></i> AI Analyzing...</h2>
        <span class="text-blue-400 font-mono" id="loading-percent">0%</span>
      </div>
      <div class="w-full bg-slate-800 h-2 rounded-full mb-10 overflow-hidden">
        <div id="loading-bar" class="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-0 transition-all duration-300"></div>
      </div>
      
      <div class="space-y-3">
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 transition-all" id="step-1">
          <i class="fas fa-circle-notch fa-spin mr-3 text-blue-500"></i> 재무 건전성 및 성장률 분석
        </div>
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50 transition-all" id="step-2">
          <i class="far fa-circle mr-3"></i> <strong>첨부 문서(사업계획서) 자연어 처리(NLP)</strong>
        </div>
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50 transition-all" id="step-3">
          <i class="far fa-circle mr-3"></i> 2026년 공고 DB (3,500건) 대조
        </div>
        <div class="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center text-sm text-slate-400 opacity-50 transition-all" id="step-4">
          <i class="far fa-circle mr-3"></i> 최적 지원사업 Top 20 선정
        </div>
      </div>
    </div>
  </div>
`
