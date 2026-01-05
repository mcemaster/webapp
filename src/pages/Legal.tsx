import { Layout } from '../components/Layout'

interface LegalProps {
  user?: any;
  tab?: string;
}

export const Legal = (props: LegalProps) => {
  const { user, tab = 'terms' } = props;

  const activeClass = "border-blue-600 text-blue-600 font-bold bg-blue-50";
  const inactiveClass = "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300";

  return (
    <Layout user={user}>
      <div class="bg-slate-50 min-h-screen py-12">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-slate-900">약관 및 정책</h1>
            <p class="mt-2 text-slate-600">경영인증평가원 서비스 이용을 위한 법적 고지 사항입니다.</p>
          </div>

          <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Tabs */}
            <div class="flex border-b border-slate-200 overflow-x-auto">
              <a href="/legal?tab=terms" class={`flex-1 py-4 px-6 text-center border-b-2 text-sm transition-colors whitespace-nowrap ${tab === 'terms' ? activeClass : inactiveClass}`}>
                서비스 이용약관
              </a>
              <a href="/legal?tab=privacy" class={`flex-1 py-4 px-6 text-center border-b-2 text-sm transition-colors whitespace-nowrap ${tab === 'privacy' ? activeClass : inactiveClass}`}>
                개인정보처리방침
              </a>
              <a href="/legal?tab=finance" class={`flex-1 py-4 px-6 text-center border-b-2 text-sm transition-colors whitespace-nowrap ${tab === 'finance' ? activeClass : inactiveClass}`}>
                전자금융거래약관
              </a>
            </div>

            {/* Content Area */}
            <div class="p-8 text-sm text-slate-700 leading-relaxed h-[800px] overflow-y-auto">
              
              {/* 1. 서비스 이용약관 */}
              {tab === 'terms' && (
                <div class="space-y-6">
                  <h2 class="text-xl font-bold text-slate-900 mb-4">서비스 이용약관</h2>
                  
                  <div class="space-y-4">
                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제1조 (목적)</h3>
                      <p>본 약관은 경영인증평가원(이하 "회사")이 제공하는 기업 인증, 평가, 매칭 및 제반 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</p>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제2조 (용어의 정의)</h3>
                      <p>① "서비스"라 함은 구현되는 단말기(PC, 휴대형단말기 등 각종 유무선 장치를 포함)와 상관없이 회원이 이용할 수 있는 경영인증평가원 관련 제반 서비스를 의미합니다.</p>
                      <p>② "회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</p>
                    </div>

                    <div class="bg-yellow-50 p-4 rounded border border-yellow-100">
                      <h3 class="font-bold text-slate-800 mb-2">제3조 (회사의 책임 제한 및 통신판매중개자 고지)</h3>
                      <p class="font-bold text-red-600">① 회사는 거래 당사자가 아니며, 입점 파트너사(공급사)와 회원(발주사) 간의 거래에 대하여 보증을 서거나 책임을 지지 않습니다.</p>
                      <p>② 회사는 통신판매중개자로서 효율적인 서비스를 위한 시스템을 운영·관리하며, 거래와 관련하여 판매자 또는 구매자를 대리하지 않습니다.</p>
                      <p>③ 회원 간 성립된 거래에 관련된 책임과 회원이 제공한 정보에 대한 책임은 해당 회원이 직접 부담하여야 합니다.</p>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제4조 (데이터의 소유 및 활용)</h3>
                      <p>① 회원이 서비스 이용 과정에서 입력한 기업 정보, 견적 데이터, 매칭 이력 등은 회사의 데이터베이스에 저장되며, 회사는 이를 AI 분석, 통계 작성, 서비스 품질 개선을 위하여 영구적으로 활용할 권한을 가집니다.</p>
                      <p>② 회사는 수집된 데이터를 비식별화 처리하여 제3자에게 제공하거나 새로운 서비스 개발에 활용할 수 있습니다.</p>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제5조 (서비스의 변경 및 중단)</h3>
                      <p>① 회사는 운영상, 기술상의 필요에 따라 제공하고 있는 전부 또는 일부 서비스를 변경할 수 있습니다.</p>
                      <p>② 회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및 운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련 법령에 특별한 규정이 없는 한 회원에게 별도의 보상을 하지 않습니다.</p>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제6조 (계약 해지 및 이용 제한)</h3>
                      <p>① 회원은 언제든지 서비스 초기화면의 고객센터 또는 내 정보 관리 메뉴 등을 통하여 이용계약 해지 신청을 할 수 있습니다.</p>
                      <p>② 회사는 회원이 허위 정보를 등록하거나, 타인의 명의를 도용하거나, 회사의 업무를 방해하는 경우 즉시 이용계약을 해지하거나 서비스 이용을 제한할 수 있습니다.</p>
                    </div>
                    
                    <div class="pt-4 border-t">
                      <p class="text-xs text-slate-500">공고일자: 2024년 1월 1일 / 시행일자: 2024년 1월 1일</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. 개인정보처리방침 */}
              {tab === 'privacy' && (
                <div class="space-y-6">
                  <h2 class="text-xl font-bold text-slate-900 mb-4">개인정보처리방침</h2>
                  
                  <div class="space-y-4">
                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">1. 개인정보의 처리 목적</h3>
                      <p>경영인증평가원은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                      <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                        <li>회원 가입 및 관리 (본인 확인, 악성 회원 차단)</li>
                        <li>재화 또는 서비스 제공 (견적 매칭, AI 기업 분석, 콘텐츠 제공)</li>
                        <li>마케팅 및 광고에의 활용 (신규 서비스 개발, 접속 빈도 파악)</li>
                      </ul>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">2. 수집하는 개인정보 항목</h3>
                      <ul class="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                        <li>필수항목: 이메일, 비밀번호, 이름, 휴대전화번호, 회사명</li>
                        <li>선택항목: 사업자등록번호, 직급, 업태/종목, 매출액 등 기업 재무 정보</li>
                        <li>자동수집: IP주소, 쿠키, MAC주소, 서비스 이용기록, 방문기록</li>
                      </ul>
                    </div>

                    <div class="bg-blue-50 p-4 rounded border border-blue-100">
                      <h3 class="font-bold text-slate-800 mb-2">3. 개인정보의 보유 및 이용기간</h3>
                      <p>① 회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.</p>
                      <p class="font-bold mt-2">② 주요 보유 기간:</p>
                      <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                        <li>회원 탈퇴 시까지 (단, 관계 법령 위반에 따른 수사·조사 등이 진행 중인 경우에는 해당 수사·조사 종료 시까지)</li>
                        <li>전자상거래 등에서의 소비자 보호에 관한 법률에 따른 표시·광고, 계약내용 및 이행 등 거래에 관한 기록: 5년</li>
                      </ul>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">4. 개인정보의 제3자 제공</h3>
                      <p>회사는 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 단, 매칭 서비스를 위하여 회원이 동의한 경우 파트너사에 제한적인 정보가 제공될 수 있습니다.</p>
                    </div>
                    
                    <div class="pt-4 border-t">
                      <p class="text-xs text-slate-500">개인정보보호책임자: 신솔푸름 (mce@mce.re.kr)</p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. 전자금융거래약관 */}
              {tab === 'finance' && (
                <div class="space-y-6">
                  <h2 class="text-xl font-bold text-slate-900 mb-4">전자금융거래약관</h2>
                  
                  <div class="space-y-4">
                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제1조 (목적)</h3>
                      <p>본 약관은 경영인증평가원(이하 "회사")이 제공하는 전자금융거래 서비스를 이용자가 이용함에 있어 회사와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.</p>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제2조 (회사의 책임)</h3>
                      <p>① 회사는 접근매체의 위조나 변조로 발생한 사고, 계약체결 또는 거래지시의 전자적 전송이나 처리 과정에서 발생한 사고로 인하여 이용자에게 손해가 발생한 경우에는 그 손해를 배상할 책임을 집니다.</p>
                      <p class="font-bold text-red-600 mt-2">② 단, 다음 각 호의 경우에는 회사의 책임이 면제됩니다:</p>
                      <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                        <li>이용자가 접근매체를 제3자에게 대여하거나 사용을 위임한 경우</li>
                        <li>이용자가 고의 또는 중대한 과실로 보안 강화를 위한 조치를 거부하거나 방해한 경우</li>
                        <li>천재지변, 정전, 화재, 통신장애, 기타의 불가항력적인 사유로 인하여 서비스 처리가 불가능한 경우</li>
                      </ul>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제3조 (거래지시의 철회)</h3>
                      <p>이용자는 전자지급거래에 관한 거래지시의 경우 지급의 효력이 발생하기 전까지 거래지시를 철회할 수 있습니다. 단, 이미 지급 효력이 발생한 경우에는 그러하지 아니합니다.</p>
                    </div>

                    <div>
                      <h3 class="font-bold text-slate-800 mb-2">제4조 (분쟁처리 및 분쟁조정)</h3>
                      <p>이용자는 회사의 전자금융거래 서비스 이용과 관련하여 불만이나 문의사항이 있는 경우 회사의 고객센터(051-714-0798)를 통하여 해결을 요구할 수 있습니다.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
