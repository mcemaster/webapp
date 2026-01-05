import { Layout } from '../components/Layout'

export const Certification = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-white min-h-screen">
        
        {/* Hero Section */}
        <div class="relative bg-slate-900 py-20 overflow-hidden">
          <div class="absolute inset-0 opacity-20">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Certification Background" class="w-full h-full object-cover" />
          </div>
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <span class="inline-block py-1 px-3 border border-blue-400 rounded-full text-blue-300 text-sm font-bold mb-4">Global Standard Certification</span>
            <h1 class="text-4xl md:text-5xl font-extrabold mb-6">ISO 국제 표준 인증</h1>
            <p class="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              경영인증평가원은 기업의 지속 가능한 성장을 위해<br/>
              글로벌 표준에 부합하는 가장 공신력 있는 인증 심사 서비스를 제공합니다.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Why MCE? */}
          <div class="text-center mb-20">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">왜 경영인증평가원인가요?</h2>
            <p class="text-slate-600 mb-10">단순한 인증서 발급이 아닌, 기업의 경영 시스템을 실질적으로 개선합니다.</p>
            
            <div class="grid md:grid-cols-3 gap-8">
              <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div class="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                  <i class="fas fa-user-tie"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">전문 심사원 보유</h3>
                <p class="text-sm text-slate-600">산업별(제조, IT, 서비스 등) 15년 이상의 경력을 가진 베테랑 심사원이 심도 있는 심사를 수행합니다.</p>
              </div>
              <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div class="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                  <i class="fas fa-bolt"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">신속한 프로세스</h3>
                <p class="text-sm text-slate-600">신청부터 심사, 인증서 발급까지 불필요한 절차를 단축하여 기업의 비즈니스 속도에 맞춥니다.</p>
              </div>
              <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div class="w-14 h-14 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4">
                  <i class="fas fa-globe"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-900 mb-2">글로벌 상호인정</h3>
                <p class="text-sm text-slate-600">IAF(국제인정협력기구)에 등록된 인증기관으로서 전 세계 어디서나 통용되는 인증서를 발행합니다.</p>
              </div>
            </div>
          </div>

          {/* Certification List */}
          <div class="mb-20">
            <h2 class="text-3xl font-bold text-slate-900 mb-10 text-center">주요 인증 분야</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* ISO 9001 */}
              <div class="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-500 transition-colors">
                <div class="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">BEST</div>
                <div class="text-blue-600 text-4xl mb-4"><i class="fas fa-medal"></i></div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">ISO 9001</h3>
                <p class="text-sm text-blue-600 font-bold mb-3">품질경영시스템</p>
                <p class="text-sm text-slate-600 leading-relaxed">
                  제품 및 서비스의 품질을 지속적으로 개선하고 고객 만족을 충족시키기 위한 가장 기초적인 국제 표준입니다.
                </p>
              </div>

              {/* ISO 14001 */}
              <div class="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-green-500 transition-colors">
                <div class="text-green-600 text-4xl mb-4"><i class="fas fa-leaf"></i></div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">ISO 14001</h3>
                <p class="text-sm text-green-600 font-bold mb-3">환경경영시스템</p>
                <p class="text-sm text-slate-600 leading-relaxed">
                  기업 활동이 환경에 미치는 영향을 최소화하고 환경 법규를 준수하는 친환경 경영 시스템입니다.
                </p>
              </div>

              {/* ISO 45001 */}
              <div class="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-orange-500 transition-colors">
                <div class="text-orange-500 text-4xl mb-4"><i class="fas fa-hard-hat"></i></div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">ISO 45001</h3>
                <p class="text-sm text-orange-600 font-bold mb-3">안전보건경영시스템</p>
                <p class="text-sm text-slate-600 leading-relaxed">
                  사업장에서 발생할 수 있는 산업 재해를 예방하고 근로자의 안전을 보호하기 위한 표준입니다.
                </p>
              </div>



              {/* ISO 27001 */}
              <div class="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-purple-500 transition-colors">
                <div class="text-purple-600 text-4xl mb-4"><i class="fas fa-lock"></i></div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">ISO 27001</h3>
                <p class="text-sm text-purple-600 font-bold mb-3">정보보안경영시스템</p>
                <p class="text-sm text-slate-600 leading-relaxed">
                  기업의 중요 정보 자산을 보호하고 사이버 보안 리스크를 관리하는 IT 보안 표준입니다.
                </p>
              </div>

              {/* ISO 22301 */}
              <div class="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-teal-500 transition-colors">
                <div class="text-teal-600 text-4xl mb-4"><i class="fas fa-sync-alt"></i></div>
                <h3 class="text-xl font-bold text-slate-900 mb-2">ISO 22301</h3>
                <p class="text-sm text-teal-600 font-bold mb-3">비즈니스연속성(BCMS)</p>
                <p class="text-sm text-slate-600 leading-relaxed">
                  재난, 재해 등 위기 상황에서도 기업의 핵심 기능을 중단 없이 유지하기 위한 복구 시스템입니다.
                </p>
              </div>

            </div>
          </div>

          {/* Process Section */}
          <div class="bg-slate-50 rounded-3xl p-10 border border-slate-200">
            <h2 class="text-2xl font-bold text-slate-900 mb-10 text-center">인증 심사 절차</h2>
            <div class="relative">
              <div class="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
              <div class="grid grid-cols-1 md:grid-cols-5 gap-6 relative z-10">
                <div class="bg-white p-5 rounded-xl border border-slate-200 text-center">
                  <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
                  <h4 class="font-bold text-slate-800">신청/계약</h4>
                  <p class="text-xs text-slate-500 mt-1">신청서 접수 및 심사비용 산정</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-slate-200 text-center">
                  <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
                  <h4 class="font-bold text-slate-800">1단계 심사</h4>
                  <p class="text-xs text-slate-500 mt-1">문서 심사 및 경영시스템 검토</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-slate-200 text-center">
                  <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
                  <h4 class="font-bold text-slate-800">2단계 심사</h4>
                  <p class="text-xs text-slate-500 mt-1">현장 방문 실사 및 인터뷰</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-slate-200 text-center">
                  <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">4</div>
                  <h4 class="font-bold text-slate-800">시정 조치</h4>
                  <p class="text-xs text-slate-500 mt-1">부적합 사항 개선 및 확인</p>
                </div>
                <div class="bg-white p-5 rounded-xl border border-slate-200 text-center">
                  <div class="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-3">5</div>
                  <h4 class="font-bold text-slate-800">인증 등록</h4>
                  <p class="text-xs text-slate-500 mt-1">심의위원회 승인 및 인증서 발행</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div class="mt-16 text-center">
            <h3 class="text-2xl font-bold text-slate-900 mb-6">인증 심사가 필요하신가요?</h3>
            <div class="flex justify-center gap-4">
              <a href="https://www.mce.re.kr/inquiry" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                심사 견적 문의하기
              </a>
              <a href="/faq" class="bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-bold text-lg transition-all">
                자주 묻는 질문
              </a>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
