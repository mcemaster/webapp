import { Layout } from '../components/Layout'

export const Rfq = (props: { user?: any, lang?: string }) => {
  const currentLang = props.lang || 'ko';
  return (
    <Layout user={props.user} lang={currentLang}>
      <div class="bg-slate-50 min-h-screen py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12">
            <h1 class="text-3xl font-bold text-slate-900 mb-4">ISO/IAF 기준 맞춤 공급사 찾기</h1>
            <p class="text-slate-600">
              상세한 스펙을 입력할수록 귀사의 요구사항을 100% 충족하는<br/>
              <strong>검증된 파트너(Verified Partner)</strong>를 매칭받을 확률이 높아집니다.
            </p>
          </div>

          <div class="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
            
            {/* Left Column: RFQ Form */}
            <div class="lg:col-span-2">
              <form id="rfqForm" class="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
                
                {/* Step 1: Industry Sector (IAF Code) - Full List Restored */}
                <div class="p-8 border-b border-slate-100">
                  <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    제조 분야 선택 (IAF Code)
                  </h2>
                  
                  <input type="hidden" name="iaf_code" id="iaf_code_input" required />

                  <div class="space-y-8" id="iaf-selector">
                    
                    {/* Category 1: Major Manufacturing */}
                    <div>
                      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                        <i class="fas fa-industry mr-2"></i>주요 제조업
                      </h3>
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative" data-value="17">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 17</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">금속 / 가공제품</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative" data-value="18">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 18</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">기계 및 장비</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative" data-value="19">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 19</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">전기 / 광학장비</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative" data-value="22">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 22</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">기타 운송장비</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative" data-value="14">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 14</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">고무 / 플라스틱</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon"></i>
                        </button>
                        <button type="button" class="iaf-btn group p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left flex flex-col items-start relative" data-value="29">
                          <span class="text-xs font-bold text-blue-600 mb-1">IAF 29</span>
                          <span class="font-bold text-slate-700 text-sm group-hover:text-blue-700">도소매 / 수리</span>
                          <i class="fas fa-check-circle absolute top-3 right-3 text-blue-600 opacity-0 transition-opacity check-icon"></i>
                        </button>
                      </div>
                    </div>

                    {/* Category 2: Raw Materials & Chemistry */}
                    <div>
                      <h3 class="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 border-b border-slate-100 pb-2">
                        <i class="fas fa-flask mr-2"></i>원자재 및 화학
                      </h3>
                      <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="04">
                          <span class="font-bold block text-blue-600">IAF 04</span> 섬유/직물
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="12">
                          <span class="font-bold block text-blue-600">IAF 12</span> 화학물질
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="13">
                          <span class="font-bold block text-blue-600">IAF 13</span> 의약품
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="15">
                          <span class="font-bold block text-blue-600">IAF 15</span> 비금속 광물
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="16">
                          <span class="font-bold block text-blue-600">IAF 16</span> 콘크리트
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="02">
                          <span class="font-bold block text-blue-600">IAF 02</span> 광업/채석
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="07">
                          <span class="font-bold block text-blue-600">IAF 07</span> 펄프/종이
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="10">
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
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="28">
                          <span class="font-bold block text-blue-600">IAF 28</span> 건설업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="20">
                          <span class="font-bold block text-blue-600">IAF 20</span> 조선업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="21">
                          <span class="font-bold block text-blue-600">IAF 21</span> 항공우주
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="23">
                          <span class="font-bold block text-blue-600">IAF 23</span> 기타 제조
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="08">
                          <span class="font-bold block text-blue-600">IAF 08</span> 출판업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="09">
                          <span class="font-bold block text-blue-600">IAF 09</span> 인쇄업
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="11">
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
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="33">
                          <span class="font-bold block text-blue-600">IAF 33</span> 정보기술(IT)
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="34">
                          <span class="font-bold block text-blue-600">IAF 34</span> 엔지니어링
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="31">
                          <span class="font-bold block text-blue-600">IAF 31</span> 운송/물류
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="35">
                          <span class="font-bold block text-blue-600">IAF 35</span> 기타 서비스
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="25">
                          <span class="font-bold block text-blue-600">IAF 25</span> 전기 공급
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="36">
                          <span class="font-bold block text-blue-600">IAF 36</span> 공공 행정
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="37">
                          <span class="font-bold block text-blue-600">IAF 37</span> 교육
                        </button>
                        <button type="button" class="iaf-btn p-2 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-left text-xs transition-all relative" data-value="38">
                          <span class="font-bold block text-blue-600">IAF 38</span> 보건/사회
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Step 2: File Upload */}
                <div class="p-8 border-b border-slate-100 bg-slate-50/30">
                  <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                    <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold mr-3">2</span>
                    도면 및 요구사항 파일 업로드
                  </h2>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer bg-white relative group">
                      <input type="file" id="drawing-file" name="drawing" multiple class="hidden" />
                      <label for="drawing-file" class="cursor-pointer block">
                        <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <i class="fas fa-pencil-ruler text-xl"></i>
                        </div>
                        <h3 class="text-sm font-bold text-slate-800 mb-1">도면 파일 (DWG/PDF)</h3>
                        <p class="text-xs text-slate-500 mb-3">치수/공차 확인용</p>
                        <span class="inline-block px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 group-hover:border-indigo-500 group-hover:text-indigo-600">파일 선택</span>
                      </label>
                    </div>
                    <div class="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer bg-white relative group">
                      <input type="file" id="photo-file" name="photo" multiple class="hidden" />
                      <label for="photo-file" class="cursor-pointer block">
                        <div class="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <i class="fas fa-camera text-xl"></i>
                        </div>
                        <h3 class="text-sm font-bold text-slate-800 mb-1">참고 사진/이미지</h3>
                        <p class="text-xs text-slate-500 mb-3">형상 이해도 향상용</p>
                        <span class="inline-block px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 group-hover:border-teal-500 group-hover:text-teal-600">파일 선택</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Step 3: Project Details (Enhanced) */}
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
                            <option value="tl9000">TL 9000 (정보통신)</option>
                            <option value="sq">SQ 인증 (현대기아 2자)</option>
                          </optgroup>
                          <optgroup label="의료/식품/화장품">
                            <option value="iso13485">ISO 13485 (의료기기)</option>
                            <option value="iso22000">ISO 22000 (식품안전)</option>
                            <option value="fssc22000">FSSC 22000 (식품안전)</option>
                            <option value="iso22716">ISO 22716 (화장품GMP)</option>
                            <option value="haccp">HACCP (식품안전)</option>
                          </optgroup>
                          <optgroup label="IT/보안/에너지">
                            <option value="iso27001">ISO 27001 (정보보안)</option>
                            <option value="iso27701">ISO 27701 (개인정보보호)</option>
                            <option value="iso20000">ISO 20000 (IT서비스)</option>
                            <option value="iso50001">ISO 50001 (에너지경영)</option>
                          </optgroup>
                          <optgroup label="기타/규범">
                            <option value="iso37001">ISO 37001 (부패방지)</option>
                            <option value="iso37301">ISO 37301 (준법경영)</option>
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
          // IAF Selection Logic
          const iafBtns = document.querySelectorAll('.iaf-btn');
          const hiddenInput = document.getElementById('iaf_code_input');

          iafBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              // Deselect all
              iafBtns.forEach(b => {
                b.classList.remove('border-blue-600', 'bg-blue-50', 'ring-2', 'ring-blue-200');
                b.classList.add('border-slate-200');
                b.querySelector('.check-icon').classList.remove('opacity-100');
                b.querySelector('.check-icon').classList.add('opacity-0');
              });

              // Select clicked
              btn.classList.remove('border-slate-200');
              btn.classList.add('border-blue-600', 'bg-blue-50', 'ring-2', 'ring-blue-200');
              btn.querySelector('.check-icon').classList.remove('opacity-0');
              btn.querySelector('.check-icon').classList.add('opacity-100');

              // Update input
              if(hiddenInput) hiddenInput.value = btn.dataset.value;
            });
          });

          // Form Submission
          document.getElementById('rfqForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check if IAF code selected
            if (!hiddenInput.value) {
              alert('산업 분야(IAF Code)를 선택해주세요.');
              // Scroll to top
              document.getElementById('iaf-selector').scrollIntoView({ behavior: 'smooth' });
              return;
            }
            
            // Submit simulation
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 경영인증평가원 심사보고서 대조 중...';

            // Simulate API delay
            setTimeout(() => {
              // Redirect to AI Matching Result Page
              window.location.href = '/rfq/result';
            }, 800);
          });
        });
      ` }} />
    </Layout>
  )
}
