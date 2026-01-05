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
            <i className="fas fa-database mr-2"></i>공공/민간 데이터 12종 통합 연동
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            대표님, 기업명만 입력하세요.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">모든 서류 데이터</span>는 AI가 찾아옵니다.
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            DART(재무), 고용보험(인력), 이노비즈(인증) 등 흩어진 기업 정보를<br/>
            <strong>원클릭으로 수집(Scraping)</strong>하여 최적의 지원금을 매칭합니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Tool */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden mb-24 relative transform -translate-y-10">
          <div className="bg-gradient-to-r from-white to-slate-50 px-8 py-5 border-b border-slate-200 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
              <span className="text-sm font-bold text-slate-800">통합 데이터 수집 시스템 대기 중</span>
            </div>
            <div className="flex items-center space-x-3">
               <button id="btn-fill-demo" type="button" className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded hover:bg-slate-200 transition-colors">
                 <i className="fas fa-magic mr-1"></i>데모(태성정밀)
               </button>
               <div className="text-xs font-mono text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                 Live API Status: OK
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
                <span>기업식별/인력</span>
                <span>정밀재무</span>
                <span>기술/인증</span>
                <span>사업전략</span>
              </div>
            </div>

            <form id="matching-form" onsubmit="event.preventDefault();">
              
              {/* Step 1: Integrated Data Collection */}
              <div id="form-step-1" className="step-content space-y-8 animate-fade-in-up">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900">원클릭 기업 데이터 수집</h3>
                  <p className="text-slate-500 mt-2">기업명만 입력하면 <strong>DART, 고용부, 인증협회</strong> 데이터를 자동으로 연동합니다.</p>
                </div>
                
                {/* Search Bar */}
                <div className="max-w-3xl mx-auto bg-slate-800 p-2 rounded-2xl shadow-lg flex mb-6 relative z-20">
                  <input type="text" id="company-search-input" placeholder="기업명을 입력하세요 (예: 태성정밀, 삼성전자)" className="flex-1 bg-white border-none rounded-xl px-6 text-lg focus:ring-2 focus:ring-blue-500" />
                  <button type="button" id="btn-auto-fetch" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-500 transition-colors ml-2 flex items-center whitespace-nowrap">
                    <i className="fas fa-search mr-2"></i> 데이터 연동
                  </button>
                </div>

                {/* Source Badges */}
                <div className="flex justify-center flex-wrap gap-2 mb-10 text-[10px] font-bold text-slate-400 uppercase">
                  <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><i className="fas fa-check-circle text-green-500 mr-1"></i>DART (재무)</span>
                  <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><i className="fas fa-check-circle text-green-500 mr-1"></i>고용보험 (인력)</span>
                  <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><i className="fas fa-check-circle text-green-500 mr-1"></i>벤처인 (인증)</span>
                  <span className="flex items-center bg-slate-100 px-2 py-1 rounded"><i className="fas fa-check-circle text-green-500 mr-1"></i>KED (신용)</span>
                </div>

                {/* Status Badges Area (Initially Hidden) */}
                <div id="data-status-area" className="hidden max-w-5xl mx-auto mb-6">
                   <div className="flex flex-wrap gap-2 justify-center">
                      <span id="badge-dart" className="hidden bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold border border-blue-200 animate-pulse">
                        <i className="fas fa-file-invoice-dollar mr-1"></i>DART 재무 연동됨
                      </span>
                      <span id="badge-nps" className="hidden bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200 animate-pulse">
                        <i className="fas fa-users mr-1"></i>고용보험 인력 연동됨
                      </span>
                      <span id="badge-cert" className="hidden bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-200 animate-pulse">
                        <i className="fas fa-certificate mr-1"></i>인증정보 연동됨
                      </span>
                   </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  
                  {/* Card 1: Basic Info */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-slate-200 text-slate-500 text-[10px] font-bold px-2 py-1 rounded-bl-lg">DART + 등기소</div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-building text-blue-600 mr-2"></i> 기업 식별 정보</h4>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">기업명</label><input type="text" id="companyName" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">사업자등록번호</label><input type="text" id="bizNum" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div>
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">법인등록번호</label><input type="text" id="corpNum" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">대표자명</label><input type="text" id="ceoName" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div>
                        <div><label className="block text-xs font-bold text-slate-600 mb-1">설립일자</label><input type="text" id="foundingDate" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div>
                      </div>
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">본점 주소</label><input type="text" id="address" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div>
                    </div>
                  </div>

                  {/* Card 2: HR Info (NPS/Employment Insurance) */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">고용노동부/국민연금</div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-user-friends text-green-600 mr-2"></i> 인력 및 고용 현황</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">총 근로자 수</label>
                          <div className="relative">
                            <input type="number" id="employees" className="w-full rounded-lg border-slate-300 text-sm bg-white font-bold text-slate-800" />
                            <span className="absolute right-3 top-2 text-xs text-slate-400">명</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-600 mb-1">청년 근로자 (만 34세↓)</label>
                          <div className="relative">
                            <input type="number" id="youthEmp" className="w-full rounded-lg border-slate-300 text-sm bg-white" />
                            <span className="absolute right-3 top-2 text-xs text-slate-400">명</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">최근 1년 채용/퇴사</label>
                        <div className="flex space-x-2">
                           <span className="flex-1 bg-green-50 border border-green-200 rounded-lg py-2 px-3 text-xs text-green-700 font-bold"><i className="fas fa-plus mr-1"></i> 입사 12명</span>
                           <span className="flex-1 bg-red-50 border border-red-200 rounded-lg py-2 px-3 text-xs text-red-700 font-bold"><i className="fas fa-minus mr-1"></i> 퇴사 2명</span>
                        </div>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                        <p className="text-[11px] text-yellow-800 font-bold"><i className="fas fa-lightbulb mr-1"></i>고용 증가율 상위 10% 기업입니다.</p>
                        <p className="text-[10px] text-yellow-700">일자리 창출 관련 가점 2점 확보 가능</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Step 2: Financials (DART) */}
              <div id="form-step-2" className="step-content hidden space-y-8 animate-fade-in-up">
                <div className="text-center mb-8"><h3 className="text-2xl font-bold text-slate-900">재무제표 정밀 분석 (DART)</h3><p className="text-slate-500 mt-2">금융감독원에 공시된 표준 재무제표 데이터를 불러왔습니다.</p></div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                    <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">DART 표준재무제표</div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-chart-line text-blue-600 mr-2"></i> 손익계산서 (단위: 백만원)</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-2 text-center text-xs font-bold text-slate-500 mb-1"><span>항목</span><span>2024년</span><span>2025년</span></div>
                      <div className="grid grid-cols-3 gap-2 items-center"><label className="text-xs font-bold text-slate-700">매출액</label><input type="number" id="rev_2024" className="rounded border-slate-300 text-xs py-1 bg-white" /><input type="number" id="rev_2025" className="rounded border-slate-300 text-xs py-1 bg-white font-bold" /></div>
                      <div className="grid grid-cols-3 gap-2 items-center"><label className="text-xs font-bold text-slate-700">영업이익</label><input type="number" id="op_2024" className="rounded border-slate-300 text-xs py-1 bg-white" /><input type="number" id="op_2025" className="rounded border-slate-300 text-xs py-1 bg-white" /></div>
                      <div className="grid grid-cols-3 gap-2 items-center"><label className="text-xs font-bold text-slate-700">당기순이익</label><input type="number" id="net_2024" className="rounded border-slate-300 text-xs py-1 bg-white" /><input type="number" id="net_2025" className="rounded border-slate-300 text-xs py-1 bg-white" /></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                    <div className="absolute top-0 right-0 bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">DART 재무상태표</div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-balance-scale text-indigo-600 mr-2"></i> 재무상태표</h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">자산총계</label><input type="number" id="assets" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">부채총계</label><input type="number" id="liabilities" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div></div>
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">자본금</label><input type="number" id="capital" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">부채비율</label><input type="text" id="debtRatio" className="w-full rounded-lg border-slate-300 bg-slate-100 text-sm text-right font-bold text-blue-600" /></div></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Technology & Certification */}
              <div id="form-step-3" className="step-content hidden space-y-8 animate-fade-in-up">
                <div className="text-center mb-8"><h3 className="text-2xl font-bold text-slate-900">기술력 및 인증 현황</h3><p className="text-slate-500 mt-2">벤처인, 이노비즈협회, 특허청 데이터를 연동했습니다.</p></div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                    <div className="absolute top-0 right-0 bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">KOITA (산기협)</div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-microscope text-purple-600 mr-2"></i> 연구개발(R&D) 현황</h4>
                    <div className="space-y-4">
                      <div><label className="block text-xs font-bold text-slate-600 mb-1">연구소 보유</label><input type="text" id="labStatus" className="w-full rounded-lg border-slate-300 text-sm bg-white font-bold" /></div>
                      <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-bold text-slate-600 mb-1">연구전담요원</label><input type="number" id="researchers" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div><div><label className="block text-xs font-bold text-slate-600 mb-1">R&D 투자액</label><input type="number" id="rndSpend" className="w-full rounded-lg border-slate-300 text-sm bg-white" /></div></div>
                    </div>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative">
                    <div className="absolute top-0 right-0 bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-bl-lg">KIPRIS (특허청)</div>
                    <h4 className="font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2 flex items-center"><i className="fas fa-lightbulb text-orange-500 mr-2"></i> 지식재산권(IP) 보유</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-sm font-bold text-slate-700">특허 (등록)</span>
                        <span className="text-lg font-bold text-orange-600">3 건</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 rounded-lg border border-slate-200">
                        <span className="text-sm font-bold text-slate-700">상표/디자인</span>
                        <span className="text-lg font-bold text-slate-600">5 건</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Certifications Grid (Auto-checked) */}
                <div className="max-w-5xl mx-auto mt-8 bg-white p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center"><i className="fas fa-award text-yellow-500 mr-2"></i> 보유 인증 (자동 확인됨)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3" id="cert-grid">
                    {/* Checkboxes will be auto-checked by JS */}
                    {['벤처기업', '이노비즈', '메인비즈', '녹색인증', '기업부설연구소', 'ISO9001', 'ISO14001', '뿌리기업', '여성기업', '소부장전문'].map(cert => (
                      <label key={cert} className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                        <input type="checkbox" name="certs" value={cert} className="rounded text-blue-600 focus:ring-blue-500" id={`cert-${cert}`} />
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

        {/* Loading Overlay */}
        <div id="loading-overlay" className="hidden fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 mb-10">
            <div className="absolute inset-0 border-4 border-blue-500/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-4 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/static/mce-symbol.png" alt="경영인증평가원 로고" className="w-20 h-20 object-contain animate-pulse" />
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-white mb-2 tracking-tight text-center"><span className="text-blue-400">경영인증평가원 AI</span>가<br/>매칭중입니다</h3>
          <p className="text-slate-400 text-lg mb-8">대표님 기업에 딱 맞는 지원사업을 찾고 있습니다.</p>
          <div className="w-96 h-2 bg-slate-800 rounded-full overflow-hidden relative">
            <div id="loading-bar" className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 w-0"></div>
          </div>
          <div className="mt-4 text-sm text-slate-500 font-mono">
            Scanning 30,241 items...
          </div>
        </div>

        {/* Results Area */}
        <div id="matching-results" className="hidden mt-12 space-y-8 animate-fade-in-up">
           <div className="text-center mb-10">
             <h2 className="text-3xl font-bold text-slate-900 mb-2">🎉 정밀 진단이 완료되었습니다.</h2>
             <p className="text-slate-600">입력된 데이터를 기반으로 <span className="text-blue-600 font-bold">전체 추천 결과</span>를 표시합니다.</p>
           </div>
           
           <div id="results-list" className="space-y-6 max-w-5xl mx-auto">
             {/* Results will be injected here */}
           </div>

           <div className="text-center mt-12 bg-slate-50 p-8 rounded-2xl border border-slate-200 max-w-3xl mx-auto">
             <p className="font-bold text-slate-700 mb-4">원하는 결과를 찾지 못하셨나요?</p>
             <a href="https://search.naver.com/search.naver?query=2026년+정부지원사업+통합공고" target="_blank" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold transition-colors">
               <i className="fas fa-external-link-alt mr-2"></i> 네이버에서 전체 공고 검색하기
             </a>
           </div>
        </div>
        
        {/* Data Fetching Loading Modal */}
        <div id="data-loading-modal" className="hidden fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border border-slate-100">
              <div className="mb-6 flex justify-center">
                 <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">통합 데이터 수집 중...</h3>
              <div className="text-left space-y-2 text-xs text-slate-500 bg-slate-50 p-4 rounded-xl">
                 <p id="log-dart" className="flex items-center"><i className="fas fa-circle-notch fa-spin text-blue-500 mr-2"></i> 금융감독원 (DART) 접속...</p>
                 <p id="log-nps" className="flex items-center hidden"><i className="fas fa-circle-notch fa-spin text-green-500 mr-2"></i> 고용노동부 DB 조회...</p>
                 <p id="log-cert" className="flex items-center hidden"><i className="fas fa-circle-notch fa-spin text-purple-500 mr-2"></i> 벤처/이노비즈 인증 확인...</p>
              </div>
           </div>
        </div>

        {/* Success Modal */}
        <div id="custom-success-modal" className="hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-fade-in-up border border-slate-100">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <i className="fas fa-database text-3xl text-green-600"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">12종 데이터 연동 완료</h3>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              <span className="font-bold text-blue-600">DART, 고용부, 인증협회</span>의<br/>
              모든 데이터를 성공적으로 불러왔습니다.
            </p>
            <button id="btn-close-success" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg">
              확인
            </button>
          </div>
        </div>

        {/* Not Found Modal (Manual Input Guide) */}
        <div id="not-found-modal" className="hidden fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-fade-in-up border border-slate-100">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <i className="fas fa-edit text-3xl text-amber-600"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">등록된 데이터가 없습니다.</h3>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm">
              아직 공시 데이터가 없는 기업입니다.<br/>
              <span className="font-bold text-amber-600">직접 정보를 입력</span>해주시면<br/>
              AI가 정확하게 분석해드립니다.
            </p>
            <button id="btn-manual-input" className="w-full bg-amber-500 text-white py-3 rounded-xl font-bold hover:bg-amber-600 transition-colors shadow-lg">
              수기 입력 시작하기
            </button>
          </div>
        </div>

      </div>

      <script src="/static/js/matching.js"></script>
    </Layout>
  )
}
