import { Layout } from '../components/Layout'

export const SecondPartyAudit = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-white min-h-screen">
        {/* Hero Section */}
        <section class="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1565514020125-9988a719d451?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Audit Hero" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/60"></div>
          </div>
          <div class="relative z-10 text-center text-white px-4">
            <span class="inline-block py-1 px-3 border border-white/30 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">Supply Chain Management</span>
            <h1 class="text-4xl md:text-5xl font-bold mb-4">2자 심사 (SCM)</h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              협력사 관리의 법적 리스크를 해소하고<br/>
              공급망 품질 수준을 상향 평준화하는 최적의 솔루션
            </p>
            <div class="flex justify-center gap-4">
              <a href="/rfq" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition">
                심사 대행 문의
              </a>
            </div>
          </div>
        </section>

        <div class="max-w-7xl mx-auto px-4 py-16">
          
          {/* Definition */}
          <div class="text-center mb-16">
            <h2 class="text-3xl font-bold text-slate-900 mb-6">2자 심사란 무엇인가요?</h2>
            <div class="grid md:grid-cols-3 gap-6 text-left">
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div class="text-gray-400 mb-2 font-bold text-lg">1st Party</div>
                <h3 class="font-bold text-xl mb-3">1자 심사 (내부 심사)</h3>
                <p class="text-sm text-gray-600">조직이 자체적으로 내부 시스템을 점검하는 심사. 객관성 확보에 한계가 있음.</p>
              </div>
              <div class="bg-blue-50 p-6 rounded-xl border border-blue-100 relative overflow-hidden">
                <div class="absolute top-0 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-bl-lg">MCE Solution</div>
                <div class="text-blue-500 mb-2 font-bold text-lg">2nd Party</div>
                <h3 class="font-bold text-xl mb-3 text-blue-900">2자 심사 (협력사 심사)</h3>
                <p class="text-sm text-blue-800 font-medium">고객사(발주사)가 협력사의 품질/납기/공정을 평가하는 활동. <br/>최근 법적 이슈로 제3자 위탁 추세.</p>
              </div>
              <div class="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <div class="text-gray-400 mb-2 font-bold text-lg">3rd Party</div>
                <h3 class="font-bold text-xl mb-3">3자 심사 (인증 심사)</h3>
                <p class="text-sm text-gray-600">독립된 인증기관(ISO 등)이 규격 적합성을 심사. 일반적인 시스템 인증.</p>
              </div>
            </div>
          </div>

          {/* Problem & Solution (Legal Risk) */}
          <div class="flex flex-col md:flex-row items-center gap-12 mb-20 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div class="flex-1">
              <div class="inline-block bg-red-100 text-red-600 font-bold px-3 py-1 rounded text-sm mb-4">Market Issue</div>
              <h2 class="text-3xl font-bold text-slate-900 mb-4">
                대기업의 직접 심사,<br/>법적 리스크가 되고 있습니다.
              </h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                원청사가 협력사의 경영에 직접 관여하거나 무리한 자료를 요구할 경우, 
                <span class="font-bold text-slate-800">'하도급법 위반'</span> 및 <span class="font-bold text-slate-800">'경영 간섭'</span>으로 간주되어 공정위 제재 대상이 될 수 있습니다.
              </p>
              <div class="bg-slate-100 p-4 rounded-lg text-sm text-slate-600">
                <i class="fas fa-exclamation-triangle text-orange-500 mr-2"></i>
                <strong>실제 사례:</strong> A전자는 협력사 원가 구조를 직접 파악하려다 '기술 유용' 혐의로 과징금 부과
              </div>
            </div>
            <div class="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-200">
               <h3 class="font-bold text-xl mb-4 flex items-center">
                 <i class="fas fa-shield-alt text-green-500 mr-2"></i> 
                 경영인증평가원(MCE) 위탁 효과
               </h3>
               <ul class="space-y-4">
                 <li class="flex items-start bg-white p-3 rounded shadow-sm">
                   <span class="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                   <div>
                     <strong class="block text-slate-800">법적 리스크 차단</strong>
                     <span class="text-sm text-gray-500">제3자 전문 기관에 의한 객관적 평가로 '경영 간섭' 이슈 원천 배제</span>
                   </div>
                 </li>
                 <li class="flex items-start bg-white p-3 rounded shadow-sm">
                   <span class="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                   <div>
                     <strong class="block text-slate-800">심사 품질 전문화</strong>
                     <span class="text-sm text-gray-500">15년 이상 경력의 Auditor가 CSR, ESG, 품질 등 전문 영역 심층 점검</span>
                   </div>
                 </li>
                 <li class="flex items-start bg-white p-3 rounded shadow-sm">
                   <span class="bg-green-100 text-green-700 font-bold rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                   <div>
                     <strong class="block text-slate-800">협력사 수용성 증대</strong>
                     <span class="text-sm text-gray-500">원청의 압박이 아닌, 전문 기관의 컨설팅으로 인식하여 반발 최소화</span>
                   </div>
                 </li>
               </ul>
            </div>
          </div>

          {/* Audit Scope */}
          <div class="mb-20">
            <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">통합 심사 영역 (Total Inspection)</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="p-6 bg-white border-t-4 border-blue-500 shadow-lg rounded-b-xl text-center group hover:-translate-y-2 transition">
                <div class="text-4xl text-blue-100 mb-4 group-hover:text-blue-500 transition"><i class="fas fa-check-double"></i></div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">Quality</h3>
                <p class="text-sm text-gray-500">불량률, 공정 능력(Cpk),<br/>검사 시스템 유효성</p>
              </div>
              <div class="p-6 bg-white border-t-4 border-red-500 shadow-lg rounded-b-xl text-center group hover:-translate-y-2 transition">
                <div class="text-4xl text-red-100 mb-4 group-hover:text-red-500 transition"><i class="fas fa-tags"></i></div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">Cost</h3>
                <p class="text-sm text-gray-500">제조 원가 구조,<br/>생산성 지표(OEE)</p>
              </div>
              <div class="p-6 bg-white border-t-4 border-yellow-500 shadow-lg rounded-b-xl text-center group hover:-translate-y-2 transition">
                <div class="text-4xl text-yellow-100 mb-4 group-hover:text-yellow-500 transition"><i class="fas fa-truck"></i></div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">Delivery</h3>
                <p class="text-sm text-gray-500">납기 준수율,<br/>자재 수급/재고 관리</p>
              </div>
              <div class="p-6 bg-white border-t-4 border-green-500 shadow-lg rounded-b-xl text-center group hover:-translate-y-2 transition">
                <div class="text-4xl text-green-100 mb-4 group-hover:text-green-500 transition"><i class="fas fa-leaf"></i></div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">ESG & Risk</h3>
                <p class="text-sm text-gray-500">안전/환경 법규,<br/>재무적 부실 징후</p>
              </div>
            </div>
          </div>

          {/* Process Timeline */}
          <div class="mb-20">
             <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">Standard Process</h2>
             <div class="relative">
               {/* Line */}
               <div class="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
               
               <div class="grid md:grid-cols-4 gap-8">
                 <div class="relative bg-white p-6 rounded-xl border border-gray-200 z-10 text-center">
                   <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">1</div>
                   <h4 class="font-bold text-lg mb-2">기준 수립 (Plan)</h4>
                   <p class="text-sm text-gray-500">발주사의 요구사항(CSR)을 반영한 심사 체크리스트 개발</p>
                 </div>
                 <div class="relative bg-white p-6 rounded-xl border border-gray-200 z-10 text-center">
                   <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">2</div>
                   <h4 class="font-bold text-lg mb-2">현장 심사 (Do)</h4>
                   <p class="text-sm text-gray-500">전문 심사원 파견, 현장 실사 및 담당자 인터뷰 진행</p>
                 </div>
                 <div class="relative bg-white p-6 rounded-xl border border-gray-200 z-10 text-center">
                   <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">3</div>
                   <h4 class="font-bold text-lg mb-2">결과 보고 (Check)</h4>
                   <p class="text-sm text-gray-500">점수화된 평가 리포트 발행 및 개선점(NC) 도출</p>
                 </div>
                 <div class="relative bg-white p-6 rounded-xl border border-gray-200 z-10 text-center">
                   <div class="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 text-lg">4</div>
                   <h4 class="font-bold text-lg mb-2">사후 관리 (Action)</h4>
                   <p class="text-sm text-gray-500">시정 조치 확인 및 차기 년도 공급사 등급(Grade) 조정</p>
                 </div>
               </div>
             </div>
          </div>

          {/* CTA */}
          <div class="bg-blue-900 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 class="text-3xl font-bold mb-4">공급망 품질, 지금 점검해야 합니다</h2>
            <p class="text-blue-200 mb-8 max-w-2xl mx-auto">
              1만여 개 기업 데이터와 500+ 인증 네트워크를 보유한 경영인증평가원이<br/>
              귀사의 공급망 리스크를 완벽하게 관리해 드립니다.
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/rfq" class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition">
                심사 기준 수립 상담
              </a>
              <a href="/partners" class="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-bold transition">
                2자 심사 제안서 받기
              </a>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}