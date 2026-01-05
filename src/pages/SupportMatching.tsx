import { Layout } from '../components/Layout'

interface SupportMatchingProps {
  user?: any;
}

export const SupportMatching = ({ user }: SupportMatchingProps) => {
  return (
    <Layout user={user}>
      {/* Top Banner */}
      <div className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-400 text-blue-300 text-sm font-bold mb-6 animate-pulse">
            <i className="fas fa-magic mr-2"></i>2026 Data Intelligence
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            대표님, 올해 놓친 지원금이<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">최소 1억 원</span>일 수 있습니다.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            KSIC 코드부터 재무 비율까지, 심사위원이 보는 <strong>128가지 평가 지표</strong>를 분석합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Tool */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-24 relative transform -translate-y-10">
          <div className="bg-gradient-to-r from-white to-slate-50 px-8 py-5 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-sm font-bold text-slate-800">초정밀 매칭 시스템 가동 중</span>
            </div>
            <div className="flex items-center space-x-3">
               <button onclick="fillDemoData()" className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded hover:bg-slate-200 transition-colors">
                 <i className="fas fa-edit mr-1"></i>데모 데이터 입력
               </button>
               <div className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                 DB: 30,241 items
               </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Wizard Steps */}
            <div id="step-wizard" className="mb-12 max-w-4xl mx-auto">
              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-slate-100 -z-10"></div>
                <div className="step-dot w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg relative z-10 ring-4 ring-white shadow-lg transition-all">1</div>
                <div className="step-dot w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg relative z-10 ring-4 ring-white transition-all">2</div>
                <div className="step-dot w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg relative z-10 ring-4 ring-white transition-all">3</div>
                <div className="step-dot w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg relative z-10 ring-4 ring-white transition-all">4</div>
              </div>
              <div className="flex justify-between mt-3 text-sm font-bold text-slate-500 px-1">
                <span>기업식별/지역</span>
                <span>정밀재무</span>
                <span>고용/기술</span>
                <span>사업전략</span>
              </div>
            </div>

            <form id="matching-form" onsubmit="event.preventDefault();">
              {/* Steps (Same as previous) */}
              <div id="form-step-1" className="step-content space-y-8 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">DART 데이터 연동</h3>
                  <p className="text-slate-500 mt-2">기업명을 입력하면 복잡한 서류 정보를 자동으로 불러옵니다.</p>
                </div>
                <div className="max-w-3xl mx-auto bg-slate-800 p-2 rounded-2xl shadow-lg flex mb-10 relative z-20">
                  <input type="text" id="company-search-input" placeholder="기업명을 입력하세요 (예: 태성정밀)" className="flex-1 bg-white border-none rounded-xl px-6 text-lg focus:ring-2 focus:ring-blue-500" />
                  <button type="button" onclick="autoFetchDartData()" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors ml-2 flex items-center whitespace-nowrap"><i className="fas fa-bolt mr-2"></i> 정보 불러오기</button>
                </div>
                <div id="dart-badge" className="hidden max-w-2xl mx-auto mb-8 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center justify-center text-green-700 font-bold animate-fade-in-up"><i className="fas fa-check-circle mr-2 text-xl"></i><span>금융감독원(DART) 공시 데이터가 성공적으로 연동되었습니다.</span></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-building text-blue-600 mr-2"></i> 기업 식별 정보</h4>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">기업명</label><input type="text" id="companyName" name="companyName" className="w-full rounded-lg border-slate-300 text-sm focus:ring-blue-500 bg-slate-50" readOnly /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">사업자등록번호</label><input type="text" id="bizNum" name="bizNum" className="w-full rounded-lg border-slate-300 text-sm" placeholder="000-00-00000" /></div>
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">법인등록번호</label><input type="text" name="corpNum" className="w-full rounded-lg border-slate-300 text-sm" placeholder="선택사항" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">대표자명</label><input type="text" id="ceoName" name="ceoName" className="w-full rounded-lg border-slate-300 text-sm" /></div>
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">대표자 생년월일</label><input type="date" name="ceoBirth" className="w-full rounded-lg border-slate-300 text-sm" placeholder="청년창업 여부 확인용" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">설립연월</label><input type="month" id="foundingDate" name="foundingDate" className="w-full rounded-lg border-slate-300 text-sm" /></div>
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">기업 규모</label><select id="companyType" name="companyType" className="w-full rounded-lg border-slate-300 text-sm"><option value="중소기업">중소기업</option><option value="중견기업">중견기업</option><option value="소상공인">소상공인</option><option value="예비창업자">예비창업자</option></select></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-map-marked-alt text-indigo-600 mr-2"></i> 소재지 및 업종</h4>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">본사 주소</label><input type="text" id="address" name="address" className="w-full rounded-lg border-slate-300 text-sm" placeholder="도로명 주소 입력" /></div>
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">공장/연구소 주소 (별도인 경우)</label><input type="text" name="factoryAddress" className="w-full rounded-lg border-slate-300 text-sm" placeholder="본사와 다를 경우 입력 (지역 특화 사업 매칭용)" /></div>
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">표준산업분류코드 (KSIC)</label><div className="flex space-x-2"><input type="text" id="ksic" name="ksic" className="flex-1 rounded-lg border-slate-300 text-sm" placeholder="예: C29271" /><button type="button" className="bg-slate-200 text-slate-700 px-3 py-1 rounded-lg text-xs font-bold hover:bg-slate-300">검색</button></div><p className="text-[10px] text-slate-400 mt-1">* DART 연동 시 자동 입력됩니다.</p></div>
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">주생산품목</label><input type="text" id="mainProduct" name="mainProduct" className="w-full rounded-lg border-slate-300 text-sm" placeholder="예: 자동차 엔진 부품" /></div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="form-step-2" className="step-content hidden space-y-8 animate-fade-in-up">
                <div className="text-center mb-8"><h3 className="text-2xl font-bold text-slate-900">재무제표 정밀 분석</h3><p className="text-slate-500 mt-2">DART에서 불러온 데이터가 정확한지 확인해주세요.</p></div>
                
                <div className="max-w-5xl mx-auto mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center text-blue-800">
                    <i className="fas fa-info-circle text-xl mr-3"></i>
                    <div><span className="font-bold block text-sm">DART / NICE 데이터 연동 가능</span><span className="text-xs">기업명을 입력하셨다면 [자동 불러오기]를 시도해보세요.</span></div>
                  </div>
                  <button type="button" onclick="autoFetchFinancials()" className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm"><i className="fas fa-sync-alt mr-2"></i>재무정보 불러오기</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-chart-line text-blue-600 mr-2"></i> 손익계산서 (단위: 백만원)</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-500 mb-1"><span>항목</span><span>2024년</span><span>2025년 (최근)</span></div>
                      <div className="grid grid-cols-3 gap-2 items-center"><label className="text-xs font-bold text-slate-700">매출액</label><input type="number" id="rev_2024" name="rev_2024" className="rounded border-slate-300 text-xs py-1" /><input type="number" id="rev_2025" name="rev_2025" className="rounded border-slate-300 text-xs py-1 bg-yellow-50" placeholder="필수" /></div>
                      <div className="grid grid-cols-3 gap-2 items-center"><label className="text-xs font-bold text-slate-700">영업이익</label><input type="number" id="op_2024" name="op_2024" className="rounded border-slate-300 text-xs py-1" /><input type="number" id="op_2025" name="op_2025" className="rounded border-slate-300 text-xs py-1 bg-yellow-50" placeholder="필수" /></div>
                      <div className="grid grid-cols-3 gap-2 items-center"><label className="text-xs font-bold text-slate-700">당기순이익</label><input type="number" id="net_2024" name="net_2024" className="rounded border-slate-300 text-xs py-1" /><input type="number" id="net_2025" name="net_2025" className="rounded border-slate-300 text-xs py-1" /></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-balance-scale text-indigo-600 mr-2"></i> 재무상태표 (Balance Sheet)</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">자산총계</label><input type="number" id="assets" name="assets" placeholder="백만원" className="w-full rounded-lg border-slate-300 text-sm" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">부채총계</label><input type="number" id="liabilities" name="liabilities" placeholder="백만원" className="w-full rounded-lg border-slate-300 text-sm" /></div></div>
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">자본금</label><input type="number" id="capital" name="capital" placeholder="백만원" className="w-full rounded-lg border-slate-300 text-sm" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">부채비율 (자동)</label><input type="text" id="debtRatio" name="debtRatio" placeholder="%" className="w-full rounded-lg border-slate-300 bg-slate-100 text-sm text-right" readOnly /></div></div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="form-step-3" className="step-content hidden space-y-8 animate-fade-in-up">
                <div className="text-center mb-8"><h3 className="text-2xl font-bold text-slate-900">기술력과 성장 잠재력</h3><p className="text-slate-500 mt-2">인증, 특허, 수출 실적은 가점의 핵심입니다.</p></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-microscope text-purple-600 mr-2"></i> 기술 역량 (R&D)</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">기업부설연구소</label><select name="hasLab" className="w-full rounded-lg border-slate-300 text-sm"><option value="no">없음</option><option value="lab">연구소 보유</option><option value="dept">전담부서 보유</option></select></div><div><label className="block text-xs font-bold text-slate-600 mb-1">연구 전담 인력</label><input type="number" id="researchers" name="researchers" className="w-full rounded-lg border-slate-300 text-sm" placeholder="명" /></div></div>
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">R&D 투자액 (연간)</label><input type="number" id="rndSpend" name="rndSpend" className="w-full rounded-lg border-slate-300 text-sm" placeholder="백만원" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">기술 성숙도 (TRL)</label><select name="trl" className="w-full rounded-lg border-slate-300 text-sm"><option value="">단계 선택</option><option value="1-2">기초 연구 (1~2)</option><option value="3-4">실험/실증 (3~4)</option><option value="5-6">시제품 제작 (5~6)</option><option value="7-8">상용화 전 (7~8)</option><option value="9">사업화/양산 (9)</option></select></div></div>
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">지식재산권 (등록/출원)</label><div className="flex space-x-2"><input type="number" name="patents" className="flex-1 rounded-lg border-slate-300 text-sm" placeholder="특허 건수" /><input type="number" name="others" className="flex-1 rounded-lg border-slate-300 text-sm" placeholder="실용/디자인/상표" /></div></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-globe-americas text-blue-600 mr-2"></i> 수출 및 고용</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">직수출 실적</label><input type="number" id="export" name="directExport" className="w-full rounded-lg border-slate-300 text-sm" placeholder="백만불" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">간접수출 실적</label><input type="number" name="indirectExport" className="w-full rounded-lg border-slate-300 text-sm" placeholder="백만원 (Local L/C)" /></div></div>
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">전체 근로자 수</label><input type="number" id="employees" name="employees" className="w-full rounded-lg border-slate-300 text-sm" placeholder="명 (4대보험)" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">청년 근로자</label><input type="number" name="youthEmp" className="w-full rounded-lg border-slate-300 text-sm" placeholder="명 (만 34세 이하)" /></div></div>
                      <div><label className="flex items-center space-x-2 mt-2"><input type="checkbox" name="tomorrow" className="rounded text-blue-600" /><span className="text-sm text-slate-700">내일채움공제 가입 기업</span></label></div>
                    </div>
                  </div>
                </div>
                <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center"><i className="fas fa-award text-yellow-500 mr-2"></i> 보유 인증 (가점 사항)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {['벤처기업', '이노비즈', '메인비즈', '녹색인증', 'NET/NEP', '성과공유기업', '가족친화인증', '소부장전문', '뿌리기업', '여성기업', '장애인기업', '사회적기업', '청년창업', '수출유망중소', '글로벌강소'].map(cert => (
                      <label key={cert} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                        <input type="checkbox" name="certs" value={cert} className="rounded text-blue-600 focus:ring-blue-500" />
                        <span className="text-xs font-medium text-slate-700">{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div id="form-step-4" className="step-content hidden space-y-8 animate-fade-in-up">
                <div className="text-center mb-8"><h3 className="text-2xl font-bold text-slate-900">최종 목표를 선택해주세요.</h3><p className="text-slate-500 mt-2">입력하신 데이터를 바탕으로 가장 적합한 사업군을 우선 매칭합니다.</p></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {['funding|창업/사업화|예비/초기 창업 자금, 시제품 제작비', 'rnd|기술개발 (R&D)|신기술 개발, 공정 개선, 산학연 협력', 'loan|정책자금/융자|운전/시설 자금 융자, 보증서 발급', 'export|수출/판로|해외 마케팅, 전시회, 통번역 지원', 'hiring|인력/고용|청년/중장년 채용 지원금, 교육비', 'smart|스마트공장|자동화 설비, ERP/MES/PLM 구축'].map(opt => {
                    const [val, title, desc] = opt.split('|');
                    return (
                      <label key={val} className="p-6 border-2 border-slate-200 rounded-2xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all peer-checked:bg-blue-100 flex flex-col h-full relative group">
                        <input type="radio" name="interest" value={val} className="absolute top-6 right-6 w-5 h-5 text-blue-600" />
                        <div className="mb-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 text-xl border border-slate-100 group-hover:scale-110 transition-transform">
                          <i className={`fas fa-${val === 'funding' ? 'seedling' : val === 'rnd' ? 'flask' : val === 'loan' ? 'university' : val === 'export' ? 'plane' : val === 'hiring' ? 'user-plus' : 'robot'}`}></i>
                        </div>
                        <span className="font-bold text-lg text-slate-800 mb-2">{title}</span>
                        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-16 flex justify-between max-w-4xl mx-auto px-4">
                <button type="button" id="prev-btn" className="hidden px-8 py-4 bg-white text-slate-600 border border-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm"><i className="fas fa-arrow-left mr-2"></i> 이전</button>
                <button type="button" id="next-btn" className="ml-auto px-10 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xl transition-all transform hover:-translate-y-1 text-lg">다음 단계 <i className="fas fa-arrow-right ml-2"></i></button>
                <button type="button" id="submit-btn" className="hidden ml-auto px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-xl transition-all transform hover:-translate-y-1 animate-pulse text-lg"><i className="fas fa-search mr-2"></i> 정밀 분석 시작</button>
              </div>
            </form>
          </div>
        </div>

        {/* Loading Overlay (Customized) */}
        <div id="loading-overlay" className="hidden fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 w-48 h-48 border-4 border-slate-700 rounded-full transform -translate-x-4 -translate-y-4"></div>
            <div className="absolute inset-0 w-48 h-48 border-4 border-blue-500 border-t-transparent rounded-full animate-spin transform -translate-x-4 -translate-y-4"></div>
            <div className="relative w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] z-10 animate-pulse">
               <img src="/static/logo-horizontal.png" alt="MCE Logo" className="w-32 h-auto object-contain" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight text-center"><span className="text-blue-400">경영인증평가원 AI</span>가<br/>매칭중입니다</h3>
          <div className="text-blue-200 font-mono text-base mt-6 flex flex-col items-center space-y-3 w-80">
             <span id="loading-text" className="animate-pulse">데이터 분석 시작...</span>
             <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden shadow-inner"><div id="loading-bar" className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 w-0 transition-all duration-300"></div></div>
          </div>
        </div>

        {/* Results */}
        <div id="matching-results" className="hidden mt-12 space-y-8 animate-fade-in-up">
          <div className="bg-indigo-50 border-l-8 border-indigo-600 p-8 rounded-r-2xl mb-10 shadow-sm">
            <h3 className="text-2xl font-bold text-indigo-900">정밀 진단 완료</h3>
            <p className="text-indigo-800 mt-2 text-lg">입력하신 <strong>128가지 상세 지표</strong>를 기반으로 최적의 지원사업을 도출했습니다.</p>
          </div>
          <div id="results-list" className="space-y-6"></div>
        </div>

        {/* --- CUSTOM SUCCESS MODAL --- */}
        <div id="custom-success-modal" className="hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-fade-in-up border border-slate-100">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <img src="/static/logo-horizontal.png" alt="MCE" className="w-16 h-auto" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">연동 완료</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              <span className="font-bold text-blue-600">경영인증평가원</span> 데이터베이스와<br/>
              성공적으로 연동되었습니다.
            </p>
            <button onclick="document.getElementById('custom-success-modal').classList.add('hidden')" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
              확인
            </button>
          </div>
        </div>

        {/* --- DEEP DIVE ARTICLE (3 Pages Content) --- */}
        <div className="mt-40 pt-20 border-t border-slate-200">
          
          <div className="text-center mb-24">
            <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm border border-indigo-500/30 px-4 py-1 rounded-full bg-indigo-50">Premium Report</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 leading-tight">
              성공하는 기업의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">숨겨진 전략</span>을 공개합니다.
            </h2>
            <p className="mt-6 text-slate-500 text-lg max-w-3xl mx-auto">
              수만 개의 기업을 컨설팅하며 축적된 MCE만의 데이터와 노하우.<br/>
              왜 누군가는 1억을 지원받고, 누군가는 탈락하는지 그 비밀을 파헤칩니다.
            </p>
          </div>

          {/* PART 1: Data Sovereignty */}
          <div className="mb-32">
            <div className="flex flex-col md:flex-row items-center gap-16">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl transform rotate-3"></div>
                  <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Data Analytics" className="relative rounded-2xl shadow-2xl w-full h-auto object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-2">Part 1. 데이터의 힘</h3>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">"감"으로 찍는 시대는 지났습니다.<br/>이제는 "수치"로 증명해야 합니다.</h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  과거의 정부지원사업은 컨설턴트의 개인적인 경험이나 '카더라' 통신에 의존했습니다. 
                  하지만 이제는 다릅니다. 심사위원들은 <strong>객관적인 지표(KPI)</strong>를 통해 기업을 평가합니다.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
                    <span className="text-slate-700"><strong>DART/NICE 연동:</strong> 금융감독원 공시 데이터와 신용평가사 데이터를 실시간으로 반영하여 재무 건전성을 입증합니다.</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-blue-500 mt-1 mr-3"></i>
                    <span className="text-slate-700"><strong>객관적 역량 진단:</strong> 우리 회사의 R&D 투자율이 동종 업계 평균 대비 상위 몇 %인지 정확히 파악하고 강점을 부각합니다.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PART 2: Algorithm Secret (Dark) */}
          <div className="mb-32 bg-slate-900 rounded-3xl p-12 md:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full filter blur-[120px] opacity-30"></div>
            
            <div className="text-center mb-16 relative z-10">
              <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-2">Part 2. 알고리즘의 비밀</h3>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">남들이 보지 못하는<br/><span className="text-indigo-400">Hidden Gem(틈새 공고)</span>을 찾아냅니다.</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                모두가 아는 대형 사업은 경쟁률이 50:1을 넘습니다. 
                하지만 경영인증평가원 AI는 경쟁률 3:1 미만의 '알짜배기' 사업을 발굴하여 추천합니다.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
                <i className="fas fa-search-location text-3xl text-indigo-400 mb-6"></i>
                <h4 className="text-xl font-bold mb-3">지역 특화 사업 필터링</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  중앙 부처 공고뿐만 아니라, 전국 243개 지자체(시/군/구)의 로컬 사업을 크롤링하여 우리 지역 기업만 신청 가능한 사업을 매칭합니다.
                </p>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
                <i className="fas fa-hourglass-half text-3xl text-indigo-400 mb-6"></i>
                <h4 className="text-xl font-bold mb-3">마감 임박 긴급 매칭</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  접수 마감 3일 전, 경쟁률이 예상보다 낮은 공고를 실시간으로 포착하여 긴급 알림을 보냅니다. 준비된 기업에게는 최고의 기회입니다.
                </p>
              </div>
              <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500 transition-colors">
                <i className="fas fa-tags text-3xl text-indigo-400 mb-6"></i>
                <h4 className="text-xl font-bold mb-3">키워드 연관성 분석</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  단순히 'IT'로 검색하지 않습니다. 'AI', '빅데이터', 'SaaS' 등 세부 기술 키워드 간의 연관성을 NLP로 분석하여 숨겨진 공고를 찾아냅니다.
                </p>
              </div>
            </div>
          </div>

          {/* PART 3: Success Roadmap */}
          <div className="mb-24">
            <div className="flex flex-col md:flex-row-reverse items-center gap-16">
              <div className="md:w-1/2">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-l from-green-100 to-teal-100 rounded-3xl transform -rotate-3"></div>
                  <img src="https://images.unsplash.com/photo-1553877612-823241c4aa69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Growth Chart" className="relative rounded-2xl shadow-2xl w-full h-auto object-cover transform rotate-3 hover:rotate-0 transition-transform duration-500" />
                </div>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-sm font-bold text-teal-600 uppercase tracking-wider mb-2">Part 3. 기업 성장 로드맵</h3>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">1억 원의 지원금,<br/>기업 가치 100억 원의 씨앗이 됩니다.</h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                  정부지원사업은 단순한 '공돈'이 아닙니다. 그것은 정부가 귀사의 기술력과 사업성을 보증한다는 <strong>가장 강력한 신용장(Credit)</strong>입니다.
                </p>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold mr-4">1</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Seed Stage (창업~3년)</h4>
                      <p className="text-sm text-slate-500">예비창업패키지/초기창업패키지로 시제품 제작비 확보 (최대 1억)</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold mr-4">2</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Growth Stage (3~7년)</h4>
                      <p className="text-sm text-slate-500">R&D 과제 및 창업도약패키지로 기술 고도화 및 스케일업 (최대 3~5억)</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold mr-4">3</div>
                    <div>
                      <h4 className="font-bold text-slate-800">Global Stage (7년 이상)</h4>
                      <p className="text-sm text-slate-500">수출바우처 및 스마트공장 사업으로 글로벌 경쟁력 확보 (수십억 규모)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-16 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">성공의 기회는 준비된 기업에게만 찾아옵니다.</h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              지금 바로 기업 진단을 시작하고, 놓치고 있던 성장 모멘텀을 확보하세요.<br/>
              경영인증평가원 AI가 귀사의 든든한 전략 참모가 되어드립니다.
            </p>
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" className="bg-blue-600 text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-blue-500 transition-all shadow-lg transform hover:-translate-y-1">
              지금 바로 AI 매칭 시작하기
            </button>
          </div>

        </div>

      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          // === MOCK DATA & Logic from previous version ===
          const grantDatabase = [
            { id: 1, title: '2026년 창업성장기술개발사업 디딤돌 창업과제', agency: '중소벤처기업부', type: 'R&D', maxAmount: '1.2억원', region: '전국', targetAge: '7년미만', certs: [], tags: ['기술개발', '초기창업'], deadline: '2026-02-28' },
            { id: 2, title: '2026년 스마트공장 보급확산사업 (기초)', agency: '중소벤처기업부', type: 'Smart', maxAmount: '5천만원', region: '전국', targetAge: '무관', certs: [], tags: ['제조업', '자동화'], deadline: '2026-03-15' },
            // ... (Rest of 30 items)
            { id: 3, title: '수출바우처사업 (내수기업)', agency: 'KOTRA', type: 'Export', maxAmount: '3천만원', region: '전국', targetAge: '무관', certs: [], tags: ['마케팅', '해외진출'], deadline: '2026-01-31' },
            { id: 30, title: '폐업자 재도전 성공패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '5천만원', region: '전국', targetAge: '무관', certs: [], tags: ['재창업', '교육'], deadline: '2026-03-01' }
          ];

          const corporateDB = {
            "태성정밀": {
              name: "태성정밀", bizNum: "123-45-67890", ceoName: "김태성", foundingDate: "2015-03", 
              address: "경기 수원시 팔달구", ksic: "C29271", mainProduct: "반도체 부품",
              rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600,
              assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100,
              rndSpend: 300, researchers: 5, export: 2, employees: 45
            },
            "미래테크": {
              name: "(주)미래테크", bizNum: "222-11-33333", ceoName: "박미래", foundingDate: "2020-01", 
              address: "서울 강남구 테헤란로", ksic: "J58221", mainProduct: "AI 소프트웨어",
              rev_2024: 2000, rev_2025: 3500, op_2024: -100, op_2025: -200, net_2024: -100, net_2025: -250,
              assets: 2000, liabilities: 800, capital: 1200, debtRatio: 66,
              rndSpend: 500, researchers: 8, export: 0, employees: 12
            }
          };

          // Logic
          let currentStep = 1;
          const totalSteps = 4;
          
          if(document.getElementById('next-btn')) {
             document.getElementById('next-btn').addEventListener('click', () => { if(currentStep < totalSteps) { currentStep++; updateUI(); } });
             document.getElementById('prev-btn').addEventListener('click', () => { if(currentStep > 1) { currentStep--; updateUI(); } });
             document.getElementById('submit-btn').addEventListener('click', runMatching);
          }

          function updateUI() {
             document.querySelectorAll('.step-content').forEach((el, idx) => {
                if(idx+1 === currentStep) el.classList.remove('hidden'); else el.classList.add('hidden');
             });
             document.querySelectorAll('.step-dot').forEach((el, idx) => {
                if(idx+1 <= currentStep) { el.classList.remove('bg-slate-200','text-slate-500'); el.classList.add('bg-blue-600','text-white'); }
                else { el.classList.remove('bg-blue-600','text-white'); el.classList.add('bg-slate-200','text-slate-500'); }
             });
             if(currentStep === 1) document.getElementById('prev-btn').classList.add('hidden'); else document.getElementById('prev-btn').classList.remove('hidden');
             if(currentStep === totalSteps) { document.getElementById('next-btn').classList.add('hidden'); document.getElementById('submit-btn').classList.remove('hidden'); }
             else { document.getElementById('next-btn').classList.remove('hidden'); document.getElementById('submit-btn').classList.add('hidden'); }
             document.getElementById('step-wizard').scrollIntoView({ behavior: 'smooth' });
          }

          // Custom Modal Function
          function showSuccessModal() {
             const modal = document.getElementById('custom-success-modal');
             modal.classList.remove('hidden');
          }

          function fillDemoData() {
             document.getElementById('companyName').value = '(주)미래테크';
             document.querySelector('input[name="bizNum"]').value = '123-45-67890';
             // ... (rest of demo fill logic)
             alert('데모 데이터가 입력되었습니다.');
          }

          function autoFetchDartData() {
             const input = document.getElementById('company-search-input');
             const name = input.value.trim();
             const btn = event.currentTarget;
             const org = btn.innerHTML;
             
             if(!name) return alert('기업명을 입력하세요.');
             
             btn.disabled = true;
             btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>조회중...';
             
             setTimeout(() => {
                const data = corporateDB[name];
                if(data) {
                   document.getElementById('companyName').value = data.name;
                   document.getElementById('bizNum').value = data.bizNum;
                   document.getElementById('ceoName').value = data.ceoName;
                   document.getElementById('foundingDate').value = data.foundingDate;
                   document.getElementById('address').value = data.address;
                   document.getElementById('ksic').value = data.ksic;
                   document.getElementById('mainProduct').value = data.mainProduct;
                   
                   document.getElementById('rev_2024').value = data.rev_2024;
                   document.getElementById('rev_2025').value = data.rev_2025;
                   document.getElementById('op_2024').value = data.op_2024;
                   document.getElementById('op_2025').value = data.op_2025;
                   document.getElementById('net_2024').value = data.net_2024;
                   document.getElementById('net_2025').value = data.net_2025;
                   document.getElementById('assets').value = data.assets;
                   document.getElementById('liabilities').value = data.liabilities;
                   document.getElementById('capital').value = data.capital;
                   document.getElementById('debtRatio').value = data.debtRatio;
                   
                   document.getElementById('rndSpend').value = data.rndSpend;
                   document.getElementById('researchers').value = data.researchers;
                   document.getElementById('export').value = data.export;
                   document.getElementById('employees').value = data.employees;
                   
                   document.getElementById('dart-badge').classList.remove('hidden');
                   
                   // Show Custom Modal instead of alert
                   showSuccessModal();
                } else {
                   alert('DART 미등록 기업입니다. 수동으로 입력해주세요.');
                }
                btn.disabled = false;
                btn.innerHTML = org;
             }, 1000);
          }
          
          function autoFetchFinancials() {
             // Similar logic for Step 2 button
             const btn = event.currentTarget;
             const org = btn.innerHTML;
             btn.innerHTML = '조회중...';
             setTimeout(() => {
                // ... populate financial data ...
                document.getElementById('revenue').value = 3500;
                // ...
                showSuccessModal(); // Reuse modal
                btn.innerHTML = org;
             }, 1000);
          }

          function runMatching() {
             document.getElementById('loading-overlay').classList.remove('hidden');
             const bar = document.getElementById('loading-bar');
             let w=0;
             const intv = setInterval(() => { w+=2; if(bar) bar.style.width=w+'%'; if(w>100) clearInterval(intv); }, 50);
             setTimeout(() => {
                document.getElementById('loading-overlay').classList.add('hidden');
                document.getElementById('matching-results').classList.remove('hidden');
                displayResults();
             }, 3000);
          }

          function displayResults() {
             const list = document.getElementById('results-list');
             list.innerHTML = '';
             grantDatabase.slice(0, 30).forEach((item, idx) => {
                const div = document.createElement('div');
                div.className = 'bg-white p-6 md:p-8 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-md hover:shadow-xl transition-all flex flex-col group relative overflow-hidden mb-6';
                
                let badge = '';
                if(idx===0) badge='<span class="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold mr-3 animate-pulse"><i class="fas fa-crown mr-1"></i>AI 추천 1위</span>';
                else if(idx<3) badge='<span class="bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full font-bold mr-3">TOP '+(idx+1)+'</span>';
                
                let hiddenGem = '';
                let reasoning = '귀사의 <strong>업력(7년 미만)</strong>과 <strong>매출 성장세</strong>가 긍정적으로 평가되었습니다.';
                
                if(item.maxAmount.includes('천만원')) {
                   hiddenGem = '<span class="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-bold mr-3"><i class="fas fa-gem mr-1"></i>틈새 공략</span>';
                   reasoning += ' 경쟁률이 낮아 선정이 유리한 알짜 공고입니다.';
                }

                div.innerHTML = \`
                   <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                      <div class="flex items-center flex-wrap gap-y-2 mb-2 md:mb-0">
                         \${badge} \${hiddenGem}
                         <span class="text-xs font-bold text-slate-500 border border-slate-200 px-2 py-1 rounded">\${item.agency}</span>
                         <span class="ml-3 text-xs font-bold text-red-500">D-\${Math.floor(Math.random()*60)+1}</span>
                      </div>
                      <div class="text-right"><span class="text-3xl font-extrabold text-blue-600">9\${9-idx%10}<span class="text-sm text-slate-400 font-normal">점</span></span></div>
                   </div>
                   <h4 class="text-xl font-bold text-slate-900 mb-3">\${item.title}</h4>
                   <p class="text-sm text-slate-600 mb-5 pb-5 border-b border-slate-100">\${item.maxAmount} | \${item.region} | \${item.tags.join(', ')}</p>
                   <div class="bg-slate-50 p-4 rounded-xl border border-slate-100 relative">
                      <div class="absolute top-0 left-0 w-1 h-full \${item.maxAmount.includes('천만원') ? 'bg-yellow-400' : 'bg-blue-500'} rounded-l-xl"></div>
                      <p class="text-sm text-slate-700 leading-relaxed"><strong class="\${item.maxAmount.includes('천만원') ? 'text-yellow-600' : 'text-blue-600'} block mb-1"><i class="fas fa-robot mr-2"></i>AI 분석</strong>\${reasoning}</p>
                   </div>
                   <div class="mt-4 flex justify-end">
                      <a href={\`https://search.naver.com/search.naver?query=\${encodeURIComponent(item.title)}\`} target="_blank" class="text-slate-500 hover:text-blue-600 text-sm font-medium flex items-center cursor-pointer transition-colors">
                         상세 공고 검색하기 (네이버) <i class="fas fa-search ml-2 text-xs"></i>
                      </a>
                   </div>
                \`;
                list.appendChild(div);
             });
          }
        `
      }} />
    </Layout>
  )
}
