import { html } from 'hono/html'

export const InputForm = () => html`
  <div id="view-input" class="min-h-screen bg-slate-50 pb-24">
    {/* Hero Header */}
    <div class="bg-slate-900 text-white pt-24 pb-40 relative overflow-hidden">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10 text-center">
        <span class="text-blue-400 font-bold tracking-widest text-xs uppercase mb-3 block">Premium Service</span>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">기업 정밀 진단 & 지원사업 매칭</h1>
        <p class="text-slate-400 text-lg max-w-3xl mx-auto">
          정량 데이터와 사업계획서를 AI가 분석하여 <span class="text-white font-bold">합격 가능성 높은 Top 20</span> 공고를 찾아냅니다.
        </p>
      </div>
    </div>

    {/* Main Form */}
    <div class="max-w-6xl mx-auto px-4 -mt-24 relative z-20">
      <div class="bg-white rounded-2xl shadow-xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4 border border-blue-100">
        <div class="relative w-full">
          <label class="block text-xs font-bold text-slate-500 mb-1 ml-1">기업 데이터 자동 불러오기</label>
          <div class="relative">
            <input type="text" id="company-search" placeholder="기업명 검색 (예: 삼성전자)" class="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none transition text-lg font-bold" autocomplete="off" />
            <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-xl"></i>
          </div>
          <div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 mt-2 overflow-hidden hidden z-50"></div>
        </div>
        <button onclick="resetForm()" class="w-full md:w-auto px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition flex items-center justify-center whitespace-nowrap"><i class="fas fa-undo-alt mr-2"></i> 초기화</button>
      </div>

      <form id="diagnosis-form" onsubmit="return false;" class="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div class="space-y-8">
            {/* Section 1 */}
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 class="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">🏢 기업 기본 정보</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2"><label class="form-label">기업명</label><input type="text" id="basic-name" class="form-input" /></div>
                <div><label class="form-label">대표자</label><input type="text" id="basic-ceo" class="form-input" /></div>
                <div><label class="form-label">설립일</label><input type="text" id="basic-est" class="form-input" /></div>
                <div class="col-span-2"><label class="form-label">업종</label><input type="text" id="basic-industry" class="form-input" /></div>
                <div class="col-span-2"><label class="form-label">주소</label><input type="text" id="basic-addr" class="form-input" /></div>
              </div>
            </div>
            {/* Section 2 */}
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 class="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">💰 재무 현황</h3>
              <div class="grid grid-cols-2 gap-4">
                <div><label class="form-label">매출액</label><input type="number" id="fin-rev-2024" class="form-input text-right" placeholder="0" /></div>
                <div><label class="form-label">영업이익</label><input type="number" id="fin-prof-2024" class="form-input text-right" placeholder="0" /></div>
                <div><label class="form-label">자본금</label><input type="number" id="form-capital" class="form-input text-right" placeholder="0" /></div>
                <div><label class="form-label">부채비율</label><input type="number" id="form-debt" class="form-input text-right" placeholder="0" /></div>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            {/* Section 3 */}
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h3 class="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">👥 인력 및 인증</h3>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div><label class="form-label">직원수</label><input type="number" id="hr-total" class="form-input" /></div>
                <div><label class="form-label">연구원</label><input type="number" id="hr-rnd" class="form-input" /></div>
              </div>
              <label class="form-label mb-2">보유 인증</label>
              <div class="grid grid-cols-2 gap-2">
                ${['벤처기업','이노비즈','연구소','ISO','특허'].map(c => `<label class="flex items-center p-2 bg-white border rounded cursor-pointer"><input type="checkbox" name="certs" value="${c}" class="mr-2" /> <span class="text-xs">${c}</span></label>`).join('')}
              </div>
            </div>
            
            {/* Section 4: File Upload */}
            <div class="bg-indigo-50/50 p-6 rounded-2xl border-2 border-dashed border-indigo-200 text-center hover:bg-indigo-50 transition group cursor-pointer relative">
              <input type="file" id="file-input" class="absolute inset-0 opacity-0 cursor-pointer" multiple />
              <i class="fas fa-cloud-upload-alt text-3xl text-indigo-400 mb-2 group-hover:scale-110 transition"></i>
              <h4 class="font-bold text-indigo-900">사업계획서/소개서 첨부</h4>
              <p class="text-xs text-indigo-400 mb-2">AI가 문서를 분석하여 매칭 정확도를 높입니다.</p>
              <div id="file-list" class="text-left space-y-1 mt-2"></div>
            </div>

            <div>
              <label class="form-label">핵심 기술 및 사업 내용</label>
              <textarea id="desc-tech" class="form-textarea h-32" placeholder="보유 기술과 사업화 계획을 입력하세요."></textarea>
            </div>
          </div>

        </div>

        <div class="mt-10 pt-8 border-t border-slate-100 text-center sticky bottom-0 bg-white p-4 z-30 shadow-inner -mx-8 -mb-12 rounded-b-2xl">
          <button id="btn-start-analyze" class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-12 py-4 rounded-xl font-extrabold text-lg shadow-lg transform transition hover:scale-105">
            AI 종합 정밀 진단 시작 <i class="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </form>
    </div>
  </div>
`
