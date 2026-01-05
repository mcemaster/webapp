import { Layout } from '../components/Layout'

export const Home = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      {/* ================= HERO SECTION ================= */}
      <section class="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="City Architecture" 
            class="w-full h-full object-cover opacity-30"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-900"></div>
        </div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-[-40px]">
          <div class="inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm mb-8 animate-fade-in-up">
            <span class="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            <span class="text-blue-300 text-sm font-medium tracking-wide">AI-Powered Corporate Support Platform</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-8">
            경영인증평가원은 단순한<br/>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">인증 기관이 아닙니다</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            DART/NICE 재무 데이터와 30,000건의 실시간 공고 DB를 기반으로<br/>
            기업의 <strong>성장 단계별 맞춤 지원 솔루션</strong>을 제공하는 통합 포털입니다.
          </p>
          
          <div class="flex flex-col sm:flex-row justify-center gap-5">
            <a href="/support-matching" class="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
              <i class="fas fa-robot mr-2"></i>정부지원사업 AI 매칭 (무료)
            </a>
            <a href="/rfq" class="px-10 py-4 bg-white text-slate-900 text-lg font-bold rounded-xl shadow-lg hover:bg-slate-100 transition-all transform hover:-translate-y-1">
              <i class="fas fa-handshake mr-2"></i>검증된 제조 파트너 매칭
            </a>
          </div>
        </div>

        <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <i class="fas fa-chevron-down text-xl"></i>
        </div>
      </section>

      {/* ================= QUICK ACCESS ================= */}
      <section class="relative z-20 mt-[-80px] pb-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid md:grid-cols-3 gap-6">
            <a href="http://www.mce.re.kr" target="_blank" class="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-72 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
              <div>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-2xl font-bold text-slate-900">국가 인증기관</h3>
                  <div class="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                    <i class="fas fa-certificate text-xl"></i>
                  </div>
                </div>
                <p class="text-slate-500 text-base leading-relaxed">
                  ISO 9001/14001, IATF 16949 등<br/>국제 표준 인증 심사 및 기업 SPEC 평가를 수행합니다.
                </p>
              </div>
              <span class="text-blue-600 font-bold text-base flex items-center mt-auto">
                심사 신청하기 <i class="fas fa-arrow-right ml-2 text-sm transition-transform group-hover:translate-x-1"></i>
              </span>
            </a>

            <a href="/support-matching" class="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:border-indigo-500 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-72 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
              <div>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-2xl font-bold text-slate-900">AI 지원사업 매칭</h3>
                  <div class="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                    <i class="fas fa-robot text-xl"></i>
                  </div>
                </div>
                <p class="text-slate-500 text-base leading-relaxed">
                  DART 재무 데이터와 연동된 AI가<br/>우리 기업이 받을 수 있는 정부 지원금을 찾아냅니다.
                </p>
              </div>
              <span class="text-indigo-600 font-bold text-base flex items-center mt-auto">
                무료 진단 시작 <i class="fas fa-arrow-right ml-2 text-sm transition-transform group-hover:translate-x-1"></i>
              </span>
            </a>

            <a href="http://www.mcicampus.com" target="_blank" class="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:border-teal-500 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between h-72 relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-1 bg-teal-500"></div>
              <div>
                <div class="flex items-center justify-between mb-6">
                  <h3 class="text-2xl font-bold text-slate-900">교육 연수원</h3>
                  <div class="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                    <i class="fas fa-graduation-cap text-xl"></i>
                  </div>
                </div>
                <p class="text-slate-500 text-base leading-relaxed">
                  품질 관리자 직무 교육 및<br/>ISO 심사원 양성 과정을 수강하세요.
                </p>
              </div>
              <span class="text-teal-600 font-bold text-base flex items-center mt-auto">
                연수원 바로가기 <i class="fas fa-arrow-right ml-2 text-sm transition-transform group-hover:translate-x-1"></i>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= ADVANTAGE PART 1: DATA INTELLIGENCE ================= */}
      <section class="py-24 bg-white border-t border-slate-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span class="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2 block">Advantage 01</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                검증되지 않은 정보는<br/>
                <span className="text-blue-600">취급하지 않습니다.</span>
              </h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                시중에는 검증되지 않은 기업 정보가 넘쳐납니다. 경영인증평가원은 국가 공인 데이터베이스와 직접 연동하여 
                <strong>'가장 정확한 기업의 현재'</strong>를 진단합니다.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <i className="fas fa-database text-xl"></i>
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold text-slate-900">DART & NICE 데이터 연동</h4>
                    <p className="mt-2 text-slate-600">금융감독원 전자공시시스템(DART)과 나이스평가정보의 신용 데이터를 실시간으로 동기화하여, 기업의 재무 건전성과 신용 등급을 100% 신뢰할 수 있는 수치로 제공합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                    <i className="fas fa-search-dollar text-xl"></i>
                  </div>
                  <div className="ml-5">
                    <h4 className="text-xl font-bold text-slate-900">30,000건의 공공 데이터 분석</h4>
                    <p className="mt-2 text-slate-600">100여 개 정부 부처 및 지자체의 지원사업 공고를 매일 크롤링하고 NLP(자연어 처리)로 분석합니다. 단순 검색으로는 찾을 수 없는 '숨겨진 1억 원'을 찾아내는 비결입니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-12 lg:mt-0">
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Data Analytics" className="relative rounded-3xl shadow-2xl w-full object-cover transform -rotate-3 hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADVANTAGE PART 2: FIELD EXPERTISE ================= */}
      <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-indigo-600 rounded-3xl transform -rotate-3 opacity-10"></div>
              <img src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Consulting" className="relative rounded-3xl shadow-2xl w-full object-cover transform rotate-3 hover:rotate-0 transition-transform duration-500" />
            </div>
            
            <div className="order-1 lg:order-2">
              <span className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2 block">Advantage 02</span>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                AI는 거들 뿐,<br/>
                핵심은 <span className="text-indigo-600">현장 심사원의 눈</span>입니다.
              </h2>
              <div className="w-20 h-1 bg-indigo-600 mb-8"></div>
              
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                데이터가 아무리 완벽해도 현장의 실력은 서류만으로 알 수 없습니다. 
                경영인증평가원은 20년 경력의 ISO 수석 심사원들이 직접 현장을 방문하여 검증합니다.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                    <i className="fas fa-user-check text-indigo-500 mr-3"></i> 3자 검증 시스템 (3rd Party Verification)
                  </h4>
                  <p className="text-slate-600 text-sm">
                    매칭 전, 경영인증평가원 전문 심사원이 공급 기업의 설비, 생산 능력, 품질 관리 상태를 직접 눈으로 확인하고 등급을 매깁니다. 발주사는 검증된 리포트만 받아보시면 됩니다.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center">
                    <i className="fas fa-file-signature text-indigo-500 mr-3"></i> 전문 심사원 풀(Pool) 보유
                  </h4>
                  <p className="text-slate-600 text-sm">
                    기계, 전기전자, 화학, SW 등 산업별 전문 자격을 갖춘 150여 명의 심사원 네트워크를 보유하고 있어, 해당 업종의 언어로 정확하게 소통하고 평가합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADVANTAGE PART 3: TOTAL LIFECYCLE CARE ================= */}
      <section class="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-blue-400 font-bold tracking-widest uppercase text-sm mb-2 block">Advantage 03</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
              인증부터 매칭까지,<br/>기업 성장의 <span className="text-blue-400">A to Z</span>를 책임집니다.
            </h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
              필요할 때만 찾는 서비스가 아닙니다. 기업의 탄생부터 성장, 글로벌 진출까지<br/>
              전 생애주기(Lifecycle)에 필요한 솔루션을 원스톱으로 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors group">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl group-hover:scale-110 transition-transform text-blue-400">
                <i className="fas fa-seedling"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">1. 창업 & 기반 구축</h3>
              <p className="text-slate-400 leading-relaxed">
                법인 설립, 벤처/연구소 인증 지원,<br/>
                초기 창업 패키지 자금 매칭으로<br/>
                사업의 기초를 단단하게 다집니다.
              </p>
            </div>
            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors group">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl group-hover:scale-110 transition-transform text-blue-400">
                <i className="fas fa-rocket"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">2. 성장 & 스케일업</h3>
              <p className="text-slate-400 leading-relaxed">
                ISO/IATF 시스템 인증 심사,<br/>
                R&D 기술개발 과제 수주,<br/>
                신뢰성 있는 제조 파트너 연결.
              </p>
            </div>
            <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-blue-500 transition-colors group">
              <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-8 text-3xl group-hover:scale-110 transition-transform text-blue-400">
                <i className="fas fa-globe"></i>
              </div>
              <h3 className="text-2xl font-bold mb-4">3. 글로벌 도약</h3>
              <p className="text-slate-400 leading-relaxed">
                수출바우처 사업 매칭,<br/>
                해외 규격 인증 지원,<br/>
                ESG 경영 컨설팅 및 평가.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS 1: CERTIFICATION ================= */}
      <section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">System Process</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">경영인증평가원 인증 프로세스</h2>
            <p className="mt-4 text-slate-600">ISO, IATF 등 국제 표준 인증은 체계적이고 엄격한 절차를 통해 진행됩니다.</p>
          </div>

          <div class="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6 ring-4 ring-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fas fa-file-contract"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. 신청 및 접수</h3>
                <p className="text-sm text-slate-500">인증 문의 및 상담 후<br/>정식 신청서를 제출합니다.</p>
              </div>
              {/* Step 2 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6 ring-4 ring-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fas fa-search-plus"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. 1단계 문서심사</h3>
                <p className="text-sm text-slate-500">경영시스템 문서가 규격 요구사항에<br/>적합한지 검토합니다.</p>
              </div>
              {/* Step 3 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6 ring-4 ring-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fas fa-industry"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. 2단계 현장심사</h3>
                <p className="text-sm text-slate-500">사업장을 방문하여 시스템의<br/>실제 이행 여부를 확인합니다.</p>
              </div>
              {/* Step 4 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm relative group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6 ring-4 ring-white group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <i className="fas fa-award"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. 인증서 발급</h3>
                <p className="text-sm text-slate-500">심의위원회 승인을 거쳐<br/>최종 인증서를 발급합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PROCESS 2: MANUFACTURING SOURCING (UPDATED) ================= */}
      <section class="py-24 bg-slate-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span className="text-indigo-600 font-bold uppercase tracking-wider text-sm">Matching Process</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">제조 소싱(매칭) 프로세스</h2>
            <p className="mt-4 text-slate-600">
              복잡한 업체 발굴은 경영인증평가원이 미리 검증했습니다. 발주사는 선택만 하세요.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1: Pre-Validation */}
            <div class="relative text-center p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
              <div class="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center text-3xl shadow-inner text-indigo-600 mb-6">
                1
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">3자 심사/검증</h3>
              <p class="text-sm text-slate-600">경영인증평가원 심사원이 제조사를 방문해<br/>역량과 품질을 미리 검증합니다.</p>
              <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-300 z-10">
                <i class="fas fa-chevron-right text-2xl"></i>
              </div>
            </div>

            {/* Step 2: Industry Select */}
            <div class="relative text-center p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
              <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-3xl shadow-md text-indigo-600 mb-6 border-2 border-indigo-50">
                2
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">업종 및 조건 선택</h3>
              <p class="text-sm text-slate-600">원하는 제조 분야와<br/>필요한 스펙을 입력합니다.</p>
              <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-300 z-10">
                <i class="fas fa-chevron-right text-2xl"></i>
              </div>
            </div>

            {/* Step 3: AI Matching */}
            <div class="relative text-center p-6 bg-white rounded-2xl border border-indigo-100 shadow-sm">
              <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-3xl shadow-md text-indigo-600 mb-6 border-2 border-indigo-50">
                3
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">AI 스마트 매칭</h3>
              <p class="text-sm text-slate-600">검증된 DB 내에서<br/>최적의 파트너를 연결합니다.</p>
              <div class="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-300 z-10">
                <i class="fas fa-chevron-right text-2xl"></i>
              </div>
            </div>

            {/* Step 4: Contract */}
            <div class="relative text-center p-6 bg-indigo-600 rounded-2xl shadow-lg transform scale-105">
              <div class="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-3xl shadow-md text-indigo-600 mb-6">
                4
              </div>
              <h3 class="text-lg font-bold text-white mb-3">계약 및 생산</h3>
              <p class="text-sm text-indigo-100">신뢰할 수 있는 파트너와<br/>안전하게 계약을 체결합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="relative py-24 overflow-hidden bg-slate-900 border-t border-slate-800">
        <div class="absolute inset-0 bg-blue-600 opacity-10"></div>
        <div class="relative max-w-4xl mx-auto text-center px-4">
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            검증된 기업과의 안전한 거래,<br/>
            지금 경영인증평가원에서 시작하세요.
          </h2>
          <p class="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            도면 한 장만 있으면 경영인증평가원의 AI가 최적의 파트너를 찾아드립니다.<br/>
            복잡한 업체 소싱, 이제 데이터에 맡기세요.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/rfq" class="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-xl transform hover:-translate-y-1">
              무료 공급사 찾기
            </a>
            <a href="/register" class="bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-xl border border-blue-500">
              파트너 기업 등록
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
