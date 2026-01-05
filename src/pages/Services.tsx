import { Layout } from '../components/Layout'

export const Services = (props: { user?: any, lang?: string }) => {
  const currentLang = props.lang || 'ko';
  
  return (
    <Layout user={props.user} lang={currentLang}>
      {/* Hero Section */}
      <section class="relative py-20 bg-slate-900 overflow-hidden">
        <div class="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              기업 SPEC 평가 및<br/>
              <span class="text-blue-500">2자 심사 서비스</span>
            </h1>
            <p class="text-lg text-slate-300 mb-8 leading-relaxed">
              단순한 인증 취득을 넘어, 고객사의 요구사항을 반영한 실질적인 평가 솔루션을 제공합니다.
              공급망(SCM)의 품질을 높이고 리스크를 최소화하세요.
            </p>
            <a href="/rfq" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
              심사 상담 문의하기
              <i class="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Current Problems Section (PPT Slide 4, 5) */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <span class="text-blue-600 font-bold tracking-wider uppercase text-sm">Market Issues</span>
            <h2 class="text-3xl font-bold text-slate-900 mt-2 mb-4">기존 인증 시장의 한계</h2>
            <p class="text-lg text-slate-600 max-w-3xl mx-auto">
              형식적인 심사와 중복되는 요구사항으로 인해 기업의 피로도는 높아지고 효율성은 떨어지고 있습니다.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-6 text-xl">
                <i class="fas fa-exclamation-triangle"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">비효율적인 중복 심사</h3>
              <p class="text-slate-600 leading-relaxed text-sm">
                5 Star, SQ, IATF 등 고객사마다 상이한 규격 요구로 인해 협력사는 시스템을 매번 변경해야 하며, 이에 따른 업무 피로도가 가중됩니다.
              </p>
            </div>
            <div class="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-6 text-xl">
                <i class="fas fa-search-dollar"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">형식적인 인증 절차</h3>
              <p class="text-slate-600 leading-relaxed text-sm">
                컨설팅 품질 저하와 강제성 없는 심사로 인해 실질적인 품질 개선보다는 인증서 취득에만 목적을 두는 경우가 많습니다.
              </p>
            </div>
            <div class="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-all">
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-6 text-xl">
                <i class="fas fa-user-times"></i>
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">전문 인력 부재</h3>
              <p class="text-slate-600 leading-relaxed text-sm">
                SQ 등 전문 규격 대비를 위한 인력이 부족하며, 외부 교육을 위한 비용과 시간 소모가 큽니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 경영인증평가원 Solution Section (PPT Slide 6, 7) */}
      <section class="py-20 bg-slate-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="lg:grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span class="text-blue-400 font-bold tracking-wider uppercase text-sm">경영인증평가원 Solution</span>
              <h2 class="text-3xl font-bold mt-2 mb-6">
                2자 심사 및<br/>
                기업 SPEC 평가 솔루션
              </h2>
              <p class="text-slate-300 mb-8 leading-relaxed">
                경영인증평가원은 단순한 제3자 인증기관을 넘어, 고객사가 요구하는 기준을 포함한 통합 심사를 수행합니다. 이를 통해 공정거래법 리스크를 해소하고 실질적인 관리 시스템을 구축합니다.
              </p>
              
              <ul class="space-y-6">
                <li class="flex items-start">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                    <i class="fas fa-check text-xs"></i>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-bold">고객사 맞춤형 통합 심사</h4>
                    <p class="text-sm text-slate-400 mt-1">ISO 표준 항목 외 고객사별 특화 요구사항(Spec)을 추가하여 한 번에 심사합니다.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                    <i class="fas fa-check text-xs"></i>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-bold">전문적인 심사 보고서 제공</h4>
                    <p class="text-sm text-slate-400 mt-1">단순 적합/부적합이 아닌, 재무/비재무적 요소가 포함된 심층 분석 보고서를 제공합니다.</p>
                  </div>
                </li>
                <li class="flex items-start">
                  <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                    <i class="fas fa-check text-xs"></i>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-lg font-bold">법적 리스크 관리</h4>
                    <p class="text-sm text-slate-400 mt-1">제3자 전문 기관을 통한 평가로 공정거래위원회 등 법적 분쟁 소지를 사전 예방합니다.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div class="mt-12 lg:mt-0 relative">
              <div class="absolute inset-0 bg-blue-600 rounded-2xl transform rotate-3 opacity-20"></div>
              <div class="relative bg-slate-800 p-8 rounded-2xl border border-slate-700">
                <h3 class="text-xl font-bold mb-6 text-center">평가 프로세스 비교</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                    <span class="text-slate-400 text-sm w-20">기존 방식</span>
                    <div class="flex-1 flex items-center justify-center px-4">
                      <div class="h-1 bg-slate-600 w-full relative">
                        <div class="absolute -top-1 left-0 w-3 h-3 bg-slate-500 rounded-full"></div>
                        <div class="absolute -top-1 right-0 w-3 h-3 bg-slate-500 rounded-full"></div>
                      </div>
                    </div>
                    <span class="text-slate-400 text-sm w-24 text-right">개별/중복 심사</span>
                  </div>
                  <div class="flex justify-center">
                    <i class="fas fa-arrow-down text-blue-500"></i>
                  </div>
                  <div class="flex items-center justify-between p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                    <span class="text-white font-bold text-sm w-20">경영인증평가원 방식</span>
                    <div class="flex-1 flex items-center justify-center px-4">
                      <div class="h-1 bg-blue-500 w-full relative">
                        <div class="absolute -top-1 left-0 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                        <div class="absolute -top-1 right-0 w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                      </div>
                    </div>
                    <span class="text-blue-400 font-bold text-sm w-24 text-right">통합/심층 평가</span>
                  </div>
                </div>
                <div class="mt-8 text-center">
                  <p class="text-sm text-slate-400">
                    "코스트코가 SGS를 선정하여 품질을 관리하듯,<br/>귀사의 품질 관리 파트너가 되어드립니다."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits & Incentives (PPT Slide 8, 9) */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-slate-900 mb-4">참여 기업 혜택 및 기대효과</h2>
            <p class="text-lg text-slate-600">
              어차피 필요한 ISO 인증, 경영인증평가원을 통해 더 많은 가치를 창출하세요.
            </p>
          </div>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="p-6 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
              <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i class="fas fa-chart-line"></i>
              </div>
              <h4 class="font-bold text-lg text-slate-900 mb-2">수주 물량 연동</h4>
              <p class="text-sm text-slate-600">객관적인 SPEC 평가 점수를 기반으로 수주 물량 증대 및 우수 협력사 선정 근거 마련</p>
            </div>
            
            <div class="p-6 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
              <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i class="fas fa-leaf"></i>
              </div>
              <h4 class="font-bold text-lg text-slate-900 mb-2">ESG 경영 대비</h4>
              <p class="text-sm text-slate-600">2030년 ESG 의무화 및 안전보건 규제에 대비한 선제적 매뉴얼 및 절차서 구축 지원</p>
            </div>

            <div class="p-6 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
              <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i class="fas fa-coins"></i>
              </div>
              <h4 class="font-bold text-lg text-slate-900 mb-2">비용 절감</h4>
              <p class="text-sm text-slate-600">고객사 협력 할인 프로그램 및 지자체 지원 사업 연계를 통한 인증 비용 부담 완화</p>
            </div>

            <div class="p-6 border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
              <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <i class="fas fa-laptop-house"></i>
              </div>
              <h4 class="font-bold text-lg text-slate-900 mb-2">온라인 교육 지원</h4>
              <p class="text-sm text-slate-600">오프라인 출장 비용 없이, 수준 높은 ISO 심사원 교육 및 직무 교육 온라인 수강 가능</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section class="py-16 bg-slate-50 border-t border-slate-200">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <h2 class="text-2xl font-bold text-slate-900 mb-4">더 자세한 내용이 궁금하신가요?</h2>
          <p class="text-slate-600 mb-8">
            고객사의 품질 경쟁력 강화를 위한 맞춤형 심사 제안서를 보내드립니다.
          </p>
          <div class="flex justify-center gap-4">
            <a href="/rfq" class="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-all">
              견적 및 상담 요청
            </a>
            <a href="/partners" class="px-8 py-3 bg-white text-slate-700 font-bold rounded-lg border border-slate-300 hover:bg-slate-100 transition-all">
              파트너 등록하기
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
