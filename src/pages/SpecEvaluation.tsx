import { Layout } from '../components/Layout'

export const SpecEvaluation = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section class="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Evaluation Hero" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70"></div>
          </div>
          <div class="relative z-10 text-center text-white px-4">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">기업 SPEC 평가</h1>
            <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              BASA 재무 데이터와 2자 심사 노하우가 결합된<br/>
              국내 유일의 통합 기업 역량 평가 솔루션
            </p>
            <div class="flex justify-center gap-4">
              <a href="/rfq" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold transition">
                평가 상담 신청
              </a>
              <a href="#criteria" class="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg font-bold backdrop-blur-sm transition">
                평가 항목 보기
              </a>
            </div>
          </div>
        </section>

        <div class="max-w-7xl mx-auto px-4 py-16">
          
          {/* Definition & Necessity */}
          <div class="grid md:grid-cols-2 gap-12 mb-20 items-center">
            <div>
              <h2 class="text-3xl font-bold text-slate-900 mb-6">
                왜 기업 SPEC 평가가 필요한가요?
              </h2>
              <p class="text-gray-600 mb-6 leading-relaxed">
                기존의 ISO 인증이나 단편적인 재무제표만으로는 기업의 실제 수행 능력을 증명하기 어렵습니다.
                발주사는 협력사의 <span class="font-bold text-blue-600">실질적인 제조 역량과 리스크</span>를 확인하고 싶어합니다.
              </p>
              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 class="font-bold text-lg mb-3">경영인증평가원 솔루션</h3>
                <ul class="space-y-3">
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span><strong class="text-slate-800">BASA 데이터 연동:</strong> 나이스평가정보의 신뢰할 수 있는 재무/신용 데이터 자동 반영</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span><strong class="text-slate-800">전문 심사원 검증:</strong> 15년 이상 경력의 심사원이 현장에서 기술/품질 역량 직접 확인</span>
                  </li>
                  <li class="flex items-start">
                    <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                    <span><strong class="text-slate-800">객관적 지표화:</strong> 4대 핵심 영역을 수치화하여 직관적인 레이더 차트 제공</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <i class="fas fa-chart-line text-xl"></i>
                </div>
                <h4 class="font-bold mb-2">신뢰도 상승</h4>
                <p class="text-sm text-gray-500">객관적 데이터로<br/>발주사 신뢰 획득</p>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  <i class="fas fa-handshake text-xl"></i>
                </div>
                <h4 class="font-bold mb-2">거래 기회 확대</h4>
                <p class="text-sm text-gray-500">대기업/공공기관<br/>제출용 리포트</p>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  <i class="fas fa-search text-xl"></i>
                </div>
                <h4 class="font-bold mb-2">리스크 예방</h4>
                <p class="text-sm text-gray-500">잠재적 경영/품질<br/>리스크 사전 식별</p>
              </div>
              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                  <i class="fas fa-trophy text-xl"></i>
                </div>
                <h4 class="font-bold mb-2">경쟁력 확보</h4>
                <p class="text-sm text-gray-500">동종 업계 대비<br/>객관적 위치 파악</p>
              </div>
            </div>
          </div>

          {/* Core Areas */}
          <div id="criteria" class="mb-20">
            <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">4대 핵심 평가 영역</h2>
            <div class="grid md:grid-cols-4 gap-6">
              {/* Area 1 */}
              <div class="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition duration-300">
                <div class="h-2 bg-blue-500"></div>
                <div class="p-6">
                  <div class="text-blue-600 mb-4 text-3xl">
                    <i class="fas fa-coins"></i>
                  </div>
                  <h3 class="text-xl font-bold mb-4">경영 안정성<br/><span class="text-sm font-normal text-gray-500">(Financial)</span></h3>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li>• 신용평가등급 (KIS/NICE)</li>
                    <li>• 현금흐름 등급</li>
                    <li>• 부채비율 및 유동비율</li>
                    <li>• 매출액/영업이익 성장률</li>
                  </ul>
                </div>
              </div>
              {/* Area 2 */}
              <div class="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition duration-300">
                <div class="h-2 bg-green-500"></div>
                <div class="p-6">
                  <div class="text-green-600 mb-4 text-3xl">
                    <i class="fas fa-microchip"></i>
                  </div>
                  <h3 class="text-xl font-bold mb-4">제조/기술 역량<br/><span class="text-sm font-normal text-gray-500">(Technical)</span></h3>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li>• 생산 설비 보유 현황</li>
                    <li>• 연구/기술 인력 비율</li>
                    <li>• 특허 및 인증 보유</li>
                    <li>• 공정 자동화 수준 (Smart)</li>
                  </ul>
                </div>
              </div>
              {/* Area 3 */}
              <div class="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition duration-300">
                <div class="h-2 bg-purple-500"></div>
                <div class="p-6">
                  <div class="text-purple-600 mb-4 text-3xl">
                    <i class="fas fa-tasks"></i>
                  </div>
                  <h3 class="text-xl font-bold mb-4">품질 관리<br/><span class="text-sm font-normal text-gray-500">(Quality)</span></h3>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li>• 공정 불량률 (PPM)</li>
                    <li>• 검사 장비 및 시스템</li>
                    <li>• 부적합품 관리 절차</li>
                    <li>• 추적성 (Lot Tracking)</li>
                  </ul>
                </div>
              </div>
              {/* Area 4 */}
              <div class="bg-white rounded-xl shadow-lg overflow-hidden group hover:-translate-y-2 transition duration-300">
                <div class="h-2 bg-orange-500"></div>
                <div class="p-6">
                  <div class="text-orange-600 mb-4 text-3xl">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h3 class="text-xl font-bold mb-4">ESG 및 납기<br/><span class="text-sm font-normal text-gray-500">(Sustainability)</span></h3>
                  <ul class="text-sm text-gray-600 space-y-2">
                    <li>• 납기 준수율</li>
                    <li>• 산업재해 발생 현황</li>
                    <li>• 환경 법규 준수</li>
                    <li>• 중대재해처벌법 대응</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Report Sample */}
          <div class="bg-slate-900 text-white rounded-2xl p-8 md:p-12 mb-20">
            <div class="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span class="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Sample Output</span>
                <h2 class="text-3xl font-bold mt-4 mb-6">한 눈에 보이는<br/>기업 역량 리포트</h2>
                <p class="text-gray-400 mb-8">
                  복잡한 기업의 역량을 직관적인 인포그래픽으로 시각화하여 제공합니다.
                  발주사의 의사결정을 돕는 강력한 도구가 됩니다.
                </p>
                <div class="space-y-4">
                  <div class="flex items-center justify-between border-b border-gray-700 pb-2">
                    <span class="text-gray-400">종합 점수</span>
                    <span class="text-2xl font-bold text-blue-400">88.5 <span class="text-sm text-gray-500">/ 100</span></span>
                  </div>
                  <div class="flex items-center justify-between border-b border-gray-700 pb-2">
                    <span class="text-gray-400">평가 등급</span>
                    <span class="text-xl font-bold text-green-400">A+ (우수)</span>
                  </div>
                  <div class="flex items-center justify-between border-b border-gray-700 pb-2">
                    <span class="text-gray-400">추천 여부</span>
                    <span class="text-xl font-bold text-white">Highly Rec.</span>
                  </div>
                </div>
                <div class="mt-8">
                  <a href="/rfq" class="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
                    내 기업 평가해보기
                  </a>
                </div>
              </div>
              <div class="bg-slate-800 rounded-xl p-6 relative">
                {/* Mock Radar Chart UI */}
                <div class="absolute top-4 right-4">
                  <img src="/static/logo-horizontal.png" alt="Logo" class="h-6 opacity-50 bg-white px-2 py-1 rounded" />
                </div>
                <div class="text-center mb-6">
                  <h3 class="font-bold text-lg">(주)경인정밀 SPEC Report</h3>
                  <p class="text-xs text-gray-400">평가일: 2026.01.04 | 인증번호: SPEC-26-001</p>
                </div>
                <div class="relative w-full aspect-square max-w-[300px] mx-auto bg-slate-700 rounded-full flex items-center justify-center mb-6">
                  {/* Hexagon Shape Simulation */}
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-[80%] h-[80%] border border-slate-600 rotate-0 absolute"></div>
                    <div class="w-[80%] h-[80%] border border-slate-600 rotate-60 absolute"></div>
                    <div class="w-[80%] h-[80%] border border-slate-600 rotate-120 absolute"></div>
                  </div>
                  {/* Data Shape Simulation */}
                  <div class="absolute inset-0 flex items-center justify-center">
                     <svg viewBox="0 0 100 100" class="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                        <polygon points="50,10 90,35 85,75 50,90 15,75 10,35" fill="rgba(37, 99, 235, 0.4)" stroke="#3b82f6" stroke-width="2" />
                     </svg>
                  </div>
                  {/* Labels */}
                  <span class="absolute top-2 text-xs font-bold text-white">재무</span>
                  <span class="absolute top-[25%] right-2 text-xs font-bold text-white">기술</span>
                  <span class="absolute bottom-[25%] right-2 text-xs font-bold text-white">품질</span>
                  <span class="absolute bottom-2 text-xs font-bold text-white">납기</span>
                  <span class="absolute bottom-[25%] left-2 text-xs font-bold text-white">ESG</span>
                  <span class="absolute top-[25%] left-2 text-xs font-bold text-white">자동화</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center text-xs">
                  <div class="bg-slate-700 p-2 rounded">재무안정성<br/><span class="font-bold text-blue-400">95</span></div>
                  <div class="bg-slate-700 p-2 rounded">기술력<br/><span class="font-bold text-blue-400">90</span></div>
                  <div class="bg-slate-700 p-2 rounded">품질관리<br/><span class="font-bold text-blue-400">85</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Process */}
          <div>
            <h2 class="text-3xl font-bold text-center text-slate-900 mb-12">평가 진행 프로세스</h2>
            <div class="flex flex-col md:flex-row justify-between items-start gap-4">
              {[
                { step: '01', title: '평가 신청', desc: '온라인 신청 및 기초 데이터 제출' },
                { step: '02', title: '예비 심사', desc: 'BASA 데이터 기반 1차 스크리닝' },
                { step: '03', title: '현장 심사', desc: '전문 심사원 방문 및 실사' },
                { step: '04', title: '종합 분석', desc: '정량/정성 데이터 교차 검증' },
                { step: '05', title: '리포트 발행', desc: '최종 등급 산출 및 인증서 발급' },
              ].map((item, index) => (
                <div class="flex-1 text-center group">
                  <div class="w-16 h-16 bg-white border-2 border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition shadow-sm">
                    {item.step}
                  </div>
                  <h3 class="font-bold text-lg mb-2">{item.title}</h3>
                  <p class="text-sm text-gray-500 break-keep">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div class="bg-gray-100 py-16 border-t border-gray-200">
          <div class="max-w-4xl mx-auto text-center px-4">
            <h2 class="text-3xl font-bold mb-6">우리 기업의 객관적인 가치를 증명하세요</h2>
            <p class="text-gray-600 mb-8">
              대기업/공공기관 협력사 등록을 위한 필수 관문,<br/>
              경영인증평가원의 SPEC 평가가 가장 빠르고 정확한 해답입니다.
            </p>
            <div class="flex justify-center gap-4">
              <a href="/rfq" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-blue-600/30 transition">
                평가 견적 요청하기
              </a>
              <a href="/partners" class="bg-white text-gray-700 border border-gray-300 px-8 py-3 rounded-lg font-bold hover:bg-gray-50 transition">
                인증 기업 검색
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}