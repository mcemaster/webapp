import { html } from 'hono/html'

export const InputForm = () => html`
  <div id="wizard-container" class="min-h-screen bg-slate-50 pb-24">
    
    <div class="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 class="font-bold text-slate-800 flex items-center text-lg">
          <i class="fas fa-database text-indigo-600 mr-3"></i> 기업 정밀 진단 데이터 입력
        </h1>
        <div class="flex items-center space-x-4">
          <div class="text-xs text-slate-500 font-medium">진행률</div>
          <div class="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div id="progress-bar" class="bg-gradient-to-r from-blue-500 to-indigo-600 h-full w-[20%] transition-all duration-500"></div>
          </div>
          <div class="text-lg font-extrabold text-indigo-600"><span id="current-step-num">1</span><span class="text-sm text-slate-400 font-normal">/5</span></div>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-8">
      <form id="diagnosis-form" onsubmit="return false;" class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        
        <div id="step-1" class="step-content p-8 md:p-10">
          <div class="mb-8 pb-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">Step 1. 기업 식별 정보</h2>
              <p class="text-slate-500 text-sm mt-1">입력하고 싶은 정보만 입력하세요. 부분 데이터로도 분석 가능합니다.</p>
            </div>
            <div class="relative w-full md:w-96">
              <input type="text" id="company-search" placeholder="DART 기업명 검색 (자동완성)" 
                class="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-indigo-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition font-bold" autocomplete="off" />
              <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-300"></i>
              <div id="autocomplete-list" class="absolute top-full left-0 w-full bg-white rounded-xl shadow-2xl border border-slate-100 mt-1 overflow-hidden hidden z-50"></div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="lg:col-span-2">
              <label class="form-label">법인명(상호)</label>
              <input type="text" id="basic-name" class="form-input bg-slate-50" placeholder="(주)회사명" />
            </div>
            <div>
              <label class="form-label">대표자명</label>
              <input type="text" id="basic-ceo" class="form-input bg-slate-50" />
            </div>
            <div>
              <label class="form-label">사업자등록번호</label>
              <input type="text" id="basic-bizno" class="form-input" placeholder="000-00-00000" />
            </div>
            <div>
              <label class="form-label">법인등록번호</label>
              <input type="text" id="basic-corpno" class="form-input" />
            </div>
            <div>
              <label class="form-label">설립연월일</label>
              <input type="text" id="basic-est" class="form-input" placeholder="YYYY-MM-DD" />
            </div>
            <div>
              <label class="form-label">기업형태</label>
              <select id="basic-type" class="form-input">
                <option value="">선택안함</option>
                <option>중소기업</option><option>중견기업</option><option>스타트업(7년미만)</option><option>예비창업자</option><option>대기업</option>
              </select>
            </div>
            <div>
              <label class="form-label">결산월</label>
              <select id="basic-month" class="form-input"><option>12월</option><option>3월</option><option>6월</option><option>9월</option></select>
            </div>
            <div class="lg:col-span-2">
              <label class="form-label">본점 주소</label>
              <input type="text" id="basic-addr" class="form-input" />
            </div>
            <div class="lg:col-span-2">
              <label class="form-label">주업종 (표준산업분류)</label>
              <input type="text" id="basic-industry" class="form-input" placeholder="예: C26211 (인쇄회로기판 제조업)" />
            </div>
            
            <div class="lg:col-span-4 mt-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 class="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">📞 담당자 및 기타 정보</h4>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label class="form-label">홈페이지 URL</label><input type="text" id="basic-url" class="form-input" /></div>
                <div><label class="form-label">담당자명</label><input type="text" id="contact-name" class="form-input" /></div>
                <div><label class="form-label">이메일</label><input type="email" id="contact-email" class="form-input" /></div>
                <div><label class="form-label">연락처(휴대폰)</label><input type="text" id="contact-phone" class="form-input" /></div>
                <div><label class="form-label">주거래은행</label><input type="text" id="basic-bank" class="form-input" /></div>
                <div><label class="form-label">상시 근로자수 (현재)</label><input type="number" id="hr-current" class="form-input" /></div>
              </div>
            </div>
          </div>
        </div>

        <div id="step-2" class="step-content hidden p-8 md:p-10">
          <div class="mb-8">
            <h2 class="text-2xl font-extrabold text-slate-900">Step 2. 재무 성장성 분석 (3개년)</h2>
            <p class="text-slate-500 text-sm mt-1">모르는 항목은 비워두셔도 됩니다.</p>
          </div>

          <div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table class="w-full text-sm text-center">
              <thead class="bg-slate-100 text-slate-600 font-bold uppercase text-xs">
                <tr>
                  <th class="p-4 text-left w-40">재무 항목</th>
                  <th class="p-4 bg-slate-200">2023년 (확정)</th>
                  <th class="p-4 bg-blue-50 text-blue-700">2024년 (확정)</th>
                  <th class="p-4">2025년 (추정)</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 bg-white">
                ${['매출액', '영업이익', '당기순이익', '자산총계', '부채총계', '자본총계', '연구개발비(R&D)', '수출액'].map((label, idx) => `
                  <tr>
                    <td class="p-3 text-left font-bold text-slate-700 pl-6">${label}</td>
                    <td class="p-2"><input type="number" id="fin-${idx}-2023" class="w-full p-2 border border-slate-200 rounded text-right focus:border-blue-500 outline-none" placeholder="0" /></td>
                    <td class="p-2 bg-blue-50/30"><input type="number" id="fin-${idx}-2024" class="w-full p-2 border border-blue-200 rounded text-right focus:border-blue-500 outline-none font-bold" placeholder="0" /></td>
                    <td class="p-2"><input type="number" id="fin-${idx}-2025" class="w-full p-2 border border-slate-200 rounded text-right focus:border-blue-500 outline-none" placeholder="0" /></td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-4 rounded-xl border border-slate-200">
              <label class="form-label">부채비율 (%)</label>
              <input type="number" id="fin-debt-ratio" class="form-input text-right text-red-500 font-bold" placeholder="자동계산" />
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200">
              <label class="form-label">유동비율 (%)</label>
              <input type="number" id="fin-current-ratio" class="form-input text-right" />
            </div>
            <div class="bg-white p-4 rounded-xl border border-slate-200">
              <label class="form-label">이자보상배율</label>
              <input type="number" id="fin-interest-ratio" class="form-input text-right" />
            </div>
          </div>
        </div>

        <div id="step-3" class="step-content hidden p-8 md:p-10">
          <div class="mb-8">
            <h2 class="text-2xl font-extrabold text-slate-900">Step 3. 기술력 및 인력 구조</h2>
            <p class="text-slate-500 text-sm mt-1">해당되는 내용만 선택하거나 입력하세요.</p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div class="space-y-6">
              <h3 class="font-bold text-slate-700 flex items-center border-b pb-2"><i class="fas fa-users text-indigo-500 mr-2"></i> 인력 상세 현황 (명)</h3>
              <div class="grid grid-cols-2 gap-4">
                <div><label class="form-label">전체 임직원</label><input type="number" id="hr-total" class="form-input" /></div>
                <div><label class="form-label">기업부설연구소 전담</label><input type="number" id="hr-lab" class="form-input" /></div>
                <div><label class="form-label">청년 (만 34세 이하)</label><input type="number" id="hr-youth" class="form-input" /></div>
                <div><label class="form-label">여성 근로자</label><input type="number" id="hr-female" class="form-input" /></div>
                <div><label class="form-label">장애인/보훈</label><input type="number" id="hr-disabled" class="form-input" /></div>
                <div><label class="form-label">석/박사급 인력</label><input type="number" id="hr-doctor" class="form-input" /></div>
                <div><label class="form-label">전년도 신규채용</label><input type="number" id="hr-last-hire" class="form-input" /></div>
                <div><label class="form-label">올해 채용 계획</label><input type="number" id="hr-plan-hire" class="form-input bg-blue-50" /></div>
              </div>
            </div>

            <div class="space-y-6">
              <h3 class="font-bold text-slate-700 flex items-center border-b pb-2"><i class="fas fa-certificate text-orange-500 mr-2"></i> 인증 및 지재권</h3>
              
              <div class="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <label class="form-label mb-3">보유 인증 (다중 선택)</label>
                <div class="grid grid-cols-2 gap-2 h-40 overflow-y-auto pr-2 custom-scroll">
                  ${['벤처기업', '이노비즈', '메인비즈', '기업부설연구소', '연구전담부서', 'ISO 9001', 'ISO 14001', 'ISO 45001', '녹색인증', 'NET(신기술)', 'NEP(신제품)', '여성기업', '장애인기업', '소부장기업', '뿌리기업', '청년친화강소기업', '수출유망중소기업'].map(c => `
                    <label class="flex items-center p-2 bg-white border border-slate-100 rounded hover:border-blue-400 cursor-pointer transition">
                      <input type="checkbox" name="certs" value="${c}" class="rounded text-blue-600 focus:ring-blue-500 mr-2" />
                      <span class="text-xs font-bold text-slate-700">${c}</span>
                    </label>
                  `).join('')}
                </div>
              </div>

              <div class="grid grid-cols-3 gap-3">
                <div><label class="form-label">특허 등록(건)</label><input type="number" id="ip-reg" class="form-input text-center" placeholder="0" /></div>
                <div><label class="form-label">특허 출원(건)</label><input type="number" id="ip-app" class="form-input text-center" placeholder="0" /></div>
                <div><label class="form-label">기타 지재권</label><input type="number" id="ip-etc" class="form-input text-center" placeholder="0" /></div>
              </div>
              
              <div>
                <label class="form-label">기술신용평가(TCB) 등급</label>
                <select id="tech-tcb" class="form-input">
                  <option value="">없음</option>
                  <option>T1</option><option>T2</option><option>T3</option><option>T4</option><option>T5</option><option>T6 이하</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div id="step-4" class="step-content hidden p-8 md:p-10">
          <div class="mb-8">
            <h2 class="text-2xl font-extrabold text-slate-900">Step 4. 시장 진출 및 사업 전략</h2>
            <p class="text-slate-500 text-sm mt-1">작성하지 않아도 무방합니다.</p>
          </div>

          <div class="grid grid-cols-1 gap-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="form-label">주력 제품/서비스명</label>
                <input type="text" id="biz-product" class="form-input" placeholder="예: AI 기반 불량 검출 솔루션" />
              </div>
              <div>
                <label class="form-label">주요 타겟 고객 (B2B/B2C)</label>
                <input type="text" id="biz-target" class="form-input" placeholder="예: 자동차 부품 제조사 1차 밴더" />
              </div>
              <div>
                <label class="form-label">수출 대상 국가</label>
                <input type="text" id="biz-export-country" class="form-input" placeholder="예: 미국, 베트남, 폴란드" />
              </div>
              <div>
                <label class="form-label">경쟁사 현황</label>
                <input type="text" id="biz-competitor" class="form-input" placeholder="국내외 주요 경쟁사 입력" />
              </div>
            </div>

            <div>
              <label class="form-label text-blue-600">핵심 기술 및 제품의 차별성</label>
              <textarea id="desc-tech" class="form-textarea h-32" placeholder="경쟁사 대비 우리 기술의 독창성, 기술적 장벽, 특허 보유 현황 등을 서술해주세요."></textarea>
            </div>

            <div>
              <label class="form-label text-blue-600">사업화 목표 및 기대효과</label>
              <textarea id="desc-goal" class="form-textarea h-32" placeholder="지원사업을 통해 달성하고자 하는 구체적인 목표(매출 증대, 고용 창출, 수출 확대 등)를 서술해주세요."></textarea>
            </div>
            
            <div>
              <label class="form-label">자금 소요 계획 (개략)</label>
              <textarea id="desc-fund" class="form-textarea h-24" placeholder="인건비, 시제품 제작비, 마케팅비 등 대략적인 예산 사용 계획을 입력하세요."></textarea>
            </div>
          </div>
        </div>

        <div id="step-5" class="step-content hidden p-8 md:p-10">
          <div class="text-center mb-10">
            <div class="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <i class="fas fa-folder-open text-3xl"></i>
            </div>
            <h2 class="text-2xl font-extrabold text-slate-900 mb-2">증빙 자료 및 사업계획서 첨부</h2>
            <p class="text-slate-500">파일이 없어도 분석은 가능합니다.</p>
          </div>

          <div class="max-w-2xl mx-auto">
            <div class="bg-slate-50 border-2 border-dashed border-indigo-200 rounded-2xl p-12 text-center hover:bg-indigo-50/50 transition cursor-pointer relative group">
              <input type="file" id="file-input" class="absolute inset-0 opacity-0 cursor-pointer" multiple accept=".pdf,.doc,.docx,.hwp,.xls,.xlsx,.ppt,.pptx,.jpg,.png" />
              <div class="pointer-events-none group-hover:scale-105 transition-transform duration-300">
                <i class="fas fa-cloud-upload-alt text-5xl text-indigo-400 mb-6"></i>
                <h4 class="font-bold text-indigo-900 text-xl mb-2">여기에 파일을 드래그하세요</h4>
                <p class="text-sm text-slate-400">또는 클릭하여 파일 탐색기 열기</p>
                <div class="mt-4 flex justify-center gap-2">
                  <span class="px-2 py-1 bg-white border rounded text-[10px] text-slate-500">PDF</span>
                  <span class="px-2 py-1 bg-white border rounded text-[10px] text-slate-500">HWP</span>
                  <span class="px-2 py-1 bg-white border rounded text-[10px] text-slate-500">Office</span>
                </div>
              </div>
            </div>

            <div id="file-list" class="mt-6 space-y-3">
              {/* File items injected here */}
            </div>
          </div>
        </div>

        <div class="px-8 py-6 bg-slate-50 border-t border-slate-200 flex justify-between items-center">
          <button type="button" id="btn-prev" class="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 transition hidden">
            <i class="fas fa-arrow-left mr-2"></i> 이전 단계
          </button>
          
          <div class="flex gap-3">
            <button type="button" class="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-slate-600 text-sm" onclick="alert('임시 저장되었습니다.')">
              임시 저장
            </button>
            <button type="button" id="btn-next" class="px-8 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold shadow-lg transition transform active:scale-95 flex items-center">
              다음 단계 <i class="fas fa-arrow-right ml-2"></i>
            </button>
            <button type="button" id="btn-submit" class="px-10 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-xl transition transform active:scale-95 hidden animate-pulse">
              AI 분석 시작 <i class="fas fa-magic ml-2"></i>
            </button>
          </div>
        </div>

      </form>
    </div>

    <style>
      .form-label { display: block; font-size: 0.7rem; font-weight: 800; color: #64748b; margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }
      .form-input { width: 100%; padding: 0.75rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-weight: 600; color: #1e293b; font-size: 0.9rem; transition: all; }
      .form-input:focus { border-color: #4f46e5; outline: none; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
      .form-textarea { width: 100%; padding: 0.75rem; background-color: #fff; border: 1px solid #cbd5e1; border-radius: 0.5rem; font-size: 0.9rem; resize: none; transition: all; }
      .form-textarea:focus { border-color: #4f46e5; outline: none; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
      .custom-scroll::-webkit-scrollbar { width: 4px; }
      .custom-scroll::-webkit-scrollbar-track { background: #f1f5f9; }
      .custom-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }
    </style>
  </div>
`
