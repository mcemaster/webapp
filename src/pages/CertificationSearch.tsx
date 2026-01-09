import { useState } from 'hono/jsx'

interface SearchResult {
  id: number
  company_name: string
  certificate_number: string
  certificate_type: string
  certification_body: string
  issue_date: string
  expiry_date: string
  scope: string
  status: string
  contact_person: string
  contact_email: string
  contact_phone: string
  address: string
}

export function CertificationSearch() {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b">
        <div class="max-w-6xl mx-auto px-4 py-6">
          <div class="flex items-center gap-4">
            <img src="/static/mce-logo.png" alt="MCE Logo" class="h-12" onerror="this.style.display='none'" />
            <div>
              <h1 class="text-2xl font-bold text-gray-900">인증기업 검색</h1>
              <p class="text-sm text-gray-600">MCE 경영인증평가원 공식 인증 조회 시스템</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div class="max-w-6xl mx-auto px-4 py-8">
        {/* Notice Box */}
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 class="text-lg font-semibold text-blue-900 mb-3">안내 (Notice)</h3>
          <ul class="space-y-2 text-sm text-blue-800">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>인증서에 명시되어 있는 <strong>정확한 기업명</strong>과 <strong>인증번호</strong>를 공백 없이 입력해주세요.</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>MCE 인증정보 검색 결과는 인정 인증기관이 입력한 데이터에 근거합니다.</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>인증서 유효성 확인 및 자세한 문의는 해당 인증기관으로 연락해주시기 바랍니다.</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>개별 검색 서비스는 1일 3회로 제한됩니다. (검색 결과가 정상 도출된 경우 기준)</span>
            </li>
          </ul>
        </div>

        {/* Search Form */}
        <div class="bg-white rounded-lg shadow-md p-8 mb-8">
          <form id="searchForm" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                인증기업명 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="companyName"
                name="company_name"
                placeholder="예: 삼성전자주식회사"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p class="mt-1 text-xs text-gray-500">인증서에 표기된 정확한 기업명을 입력하세요 (띄어쓰기, 특수문자 포함)</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                인증서번호 <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="certNumber"
                name="cert_number"
                placeholder="예: KR-ISO9001-2024-001"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <p class="mt-1 text-xs text-gray-500">인증서에 표기된 인증번호를 정확히 입력하세요</p>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              검색하기
            </button>
          </form>
        </div>

        {/* Search Result */}
        <div id="resultContainer" class="hidden">
          <div class="bg-white rounded-lg shadow-md p-8">
            <div class="flex items-center justify-between mb-6 pb-4 border-b">
              <h2 class="text-2xl font-bold text-gray-900">인증 확인 결과</h2>
              <span id="statusBadge" class="px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full text-sm">
                유효
              </span>
            </div>

            <div id="resultContent" class="space-y-6">
              {/* Results will be inserted here by JavaScript */}
            </div>

            <div class="mt-8 pt-6 border-t">
              <button
                onclick="document.getElementById('resultContainer').classList.add('hidden'); document.getElementById('searchForm').reset();"
                class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                새로운 검색
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div id="errorContainer" class="hidden">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6">
            <div class="flex items-start">
              <svg class="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <h3 class="text-lg font-semibold text-red-900 mb-2">검색 결과 없음</h3>
                <p id="errorMessage" class="text-red-800"></p>
                <button
                  onclick="document.getElementById('errorContainer').classList.add('hidden');"
                  class="mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded"
                >
                  다시 검색
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div class="bg-gray-800 text-white py-8 mt-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <p class="text-sm text-gray-300">© 2026 MCE 경영인증평가원. All rights reserved.</p>
          <p class="text-xs text-gray-400 mt-2">본 검색 시스템은 MCE 인정 인증기관의 데이터를 기반으로 제공됩니다.</p>
        </div>
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.getElementById('searchForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const companyName = document.getElementById('companyName').value.trim();
            const certNumber = document.getElementById('certNumber').value.trim();
            
            if (!companyName || !certNumber) {
              alert('기업명과 인증서번호를 모두 입력해주세요.');
              return;
            }
            
            // Hide previous results
            document.getElementById('resultContainer').classList.add('hidden');
            document.getElementById('errorContainer').classList.add('hidden');
            
            try {
              const response = await fetch('/api/certifications/search?company_name=' + encodeURIComponent(companyName) + '&cert_number=' + encodeURIComponent(certNumber));
              const data = await response.json();
              
              if (data.success && data.data) {
                displayResult(data.data);
              } else {
                displayError(data.error || '검색 결과를 찾을 수 없습니다.');
              }
            } catch (error) {
              displayError('검색 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
          });
          
          function displayResult(cert) {
            const isValid = cert.status === 'VALID' && cert.expiry_date >= new Date().toISOString().split('T')[0];
            
            document.getElementById('statusBadge').textContent = isValid ? '유효' : '만료';
            document.getElementById('statusBadge').className = isValid 
              ? 'px-4 py-2 bg-green-100 text-green-800 font-semibold rounded-full text-sm'
              : 'px-4 py-2 bg-red-100 text-red-800 font-semibold rounded-full text-sm';
            
            const html = \`
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-gray-600">기업명</label>
                    <p class="text-lg font-semibold text-gray-900 mt-1">\${cert.company_name}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">인증서번호</label>
                    <p class="text-lg text-gray-900 mt-1">\${cert.certificate_number}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">인증 규격</label>
                    <p class="text-lg text-gray-900 mt-1">\${cert.certificate_type}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">인증 범위</label>
                    <p class="text-gray-900 mt-1">\${cert.scope || '-'}</p>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-gray-600">인증기관</label>
                    <p class="text-lg text-gray-900 mt-1">\${cert.certification_body}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">발급일</label>
                    <p class="text-gray-900 mt-1">\${cert.issue_date}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">만료일</label>
                    <p class="text-gray-900 mt-1">\${cert.expiry_date}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-gray-600">주소</label>
                    <p class="text-gray-900 mt-1">\${cert.address || '-'}</p>
                  </div>
                </div>
              </div>
              
              \${cert.contact_person ? \`
                <div class="mt-6 pt-6 border-t">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">담당자 정보</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label class="text-sm font-medium text-gray-600">담당자</label>
                      <p class="text-gray-900 mt-1">\${cert.contact_person}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-600">이메일</label>
                      <p class="text-gray-900 mt-1">\${cert.contact_email || '-'}</p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-600">전화번호</label>
                      <p class="text-gray-900 mt-1">\${cert.contact_phone || '-'}</p>
                    </div>
                  </div>
                </div>
              \` : ''}
            \`;
            
            document.getElementById('resultContent').innerHTML = html;
            document.getElementById('resultContainer').classList.remove('hidden');
            window.scrollTo({ top: document.getElementById('resultContainer').offsetTop - 100, behavior: 'smooth' });
          }
          
          function displayError(message) {
            document.getElementById('errorMessage').textContent = message;
            document.getElementById('errorContainer').classList.remove('hidden');
            window.scrollTo({ top: document.getElementById('errorContainer').offsetTop - 100, behavior: 'smooth' });
          }
        `
      }} />
    </div>
  )
}
