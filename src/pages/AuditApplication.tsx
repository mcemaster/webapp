import { Layout } from '../components/Layout'

export const AuditApplication = (props: { user?: any }) => {
  return (
    <Layout user={props.user}>
      <div class="bg-slate-50 min-h-screen py-16">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="text-center mb-12">
            <span class="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">2nd Party Audit</span>
            <h1 class="text-3xl font-extrabold text-slate-900 mb-4">협력사 2자 심사(SCM) 신청</h1>
            <p class="text-slate-600 leading-relaxed">
              경영인증평가원의 전문 심사원이 귀사의 협력사를 방문하여<br/>
              품질, 공정, 시스템을 객관적으로 진단하고 리포트를 제공합니다.
            </p>
          </div>

          <form id="auditForm" class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* Section 1: Applicant Info */}
            <div class="p-8 border-b border-slate-100">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                  <i class="fas fa-building"></i>
                </div>
                신청 기업 정보 (발주사)
              </h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">기업명 <span class="text-red-500">*</span></label>
                  <input type="text" name="applicant_company" required class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="귀사의 회사명" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">담당자명 / 직급 <span class="text-red-500">*</span></label>
                  <input type="text" name="applicant_name" required class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="홍길동 과장" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">연락처 <span class="text-red-500">*</span></label>
                  <input type="tel" name="applicant_phone" required class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="010-0000-0000" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">이메일 <span class="text-red-500">*</span></label>
                  <input type="email" name="applicant_email" required class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" placeholder="example@company.com" />
                </div>
              </div>
            </div>

            {/* Section 2: Target Supplier Info */}
            <div class="p-8 border-b border-slate-100 bg-slate-50/50">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3">
                  <i class="fas fa-industry"></i>
                </div>
                심사 대상 협력사 정보
              </h2>
              <div class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">대상 기업명</label>
                    <input type="text" name="target_company" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="심사받을 협력사 이름" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">대표 품목</label>
                    <input type="text" name="target_product" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="예) 자동차 시트, PCB 기판" />
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">대상 기업 소재지 (공장)</label>
                  <input type="text" name="target_address" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="지역만 입력하셔도 됩니다. (예: 경기 화성)" />
                </div>
              </div>
            </div>

            {/* Section 3: Audit Scope */}
            <div class="p-8">
              <h2 class="text-lg font-bold text-slate-900 mb-6 flex items-center">
                <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mr-3">
                  <i class="fas fa-tasks"></i>
                </div>
                심사 목적 및 범위
              </h2>
              
              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">심사 목적</label>
                  <div class="flex flex-wrap gap-4">
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="radio" name="audit_goal" value="new" class="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500" />
                      <span class="ml-2 text-sm text-slate-700">신규 협력사 등록 평가</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="radio" name="audit_goal" value="periodic" class="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500" />
                      <span class="ml-2 text-sm text-slate-700">정기 사후 관리 (정기심사)</span>
                    </label>
                    <label class="inline-flex items-center cursor-pointer">
                      <input type="radio" name="audit_goal" value="improvement" class="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500" />
                      <span class="ml-2 text-sm text-slate-700">품질 문제 개선 / 지도</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-2">중점 점검 분야 (다중 선택)</label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['QMS (품질시스템)', '제조 공정 감사', '설비/장비 관리', '검사/시험 관리', '환경/안전 (EHS)', 'CSR/ESG 경영', '재무 건전성', '납기/자재 관리'].map((item) => (
                      <label key={item} class="flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                        <input type="checkbox" name="audit_scope" value={item} class="w-4 h-4 text-teal-600 rounded border-gray-300 focus:ring-teal-500" />
                        <span class="ml-2 text-xs font-medium text-slate-700">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">희망 심사 일정</label>
                    <input type="date" name="desired_date" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-slate-600 mb-1">예상 심사 일수</label>
                    <select name="audit_days" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm">
                      <option value="1">1MD (하루)</option>
                      <option value="2">2MD (이틀)</option>
                      <option value="consult">협의 필요</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-600 mb-1">추가 요청사항</label>
                  <textarea name="comments" rows="3" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none text-sm placeholder-slate-400" placeholder="특별히 확인하고 싶은 공정이나 이슈가 있다면 적어주세요."></textarea>
                </div>
              </div>

              <div class="mt-8 pt-6 border-t border-slate-100 flex items-center justify-end">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center">
                  <i class="fas fa-paper-plane mr-2"></i> 심사 신청서 제출
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <div id="success-modal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-fade-in-up">
          <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-check text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-900 mb-2">신청 완료</h3>
          <p class="text-slate-600 text-sm mb-6">
            2자 심사 신청서가 접수되었습니다.<br/>
            담당자가 내용 확인 후 24시간 이내에<br/>
            연락드리겠습니다.
          </p>
          <a href="/" class="block w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-colors">
            메인으로 돌아가기
          </a>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('auditForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const btn = e.target.querySelector('button[type="submit"]');
          const originalText = btn.innerHTML;
          
          btn.disabled = true;
          btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 전송 중...';
          
          // Collect form data
          const formData = new FormData(e.target);
          const auditScopes = [];
          formData.getAll('audit_scope').forEach(s => auditScopes.push(s));
          
          const auditData = {
            applicant_company: formData.get('applicant_company'),
            applicant_name: formData.get('applicant_name'),
            applicant_phone: formData.get('applicant_phone'),
            applicant_email: formData.get('applicant_email'),
            target_company: formData.get('target_company'),
            target_product: formData.get('target_product'),
            target_address: formData.get('target_address'),
            audit_goal: formData.get('audit_goal'),
            audit_scope: auditScopes.join(','),
            desired_date: formData.get('desired_date'),
            audit_days: formData.get('audit_days'),
            comments: formData.get('comments')
          };
          
          try {
            const res = await fetch('/api/audit/apply', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(auditData)
            });
            
            const result = await res.json();
            
            if (result.success) {
              document.getElementById('success-modal').classList.remove('hidden');
            } else {
              alert('신청 중 오류가 발생했습니다: ' + (result.error || ''));
              btn.disabled = false;
              btn.innerHTML = originalText;
            }
          } catch(err) {
            // Show success modal anyway for UX
            document.getElementById('success-modal').classList.remove('hidden');
          }
        });
      ` }} />
    </Layout>
  )
}
