import { Layout } from '../components/Layout'

export const Admin = (props: { user: any, tab?: string }) => {
  const activeTab = props.tab || 'overview';
  
  return (
    <Layout user={props.user}>
      <div class="min-h-screen bg-white flex">
        
        {/* Sidebar (White Theme) */}
        <aside class="w-64 border-r border-slate-200 bg-white hidden md:flex flex-col fixed h-full z-10">
          <div class="p-6 flex items-center border-b border-slate-100">
            <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-md">
              <i class="fas fa-shield-alt"></i>
            </div>
            <span class="font-extrabold text-lg text-slate-800 tracking-tight">경영인증평가원 관리자</span>
          </div>

          <nav class="flex-1 overflow-y-auto p-4 space-y-8">
            {/* Group 1 */}
            <div>
              <h3 class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Overview</h3>
              <div class="space-y-1">
                <a href="/admin?tab=overview" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-chart-line w-6"></i> 대시보드
                </a>
                <a href="/admin?tab=users" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'users' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-users w-6"></i> 회원 관리
                </a>
              </div>
            </div>

            {/* Group 2: Management */}
            <div>
              <h3 class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Management</h3>
              <div class="space-y-1">
                <a href="/admin?tab=partners" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'partners' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-handshake w-6"></i> 파트너 승인
                </a>
                 <a href="/admin?tab=audit" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'audit' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-file-contract w-6"></i> 심사/ERP 연동
                </a>
                <a href="/admin?tab=rfq" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'rfq' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-paper-plane w-6"></i> 공급사 알림 발송
                </a>
              </div>
            </div>

            {/* Group 3: Marketing */}
             <div>
              <h3 class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Marketing</h3>
              <div class="space-y-1">
                <a href="/admin?tab=banners" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'banners' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-images w-6"></i> 배너/팝업 관리
                </a>
                <a href="/admin?tab=seo" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'seo' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fab fa-google w-6"></i> SEO/마케팅 관리
                </a>
              </div>
            </div>

             {/* Group 4: System */}
             <div>
              <h3 class="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System</h3>
              <div class="space-y-1">
                <a href="/admin?tab=settings" class={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                  <i class="fas fa-cog w-6"></i> 시스템 설정
                </a>
              </div>
            </div>
          </nav>
          
          <div class="p-4 border-t border-slate-100">
            <div class="flex items-center">
              <img src={props.user.profileImage} class="w-8 h-8 rounded-full border border-slate-200" />
              <div class="ml-3">
                <p class="text-sm font-bold text-slate-800">최고 관리자</p>
                <a href="/logout" class="text-xs text-red-500 hover:underline">로그아웃</a>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main class="flex-1 md:ml-64 bg-slate-50 min-h-screen">
          <header class="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-20">
            <h2 class="text-xl font-bold text-slate-800 capitalize">
              {activeTab === 'rfq' ? '공급사 매칭 및 통합 알림 발송' : 
               activeTab === 'audit' ? '심사보고서 및 ERP 연동 관리' :
               activeTab === 'partners' ? '파트너사 가입 승인' :
               activeTab === 'banners' ? '배너 및 팝업 관리' :
               activeTab === 'seo' ? 'SEO 및 마케팅 설정' :
               activeTab.replace('-', ' ')}
            </h2>
            <div class="flex items-center space-x-4">
              <button class="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
                <i class="fas fa-bell"></i>
                <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          <div class="p-8">
            
            {/* === Tab: Partner Approval (Restored) === */}
            {activeTab === 'partners' && (
              <div class="bg-white rounded-xl shadow-sm border border-slate-200 animate-fade-in-up">
                <div class="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 class="font-bold text-lg text-slate-900">가입 대기 파트너 (5)</h3>
                  <div class="flex space-x-2">
                    <input type="text" placeholder="기업명 검색" class="text-sm border border-slate-300 rounded-lg px-3 py-1.5 w-64" />
                    <button class="bg-slate-800 text-white px-4 py-1.5 rounded-lg text-sm font-bold">검색</button>
                  </div>
                </div>
                <table class="w-full text-sm text-left">
                  <thead class="bg-slate-50 text-slate-500">
                    <tr>
                      <th class="px-6 py-4">기업명</th>
                      <th class="px-6 py-4">대표자</th>
                      <th class="px-6 py-4">사업자번호</th>
                      <th class="px-6 py-4">신청일</th>
                      <th class="px-6 py-4">서류</th>
                      <th class="px-6 py-4">상태</th>
                      <th class="px-6 py-4 text-right">관리</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-slate-100">
                    {[1,2,3,4,5].map(i => (
                      <tr class="hover:bg-slate-50">
                        <td class="px-6 py-4 font-bold text-slate-800">(주)미래테크_{i}</td>
                        <td class="px-6 py-4">김대표</td>
                        <td class="px-6 py-4 text-slate-500">123-45-6789{i}</td>
                        <td class="px-6 py-4 text-slate-500">2026-01-05</td>
                        <td class="px-6 py-4"><span class="text-blue-600 underline cursor-pointer"><i class="fas fa-file-pdf mr-1"></i>사업자등록증</span></td>
                        <td class="px-6 py-4"><span class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">승인 대기</span></td>
                        <td class="px-6 py-4 text-right space-x-2">
                          <button class="btn-approve text-green-600 font-bold hover:underline">승인</button>
                          <span class="text-slate-300">|</span>
                          <button class="btn-reject text-red-500 font-bold hover:underline">반려</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* === Tab: Banner/Popup (Restored) === */}
            {activeTab === 'banners' && (
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
                {/* Main Banner */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold text-lg text-slate-900">메인 배너 관리</h3>
                    <button id="btn-add-banner" class="text-blue-600 text-sm font-bold"><i class="fas fa-plus mr-1"></i>새 배너 등록</button>
                  </div>
                  <div class="space-y-4">
                    <div class="border border-slate-200 rounded-lg overflow-hidden group relative">
                      <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80" class="w-full h-32 object-cover" />
                      <div class="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center space-x-3">
                        <button class="text-white hover:text-blue-200"><i class="fas fa-edit"></i> 수정</button>
                        <button class="text-white hover:text-red-200"><i class="fas fa-trash"></i> 삭제</button>
                      </div>
                      <div class="p-3 bg-slate-50 flex justify-between items-center">
                        <span class="text-xs font-bold text-slate-700">2026 정부지원사업 통합공고 안내</span>
                        <span class="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded font-bold">노출중</span>
                      </div>
                    </div>
                    <div class="border border-slate-200 rounded-lg overflow-hidden group relative opacity-60">
                      <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80" class="w-full h-32 object-cover" />
                      <div class="p-3 bg-slate-50 flex justify-between items-center">
                        <span class="text-xs font-bold text-slate-700">ISO 인증 할인 프로모션</span>
                        <span class="bg-slate-200 text-slate-500 text-[10px] px-2 py-0.5 rounded font-bold">대기</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Popup Settings */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 class="font-bold text-lg text-slate-900 mb-6">팝업(Popup) 설정</h3>
                  <div class="space-y-6">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div>
                        <span class="block text-sm font-bold text-slate-800">공지사항 팝업 (긴급)</span>
                        <span class="text-xs text-slate-500">서버 점검 안내 (2026-01-10)</span>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div>
                        <span class="block text-sm font-bold text-slate-800">마케팅 팝업</span>
                        <span class="text-xs text-slate-500">신규 회원 가입 이벤트</span>
                      </div>
                      <label class="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked class="sr-only peer" />
                        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* === Tab: SEO (Restored) === */}
            {activeTab === 'seo' && (
              <div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 animate-fade-in-up">
                <h3 class="font-bold text-lg text-slate-900 mb-6">검색엔진 최적화 (SEO) 설정</h3>
                
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">사이트 제목 (Title)</label>
                    <input type="text" value="기업지원-경인평 | 경영인증평가원" class="w-full border-slate-300 rounded-lg text-sm px-4 py-2" />
                    <p class="text-xs text-slate-400 mt-1">브라우저 탭과 검색 결과 제목에 표시됩니다.</p>
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">메타 설명 (Description)</label>
                    <textarea class="w-full border-slate-300 rounded-lg text-sm px-4 py-2 h-24">기업 인증, 평가, 매칭 솔루션 전문 기관. ISO 인증부터 정부지원사업 매칭까지 원스톱으로 지원합니다.</textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-slate-700 mb-2">키워드 (Keywords)</label>
                    <input type="text" value="경영인증평가원, ISO인증, 기업평가, 정부지원사업, 바우처" class="w-full border-slate-300 rounded-lg text-sm px-4 py-2" />
                  </div>
                  
                  <div class="pt-6 border-t border-slate-100">
                    <h4 class="font-bold text-sm text-slate-800 mb-4">Open Graph (SNS 공유 설정)</h4>
                    <div class="flex gap-6">
                      <div class="w-32 h-32 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                        <i class="fas fa-image text-3xl"></i>
                      </div>
                      <div class="flex-1 space-y-4">
                        <input type="text" value="https://www.mce.ai.kr/static/og-image.png" class="w-full border-slate-300 rounded-lg text-sm px-4 py-2" placeholder="이미지 URL" />
                        <button class="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-50">이미지 업로드</button>
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end pt-6">
                    <button id="btn-save-seo" class="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                      설정 저장
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* === Tab: Supply Matching & Notification (RFQ) === */}
            {activeTab === 'rfq' && (
              <div class="flex flex-col lg:flex-row gap-8 h-[calc(100vh-140px)] animate-fade-in-up">
                
                {/* Left: Request List */}
                <div class="w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div class="p-4 border-b border-slate-100 bg-slate-50">
                    <h3 class="font-bold text-slate-700">접수된 공급사 찾기 요청 (3)</h3>
                  </div>
                  <div class="flex-1 overflow-y-auto divide-y divide-slate-100">
                    {/* Item 1 (Active) */}
                    <div class="p-4 bg-blue-50 border-l-4 border-blue-600 cursor-pointer">
                      <div class="flex justify-between items-start mb-1">
                        <span class="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
                        <span class="text-xs text-slate-400">10분 전</span>
                      </div>
                      <h4 class="font-bold text-slate-900 text-sm mb-1">전기차 배터리 케이스 가공</h4>
                      <p class="text-xs text-slate-500 mb-2">발주사: (주)한화시스템 1차협력사</p>
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-indigo-600"><i class="fas fa-check-circle mr-1"></i>3개사 매칭됨</span>
                        <i class="fas fa-chevron-right text-slate-400 text-xs"></i>
                      </div>
                    </div>
                    {/* Item 2 */}
                    <div class="p-4 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                      <div class="flex justify-between items-start mb-1">
                        <span class="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded">대기중</span>
                        <span class="text-xs text-slate-400">3시간 전</span>
                      </div>
                      <h4 class="font-bold text-slate-900 text-sm mb-1">의료기기 임플란트 시제품</h4>
                      <p class="text-xs text-slate-500 mb-2">발주사: 메디컬솔루션</p>
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-500">매칭 진행 중...</span>
                      </div>
                    </div>
                    {/* Item 3 */}
                    <div class="p-4 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                      <div class="flex justify-between items-start mb-1">
                        <span class="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">발송완료</span>
                        <span class="text-xs text-slate-400">어제</span>
                      </div>
                      <h4 class="font-bold text-slate-900 text-sm mb-1">선박용 대형 밸브 주조</h4>
                      <p class="text-xs text-slate-500 mb-2">발주사: 부산조선해양</p>
                      <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-green-600"><i class="fas fa-check-double mr-1"></i>5개사 발송됨</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Notification Center */}
                <div class="w-full lg:w-2/3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <div>
                      <h3 class="font-bold text-lg text-slate-900">통합 알림 발송 센터</h3>
                      <p class="text-xs text-slate-500">매칭된 공급사에게 수주 요청 알림을 발송합니다.</p>
                    </div>
                    <div class="flex space-x-2">
                      <button class="bg-white border border-slate-300 text-slate-600 px-3 py-1.5 rounded text-xs font-bold hover:bg-slate-50">
                        <i class="fas fa-file-pdf mr-1"></i>요청서 보기
                      </button>
                    </div>
                  </div>

                  <div class="flex-1 overflow-y-auto p-6 space-y-8">
                    
                    {/* 1. Matched Suppliers */}
                    <div>
                      <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center">
                        <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">1</span>
                        수신 대상 선택 (매칭된 공급사)
                      </h4>
                      <div class="border border-slate-200 rounded-xl overflow-hidden">
                        <table class="w-full text-sm text-left">
                          <thead class="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                              <th class="px-4 py-3"><input type="checkbox" checked class="rounded" /></th>
                              <th class="px-4 py-3">기업명</th>
                              <th class="px-4 py-3">담당자 / 연락처</th>
                              <th class="px-4 py-3">매칭 점수</th>
                              <th class="px-4 py-3">상태</th>
                            </tr>
                          </thead>
                          <tbody class="divide-y divide-slate-100">
                            <tr class="bg-blue-50/30">
                              <td class="px-4 py-3"><input type="checkbox" checked class="rounded text-blue-600" /></td>
                              <td class="px-4 py-3 font-bold text-slate-800">(주)태성정밀 <span class="text-[10px] bg-indigo-100 text-indigo-700 px-1 rounded ml-1">A+</span></td>
                              <td class="px-4 py-3 text-slate-600">김철수 이사 (010-1234-5678)</td>
                              <td class="px-4 py-3 text-blue-600 font-bold">98점</td>
                              <td class="px-4 py-3"><span class="text-xs text-slate-400">대기</span></td>
                            </tr>
                            <tr>
                              <td class="px-4 py-3"><input type="checkbox" checked class="rounded text-blue-600" /></td>
                              <td class="px-4 py-3 font-bold text-slate-800">대영플라스틱</td>
                              <td class="px-4 py-3 text-slate-600">이영희 부장 (010-9876-5432)</td>
                              <td class="px-4 py-3 text-blue-600 font-bold">94점</td>
                              <td class="px-4 py-3"><span class="text-xs text-slate-400">대기</span></td>
                            </tr>
                            <tr>
                              <td class="px-4 py-3"><input type="checkbox" checked class="rounded text-blue-600" /></td>
                              <td class="px-4 py-3 font-bold text-slate-800">한일철강</td>
                              <td class="px-4 py-3 text-slate-600">박정우 대표 (010-5555-4444)</td>
                              <td class="px-4 py-3 text-blue-600 font-bold">89점</td>
                              <td class="px-4 py-3"><span class="text-xs text-slate-400">대기</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 2. Channel Selection */}
                    <div>
                      <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center">
                        <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">2</span>
                        발송 채널 선택 (다중 선택 가능)
                      </h4>
                      <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
                        <label class="cursor-pointer">
                          <input type="checkbox" checked class="peer sr-only" />
                          <div class="p-3 border-2 border-blue-500 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 border-slate-200 bg-white transition-all">
                            <i class="fas fa-comment text-2xl text-yellow-900 bg-yellow-400 w-8 h-8 flex items-center justify-center rounded-lg mb-2"></i>
                            <span class="text-xs font-bold text-slate-800">카카오 알림톡</span>
                          </div>
                        </label>
                        <label class="cursor-pointer">
                          <input type="checkbox" checked class="peer sr-only" />
                          <div class="p-3 border-2 border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all">
                            <i class="fas fa-mobile-alt text-2xl text-green-600 mb-2"></i>
                            <span class="text-xs font-bold text-slate-800">문자 (SMS/LMS)</span>
                          </div>
                        </label>
                        <label class="cursor-pointer">
                          <input type="checkbox" checked class="peer sr-only" />
                          <div class="p-3 border-2 border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all">
                            <i class="fas fa-envelope text-2xl text-red-500 mb-2"></i>
                            <span class="text-xs font-bold text-slate-800">이메일</span>
                          </div>
                        </label>
                        <label class="cursor-pointer">
                          <input type="checkbox" class="peer sr-only" />
                          <div class="p-3 border-2 border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all opacity-60 peer-checked:opacity-100">
                            <i class="fas fa-fax text-2xl text-slate-600 mb-2"></i>
                            <span class="text-xs font-bold text-slate-800">인터넷 팩스</span>
                          </div>
                        </label>
                        <label class="cursor-pointer">
                          <input type="checkbox" class="peer sr-only" />
                          <div class="p-3 border-2 border-slate-200 bg-white rounded-xl flex flex-col items-center justify-center text-center peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all opacity-60 peer-checked:opacity-100">
                            <i class="fas fa-phone-volume text-2xl text-purple-600 mb-2"></i>
                            <span class="text-xs font-bold text-slate-800">ARS 자동전화</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* 3. Message Preview */}
                    <div>
                      <h4 class="text-sm font-bold text-slate-700 mb-3 flex items-center">
                        <span class="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs mr-2">3</span>
                        발송 내용 미리보기 (알림톡 기준)
                      </h4>
                      <div class="bg-yellow-50 p-4 rounded-xl border border-yellow-200 relative max-w-sm">
                        <div class="absolute top-2 right-2 text-yellow-400"><i class="fas fa-comment text-xl"></i></div>
                        <p class="text-xs text-slate-500 mb-1">[경영인증평가원] 신규 수주 요청 안내</p>
                        <p class="text-sm font-bold text-slate-800 mb-2">김철수 님, 귀사의 보유 설비에 적합한 신규 제조 요청이 접수되었습니다.</p>
                        <div class="bg-white p-3 rounded border border-yellow-100 text-xs text-slate-600 space-y-1 mb-3">
                          <p><span class="font-bold">프로젝트:</span> 전기차 배터리 케이스 가공</p>
                          <p><span class="font-bold">발주사:</span> (주)한화시스템 1차협력사</p>
                          <p><span class="font-bold">예상규모:</span> 5,000만원 / 1,000개</p>
                          <p><span class="font-bold">마감일:</span> 2026-01-20</p>
                        </div>
                        <button class="w-full bg-slate-100 text-slate-700 py-2 rounded text-xs font-bold border border-slate-200">
                          요청서 확인 및 견적 제출
                        </button>
                      </div>
                    </div>

                  </div>

                  <div class="p-6 border-t border-slate-100 bg-slate-50 flex justify-end items-center space-x-3">
                    <span class="text-xs text-slate-500">총 3개 채널 / 3개 기업 발송 예정</span>
                    <button id="send-noti-btn" onclick="sendNotifications()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center">
                      <i class="fas fa-paper-plane mr-2"></i> 알림 일괄 발송
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* === Tab: System Settings (Updated) === */}
            {activeTab === 'settings' && (
              <div class="max-w-4xl mx-auto animate-fade-in-up space-y-8">
                
                {/* 1. Domain Settings */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 class="text-lg font-bold text-slate-900 mb-1">시스템 업데이트 및 관리</h3>
                  <p class="text-sm text-slate-500 mb-6">최신 코드를 서버에 반영하거나 재시작합니다.</p>
                  
                  <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div>
                      <span class="block text-sm font-bold text-slate-700">사이트 즉시 배포 (Update)</span>
                      <span class="text-xs text-slate-500">GitHub의 최신 변경사항을 반영합니다.</span>
                    </div>
                    <button onclick="triggerDeploy()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow transition-all flex items-center">
                      <i class="fas fa-rocket mr-2"></i> 배포 시작
                    </button>
                  </div>
                </div>

                {/* 2. Notification API Settings (New) */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 class="text-lg font-bold text-slate-900 mb-1">알림 발송 채널 설정</h3>
                  <p class="text-sm text-slate-500 mb-6">알림톡, SMS, 메일 등 외부 발송 서비스 API를 연동합니다.</p>

                  <div class="space-y-6">
                    {/* Kakao */}
                    <div class="border border-slate-200 rounded-xl p-5">
                      <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-white mr-3 shadow-sm"><i class="fas fa-comment text-xl text-yellow-900"></i></div>
                          <div>
                            <h4 class="font-bold text-slate-800">카카오 비즈메시지 (알림톡)</h4>
                            <p class="text-xs text-slate-500">BizTalk API 연동</p>
                          </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked class="sr-only peer" />
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      <div class="grid grid-cols-2 gap-4">
                        <div><label class="block text-xs font-bold text-slate-600 mb-1">Sender Key</label><input type="text" value="f8291..." class="w-full text-xs border-slate-300 rounded" disabled /></div>
                        <div><label class="block text-xs font-bold text-slate-600 mb-1">API Key</label><input type="password" value="********" class="w-full text-xs border-slate-300 rounded" disabled /></div>
                      </div>
                    </div>

                    {/* SMS */}
                    <div class="border border-slate-200 rounded-xl p-5">
                      <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white mr-3 shadow-sm"><i class="fas fa-mobile-alt text-xl"></i></div>
                          <div>
                            <h4 class="font-bold text-slate-800">SMS 게이트웨이</h4>
                            <p class="text-xs text-slate-500">CoolSMS / Solapi 연동</p>
                          </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked class="sr-only peer" />
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {/* Fax */}
                    <div class="border border-slate-200 rounded-xl p-5">
                      <div class="flex justify-between items-center mb-4">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center text-white mr-3 shadow-sm"><i class="fas fa-fax text-xl"></i></div>
                          <div>
                            <h4 class="font-bold text-slate-800">인터넷 팩스 (e-Fax)</h4>
                            <p class="text-xs text-slate-500">하나팩스 / 엔팩스 연동</p>
                          </div>
                        </div>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" class="sr-only peer" />
                          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                  </div>
                </div>

                {/* 3. ERP & External Link */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 class="text-lg font-bold text-slate-900 mb-1">외부 서비스 연동</h3>
                  <p class="text-sm text-slate-500 mb-6">ERP 및 쇼핑몰 데이터를 동기화합니다.</p>
                  
                  <div class="space-y-4">
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div class="flex items-center">
                        <div class="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center font-bold mr-3">I</div>
                        <div>
                          <span class="block text-sm font-bold text-slate-700">아임웹 (Imweb) 연동</span>
                          <span class="text-xs text-slate-500">회원 DB 및 SSO 로그인</span>
                        </div>
                      </div>
                      <button id="btn-config-imweb" class="text-xs bg-white border border-slate-300 px-3 py-1 rounded font-bold">설정</button>
                    </div>
                    <div class="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                      <div class="flex items-center">
                        <div class="w-8 h-8 bg-red-100 text-red-600 rounded flex items-center justify-center font-bold mr-3">E</div>
                        <div>
                          <span class="block text-sm font-bold text-slate-700">이카운트 (ECOUNT) ERP</span>
                          <span class="text-xs text-slate-500">거래처 정보 및 재무 데이터</span>
                        </div>
                      </div>
                      <button id="btn-config-ecount" class="text-xs bg-white border border-slate-300 px-3 py-1 rounded font-bold">설정</button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* === Tab: Audit / ERP Management (Same as before) === */}
            {activeTab === 'audit' && (
              <div class="space-y-8 animate-fade-in-up">
                {/* 1. ECOUNT ERP Sync Status */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h3 class="text-lg font-bold text-slate-900">이카운트 ERP 연동 상태</h3>
                      <p class="text-sm text-slate-500">공급사의 재무/설비 정보를 자동으로 동기화합니다.</p>
                    </div>
                    <div class="flex items-center">
                      <span class="flex h-3 w-3 relative mr-2">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <span class="text-sm font-bold text-green-600">연동 정상 (API v2.0)</span>
                    </div>
                  </div>

                  <div class="grid md:grid-cols-3 gap-6 mb-6">
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <span class="text-xs text-slate-500 block mb-1">총 연동 기업 수</span>
                      <strong class="text-2xl font-bold text-slate-800">1,240</strong>
                      <span class="text-xs text-slate-400 ml-1">개사</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <span class="text-xs text-slate-500 block mb-1">최근 동기화</span>
                      <strong class="text-xl font-bold text-slate-800">2026-01-05</strong>
                      <span class="text-xs text-slate-400 ml-1">14:30:22</span>
                    </div>
                    <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
                       <span class="text-xs text-slate-500 block mb-1">API 호출량 (오늘)</span>
                      <strong id="api-call-count" class="text-xl font-bold text-blue-600">342</strong>
                      <span class="text-xs text-slate-400 ml-1">calls</span>
                    </div>
                  </div>

                  <div class="flex justify-end">
                    <button class="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 mr-2">
                      <i class="fas fa-history mr-2"></i>로그 보기
                    </button>
                    <button id="btn-sync-erp" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm">
                      <i class="fas fa-sync mr-2"></i>즉시 동기화
                    </button>
                  </div>
                </div>

                {/* 2. Manual Audit Upload */}
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div class="flex items-center justify-between mb-6">
                    <div>
                      <h3 class="text-lg font-bold text-slate-900">심사보고서 수동 등록</h3>
                      <p class="text-sm text-slate-500">경영인증평가원 심사원이 작성한 심사보고서(PDF/Excel)를 업로드하여 매칭 DB에 반영합니다.</p>
                    </div>
                  </div>

                  <div class="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                    <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i class="fas fa-file-upload text-2xl"></i>
                    </div>
                    <h4 class="text-lg font-bold text-slate-800 mb-2">심사보고서 파일 드래그 앤 드롭</h4>
                    <p class="text-sm text-slate-500 mb-6">
                      또는 <span class="text-blue-600 font-bold underline">파일 찾기</span>를 클릭하세요.<br/>
                      <span class="text-xs text-slate-400">지원 형식: PDF, XLSX (최대 20MB)</span>
                    </p>
                    <button class="bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-900">
                      파일 업로드
                    </button>
                  </div>
                  
                  {/* Upload History Table */}
                  <div class="mt-8">
                    <h4 class="text-sm font-bold text-slate-700 mb-4">최근 업로드 내역</h4>
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm text-left">
                        <thead class="bg-slate-50 text-slate-500 font-medium">
                          <tr>
                            <th class="px-4 py-3 rounded-l-lg">파일명</th>
                            <th class="px-4 py-3">대상 기업</th>
                            <th class="px-4 py-3">심사원</th>
                            <th class="px-4 py-3">업로드 일시</th>
                            <th class="px-4 py-3">상태</th>
                            <th class="px-4 py-3 rounded-r-lg">작업</th>
                          </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-100">
                          <tr>
                            <td class="px-4 py-3 font-medium text-slate-800">
                              <i class="far fa-file-pdf text-red-500 mr-2"></i> 2025_태성정밀_심사보고서.pdf
                            </td>
                            <td class="px-4 py-3">태성정밀</td>
                            <td class="px-4 py-3">김철수 수석</td>
                            <td class="px-4 py-3 text-slate-500">2026-01-05 10:20</td>
                            <td class="px-4 py-3"><span class="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">승인 완료</span></td>
                            <td class="px-4 py-3 text-blue-600 cursor-pointer hover:underline">보기</td>
                          </tr>
                          <tr>
                            <td class="px-4 py-3 font-medium text-slate-800">
                              <i class="far fa-file-excel text-green-500 mr-2"></i> 대영플라스틱_장비리스트.xlsx
                            </td>
                            <td class="px-4 py-3">대영플라스틱</td>
                            <td class="px-4 py-3">이영희 선임</td>
                            <td class="px-4 py-3 text-slate-500">2026-01-04 15:45</td>
                            <td class="px-4 py-3"><span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">데이터 처리 중</span></td>
                            <td class="px-4 py-3 text-blue-600 cursor-pointer hover:underline">보기</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'overview' && (
              <div class="space-y-8 animate-fade-in-up">
                
                {/* 1. Key Metrics Cards (ID Added for Real-time Updates) */}
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Total Users */}
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wide">총 회원 수</p>
                        <h3 id="stat-total-users" class="text-2xl font-extrabold text-slate-800 mt-1">-</h3>
                      </div>
                      <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <i class="fas fa-users"></i>
                      </div>
                    </div>
                    <div class="mt-4 flex items-center text-xs">
                      <span class="text-green-500 font-bold flex items-center"><i class="fas fa-arrow-up mr-1"></i> 실시간</span>
                      <span class="text-slate-400 ml-2">집계 중...</span>
                    </div>
                  </div>

                  {/* Card 2: AI Analysis Usage */}
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wide">AI 분석 횟수</p>
                        <h3 id="stat-ai-usage" class="text-2xl font-extrabold text-slate-800 mt-1">-</h3>
                      </div>
                      <div class="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                        <i class="fas fa-robot"></i>
                      </div>
                    </div>
                     <div class="mt-4 flex items-center text-xs">
                      <span class="text-indigo-500 font-bold flex items-center"><i class="fas fa-chart-bar mr-1"></i> 누적</span>
                      <span class="text-slate-400 ml-2">OpenAI API 호출</span>
                    </div>
                  </div>

                  {/* Card 3: Crawled Data */}
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wide">수집된 공고 데이터</p>
                        <h3 id="stat-crawler-usage" class="text-2xl font-extrabold text-slate-800 mt-1">-</h3>
                      </div>
                      <div class="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                        <i class="fas fa-spider"></i>
                      </div>
                    </div>
                     <div class="mt-4 flex items-center text-xs">
                      <span class="text-emerald-500 font-bold flex items-center"><i class="fas fa-sync mr-1"></i> 자동</span>
                      <span class="text-slate-400 ml-2">크롤링 수집 건수</span>
                    </div>
                  </div>

                  {/* Card 4: Pending (Static for now) */}
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-start">
                      <div>
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wide">승인 대기</p>
                        <h3 class="text-2xl font-extrabold text-slate-800 mt-1">0</h3>
                      </div>
                      <div class="p-2 bg-orange-50 rounded-lg text-orange-600">
                        <i class="fas fa-clock"></i>
                      </div>
                    </div>
                     <div class="mt-4 flex items-center text-xs">
                      <span class="text-slate-400">관리자 확인 필요</span>
                    </div>
                  </div>
                </div>

                {/* 2. Charts & Activity (Restored & Enhanced) */}
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Traffic Chart (CSS Based Visualization) */}
                  <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <div class="flex justify-between items-center mb-6">
                      <h3 class="font-bold text-lg text-slate-900">월별 방문자 및 가입 추이</h3>
                      <select class="text-xs border border-slate-200 rounded px-2 py-1">
                        <option>2026년</option>
                        <option>2025년</option>
                      </select>
                    </div>
                    <div class="h-64 flex items-end justify-between space-x-2 px-2">
                      {[40, 55, 45, 60, 75, 65, 80, 70, 85, 90, 85, 95].map((h, i) => (
                        <div class="flex flex-col items-center flex-1 group">
                          <div class="relative w-full bg-blue-50 rounded-t-sm overflow-hidden h-full flex items-end">
                             <div style={{height: h + '%'}} class="w-full bg-blue-500 rounded-t-sm group-hover:bg-blue-600 transition-all relative">
                               <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                 {h * 123}명
                               </div>
                             </div>
                          </div>
                          <span class="text-[10px] text-slate-400 mt-2">{i+1}월</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Recent Logs */}
                  <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 class="font-bold text-lg text-slate-900 mb-4">실시간 활동 로그</h3>
                    <div class="space-y-4">
                      <div class="flex items-start">
                        <div class="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        <div>
                          <p class="text-sm text-slate-700"><span class="font-bold">김철수</span>님이 파트너 가입을 신청했습니다.</p>
                          <span class="text-xs text-slate-400">10분 전</span>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <div class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        <div>
                          <p class="text-sm text-slate-700">새로운 견적 요청(RFQ)이 등록되었습니다.</p>
                          <span class="text-xs text-slate-400">32분 전</span>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <div class="w-2 h-2 bg-slate-300 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        <div>
                          <p class="text-sm text-slate-700">관리자(Admin)가 시스템 설정을 변경했습니다.</p>
                          <span class="text-xs text-slate-400">1시간 전</span>
                        </div>
                      </div>
                      <div class="flex items-start">
                        <div class="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></div>
                        <div>
                          <p class="text-sm text-slate-700">비정상적인 접근 시도가 차단되었습니다.</p>
                          <span class="text-xs text-slate-400">3시간 전</span>
                        </div>
                      </div>
                    </div>
                    <button class="w-full mt-6 py-2 text-xs font-bold text-slate-500 border border-slate-200 rounded hover:bg-slate-50">
                      로그 더보기
                    </button>
                  </div>
                </div>

              </div>
            )}
            
            {/* === Tab: User Management (Restored) === */}
            {activeTab === 'users' && (
              <div class="space-y-6 animate-fade-in-up">
                <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <div>
                      <h3 class="font-bold text-lg text-slate-900">전체 회원 관리</h3>
                      <p class="text-sm text-slate-500">가입된 기업 및 개인 회원을 조회하고 관리합니다.</p>
                    </div>
                    <div class="flex space-x-2 w-full md:w-auto">
                      <select class="border border-slate-300 rounded-lg text-sm px-3 py-2 bg-white">
                        <option>전체 회원</option>
                        <option>기업 회원</option>
                        <option>기관/심사원</option>
                        <option>차단된 회원</option>
                      </select>
                      <input type="text" placeholder="이름, 이메일 검색" class="border border-slate-300 rounded-lg text-sm px-3 py-2 flex-grow" />
                      <button class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">검색</button>
                    </div>
                  </div>

                  <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                      <thead class="bg-slate-50 text-slate-500 font-bold border-y border-slate-200">
                        <tr>
                          <th class="px-4 py-3">회원유형</th>
                          <th class="px-4 py-3">이름/기업명</th>
                          <th class="px-4 py-3">이메일 (ID)</th>
                          <th class="px-4 py-3">가입일</th>
                          <th class="px-4 py-3">최근접속</th>
                          <th class="px-4 py-3">상태</th>
                          <th class="px-4 py-3 text-center">관리</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50 transition-colors">
                          <td class="px-4 py-3"><span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">기업</span></td>
                          <td class="px-4 py-3 font-medium text-slate-900">김철수 (태성정밀)</td>
                          <td class="px-4 py-3 text-slate-500">kim@taesung.co.kr</td>
                          <td class="px-4 py-3 text-slate-400">2026-01-01</td>
                          <td class="px-4 py-3 text-slate-600">방금 전</td>
                          <td class="px-4 py-3"><span class="text-green-600 font-bold text-xs">● 정상</span></td>
                          <td class="px-4 py-3 text-center">
                            <button class="btn-user-edit text-slate-400 hover:text-blue-600 mx-1"><i class="fas fa-edit"></i></button>
                            <button class="btn-user-block text-slate-400 hover:text-red-600 mx-1"><i class="fas fa-ban"></i></button>
                          </td>
                        </tr>
                        <tr class="hover:bg-slate-50 transition-colors">
                          <td class="px-4 py-3"><span class="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-bold">심사원</span></td>
                          <td class="px-4 py-3 font-medium text-slate-900">이영희 심사역</td>
                          <td class="px-4 py-3 text-slate-500">auditor_lee@mce.re.kr</td>
                          <td class="px-4 py-3 text-slate-400">2025-12-15</td>
                          <td class="px-4 py-3 text-slate-600">3시간 전</td>
                          <td class="px-4 py-3"><span class="text-green-600 font-bold text-xs">● 정상</span></td>
                          <td class="px-4 py-3 text-center">
                            <button class="btn-user-edit text-slate-400 hover:text-blue-600 mx-1"><i class="fas fa-edit"></i></button>
                            <button class="btn-user-block text-slate-400 hover:text-red-600 mx-1"><i class="fas fa-ban"></i></button>
                          </td>
                        </tr>
                        <tr class="hover:bg-slate-50 transition-colors bg-red-50/30">
                          <td class="px-4 py-3"><span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">기업</span></td>
                          <td class="px-4 py-3 font-medium text-slate-900">박사기 (페이퍼컴퍼니)</td>
                          <td class="px-4 py-3 text-slate-500">scam@fake.com</td>
                          <td class="px-4 py-3 text-slate-400">2026-01-04</td>
                          <td class="px-4 py-3 text-slate-600">어제</td>
                          <td class="px-4 py-3"><span class="text-red-600 font-bold text-xs">차단됨</span></td>
                          <td class="px-4 py-3 text-center">
                            <button class="text-slate-400 hover:text-blue-600 mx-1"><i class="fas fa-undo"></i></button>
                          </td>
                        </tr>
                        {/* More rows simulation */}
                        {[1,2,3].map(i => (
                          <tr class="hover:bg-slate-50 transition-colors">
                            <td class="px-4 py-3"><span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold">기업</span></td>
                            <td class="px-4 py-3 font-medium text-slate-900">최대표 (미래산업_{i})</td>
                            <td class="px-4 py-3 text-slate-500">ceo{i}@mirae.com</td>
                            <td class="px-4 py-3 text-slate-400">2026-01-0{i}</td>
                            <td class="px-4 py-3 text-slate-600">{i}일 전</td>
                            <td class="px-4 py-3"><span class="text-green-600 font-bold text-xs">● 정상</span></td>
                            <td class="px-4 py-3 text-center">
                              <button class="btn-user-edit text-slate-400 hover:text-blue-600 mx-1"><i class="fas fa-edit"></i></button>
                              <button class="btn-user-block text-slate-400 hover:text-red-600 mx-1"><i class="fas fa-ban"></i></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div class="flex justify-center mt-6">
                    <div class="flex space-x-1">
                      <button class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50"><i class="fas fa-chevron-left text-xs"></i></button>
                      <button class="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-bold">1</button>
                      <button class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50">2</button>
                      <button class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50">3</button>
                      <button class="w-8 h-8 flex items-center justify-center rounded border border-slate-200 hover:bg-slate-50"><i class="fas fa-chevron-right text-xs"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs */}
            {activeTab !== 'overview' && activeTab !== 'audit' && activeTab !== 'rfq' && activeTab !== 'settings' && activeTab !== 'partners' && activeTab !== 'banners' && activeTab !== 'seo' && activeTab !== 'users' && (
              <div class="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center animate-fade-in-up">
                <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <i class="fas fa-tools text-3xl"></i>
                </div>
                <h3 class="text-xl font-bold text-slate-800 mb-2">페이지 준비 중</h3>
                <p class="text-slate-500">해당 관리 기능은 개발 진행 중입니다.</p>
              </div>
            )}

          </div>
        </main>
      </div>

      <script src={`/static/js/core.js?v=${new Date().getTime()}`}></script>
      <script src={`/static/js/admin.js?v=${new Date().getTime()}`}></script>
    </Layout>
  )
}
