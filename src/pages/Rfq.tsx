import { Layout } from '../components/Layout'

export const Rfq = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-slate-50 min-h-screen py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-slate-900 mb-4">ISO/IAF 기준 맞춤 공급사 찾기</h1>
            <p class="text-slate-600 mb-6">
              상세한 스펙을 입력할수록 귀사의 요구사항을 100% 충족하는<br/>
              <strong>검증된 파트너(Verified Partner)</strong>를 매칭받을 확률이 높아집니다.
            </p>
            
            {/* AI Smart Search */}
            <div class="max-w-3xl mx-auto mb-8">
              <div class="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border border-indigo-200">
                <div class="flex items-center justify-center mb-4">
                  <div class="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                    <i class="fas fa-robot text-white text-xl"></i>
                  </div>
                  <h3 class="text-xl font-bold text-indigo-900">AI 스마트 공급사 검색</h3>
                </div>
                <p class="text-sm text-indigo-700 mb-4 text-center">원하는 제품이나 서비스를 설명해주세요. AI가 최적의 공급업체를 찾아드립니다.</p>
                
                <div class="relative">
                  <textarea 
                    id="ai-search-input" 
                    placeholder="예: 자동차 부품용 알루미늄 CNC 가공 업체를 찾고 있습니다. ISO 9001 인증이 필요하고, 월 1000개 생산 가능한 곳이어야 합니다."
                    class="w-full px-4 py-3 pr-24 rounded-xl border-2 border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none resize-none h-24 text-sm"
                  ></textarea>
                  <button 
                    type="button" 
                    id="btn-ai-search"
                    class="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all transform hover:scale-105 shadow-lg"
                  >
                    <i class="fas fa-search mr-2"></i>AI 검색
                  </button>
                </div>
                
                <div id="ai-search-result" class="hidden mt-4 p-4 bg-white rounded-xl border border-indigo-200">
                  <div class="flex items-start mb-2">
                    <i class="fas fa-lightbulb text-yellow-500 mr-2 mt-1"></i>
                    <div class="flex-1">
                      <h4 class="font-bold text-slate-800 mb-2">AI 분석 결과</h4>
                      <div id="ai-analysis-text" class="text-sm text-slate-600 mb-3"></div>
                      <div id="ai-suggested-companies" class="space-y-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
            
            {/* Left Column: RFQ Form */}
            <div class="lg:col-span-2">
              <form id="rfqForm" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                
                {/* Step 1: Industry Sector (IAF Code) - Multi Select */}
                <div class="p-8 border-b border-slate-100">
                  <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    제조 분야 선택 (IAF Code) <span class="text-xs text-slate-400 font-normal ml-2">* 중복 선택 가능</span>
                  </h2>
                  
                  {/* Hidden Input for Form Submission (Comma separated) */}
                  <input type="hidden" name="iaf_code" id="iaf_code_input" required />
                  
                  {/* Selected IAF Codes Display */}
                  <div id="selected-iaf-display" class="hidden mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h4 class="text-sm font-bold text-blue-900 mb-2 flex items-center">
                      <i class="fas fa-check-circle mr-2"></i>선택된 산업 분야
                    </h4>
                    <div id="selected-iaf-tags" class="flex flex-wrap gap-2"></div>
                  </div>

                  <div class="space-y-8" id="iaf-selector">
                    
                    {/* Category 1: Major Manufacturing */}
                    <div>
                      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                        <i class="fas fa-industry mr-2"></i>주요 제조업
                      </h3>
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative select-none" data-value="17">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 17</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">금속 / 가공제품</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon transform scale-0 duration-200"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative select-none" data-value="18">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 18</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">기계 및 장비</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon transform scale-0 duration-200"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative select-none" data-value="19">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 19</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">전기 / 광학장비</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon transform scale-0 duration-200"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative select-none" data-value="22">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 22</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">기타 운송장비</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon transform scale-0 duration-200"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative select-none" data-value="14">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 14</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">고무 / 플라스틱</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon transform scale-0 duration-200"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative select-none" data-value="29">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 29</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">도소매 / 수리</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon transform scale-0 duration-200"></i>
                        </button>
                      </div>
                    </div>

                    {/* Category 2: Raw Materials & Chemistry */}
                    <div>
                      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                        <i class="fas fa-flask mr-2"></i>원자재 및 화학
                      </h3>
                      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="04">
                          <span class="font-bold block text-blue-600">IAF 04</span> 섬유/직물
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="12">
                          <span class="font-bold block text-blue-600">IAF 12</span> 화학물질
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="13">
                          <span class="font-bold block text-blue-600">IAF 13</span> 의약품
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="15">
                          <span class="font-bold block text-blue-600">IAF 15</span> 비금속 광물
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="16">
                          <span class="font-bold block text-blue-600">IAF 16</span> 콘크리트
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="02">
                          <span class="font-bold block text-blue-600">IAF 02</span> 광업/채석
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="07">
                          <span class="font-bold block text-blue-600">IAF 07</span> 펄프/종이
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="10">
                          <span class="font-bold block text-blue-600">IAF 10</span> 정제 석유
                        </button>
                      </div>
                    </div>

                    {/* Category 3: Construction & Others */}
                    <div>
                      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                        <i class="fas fa-hard-hat mr-2"></i>건설 및 기타 제조
                      </h3>
                      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="28">
                          <span class="font-bold block text-blue-600">IAF 28</span> 건설업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="20">
                          <span class="font-bold block text-blue-600">IAF 20</span> 조선업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="21">
                          <span class="font-bold block text-blue-600">IAF 21</span> 항공우주
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="23">
                          <span class="font-bold block text-blue-600">IAF 23</span> 기타 제조
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="08">
                          <span class="font-bold block text-blue-600">IAF 08</span> 출판업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="09">
                          <span class="font-bold block text-blue-600">IAF 09</span> 인쇄업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="11">
                          <span class="font-bold block text-blue-600">IAF 11</span> 핵연료
                        </button>
                      </div>
                    </div>

                    {/* Category 4: Services */}
                    <div>
                      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                        <i class="fas fa-briefcase mr-2"></i>서비스 및 엔지니어링
                      </h3>
                      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="33">
                          <span class="font-bold block text-blue-600">IAF 33</span> 정보기술(IT)
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="34">
                          <span class="font-bold block text-blue-600">IAF 34</span> 엔지니어링
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="31">
                          <span class="font-bold block text-blue-600">IAF 31</span> 운송/물류
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="35">
                          <span class="font-bold block text-blue-600">IAF 35</span> 기타 서비스
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="25">
                          <span class="font-bold block text-blue-600">IAF 25</span> 전기 공급
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="36">
                          <span class="font-bold block text-blue-600">IAF 36</span> 공공 행정
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="37">
                          <span class="font-bold block text-blue-600">IAF 37</span> 교육
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative select-none" data-value="38">
                          <span class="font-bold block text-blue-600">IAF 38</span> 보건/사회
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Step 2: File Upload (Drag & Drop) */}
                <div class="p-8 border-b border-slate-100 bg-slate-50/30">
                  <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">2</span>
                    도면 및 요구사항 파일 업로드 (드래그 앤 드롭)
                  </h2>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    {/* Drawing Drop Zone */}
                    <div id="drop-zone-drawing" class="drop-zone border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer bg-white relative group">
                      <input type="file" id="drawing-file" name="drawing" multiple class="hidden" />
                      
                      {/* Default State */}
                      <div class="upload-placeholder pointer-events-none">
                        <div class="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <i class="fas fa-pencil-ruler text-2xl"></i>
                        </div>
                        <h3 class="text-sm font-bold text-slate-800 mb-1">도면 파일 업로드</h3>
                        <p class="text-xs text-slate-500 mb-4">여기로 파일을 끌어다 놓으세요<br/>(DWG, PDF, STEP)</p>
                        <span class="inline-block px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 group-hover:border-indigo-500 group-hover:text-indigo-600 transition-colors">
                          파일 선택
                        </span>
                      </div>

                      {/* File Selected State (Hidden initially) */}
                      <div class="file-info hidden flex-col items-center justify-center animate-fade-in-up">
                        <div class="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-2">
                          <i class="fas fa-check text-xl"></i>
                        </div>
                        <p class="text-sm font-bold text-indigo-900 file-name break-all px-4">filename.dwg</p>
                        <p class="text-xs text-slate-500 file-size mt-1">2.4 MB</p>
                        <button type="button" class="mt-3 text-xs text-red-500 hover:text-red-700 underline font-medium remove-file-btn">삭제</button>
                      </div>
                    </div>

                    {/* Photo Drop Zone */}
                    <div id="drop-zone-photo" class="drop-zone border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-blue-50 hover:border-blue-400 transition-all cursor-pointer bg-white relative group">
                      <input type="file" id="photo-file" name="photo" multiple class="hidden" />
                      
                      <div class="upload-placeholder pointer-events-none">
                        <div class="w-14 h-14 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                          <i class="fas fa-camera text-2xl"></i>
                        </div>
                        <h3 class="text-sm font-bold text-slate-800 mb-1">참고 사진/이미지</h3>
                        <p class="text-xs text-slate-500 mb-4">여기로 파일을 끌어다 놓으세요<br/>(JPG, PNG)</p>
                        <span class="inline-block px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 group-hover:border-teal-500 group-hover:text-teal-600 transition-colors">
                          파일 선택
                        </span>
                      </div>

                      <div class="file-info hidden flex-col items-center justify-center animate-fade-in-up">
                        <div class="w-12 h-12 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mb-2">
                          <i class="fas fa-check text-xl"></i>
                        </div>
                        <p class="text-sm font-bold text-teal-900 file-name break-all px-4">image.jpg</p>
                        <p class="text-xs text-slate-500 file-size mt-1">1.2 MB</p>
                        <button type="button" class="mt-3 text-xs text-red-500 hover:text-red-700 underline font-medium remove-file-btn">삭제</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Project Details (Same as before) */}
                <div class="p-8">
                  <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">3</span>
                    프로젝트 상세 스펙 (정밀 매칭용)
                  </h2>
                  
                  <div class="space-y-8">
                    
                    {/* A. Basic Info */}
                    <div class="bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center"><i class="fas fa-info-circle text-blue-500 mr-2"></i> 기본 정보</h3>
                      <div class="grid md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">프로젝트명 <span class="text-red-500">*</span></label>
                          <input type="text" name="title" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="예) 반도체 장비 브라켓 가공" />
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">사용 용도 / 산업군</label>
                          <input type="text" name="usage" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="예) 자동차 엔진 부품, 의료기기 외관 등" />
                        </div>
                      </div>
                    </div>

                    {/* B. Technical Specs */}
                    <div class="bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center"><i class="fas fa-cogs text-orange-500 mr-2"></i> 제작 사양 (Spec)</h3>
                      <div class="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">주요 소재 (Material) <span class="text-red-500">*</span></label>
                          <div class="flex gap-2">
                            <select name="material_type" class="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                              <option value="">소재 선택</option>
                              <optgroup label="금속 (Metal)">
                                <option value="AL">알루미늄 (AL6061, 7075)</option>
                                <option value="SUS">스테인리스 (SUS304, 316)</option>
                                <option value="STEEL">스틸/철 (SS400, S45C)</option>
                                <option value="CU">구리/황동 (Copper)</option>
                                <option value="TI">티타늄 (Titanium)</option>
                              </optgroup>
                              <optgroup label="플라스틱 (Plastic)">
                                <option value="ABS">ABS</option>
                                <option value="PC">PC (Polycarbonate)</option>
                                <option value="POM">POM (Acetal)</option>
                                <option value="PEEK">PEEK</option>
                                <option value="NYLON">Nylon (MC Nylon)</option>
                              </optgroup>
                            </select>
                            <input type="text" name="material_detail" class="w-1/2 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="상세 재질 (직접입력)" />
                          </div>
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">가공 방식 (Process)</label>
                          <select name="process" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                            <option value="">공정 선택</option>
                            <option value="CNC_MILL">CNC 밀링 / MCT</option>
                            <option value="CNC_TURN">CNC 선반 / 복합기</option>
                            <option value="LASER">레이저 커팅 / 절단</option>
                            <option value="BENDING">절곡 / 제관 / 용접</option>
                            <option value="INJECTION">사출 성형 (금형 포함)</option>
                            <option value="DIECASTING">다이캐스팅</option>
                            <option value="3D_PRINT">3D 프린팅 (SLA/SLS/FDM)</option>
                            <option value="PRESS">프레스 가공</option>
                          </select>
                        </div>
                      </div>
                      
                      <div class="grid md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">제품 크기 (Size)</label>
                          <input type="text" name="size" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="가로x세로x높이 (mm)" />
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">예상 무게</label>
                          <input type="text" name="weight" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="kg (선택)" />
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">요구 공차 (Tolerance)</label>
                          <select name="tolerance" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                            <option value="normal">일반 공차 (ISO 2768-m)</option>
                            <option value="precision">정밀 (±0.05mm)</option>
                            <option value="ultra">초정밀 (±0.01mm 이하)</option>
                            <option value="drawing">도면 주기 참조</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label class="block text-xs font-bold text-slate-600 mb-2">후처리 (Post-Processing)</label>
                        <div class="flex flex-wrap gap-3">
                          {['아노다이징 (연질/경질)', '도금 (아연/니켈/크롬)', '도장/분체도장', '열처리', '샌딩/헤어라인', '빠우/광택', '레이저마킹', '흑착색', '기타'].map((finish, idx) => (
                            <label key={idx} class="inline-flex items-center cursor-pointer">
                              <input type="checkbox" name="finish" value={finish} class="rounded text-blue-600 focus:ring-0 mr-1.5" />
                              <span class="text-xs text-slate-700">{finish}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* C. Production & Certs */}
                    <div class="bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center"><i class="fas fa-industry text-purple-500 mr-2"></i> 생산 및 인증 요건</h3>
                      
                      <div class="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">제작 수량 <span class="text-red-500">*</span></label>
                          <div class="relative">
                            <input type="number" name="quantity" required class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="100" />
                            <span class="absolute right-3 top-2 text-slate-500 text-xs">개(EA)</span>
                          </div>
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">희망 납기일</label>
                          <input type="date" name="deadline" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                        </div>
                      </div>

                      <div class="mb-4">
                        <label class="block text-xs font-bold text-slate-600 mb-1">필수 보유 인증 (다중 선택)</label>
                        <select name="cert" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm">
                          <option value="">선택 안함</option>
                          <optgroup label="품질/환경/안전">
                            <option value="iso9001">ISO 9001 (품질경영)</option>
                            <option value="iso14001">ISO 14001 (환경경영)</option>
                            <option value="iso45001">ISO 45001 (안전보건)</option>
                            <option value="iso22301">ISO 22301 (비즈니스연속성)</option>
                          </optgroup>
                          <optgroup label="산업 특화">
                            <option value="iatf16949">IATF 16949 (자동차부품)</option>
                            <option value="as9100">AS 9100 (항공우주)</option>
                            <option value="iso13485">ISO 13485 (의료기기)</option>
                            <option value="sq">SQ 인증 (현대기아 2자)</option>
                          </optgroup>
                        </select>
                      </div>

                      <div class="mb-4">
                        <label class="block text-xs font-bold text-slate-600 mb-2">필요 검사 성적서</label>
                        <div class="flex gap-4">
                          <label class="inline-flex items-center"><input type="checkbox" name="report" value="dimension" class="rounded text-blue-600 mr-1.5" /><span class="text-xs text-slate-700">치수 검사 성적서</span></label>
                          <label class="inline-flex items-center"><input type="checkbox" name="report" value="material" class="rounded text-blue-600 mr-1.5" /><span class="text-xs text-slate-700">소재 성적서 (Mill Sheet)</span></label>
                          <label class="inline-flex items-center"><input type="checkbox" name="report" value="cmm" class="rounded text-blue-600 mr-1.5" /><span class="text-xs text-slate-700">3차원 측정 리포트</span></label>
                        </div>
                      </div>
                    </div>

                    {/* D. Commercial & Description */}
                    <div class="bg-slate-50 p-5 rounded-xl border border-slate-100">
                      <h3 class="text-sm font-bold text-slate-700 mb-4 flex items-center"><i class="fas fa-hand-holding-usd text-green-500 mr-2"></i> 상업 조건 및 기타</h3>
                      
                      <div class="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">목표 단가 (Target Price)</label>
                          <div class="relative">
                            <input type="number" name="budget" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="예산 범위 내" />
                            <span class="absolute right-3 top-2 text-slate-500 text-xs">원/개</span>
                          </div>
                        </div>
                        <div>
                          <label class="block text-xs font-bold text-slate-600 mb-1">인도/포장 조건</label>
                          <input type="text" name="delivery" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="예) 공장인도, 파렛트 포장 필수" />
                        </div>
                      </div>

                      <div>
                        <label class="block text-xs font-bold text-slate-600 mb-1">상세 요청사항</label>
                        <textarea name="description" rows="4" class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm placeholder-slate-400" placeholder="기타 특이사항이나 공급사에게 전달하고 싶은 내용을 자유롭게 적어주세요."></textarea>
                      </div>
                    </div>

                  </div>

                  <div class="mt-8 pt-6 border-t border-slate-100">
                    <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-lg flex items-center justify-center">
                      <span>공급사 찾기 요청</span>
                      <i class="fas fa-paper-plane ml-3"></i>
                    </button>
                    <p class="text-center text-xs text-slate-500 mt-4">
                      * 경영인증평가원은 공급사의 심사 리포트(장비/품질/재무)를 기반으로 최적의 기업을 매칭합니다.
                    </p>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: IAF Guide (Sticky Sidebar) */}
            <div class="lg:col-span-1 mt-8 lg:mt-0 lg:sticky lg:top-24 space-y-6">
              
              {/* IAF Guide Card */}
              <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div class="bg-slate-900 px-6 py-4 border-b border-slate-800">
                  <h3 class="text-white font-bold text-lg flex items-center">
                    <i class="fas fa-list-ul mr-2 text-blue-400"></i>
                    주요 IAF 코드별 중점 심사
                  </h3>
                </div>
                
                <div class="divide-y divide-slate-100">
                  {/* IAF 17 Metal */}
                  <div class="p-5 hover:bg-slate-50 transition-colors">
                    <div class="flex items-center mb-2">
                      <span class="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2">IAF 17</span>
                      <h4 class="font-bold text-slate-800">금속 및 가공제품</h4>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed mb-2">
                      기초 금속 및 조립 금속 제품 제조
                    </p>
                    <ul class="space-y-1">
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>소재 성적서(Mill Sheet) 관리</span>
                      </li>
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>용접/열처리 특수공정 유효성</span>
                      </li>
                    </ul>
                  </div>

                  {/* IAF 14 Plastic */}
                  <div class="p-5 hover:bg-slate-50 transition-colors">
                    <div class="flex items-center mb-2">
                      <span class="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2">IAF 14</span>
                      <h4 class="font-bold text-slate-800">고무 및 플라스틱</h4>
                    </div>
                    <ul class="space-y-1">
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>배합비 관리 및 재생재 사용 기준</span>
                      </li>
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>금형 보관 및 이력 관리(Shot수)</span>
                      </li>
                    </ul>
                  </div>

                  {/* IAF 19 Electric */}
                  <div class="p-5 hover:bg-slate-50 transition-colors">
                    <div class="flex items-center mb-2">
                      <span class="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2">IAF 19</span>
                      <h4 class="font-bold text-slate-800">전기 및 광학장비</h4>
                    </div>
                    <ul class="space-y-1">
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>ESD(정전기) 보호 구역 관리</span>
                      </li>
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>납땜성 및 RoHS 유해물질 관리</span>
                      </li>
                    </ul>
                  </div>

                  {/* IAF 22 Auto */}
                  <div class="p-5 hover:bg-slate-50 transition-colors">
                    <div class="flex items-center mb-2">
                      <span class="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded mr-2">IAF 22</span>
                      <h4 class="font-bold text-slate-800">기타 운송장비</h4>
                    </div>
                    <p class="text-xs text-slate-600 leading-relaxed mb-2">
                      자동차, 철도, 항공 등 부품 제조
                    </p>
                    <ul class="space-y-1">
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span><strong>IATF 16949 / ISO 9001 인증</strong> 필수</span>
                      </li>
                      <li class="text-xs text-slate-500 flex items-start">
                        <i class="fas fa-check text-blue-500 mr-2 mt-0.5"></i>
                        <span>FMEA 및 관리계획서(CP) 일치</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Help Contact Card */}
              <div class="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 class="font-bold text-blue-900 mb-2">IAF 코드를 모르시나요?</h4>
                <p class="text-sm text-blue-700 mb-4">
                  도면을 업로드하고 '기타'를 선택하시면 전문 심사원이 적합한 코드를 분류해 드립니다.
                </p>
                <div class="flex items-center text-blue-800 text-sm font-bold mb-1">
                  <i class="fas fa-phone mr-2"></i> 051-714-0798
                </div>
                <div class="flex items-center text-blue-800 text-sm">
                  <i class="fas fa-envelope mr-2"></i> mce@mce.re.kr
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          // --- 0. AI Smart Search ---
          const aiSearchBtn = document.getElementById('btn-ai-search');
          const aiSearchInput = document.getElementById('ai-search-input');
          const aiResultDiv = document.getElementById('ai-search-result');
          const aiAnalysisText = document.getElementById('ai-analysis-text');
          const aiSuggestedCompanies = document.getElementById('ai-suggested-companies');
          
          if (aiSearchBtn) {
            aiSearchBtn.addEventListener('click', async () => {
              const query = aiSearchInput.value.trim();
              if (!query) {
                alert('검색할 내용을 입력해주세요.');
                return;
              }
              
              // Show loading
              aiSearchBtn.disabled = true;
              aiSearchBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>AI 분석 중...';
              aiResultDiv.classList.add('hidden');
              
              try {
                const response = await fetch('/api/rfq/ai-search', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ query })
                });
                
                const result = await response.json();
                
                if (result.success && result.data) {
                  // Show analysis
                  aiAnalysisText.innerHTML = result.data.analysis || '요구사항을 분석했습니다.';
                  
                  // Show suggested companies
                  if (result.data.companies && result.data.companies.length > 0) {
                    aiSuggestedCompanies.innerHTML = result.data.companies.map((company, idx) => \`
                      <div class="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div class="flex items-start justify-between mb-2">
                          <div class="flex-1">
                            <h5 class="font-bold text-slate-800 flex items-center">
                              <span class="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center mr-2">\${idx+1}</span>
                              \${company.name}
                            </h5>
                            <p class="text-xs text-slate-500 mt-1">\${company.industry}</p>
                          </div>
                          <div class="text-right">
                            <div class="text-xl font-bold text-indigo-600">\${company.matchScore}</div>
                            <div class="text-[10px] text-slate-400">매칭률</div>
                          </div>
                        </div>
                        <p class="text-xs text-slate-600 leading-relaxed">\${company.reason}</p>
                        <div class="mt-2 flex flex-wrap gap-1">
                          \${(company.certifications || []).map(cert => \`
                            <span class="px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-bold rounded">\${cert}</span>
                          \`).join('')}
                        </div>
                      </div>
                    \`).join('');
                  } else {
                    aiSuggestedCompanies.innerHTML = '<p class="text-sm text-slate-500">매칭되는 공급업체를 찾지 못했습니다.</p>';
                  }
                  
                  aiResultDiv.classList.remove('hidden');
                } else {
                  alert('AI 검색 중 오류가 발생했습니다.');
                }
              } catch (err) {
                console.error(err);
                alert('네트워크 오류가 발생했습니다.');
              } finally {
                aiSearchBtn.disabled = false;
                aiSearchBtn.innerHTML = '<i class="fas fa-search mr-2"></i>AI 검색';
              }
            });
          }
          
          // --- 1. Multi-Select IAF Logic ---
          const iafBtns = document.querySelectorAll('.iaf-btn');
          const hiddenInput = document.getElementById('iaf_code_input');
          const selectedCodes = new Set(); // Store selected codes

          iafBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              const val = btn.dataset.value;
              const checkIcon = btn.querySelector('.check-icon');
              const labelText = btn.querySelector('span:last-child').textContent;

              if (selectedCodes.has(val)) {
                // Deselect
                selectedCodes.delete(val);
                btn.classList.remove('border-blue-600', 'bg-blue-50', 'ring-2', 'ring-blue-200');
                btn.classList.add('border-slate-200');
                checkIcon.classList.remove('scale-100', 'opacity-100');
                checkIcon.classList.add('scale-0', 'opacity-0');
              } else {
                // Select
                selectedCodes.add(val);
                btn.classList.remove('border-slate-200');
                btn.classList.add('border-blue-600', 'bg-blue-50', 'ring-2', 'ring-blue-200');
                checkIcon.classList.remove('scale-0', 'opacity-0');
                checkIcon.classList.add('scale-100', 'opacity-100');
              }

              // Update Hidden Input (Comma separated)
              if(hiddenInput) hiddenInput.value = Array.from(selectedCodes).join(',');
              
              // Update display of selected codes
              updateSelectedDisplay();
            });
          });
          
          function updateSelectedDisplay() {
            const displayDiv = document.getElementById('selected-iaf-display');
            const tagsDiv = document.getElementById('selected-iaf-tags');
            
            if (selectedCodes.size > 0) {
              displayDiv.classList.remove('hidden');
              tagsDiv.innerHTML = Array.from(selectedCodes).map(code => {
                const btn = document.querySelector(\`.iaf-btn[data-value="\${code}"]\`);
                const label = btn ? btn.querySelector('span:last-child').textContent : \`IAF \${code}\`;
                return \`
                  <span class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-lg">
                    <span class="mr-2">IAF \${code}</span>
                    <span class="text-xs">·</span>
                    <span class="ml-2 text-xs">\${label}</span>
                  </span>
                \`;
              }).join('');
            } else {
              displayDiv.classList.add('hidden');
            }
          }

          // --- 2. Drag and Drop Logic ---
          function setupDragAndDrop(zoneId, inputId) {
            const dropZone = document.getElementById(zoneId);
            const input = document.getElementById(inputId);
            
            if(!dropZone || !input) return;

            const placeholder = dropZone.querySelector('.upload-placeholder');
            const fileInfo = dropZone.querySelector('.file-info');
            const fileName = dropZone.querySelector('.file-name');
            const fileSize = dropZone.querySelector('.file-size');
            const removeBtn = dropZone.querySelector('.remove-file-btn');

            // Drag Events
            dropZone.addEventListener('dragover', (e) => {
              e.preventDefault();
              dropZone.classList.add('border-blue-500', 'bg-blue-50', 'scale-[1.02]');
            });

            dropZone.addEventListener('dragleave', (e) => {
              e.preventDefault();
              dropZone.classList.remove('border-blue-500', 'bg-blue-50', 'scale-[1.02]');
            });

            dropZone.addEventListener('drop', (e) => {
              e.preventDefault();
              dropZone.classList.remove('border-blue-500', 'bg-blue-50', 'scale-[1.02]');
              
              if (e.dataTransfer.files.length > 0) {
                handleFile(e.dataTransfer.files[0]);
              }
            });

            // Click Event (Trigger Input)
            dropZone.addEventListener('click', (e) => {
              if (e.target !== removeBtn) input.click();
            });

            // Input Change Event
            input.addEventListener('change', () => {
              if (input.files.length > 0) {
                handleFile(input.files[0]);
              }
            });

            // Remove File
            if(removeBtn) {
              removeBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent opening file dialog
                input.value = ''; // Clear input
                resetUI();
              });
            }

            function handleFile(file) {
              placeholder.classList.add('hidden');
              fileInfo.classList.remove('hidden');
              fileInfo.classList.add('flex');
              fileName.textContent = file.name;
              fileSize.textContent = (file.size / (1024*1024)).toFixed(2) + ' MB';
              dropZone.classList.add('border-blue-500', 'bg-blue-50'); // Keep active style
            }

            function resetUI() {
              placeholder.classList.remove('hidden');
              fileInfo.classList.add('hidden');
              fileInfo.classList.remove('flex');
              dropZone.classList.remove('border-blue-500', 'bg-blue-50');
            }
          }

          // Initialize D&D for both zones
          setupDragAndDrop('drop-zone-drawing', 'drawing-file');
          setupDragAndDrop('drop-zone-photo', 'photo-file');


          // --- 3. Form Submission ---
          document.getElementById('rfqForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check if at least one IAF code is selected
            if (!hiddenInput.value) {
              alert('산업 분야(IAF Code)를 최소 1개 이상 선택해주세요.');
              document.getElementById('iaf-selector').scrollIntoView({ behavior: 'smooth' });
              return;
            }
            
            const btn = e.target.querySelector('button[type="submit"]');
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 경영인증평가원 심사보고서 대조 중...';

            // Collect form data
            const formData = new FormData(e.target);
            const rfqData = {
              iaf_codes: hiddenInput.value,
              title: formData.get('title'),
              usage: formData.get('usage'),
              material: formData.get('material_type'),
              process: formData.get('process'),
              size: formData.get('size'),
              weight: formData.get('weight'),
              tolerance: formData.get('tolerance'),
              quantity: formData.get('quantity'),
              deadline: formData.get('deadline'),
              cert: formData.get('cert'),
              budget: formData.get('budget'),
              delivery: formData.get('delivery'),
              description: formData.get('description')
            };

            try {
              // Submit to API
              const res = await fetch('/api/rfq/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(rfqData)
              });
              
              const result = await res.json();
              
              if (result.success) {
                // Redirect to result page
                setTimeout(() => {
                  window.location.href = '/rfq/result';
                }, 500);
              } else {
                alert('견적 요청 중 오류가 발생했습니다: ' + (result.error || ''));
                btn.disabled = false;
                btn.innerHTML = '<span>공급사 찾기 요청</span><i class="fas fa-paper-plane ml-3"></i>';
              }
            } catch(err) {
              // Even if API fails, redirect to show results (with mock data)
              setTimeout(() => {
                window.location.href = '/rfq/result';
              }, 500);
            }
          });
        });
      ` }} />
    </Layout>
  )
}
