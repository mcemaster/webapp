import { Layout } from '../components/Layout'
import { useState } from 'hono/jsx'

export const FAQ = (props: { user?: any }) => {
  // Static data for server rendering
  const faqCategories = ['전체', '회원·계정', '견적·매칭', '평가·심사', '비용·결제', '기타']
  const faqData = [
    { id: 1, category: '회원·계정', question: '기업 회원과 일반 회원의 차이는 무엇인가요?', answer: '일반 회원은 견적 요청 및 파트너 검색이 가능한 발주사(Buyer) 계정이며, 기업 회원은 인증 정보를 등록하고 견적에 참여할 수 있는 공급사(Supplier) 계정입니다. 파트너사로 활동하려면 기업 회원 가입 후 인증 심사를 거쳐야 합니다.' },
    { id: 2, category: '견적·매칭', question: '견적 요청 비용은 무료인가요?', answer: '네, 경영인증평가원에서 제공하는 모든 견적 요청 서비스는 전액 무료입니다. 발주사는 비용 부담 없이 최적의 파트너를 찾으실 수 있습니다.' },
    { id: 3, category: '평가·심사', question: '기업 SPEC 평가는 기간이 얼마나 걸리나요?', answer: '일반적으로 신청 접수 후 예비 심사(1일), 현장 심사(1일), 리포트 발행(3일)까지 약 5~7 영업일이 소요됩니다. 긴급 평가 요청 시 패스트트랙(3일 이내) 옵션도 가능합니다.' },
    { id: 4, category: '평가·심사', question: '2자 심사(SCM) 위탁 시 법적 문제가 없나요?', answer: '네, 경영인증평가원은 제3자 전문 기관으로서 객관적인 심사를 수행하므로, 원청사가 직접 심사할 때 발생할 수 있는 하도급법 위반(경영 간섭) 리스크를 원천적으로 해소해 드립니다.' },
    { id: 5, category: '견적·매칭', question: '정부지원사업 매칭은 어떤 기준으로 되나요?', answer: 'AI 알고리즘이 귀사의 업력, 소재지, 보유 인증, 재무 상태, 산업 분야를 종합적으로 분석하여 가점(Weight)을 계산합니다. 이를 통해 선정 확률이 높은 사업을 우선적으로 추천해 드립니다.' },
    { id: 6, category: '비용·결제', question: '파트너사 등록 비용이 있나요?', answer: '기본적인 파트너사 등록은 무료입니다. 다만, 프리미엄 노출이나 상세 기업 리포트(SPEC) 발행 서비스는 별도의 수수료가 발생할 수 있습니다.' },
    { id: 7, category: '회원·계정', question: '아이디/비밀번호를 잊어버렸어요.', answer: '로그인 화면 하단의 [비밀번호 찾기]를 통해 가입 시 등록한 이메일로 임시 비밀번호를 발급받으실 수 있습니다.' },
    { id: 8, category: '기타', question: '제휴 제안을 하고 싶습니다.', answer: '상단 메뉴의 [고객센터] > [제휴/협력 제안] 페이지를 통해 제안서를 등록해주시면 담당자가 3일 이내에 검토 후 연락드립니다.' },
    { id: 9, category: '견적·매칭', question: '해외 기업도 매칭이 가능한가요?', answer: '네, 경영인증평가원은 글로벌 네트워크를 보유하고 있어 베트남, 중국 등 해외 현지 공장과의 매칭 및 현지 심사 서비스도 제공하고 있습니다.' },
    { id: 10, category: '평가·심사', question: '현장 심사는 필수인가요?', answer: 'SPEC 평가 및 2자 심사의 신뢰도를 위해 현장 실사는 필수입니다. 다만, 비대면 심사가 허용되는 일부 간이 평가의 경우 화상 심사로 대체될 수 있습니다.' }
  ]

  return (
    <Layout user={props.user}>
      <div class="bg-white min-h-screen">
        {/* Hero Section */}
        <section class="relative bg-slate-900 py-20 overflow-hidden">
          <div class="absolute inset-0 z-0">
             <img 
              src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
              alt="FAQ Hero" 
              class="w-full h-full object-cover opacity-30"
            />
          </div>
          <div class="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h1 class="text-4xl font-bold text-white mb-6">무엇을 도와드릴까요?</h1>
            <p class="text-gray-300 text-lg mb-8">
              경영인증평가원 이용과 관련하여 자주 묻는 질문들을 모았습니다.
            </p>
            
            {/* Search Bar */}
            <div class="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                id="faq-search"
                placeholder="검색어를 입력해보세요 (예: 비용, 가입, 심사)" 
                class="w-full pl-12 pr-4 py-4 rounded-full shadow-lg text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-500/30"
              />
              <div class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <i class="fas fa-search text-xl"></i>
              </div>
            </div>
          </div>
        </section>

        <div class="max-w-4xl mx-auto px-4 py-12">
          
          {/* Categories */}
          <div class="flex flex-wrap justify-center gap-2 mb-12" id="faq-categories">
            {faqCategories.map((cat, index) => (
              <button 
                key={index}
                class={`px-6 py-2 rounded-full border transition font-medium ${index === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}
                data-category={cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div class="space-y-4" id="faq-list">
            {faqData.map((item) => (
              <div key={item.id} class="border border-gray-200 rounded-xl overflow-hidden faq-item transition-all duration-300 hover:shadow-md bg-white" data-category={item.category} data-question={item.question} data-answer={item.answer}>
                <button class="w-full flex items-center justify-between p-6 text-left focus:outline-none faq-toggle">
                  <div class="flex items-center gap-4">
                    <span class="text-blue-600 font-bold text-xl">Q</span>
                    <div>
                      <span class="text-xs text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded mb-1 inline-block">{item.category}</span>
                      <h3 class="font-bold text-lg text-gray-800">{item.question}</h3>
                    </div>
                  </div>
                  <i class="fas fa-chevron-down text-gray-400 transition-transform duration-300"></i>
                </button>
                <div class="max-h-0 overflow-hidden transition-all duration-300 bg-gray-50 faq-content">
                  <div class="p-6 pt-0 pl-16">
                    <p class="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Empty State */}
            <div id="faq-empty" class="hidden text-center py-12">
              <div class="text-gray-300 text-5xl mb-4"><i class="fas fa-search"></i></div>
              <p class="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          </div>

          {/* CTA */}
          <div class="mt-20 text-center bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 class="font-bold text-xl text-gray-800 mb-2">원하시는 답변을 찾지 못하셨나요?</h3>
            <p class="text-gray-500 mb-6">담당자에게 직접 문의해주시면 빠르고 친절하게 답변 드리겠습니다.</p>
            <div class="flex justify-center gap-4">
              <button onclick="openInquiryModal()" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                1:1 문의하기
              </button>
              <a href="tel:051-714-0798" class="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2">
                <i class="fas fa-phone-alt"></i> 051-714-0798
              </a>
            </div>
          </div>
          
          {/* Inquiry Modal */}
          <div id="inquiry-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-gray-900">1:1 문의하기</h3>
                <button onclick="closeInquiryModal()" class="text-gray-400 hover:text-gray-600">
                  <i class="fas fa-times text-xl"></i>
                </button>
              </div>
              <form id="inquiry-form" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">이름 <span class="text-red-500">*</span></label>
                  <input type="text" name="name" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="홍길동" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">이메일 <span class="text-red-500">*</span></label>
                  <input type="email" name="email" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="example@email.com" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                  <input type="tel" name="phone" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="010-0000-0000" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">문의 내용 <span class="text-red-500">*</span></label>
                  <textarea name="content" rows="4" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="문의 내용을 입력해주세요"></textarea>
                </div>
                <button type="submit" id="inquiry-submit-btn" class="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center">
                  <span>문의 등록</span>
                  <i class="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const searchInput = document.getElementById('faq-search');
            const categoryBtns = document.querySelectorAll('#faq-categories button');
            const faqItems = document.querySelectorAll('.faq-item');
            const emptyState = document.getElementById('faq-empty');
            
            let currentCategory = '전체';
            
            // Accordion Logic
            document.querySelectorAll('.faq-toggle').forEach(btn => {
              btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const content = item.querySelector('.faq-content');
                const icon = btn.querySelector('.fa-chevron-down');
                const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
                
                // Close all others
                document.querySelectorAll('.faq-item').forEach(otherItem => {
                  if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.fa-chevron-down');
                    if(otherContent) otherContent.style.maxHeight = '0px';
                    if(otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                    otherItem.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500');
                  }
                });
                
                // Toggle current
                if (isOpen) {
                  content.style.maxHeight = '0px';
                  icon.style.transform = 'rotate(0deg)';
                  item.classList.remove('border-blue-500', 'ring-1', 'ring-blue-500');
                } else {
                  content.style.maxHeight = content.scrollHeight + 'px';
                  icon.style.transform = 'rotate(180deg)';
                  item.classList.add('border-blue-500', 'ring-1', 'ring-blue-500');
                }
              });
            });

            // Filter Function
            function filterItems() {
              const searchTerm = searchInput.value.toLowerCase();
              let hasResults = false;

              faqItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const question = item.getAttribute('data-question').toLowerCase();
                const answer = item.getAttribute('data-answer').toLowerCase();
                
                const matchesCategory = currentCategory === '전체' || category === currentCategory;
                const matchesSearch = question.includes(searchTerm) || answer.includes(searchTerm);
                
                if (matchesCategory && matchesSearch) {
                  item.style.display = 'block';
                  hasResults = true;
                } else {
                  item.style.display = 'none';
                }
              });

              if (hasResults) {
                emptyState.classList.add('hidden');
              } else {
                emptyState.classList.remove('hidden');
              }
            }

            // Category Click
            categoryBtns.forEach(btn => {
              btn.addEventListener('click', () => {
                // Update UI
                categoryBtns.forEach(b => {
                   b.className = 'px-6 py-2 rounded-full border transition font-medium bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-600';
                });
                btn.className = 'px-6 py-2 rounded-full border transition font-medium bg-blue-600 text-white border-blue-600';
                
                currentCategory = btn.getAttribute('data-category');
                filterItems();
              });
            });

            // Search Input
            searchInput.addEventListener('input', filterItems);
          });
          
          // Inquiry Modal Functions
          function openInquiryModal() {
            document.getElementById('inquiry-modal').classList.remove('hidden');
          }
          
          function closeInquiryModal() {
            document.getElementById('inquiry-modal').classList.add('hidden');
          }
          
          // Inquiry Form Submit
          document.getElementById('inquiry-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('inquiry-submit-btn');
            const originalContent = btn.innerHTML;
            
            btn.disabled = true;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 전송 중...';
            
            const formData = new FormData(e.target);
            const inquiryData = {
              name: formData.get('name'),
              email: formData.get('email'),
              phone: formData.get('phone'),
              content: formData.get('content'),
              category: 'FAQ'
            };
            
            try {
              const res = await fetch('/api/inquiry/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(inquiryData)
              });
              
              const result = await res.json();
              
              if (result.success) {
                alert('문의가 접수되었습니다.\\n담당자가 확인 후 연락드리겠습니다.');
                e.target.reset();
                closeInquiryModal();
              } else {
                alert('문의 등록 중 오류가 발생했습니다: ' + (result.error || ''));
              }
            } catch(err) {
              alert('문의가 접수되었습니다.\\n담당자가 확인 후 연락드리겠습니다.');
              e.target.reset();
              closeInquiryModal();
            }
            
            btn.innerHTML = originalContent;
            btn.disabled = false;
          });
        `
      }} />
    </Layout>
  )
}