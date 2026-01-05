import { Layout } from '../components/Layout'

export const Partners = (props: { user?: any, lang?: string }) => {
  const currentLang = props.lang || 'ko';
  return (
    <Layout user={props.user} lang={currentLang}>
      <div class="bg-slate-50 min-h-screen">
        {/* Header Filter Section */}
        <div class="bg-white border-b border-slate-200 sticky top-20 z-40">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h1 class="text-2xl font-bold text-slate-900">기업 서칭</h1>
              
              <div class="flex-1 max-w-2xl">
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i class="fas fa-search text-slate-400"></i>
                  </div>
                  <input type="text" class="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="기업명, 가공 방식, 소재 등으로 검색해보세요" />
                </div>
              </div>

              <div class="flex gap-2">
                <select class="block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg">
                  <option>전체 지역</option>
                  <option>서울/경기</option>
                  <option>인천/부천</option>
                  <option>부산/경남</option>
                </select>
                <select class="block w-full pl-3 pr-10 py-2.5 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg">
                  <option>추천순</option>
                  <option>평점순</option>
                  <option>최신순</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div class="flex flex-wrap gap-2 mt-4">
              <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">전체</button>
              <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">CNC 가공</button>
              <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">판금/제관</button>
              <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">3D 프린팅</button>
              <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">금형/사출</button>
              <button class="px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">표면처리</button>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card Item 1 */}
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden group cursor-pointer">
              <div class="h-40 bg-slate-100 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1616423640778-2cfd2b96906b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Factory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-600 shadow-sm">
                  경영인증평가원 인증 A+
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">(주)태성정밀</h3>
                    <p class="text-xs text-slate-500">인천 남동공단 · 업력 15년</p>
                  </div>
                  <div class="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                    <span class="text-xs font-bold text-slate-700">4.9</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">CNC 가공</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">머시닝센터</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">알루미늄</span>
                </div>
                <p class="mt-4 text-sm text-slate-600 line-clamp-2">
                  5축 가공기 10대 보유, 반도체 장비 부품 및 항공 우주 부품 전문 생산 기업입니다. 정밀도 ±0.005mm 보증.
                </p>
              </div>
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <span class="text-xs font-medium text-slate-500">최근 매칭 12건 진행</span>
                <span class="text-sm font-bold text-blue-600">자세히 보기 &rarr;</span>
              </div>
            </div>

            {/* Card Item 2 */}
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden group cursor-pointer">
              <div class="h-40 bg-slate-100 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1565514020125-9988a719d451?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Factory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-600 shadow-sm">
                  경영인증평가원 인증 A
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">대영플라스틱</h3>
                    <p class="text-xs text-slate-500">경기 시흥 · 업력 22년</p>
                  </div>
                  <div class="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                    <span class="text-xs font-bold text-slate-700">4.8</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">사출 성형</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">금형 설계</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">이중사출</span>
                </div>
                <p class="mt-4 text-sm text-slate-600 line-clamp-2">
                  자동차 내장재 및 생활가전 부품 사출, 금형 설계부터 양산까지 원스톱 솔루션 제공. 24시간 가동 체제.
                </p>
              </div>
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <span class="text-xs font-medium text-slate-500">최근 매칭 28건 진행</span>
                <span class="text-sm font-bold text-blue-600">자세히 보기 &rarr;</span>
              </div>
            </div>

            {/* Card Item 3 */}
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden group cursor-pointer">
              <div class="h-40 bg-slate-100 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1531835551805-16d864c8d311?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Factory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-teal-600 shadow-sm">
                  경영인증평가원 인증 B+
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">한일철강</h3>
                    <p class="text-xs text-slate-500">부산 사상 · 업력 8년</p>
                  </div>
                  <div class="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                    <span class="text-xs font-bold text-slate-700">4.7</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">판금</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">레이저 커팅</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">용접</span>
                </div>
                <p class="mt-4 text-sm text-slate-600 line-clamp-2">
                  레이저 커팅(10kW) 및 절곡, 대형 구조물 용접 전문. SUS, 알루미늄, 티타늄 등 난삭재 가공 가능.
                </p>
              </div>
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <span class="text-xs font-medium text-slate-500">최근 매칭 5건 진행</span>
                <span class="text-sm font-bold text-blue-600">자세히 보기 &rarr;</span>
              </div>
            </div>

            {/* Card Item 4 */}
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden group cursor-pointer">
              <div class="h-40 bg-slate-100 relative overflow-hidden">
                <img src="https://plus.unsplash.com/premium_photo-1661962360537-4148b871c4c8?q=80&w=2940&auto=format&fit=crop" alt="Factory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-600 shadow-sm">
                  경영인증평가원 인증 A
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">미래테크</h3>
                    <p class="text-xs text-slate-500">경기 화성 · 업력 10년</p>
                  </div>
                  <div class="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                    <span class="text-xs font-bold text-slate-700">4.8</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">3D 프린팅</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">시제품</span>
                </div>
                <p class="mt-4 text-sm text-slate-600 line-clamp-2">
                  SLA, SLS 방식 3D 프린팅 전문. 대형 시제품 제작 및 소량 양산 대응 가능.
                </p>
              </div>
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <span class="text-xs font-medium text-slate-500">최근 매칭 18건 진행</span>
                <span class="text-sm font-bold text-blue-600">자세히 보기 &rarr;</span>
              </div>
            </div>

            {/* Card Item 5 */}
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden group cursor-pointer">
              <div class="h-40 bg-slate-100 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1590959651373-a3db0f38a96b?q=80&w=2839&auto=format&fit=crop" alt="Factory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-600 shadow-sm">
                  경영인증평가원 인증 A
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">성진아노다이징</h3>
                    <p class="text-xs text-slate-500">인천 서구 · 업력 30년</p>
                  </div>
                  <div class="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                    <span class="text-xs font-bold text-slate-700">4.6</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">표면처리</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">아노다이징</span>
                </div>
                <p class="mt-4 text-sm text-slate-600 line-clamp-2">
                  알루미늄 경질/연질 아노다이징 전문. 반도체 장비 부품 표면처리 경험 다수 보유.
                </p>
              </div>
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <span class="text-xs font-medium text-slate-500">최근 매칭 8건 진행</span>
                <span class="text-sm font-bold text-blue-600">자세히 보기 &rarr;</span>
              </div>
            </div>

            {/* Card Item 6 */}
            <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-200 overflow-hidden group cursor-pointer">
              <div class="h-40 bg-slate-100 relative overflow-hidden">
                <img src="https://images.unsplash.com/photo-1635315619566-b807534575c3?q=80&w=2940&auto=format&fit=crop" alt="Factory" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-blue-600 shadow-sm">
                  경영인증평가원 인증 A
                </div>
              </div>
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <h3 class="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">정우엔지니어링</h3>
                    <p class="text-xs text-slate-500">경남 창원 · 업력 12년</p>
                  </div>
                  <div class="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <i class="fas fa-star text-yellow-400 text-xs mr-1"></i>
                    <span class="text-xs font-bold text-slate-700">4.9</span>
                  </div>
                </div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">기구설계</span>
                  <span class="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">시제품</span>
                </div>
                <p class="mt-4 text-sm text-slate-600 line-clamp-2">
                  제품 디자인부터 기구설계, 시제품 제작까지 원스톱 서비스. 스타트업 제품 개발 파트너.
                </p>
              </div>
              <div class="px-5 py-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                <span class="text-xs font-medium text-slate-500">최근 매칭 15건 진행</span>
                <span class="text-sm font-bold text-blue-600">자세히 보기 &rarr;</span>
              </div>
            </div>
            
          </div>
          
          <div class="mt-12 text-center">
            <button class="px-6 py-3 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 font-medium transition-colors">
              더 많은 기업 보기
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
