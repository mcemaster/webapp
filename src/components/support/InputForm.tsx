import { html } from 'hono/html'

export const InputForm = () => html`
  <div id="wizard-container" class="min-h-screen bg-slate-50 pb-24">
    
    {/* Header */}
    <div class="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div class="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 class="font-bold text-slate-800 flex items-center">
          <i class="fas fa-robot text-blue-600 mr-2"></i> AI 기업 정밀 진단
        </h1>
        <div class="text-xs font-bold text-slate-400">
          Step <span id="current-step-num" class="text-blue-600 text-lg">1</span> / 5
        </div>
      </div>
      {/* Progress Bar */}
      <div class="w-full bg-slate-100 h-1">
        <div id="progress-bar" class="bg-blue-600 h-1 transition-all duration-500" style="width: 20%"></div>
      </div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-10">
      <form id="diagnosis-form" onsubmit="return false;">
        
        {/* STEP 1: Identification */}
        <div id="step-1" class="step-content">
          <div class="text-center mb-10">
            <h2 class="text-2xl font-extrabold text-slate-900 mb-2">어떤 기업을 분석할까요?</h2>
            <p class="text-slate-500">기업명을 검색하면 DART 재무정보를 자동으로 불러옵니다.</p>
          </div>
          
          <div class="relative max-w-xl mx-auto">
            <input type="text" id="company-search" placeholder="기업명 입력 (예: 삼성전자)" 
              class="w-full pl-6 pr-14 py-4 rounded-2xl border-2 border-slate-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-50 outline-none text-lg font-bold shadow-lg transition-all" autocomplete="off" />
            <button id="btn-search-manual" class="absolute right-3 top-3 p-2 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-500">
              <i class="fas fa-search"></i>
            </button>
            
            {/* Autocomplete List */}
            <div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 mt-2 overflow-hidden hidden z-50 text-left"></div>
          </div>

          <div class="mt-8 flex justify-center gap-4 text-xs font-bold text-slate-400">
            <span class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-1"></i> DART 재무</span>
            <span class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-1"></i> 고용정보</span>
            <span class="flex items-center"><i class="fas fa-check-circle text-green-500 mr-1"></i> 특허정보</span>
          </div>
        </div>

        {/* STEP 2: Basic Info */}
        <div id="step-2" class="step-content hidden">
          <h2 class="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">기본 정보 확인</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label class="form-label">기업명</label><input type="text" id="basic-name" class="form-input bg-slate-50" readonly /></div>
            <div><label class="form-label">대표자</label><input type="text" id="basic-ceo" class="form-input" /></div>
            <div><label class="form-label">설립일</label><input type="text" id="basic-est" class="form-input" placeholder="YYYYMMDD" /></div>
            <div><label class="form-label">사업자번호</label><input type="text" id="basic-bizno" class="form-input" placeholder="000-00-00000" /></div>
            <div class="md:col-span-2"><label class="form-label">주소</label><input type="text" id="basic-addr" class="form-input" /></div>
            <div class="md:col-span-2"><label class="form-label">주요 업종</label><input type="text" id="basic-industry" class="form-input" /></div>
          </div>
        </div>

        {/* STEP 3: Financials */}
        <div id="step-3" class="step-content hidden">
          <h2 class="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">재무 현황 (최근 결산)</h2>
          <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
            <p class="text-sm text-blue-800 font-bold mb-2"><i class="fas fa-info-circle mr-2"></i> DART 데이터가 자동 입력되었습니다.</p>
            <p class="text-xs text-blue-600">수정이 필요하면 직접 변경해주세요. (단위: 백만원)</p>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <div><label class="form-label">매출액</label><input type="number" id="fin-rev-2024" class="form-input text-right font-bold" /></div>
            <div><label class="form-label">영업이익</label><input type="number" id="fin-prof-2024" class="form-input text-right" /></div>
            <div><label class="form-label">자본금</label><input type="number" id="form-capital" class="form-input text-right" /></div>
            <div><label class="form-label">부채비율(%)</label><input type="number" id="form-debt" class="form-input text-right" /></div>
            <div><label class="form-label">수출액 (USD)</label><input type="number" id="form-export" class="form-input text-right" placeholder="0" /></div>
            <div><label class="form-label">R&D 투자액</label><input type="number" id="form-rnd" class="form-input text-right" placeholder="0" /></div>
          </div>
        </div>

        {/* STEP 4: Tech & HR */}
        <div id="step-4" class="step-content hidden">
          <h2 class="text-xl font-bold text-slate-900 mb-6 border-b border-slate-200 pb-4">기술 및 인력 보유</h2>
          
          <div class="mb-8">
            <label class="form-label mb-3">인력 구성 (명)</label>
            <div class="grid grid-cols-3 gap-4">
              <div><span class="text-xs text-slate-500 block mb-1">전체 직원</span><input type="number" id="hr-total" class="form-input" /></div>
              <div><span class="text-xs text-slate-500 block mb-1">연구 전담</span><input type="number" id="hr-rnd-cnt" class="form-input" placeholder="0" /></div>
              <div><span class="text-xs text-slate-500 block mb-1">청년 고용</span><input type="number" id="hr-youth" class="form-input" placeholder="0" /></div>
            </div>
          </div>

          <div>
            <label class="form-label mb-3">보유 인증 및 지재권 (선택)</label>
            <div class="grid grid-cols-2 gap-3">
              ${['벤처기업','이노비즈','메인비즈','기업부설연구소','ISO인증','특허보유','녹색인증','여성기업'].map(c => 
                `<label class="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition">
                  <input type="checkbox" name="certs" value="${c}" class="rounded text-blue-600 focus:ring-blue-500 mr-3" />
                  <span class="text-sm font-bold text-slate-700">${c}</span>
                </label>`
              ).join('')}
            </div>
          </div>
        </div>

        {/* STEP 5: Docs & Analyze */}
        <div id="step-5" class="step-content hidden">
          <div class="text-center mb-10">
            <div class="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-file-alt text-3xl"></i>
            </div>
            <h2 class="text-2xl font-extrabold text-slate-900 mb-2">마지막 단계입니다!</h2>
            <p class="text-slate-500">사업계획서나 회사소개서를 첨부하면 AI 분석 정확도가 200% 향상됩니다.</p>
          </div>

          <div class="bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-2xl p-10 text-center hover:bg-indigo-50 transition cursor-pointer relative mb-8">
            <input type="file" id="file-input" class="absolute inset-0 opacity-0 cursor-pointer" multiple />
            <i class="fas fa-cloud-upload-alt text-4xl text-indigo-400 mb-4"></i>
            <p class="font-bold text-indigo-900 text-lg">파일을 드래그하거나 클릭하여 업로드</p>
            <p class="text-sm text-indigo-400 mt-2">PDF, HWP, DOCX, PPTX (최대 50MB)</p>
            <div id="file-list" class="mt-4 text-left space-y-2"></div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200">
            <label class="form-label mb-2">핵심 사업 내용 (요약)</label>
            <textarea id="desc-tech" class="form-textarea h-32" placeholder="우리 회사의 핵심 기술과 사업화 목표를 간단히 적어주세요."></textarea>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div class="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-4 z-50">
          <div class="max-w-3xl mx-auto flex justify-between">
            <button type="button" id="btn-prev" class="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hidden">
              이전
            </button>
            <button type="button" id="btn-next" class="px-10 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
              다음 단계 <i class="fas fa-arrow-right ml-2"></i>
            </button>
            <button type="button" id="btn-submit" class="px-10 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold shadow-lg transition transform active:scale-95 hidden">
              AI 분석 시작 <i class="fas fa-magic ml-2"></i>
            </button>
          </div>
        </div>

      </form>
    </div>

    <style>
      .form-label { display: block; font-size: 0.75rem; font-weight: 800; color: #64748b; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em; }
      .form-input { width: 100%; padding: 0.875rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.75rem; font-weight: 600; color: #1e293b; transition: all; }
      .form-input:focus { border-color: #2563eb; outline: none; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
      .form-textarea { width: 100%; padding: 0.875rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.75rem; font-size: 0.875rem; resize: none; transition: all; }
      .form-textarea:focus { border-color: #2563eb; outline: none; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1); }
    </style>
  </div>
`
