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

      <script dangerouslySetInnerHTML={{
        __html: `
          // Mock DB with Expanded Data
          const corporateDB = {
            "태성정밀": {
              name: "태성정밀", bizNum: "123-45-67890", corpNum: "110111-1234567", ceoName: "김태성", foundingDate: "2015-03-15", 
              address: "경기 수원시 팔달구 효원로 123", ksic: "C29271", mainProduct: "반도체 장비 부품",
              // Financials (DART)
              rev_2024: 11000, rev_2025: 12500, op_2024: 600, op_2025: 850, net_2024: 400, net_2025: 600,
              assets: 8000, liabilities: 4000, capital: 4000, debtRatio: 100,
              // R&D & Certs (KIPRIS, KOITA)
              rndSpend: 300, researchers: 5, hasLab: '기업부설연구소 보유',
              certs: ['벤처기업', '이노비즈', 'ISO9001', '소부장전문'],
              // HR (NPS)
              employees: 45, youthEmp: 12
            },
            "삼성전자": {
               name: "삼성전자(주)", bizNum: "124-81-00998", corpNum: "130111-0006246", ceoName: "한종희", foundingDate: "1969-01-13",
               address: "경기 수원시 영통구 삼성로 129", ksic: "C264", mainProduct: "가전제품, 통신기기",
               rev_2024: 2589355, rev_2025: 3000000, op_2024: 65670, op_2025: 100000, net_2024: 55000, net_2025: 80000,
               assets: 4559000, liabilities: 922000, capital: 3637000, debtRatio: 25,
               rndSpend: 280000, researchers: 50000, hasLab: '기업부설연구소 보유',
               certs: ['메인비즈', '녹색인증', 'ISO9001', 'ISO14001'],
               employees: 120000, youthEmp: 40000
            }
          };

          const grantDatabase = [
            { 
              id: 1, title: '2026년 창업성장기술개발사업 디딤돌 창업과제', agency: '중소벤처기업부', type: 'R&D', maxAmount: '1.2억원', region: '전국', targetAge: '7년미만', certs: [], tags: ['기술개발', '초기창업'], deadline: '2026-02-28',
              link: 'https://www.smtech.go.kr/front/main/main.do',
              reasonTemplate: '귀사는 <strong>창업 7년 미만 기업</strong>으로 본 사업의 핵심 지원 대상입니다. 특히 <strong>기업부설연구소</strong>를 보유하고 있어 R&D 역량 평가에서 높은 가점이 예상됩니다. 최근 매출 성장세가 뚜렷하여 사업화 가능성 평가에서도 긍정적인 결과를 얻을 수 있습니다.'
            },
            { 
              id: 2, title: '2026년 스마트공장 보급확산사업', agency: '중기부', type: 'Smart', maxAmount: '5천만원', region: '전국', tags: ['제조혁신'], deadline: '2026-03-15',
              link: 'https://www.smart-factory.kr/',
              reasonTemplate: '제조업종(C29)을 영위하고 계시므로 <strong>제조 혁신을 위한 스마트공장 도입</strong>이 필수적입니다. 현재 매출 규모(100억 이상)를 고려할 때, 기초 단계보다는 <strong>고도화 단계 진입</strong>을 목표로 하는 것이 유리하며, 생산성 향상을 위한 자동화 설비 도입에 최적화된 사업입니다.'
            },
            { 
              id: 3, title: '수출바우처사업', agency: 'KOTRA', type: 'Export', maxAmount: '3천만원', region: '전국', tags: ['해외진출'], deadline: '2026-01-31',
              link: 'https://www.exportvoucher.com/',
              reasonTemplate: '<strong>글로벌 시장 진출</strong>을 계획 중이시라면 반드시 신청해야 할 사업입니다. 귀사의 주력 품목은 해외 수요가 높은 분야로, 해외 마케팅 및 전시회 참가 지원을 통해 수출 실적을 단기간에 끌어올릴 수 있는 잠재력이 매우 큽니다. 수출 실적이 없더라도 내수기업 전형으로 지원 가능합니다.'
            },
            { 
              id: 4, title: '청년일자리 도약장려금', agency: '고용노동부', type: 'Hiring', maxAmount: '1,200만원', region: '전국', tags: ['채용지원'], deadline: '2026-12-31',
              link: 'https://www.work.go.kr/youthjob/',
              reasonTemplate: '최근 <strong>청년 근로자 고용 실적</strong>이 확인되어 지원 가능성이 매우 높습니다. 만 34세 이하 청년을 정규직으로 채용하고 6개월 이상 고용 유지 시, 인건비 부담을 획기적으로 줄일 수 있습니다. 귀사의 고용 증가 추세를 볼 때, 최대 지원 한도까지 혜택을 받을 수 있을 것으로 분석됩니다.'
            },
            { 
              id: 5, title: '중소기업 혁신바우처', agency: '중진공', type: 'Consulting', maxAmount: '5천만원', region: '전국', tags: ['마케팅', '컨설팅'], deadline: '2026-04-30',
              link: 'https://www.mssmiv.com/',
              reasonTemplate: '최근 3년 평균 매출액 120억 이하의 제조 소기업에게 주어지는 혜택입니다. <strong>기술지원, 마케팅, 컨설팅</strong> 등 필요한 분야를 선택하여 패키지 형태로 지원받을 수 있습니다. 특히 귀사와 같이 성장기에 진입한 제조기업의 경우, 마케팅 바우처를 통해 브랜드 인지도를 높이는 전략이 유효합니다.'
            },
            { 
              id: 6, title: '스마트공장 고도화 지원사업', agency: '중기부', type: 'Smart', maxAmount: '2억원', region: '전국', tags: ['고도화', 'AI적용'], deadline: '2026-03-31',
              link: 'https://www.smart-factory.kr/',
              reasonTemplate: '기존 스마트공장 구축 경험이 있거나, 생산 공정의 데이터 수집이 가능한 수준이라면 <strong>고도화 사업</strong>에 도전해 보십시오. AI 및 IoT 기술을 접목하여 공정 불량률을 획기적으로 개선할 수 있습니다. 귀사의 기술력과 R&D 투자 현황은 고도화 사업 선정에 긍정적인 요소로 작용할 것입니다.'
            },
            { 
              id: 7, title: '수출유망중소기업 지정', agency: '중기부', type: 'Export', maxAmount: '지원우대', region: '전국', tags: ['수출지원'], deadline: '2026-05-31',
              link: 'https://www.smes.go.kr/exportcenter/',
              reasonTemplate: '수출 지원사업 참여 시 가점 부여, 정책자금 금리 우대 등 다양한 혜택이 있는 <strong>인증 제도</strong>입니다. 귀사의 기술력과 제품 경쟁력을 바탕으로 수출유망중소기업으로 지정된다면, 향후 2년간 정부 지원사업에서 유리한 고지를 선점할 수 있습니다. 벤처/이노비즈 인증과 시너지 효과가 큽니다.'
            },
            { 
              id: 8, title: 'IP나래 프로그램', agency: '특허청', type: 'R&D', maxAmount: '1,750만원', region: '지역별', tags: ['특허전략'], deadline: '2026-02-15',
              link: 'https://www.ripc.org/pms/html/support/business_guide.do',
              reasonTemplate: '창업 7년 이내의 기술 기반 기업에게 <strong>강력한 특허 포트폴리오</strong> 구축을 지원합니다. 귀사가 보유한 기술을 특허로 권리화하고, 경쟁사의 특허 침해를 방지하는 전략을 수립할 수 있습니다. R&D 투자 비중이 높은 귀사의 특성상, IP 경영 전략 수립은 필수적입니다.'
            },
            { 
              id: 9, title: '데이터바우처 지원사업', agency: '과기부', type: 'Smart', maxAmount: '6천만원', region: '전국', tags: ['AI가공'], deadline: '2026-04-10',
              link: 'https://kdata.or.kr/datavoucher/',
              reasonTemplate: '비즈니스 혁신을 위해 <strong>데이터 구매 및 가공</strong>이 필요한 경우 최적의 사업입니다. AI 솔루션 도입이나 마케팅 데이터 분석 등 다양한 목적으로 활용 가능합니다. 귀사의 업종 특성상 데이터 기반의 의사결정 체계를 구축한다면 생산 효율성을 크게 높일 수 있을 것입니다.'
            },
            { 
              id: 10, title: '예비창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '5천만원', region: '전국', tags: ['예비창업'], deadline: '2026-02-28',
              link: 'https://www.k-startup.go.kr/',
              reasonTemplate: '혁신적인 아이디어를 보유한 예비 창업자에게 <strong>사업화 자금과 멘토링</strong>을 지원합니다. 아직 사업자 등록을 하지 않으셨거나, 새로운 법인 설립을 고려 중이시라면 가장 먼저 검토해야 할 사업입니다. 귀사의 기술 아이템은 시장성이 높아 선정 가능성이 매우 긍정적으로 평가됩니다.'
            },
            { 
              id: 11, title: '초기창업패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '7천만원', region: '전국', tags: ['3년미만'], deadline: '2026-03-20',
              link: 'https://www.k-startup.go.kr/',
              reasonTemplate: '창업 3년 이내의 기업에게 <strong>시제품 제작 및 판로 개척</strong> 비용을 지원합니다. 귀사는 초기 시장 진입에 성공하여 매출이 발생하고 있는 단계이므로, 본 사업을 통해 스케일업(Scale-up)의 발판을 마련할 수 있습니다. 특히 초기 투자 유치 실적이 있다면 선정 확률이 더욱 높아집니다.'
            },
            { 
              id: 12, title: '창업도약패키지', agency: '창업진흥원', type: 'Funding', maxAmount: '1.2억원', region: '전국', tags: ['3-7년'], deadline: '2026-03-31',
              link: 'https://www.k-startup.go.kr/',
              reasonTemplate: '창업 3~7년차, 이른바 데스밸리(Death Valley)를 극복하고 <strong>도약(Jump-up)</strong>하려는 기업을 위한 사업입니다. 귀사의 매출 성장세와 고용 창출 실적은 이 단계의 기업이 보여줄 수 있는 모범적인 지표입니다. 사업 모델 고도화 및 글로벌 진출 자금으로 활용하기에 매우 적합합니다.'
            },
            { 
              id: 13, title: '산재예방시설 융자', agency: '안전보건공단', type: 'Loan', maxAmount: '10억원', region: '전국', tags: ['안전설비'], deadline: '상시접수',
              link: 'https://clean.kosha.or.kr/',
              reasonTemplate: '제조 현장의 <strong>안전성 확보 및 작업 환경 개선</strong>을 위한 자금을 장기 저리로 융자 지원합니다. 노후 설비 교체나 위험 공정 개선이 필요한 경우, 이 사업을 통해 금융 비용 부담을 최소화하면서 시설 투자를 진행할 수 있습니다. 클린사업장 인정과 연계하면 추가 혜택도 가능합니다.'
            }
          ];

          document.addEventListener('DOMContentLoaded', () => {
            console.log('SupportMatching Script Loaded');
            
            // --- Elements ---
            const btnFillDemo = document.getElementById('btn-fill-demo');
            const btnAutoFetch = document.getElementById('btn-auto-fetch');
            const btnNext = document.getElementById('next-btn');
            const btnPrev = document.getElementById('prev-btn');
            const btnSubmit = document.getElementById('submit-btn');
            const btnCloseSuccess = document.getElementById('btn-close-success');
            const btnManualInput = document.getElementById('btn-manual-input');
            const companyInput = document.getElementById('company-search-input');
            
            // --- Wizard Logic ---
            let currentStep = 1;
            const totalSteps = 4;

            function updateUI() {
               document.querySelectorAll('.step-content').forEach((el, idx) => {
                  if(idx+1 === currentStep) el.classList.remove('hidden'); else el.classList.add('hidden');
               });
               document.querySelectorAll('.step-dot').forEach((el, idx) => {
                  if(idx+1 <= currentStep) { el.classList.remove('bg-slate-200','text-slate-500'); el.classList.add('bg-blue-600','text-white'); }
                  else { el.classList.remove('bg-blue-600','text-white'); el.classList.add('bg-slate-200','text-slate-500'); }
               });
               if(currentStep === 1) btnPrev.classList.add('hidden'); else btnPrev.classList.remove('hidden');
               if(currentStep === totalSteps) { btnNext.classList.add('hidden'); btnSubmit.classList.remove('hidden'); }
               else { btnNext.classList.remove('hidden'); btnSubmit.classList.add('hidden'); }
               document.getElementById('step-wizard').scrollIntoView({ behavior: 'smooth' });
            }

            if(btnNext) btnNext.addEventListener('click', () => { if(currentStep < totalSteps) { currentStep++; updateUI(); } });
            if(btnPrev) btnPrev.addEventListener('click', () => { if(currentStep > 1) { currentStep--; updateUI(); } });
            
            // --- Demo Fill ---
            if(btnFillDemo) {
              btnFillDemo.addEventListener('click', () => {
                 if(companyInput) companyInput.value = '태성정밀';
                 alert('데모 기업명(태성정밀)이 입력되었습니다. [데이터 연동] 버튼을 눌러주세요.');
              });
            }
            
            // --- Auto Fetch Logic ---
            if(btnAutoFetch) {
              btnAutoFetch.addEventListener('click', () => {
                 const name = companyInput.value.trim();
                 if(!name) return alert('기업명을 입력하세요.');
                 
                 // Show Loading Modal
                 const loadingModal = document.getElementById('data-loading-modal');
                 loadingModal.classList.remove('hidden');
                 
                 // Reset logs
                 document.getElementById('log-nps').classList.add('hidden');
                 document.getElementById('log-cert').classList.add('hidden');

                 // Simulate Multi-source Fetching
                 setTimeout(() => { document.getElementById('log-nps').classList.remove('hidden'); }, 800);
                 setTimeout(() => { document.getElementById('log-cert').classList.remove('hidden'); }, 1600);

                 setTimeout(() => {
                    loadingModal.classList.add('hidden');
                    
                    const data = corporateDB[name];
                    if(data) {
                       // SUCCESS: Fill Data
                       document.getElementById('companyName').value = data.name;
                       document.getElementById('bizNum').value = data.bizNum;
                       document.getElementById('corpNum').value = data.corpNum;
                       document.getElementById('ceoName').value = data.ceoName;
                       document.getElementById('foundingDate').value = data.foundingDate;
                       document.getElementById('address').value = data.address;
                       
                       // 2. HR Info
                       document.getElementById('employees').value = data.employees;
                       document.getElementById('youthEmp').value = data.youthEmp;

                       // 3. Financials
                       document.getElementById('rev_2024').value = data.rev_2024;
                       document.getElementById('rev_2025').value = data.rev_2025;
                       document.getElementById('op_2024').value = data.op_2024;
                       document.getElementById('op_2025').value = data.op_2025;
                       document.getElementById('net_2024').value = data.net_2024;
                       document.getElementById('net_2025').value = data.net_2025;
                       document.getElementById('assets').value = data.assets;
                       document.getElementById('liabilities').value = data.liabilities;
                       document.getElementById('capital').value = data.capital;
                       document.getElementById('debtRatio').value = data.debtRatio + '%';

                       // 4. R&D & Certs
                       document.getElementById('labStatus').value = data.hasLab;
                       document.getElementById('researchers').value = data.researchers;
                       document.getElementById('rndSpend').value = data.rndSpend;
                       
                       // Auto-check Certs
                       if(data.certs) {
                          data.certs.forEach(cert => {
                             const checkbox = document.getElementById('cert-'+cert);
                             if(checkbox) checkbox.checked = true;
                          });
                       }

                       // Show Badges & Success Modal
                       document.getElementById('data-status-area').classList.remove('hidden');
                       document.getElementById('badge-dart').classList.remove('hidden');
                       document.getElementById('badge-nps').classList.remove('hidden');
                       document.getElementById('badge-cert').classList.remove('hidden');
                       
                       document.getElementById('custom-success-modal').classList.remove('hidden');
                    } else {
                       // FAILURE: Show Manual Input Modal
                       document.getElementById('not-found-modal').classList.remove('hidden');
                    }
                 }, 2500);
              });
            }

            // --- Modal Close Handlers ---
            if(btnCloseSuccess) {
              btnCloseSuccess.addEventListener('click', () => {
                document.getElementById('custom-success-modal').classList.add('hidden');
              });
            }
            if(btnManualInput) {
              btnManualInput.addEventListener('click', () => {
                document.getElementById('not-found-modal').classList.add('hidden');
                document.getElementById('companyName').focus(); // Focus on first input
                // Ensure inputs are writable (they are by default in this code)
              });
            }

            // --- Submit Logic ---
            if(btnSubmit) {
               btnSubmit.addEventListener('click', () => {
                 document.getElementById('loading-overlay').classList.remove('hidden');
                 const bar = document.getElementById('loading-bar');
                 let w=0;
                 const intv = setInterval(() => { w+=2; if(bar) bar.style.width=w+'%'; if(w>100) clearInterval(intv); }, 50);
                 setTimeout(() => {
                    document.getElementById('loading-overlay').classList.add('hidden');
                    document.getElementById('matching-results').classList.remove('hidden');
                    const list = document.getElementById('results-list');
                    list.innerHTML = '';
                    
                    // Filter Logic (Simple Mock)
                    const empCount = parseInt(document.getElementById('employees').value || '0');
                    const isRnd = document.querySelector('input[name="interest"]:checked')?.value === 'rnd';
                    
                    let count = 0;
                    grantDatabase.forEach((item) => {
                       // LIMIT REMOVED: Show all matches
                       // Mock filtering: show hiring grants if emp > 10, rnd if rnd selected
                       let score = 80;
                       if(isRnd && item.type === 'R&D') score += 15;
                       if(empCount > 5 && item.type === 'Hiring') score += 10;
                       
                       const div = document.createElement('div');
                       div.className = 'bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 shadow-sm mb-4 transition-all hover:shadow-md';
                       div.innerHTML = \`
                         <div class="flex justify-between items-start">
                           <div>
                             <span class="inline-block bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded mb-2">\${item.agency}</span>
                             <h4 class="font-bold text-lg text-slate-800 mb-1">\${item.title}</h4>
                             <p class="text-sm text-slate-500 mb-3">\${item.tags.join(', ')} | 최대 \${item.maxAmount}</p>
                           </div>
                           <div class="text-right">
                             <div class="text-2xl font-bold text-blue-600">\${score}%</div>
                             <div class="text-xs text-slate-400">매칭률</div>
                           </div>
                         </div>
                         
                         <!-- AI Reason Section (New) -->
                         <div class="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div class="flex items-start">
                               <i class="fas fa-robot text-blue-500 mt-1 mr-2"></i>
                               <div>
                                  <p class="text-xs font-bold text-slate-500 mb-1">AI 매칭 분석 결과</p>
                                  <p class="text-sm text-slate-700 leading-relaxed text-justify">\${item.reasonTemplate}</p>
                               </div>
                            </div>
                         </div>

                         <div class="border-t border-slate-100 pt-3 mt-3 flex justify-between items-center">
                            <span class="text-xs text-red-500 font-bold"><i class="far fa-clock mr-1"></i> 마감: \${item.deadline}</span>
                            <a href="\${item.link}" target="_blank" class="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-700 inline-flex items-center">
                               공고 확인 <i class="fas fa-external-link-alt ml-2"></i>
                            </a>
                         </div>
                       \`;
                       list.appendChild(div);
                       count++;
                    });
                 }, 3000);
               });
            }

          });
        `
      }} />
    </Layout>
  )
}
