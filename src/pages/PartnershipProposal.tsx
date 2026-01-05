import { Layout } from '../components/Layout'

export const PartnershipProposal = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-white min-h-screen">
        {/* Hero Section */}
        <section class="relative h-[300px] flex items-center justify-center overflow-hidden">
          <div class="absolute inset-0 z-0">
             <img 
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="Partnership Hero" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70"></div>
          </div>
          <div class="relative z-10 text-center text-white px-4">
            <h1 class="text-3xl md:text-4xl font-bold mb-4">제휴/협력 제안</h1>
            <p class="text-lg text-gray-300 max-w-2xl mx-auto">
              경영인증평가원과 함께 새로운 비즈니스 성공 스토리를 만들어가세요.<br/>
              다양한 분야의 파트너십 제안을 기다립니다.
            </p>
            <div class="mt-8">
               <a href="#proposal-form" class="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg">
                 제안서 등록하기
               </a>
            </div>
          </div>
        </section>

        {/* Why Partner with Us */}
        <section class="py-16 bg-gray-50">
           <div class="max-w-7xl mx-auto px-4">
             <div class="text-center mb-12">
               <h2 class="text-2xl font-bold text-slate-900 mb-2">왜 경영인증평가원인가요?</h2>
               <p class="text-gray-500">최고의 파트너와 함께 성장하는 기회를 잡으세요</p>
             </div>
             <div class="grid md:grid-cols-3 gap-8">
               <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                 <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 text-2xl">
                   <i class="fas fa-network-wired"></i>
                 </div>
                 <h3 class="font-bold text-xl mb-3">방대한 네트워크</h3>
                 <p class="text-gray-600">국내외 1만여 제조 기업 및<br/>500+ 인증 파트너 보유</p>
               </div>
               <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                 <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 text-2xl">
                   <i class="fas fa-database"></i>
                 </div>
                 <h3 class="font-bold text-xl mb-3">데이터 기반 매칭</h3>
                 <p class="text-gray-600">BASA 기업 신용 데이터 연동을<br/>통한 정교한 타겟팅</p>
               </div>
               <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                 <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 text-2xl">
                   <i class="fas fa-medal"></i>
                 </div>
                 <h3 class="font-bold text-xl mb-3">공신력과 브랜드</h3>
                 <p class="text-gray-600">ISO/IATF 인증기관으로서<br/>높은 신뢰도 보유</p>
               </div>
             </div>
           </div>
        </section>

        {/* Partnership Areas */}
        <section class="py-16">
          <div class="max-w-7xl mx-auto px-4">
             <h2 class="text-2xl font-bold text-slate-900 mb-8 text-center">제안 가능 분야</h2>
             <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
               <div class="border border-gray-200 p-6 rounded-lg hover:border-blue-500 transition cursor-default">
                 <h3 class="font-bold text-lg mb-2">심사/컨설팅</h3>
                 <p class="text-sm text-gray-500">ISO, ESG, 스마트공장 등<br/>컨설팅 협력</p>
               </div>
               <div class="border border-gray-200 p-6 rounded-lg hover:border-blue-500 transition cursor-default">
                 <h3 class="font-bold text-lg mb-2">교육/연수</h3>
                 <p class="text-sm text-gray-500">직무 교육, 심사원 양성<br/>콘텐츠 제휴</p>
               </div>
               <div class="border border-gray-200 p-6 rounded-lg hover:border-blue-500 transition cursor-default">
                 <h3 class="font-bold text-lg mb-2">IT/솔루션</h3>
                 <p class="text-sm text-gray-500">ERP, MES, 그룹웨어<br/>시스템 연동</p>
               </div>
               <div class="border border-gray-200 p-6 rounded-lg hover:border-blue-500 transition cursor-default">
                 <h3 class="font-bold text-lg mb-2">공공/지자체</h3>
                 <p class="text-sm text-gray-500">정부 지원사업 운영 대행<br/>및 정책 홍보</p>
               </div>
             </div>
          </div>
        </section>

        {/* Proposal Form Section */}
        <section id="proposal-form" class="py-16 bg-slate-50 border-t border-gray-200">
          <div class="max-w-6xl mx-auto px-4">
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
              {/* Left Info Panel */}
              <div class="bg-slate-900 text-white p-10 md:w-1/3 flex flex-col justify-between">
                <div>
                   <h3 class="text-2xl font-bold mb-6">제휴 제안</h3>
                   <p class="text-gray-300 mb-8 leading-relaxed">
                     보내주신 제안서는 담당 부서에서 신중하게 검토 후 회신드립니다.
                   </p>
                   <div class="space-y-6">
                     <div class="flex items-start">
                       <i class="fas fa-envelope mt-1 w-6 text-blue-400"></i>
                       <div>
                         <span class="block text-sm text-gray-400">문의 이메일</span>
                         <span class="font-bold">partnership@mce.re.kr</span>
                       </div>
                     </div>
                     <div class="flex items-start">
                       <i class="fas fa-phone-alt mt-1 w-6 text-blue-400"></i>
                       <div>
                         <span class="block text-sm text-gray-400">연락처</span>
                         <span class="font-bold">051-714-0798</span>
                       </div>
                     </div>
                     <div class="flex items-start">
                       <i class="fas fa-clock mt-1 w-6 text-blue-400"></i>
                       <div>
                         <span class="block text-sm text-gray-400">평균 응답 시간</span>
                         <span class="font-bold">영업일 기준 3일 이내</span>
                       </div>
                     </div>
                   </div>
                </div>
                
                <div class="mt-12 pt-8 border-t border-slate-700">
                  <h4 class="font-bold mb-4">제휴 프로세스</h4>
                  <ul class="text-sm space-y-4 relative">
                    {/* Timeline Line */}
                    <div class="absolute top-2 bottom-2 left-[7px] w-[2px] bg-slate-700"></div>
                    
                    <li class="relative pl-6">
                      <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-slate-900"></div>
                      <span class="font-bold block">1. 제안서 접수</span>
                    </li>
                    <li class="relative pl-6">
                      <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                      <span class="text-gray-400 block">2. 내부 검토 (3일)</span>
                    </li>
                    <li class="relative pl-6">
                      <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                      <span class="text-gray-400 block">3. 미팅 및 협의</span>
                    </li>
                    <li class="relative pl-6">
                      <div class="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                      <span class="text-gray-400 block">4. 협약 체결</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Form Panel */}
              <div class="p-10 md:w-2/3">
                 <form class="space-y-6" onsubmit="event.preventDefault(); submitProposal();">
                   <div class="grid md:grid-cols-2 gap-6">
                     <div>
                       <label class="block text-sm font-bold text-gray-700 mb-2">기업/기관명 <span class="text-red-500">*</span></label>
                       <input type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="회사명 입력" />
                     </div>
                     <div>
                       <label class="block text-sm font-bold text-gray-700 mb-2">웹사이트</label>
                       <input type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="https://" />
                     </div>
                   </div>

                   <div class="grid md:grid-cols-3 gap-6">
                     <div>
                       <label class="block text-sm font-bold text-gray-700 mb-2">담당자명 <span class="text-red-500">*</span></label>
                       <input type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                     </div>
                     <div>
                       <label class="block text-sm font-bold text-gray-700 mb-2">연락처 <span class="text-red-500">*</span></label>
                       <input type="tel" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="010-0000-0000" />
                     </div>
                     <div>
                       <label class="block text-sm font-bold text-gray-700 mb-2">이메일 <span class="text-red-500">*</span></label>
                       <input type="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                     </div>
                   </div>

                   <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">제휴 구분 <span class="text-red-500">*</span></label>
                     <select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                       <option>선택해주세요</option>
                       <option>마케팅 / 프로모션</option>
                       <option>교육 / 콘텐츠</option>
                       <option>기술 / 솔루션</option>
                       <option>영업 / 대리점</option>
                       <option>정부사업 / 공공</option>
                       <option>기타</option>
                     </select>
                   </div>

                   <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">제안 제목 <span class="text-red-500">*</span></label>
                     <input type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="제안하시는 내용의 핵심 제목을 입력해주세요" />
                   </div>

                   <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">상세 내용 <span class="text-red-500">*</span></label>
                     <textarea required rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" placeholder="제휴 제안 상세 내용을 입력해주세요"></textarea>
                   </div>

                   <div>
                     <label class="block text-sm font-bold text-gray-700 mb-2">파일 업로드 (회사소개서/제안서)</label>
                     <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition cursor-pointer" onclick="document.getElementById('file-upload').click()">
                       <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-2"></i>
                       <p class="text-sm text-gray-600">클릭하여 파일을 업로드하세요</p>
                       <p class="text-xs text-gray-400 mt-1">PDF, PPTX, DOCX (최대 10MB)</p>
                       <input type="file" id="file-upload" class="hidden" accept=".pdf,.pptx,.docx,.doc,.ppt" />
                     </div>
                   </div>

                   <div class="flex items-start bg-gray-50 p-4 rounded-lg">
                     <input type="checkbox" id="privacy" required class="mt-1 mr-3 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                     <label for="privacy" class="text-sm text-gray-600">
                       <span class="text-red-500 font-bold">(필수)</span> 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 제안서 검토 목적으로만 사용되며, 검토 후 파기됩니다.
                     </label>
                   </div>

                   <button type="submit" id="submit-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center justify-center">
                     <span>제안서 등록하기</span>
                     <i class="fas fa-paper-plane ml-2"></i>
                   </button>
                 </form>
              </div>
            </div>
          </div>
        </section>

      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          function submitProposal() {
            const btn = document.getElementById('submit-btn');
            const originalContent = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 전송 중...';
            
            setTimeout(() => {
              alert('제안서가 성공적으로 접수되었습니다.\\n담당자가 검토 후 입력하신 연락처로 회신드리겠습니다.');
              btn.innerHTML = originalContent;
              btn.disabled = false;
              document.querySelector('form').reset();
            }, 1500);
          }
        `
      }} />
    </Layout>
  )
}