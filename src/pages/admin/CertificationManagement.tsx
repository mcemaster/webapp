export function CertificationManagement() {
  return (
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">인증 기업 관리</h1>
        <p class="text-gray-600 mt-2">ISO 인증 기업 및 인증서 관리 시스템</p>
      </div>

      {/* Statistics Cards */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">전체 인증 기업</p>
              <p id="totalCerts" class="text-3xl font-bold text-gray-900 mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🏢</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">유효 인증서</p>
              <p id="validCerts" class="text-3xl font-bold text-green-600 mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">✓</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">만료 예정</p>
              <p id="expiringSoon" class="text-3xl font-bold text-yellow-600 mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">⚠️</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">만료됨</p>
              <p id="expiredCerts" class="text-3xl font-bold text-red-600 mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">✗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <input
              type="text"
              id="searchInput"
              placeholder="기업명 또는 인증번호 검색..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <select
              id="certTypeFilter"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">전체 인증 규격</option>
              <option value="ISO 9001">ISO 9001</option>
              <option value="ISO 14001">ISO 14001</option>
              <option value="ISO 45001">ISO 45001</option>
              <option value="ISO 27001">ISO 27001</option>
              <option value="IATF 16949">IATF 16949</option>
              <option value="AS 9100D">AS 9100D</option>
              <option value="FSSC 22000">FSSC 22000</option>
            </select>
          </div>
          <div>
            <select
              id="statusFilter"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">전체 상태</option>
              <option value="VALID">유효</option>
              <option value="EXPIRED">만료</option>
              <option value="SUSPENDED">정지</option>
            </select>
          </div>
        </div>
        
        <div class="flex justify-between items-center mt-4">
          <button
            id="searchBtn"
            class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            🔍 검색
          </button>
          <button
            id="addNewBtn"
            class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            ➕ 새 인증 추가
          </button>
        </div>
      </div>

      {/* Certifications Table */}
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기업명</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">인증번호</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">인증 규격</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">인증기관</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">만료일</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
              </tr>
            </thead>
            <tbody id="certsTableBody" class="bg-white divide-y divide-gray-200">
              <tr>
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  데이터를 불러오는 중...
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
          <div class="text-sm text-gray-700">
            총 <span id="totalCount" class="font-medium">0</span>개 중 
            <span id="currentRange" class="font-medium">0-0</span>개 표시
          </div>
          <div class="flex gap-2">
            <button
              id="prevPageBtn"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              이전
            </button>
            <button
              id="nextPageBtn"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <div id="certModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b">
            <div class="flex items-center justify-between">
              <h2 id="modalTitle" class="text-2xl font-bold text-gray-900">새 인증 추가</h2>
              <button id="closeModalBtn" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>

          <form id="certForm" class="p-6">
            <input type="hidden" id="certId" name="id" />
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  기업명 <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyNameInput"
                  name="company_name"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  인증서번호 <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="certNumberInput"
                  name="certificate_number"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  인증 규격 <span class="text-red-500">*</span>
                </label>
                <select
                  id="certTypeInput"
                  name="certificate_type"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">선택하세요</option>
                  <option value="ISO 9001:2015">ISO 9001:2015</option>
                  <option value="ISO 14001:2015">ISO 14001:2015</option>
                  <option value="ISO 45001:2018">ISO 45001:2018</option>
                  <option value="ISO 27001:2013">ISO 27001:2013</option>
                  <option value="IATF 16949:2016">IATF 16949:2016</option>
                  <option value="AS 9100D">AS 9100D</option>
                  <option value="FSSC 22000">FSSC 22000</option>
                  <option value="ISO 22716:2007">ISO 22716:2007 (화장품)</option>
                  <option value="ISO 50001:2018">ISO 50001:2018</option>
                  <option value="ISO 13485">ISO 13485 (의료기기)</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  인증기관 <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="certBodyInput"
                  name="certification_body"
                  value="MCE경영인증평가원"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  발급일 <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="issueDateInput"
                  name="issue_date"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  만료일 <span class="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="expiryDateInput"
                  name="expiry_date"
                  required
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  인증 범위
                </label>
                <textarea
                  id="scopeInput"
                  name="scope"
                  rows="3"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <input
                  type="text"
                  id="addressInput"
                  name="address"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  담당자명
                </label>
                <input
                  type="text"
                  id="contactPersonInput"
                  name="contact_person"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  담당자 이메일
                </label>
                <input
                  type="email"
                  id="contactEmailInput"
                  name="contact_email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  담당자 전화번호
                </label>
                <input
                  type="tel"
                  id="contactPhoneInput"
                  name="contact_phone"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  상태
                </label>
                <select
                  id="statusInput"
                  name="status"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="VALID">유효</option>
                  <option value="EXPIRED">만료</option>
                  <option value="SUSPENDED">정지</option>
                </select>
              </div>
            </div>

            <div class="flex justify-end gap-4 mt-8 pt-6 border-t">
              <button
                type="button"
                id="cancelBtn"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
              >
                취소
              </button>
              <button
                type="submit"
                class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
              >
                저장
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          let currentPage = 1;
          let totalPages = 1;
          let currentSearch = '';
          let currentCertType = '';
          let currentStatus = '';

          // Load statistics
          async function loadStats() {
            try {
              const response = await fetch('/api/admin/certifications/stats');
              const data = await response.json();
              
              document.getElementById('totalCerts').textContent = data.total || 0;
              document.getElementById('validCerts').textContent = data.valid || 0;
              document.getElementById('expiringSoon').textContent = data.expiring_soon || 0;
              document.getElementById('expiredCerts').textContent = data.expired || 0;
            } catch (error) {
              console.error('Failed to load stats:', error);
            }
          }

          // Load certifications list
          async function loadCertifications() {
            try {
              const params = new URLSearchParams({
                page: currentPage,
                limit: 20,
                q: currentSearch,
                cert_type: currentCertType,
                status: currentStatus
              });

              const response = await fetch('/api/admin/certifications?' + params);
              const data = await response.json();

              totalPages = data.totalPages || 1;
              renderTable(data.certifications || []);
              updatePagination(data);
            } catch (error) {
              console.error('Failed to load certifications:', error);
              document.getElementById('certsTableBody').innerHTML = 
                '<tr><td colspan="7" class="px-6 py-12 text-center text-red-500">데이터를 불러오는데 실패했습니다.</td></tr>';
            }
          }

          // Render table
          function renderTable(certs) {
            const tbody = document.getElementById('certsTableBody');
            
            if (certs.length === 0) {
              tbody.innerHTML = '<tr><td colspan="7" class="px-6 py-12 text-center text-gray-500">검색 결과가 없습니다.</td></tr>';
              return;
            }

            const today = new Date().toISOString().split('T')[0];
            
            tbody.innerHTML = certs.map(cert => {
              const isValid = cert.status === 'VALID' && cert.expiry_date >= today;
              const statusBadge = isValid 
                ? '<span class="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">유효</span>'
                : '<span class="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded">만료</span>';
              
              return \`
                <tr class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">\${cert.company_name}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cert.certificate_number}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cert.certificate_type}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cert.certification_body}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">\${cert.expiry_date}</td>
                  <td class="px-6 py-4 whitespace-nowrap">\${statusBadge}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button onclick="viewCert(\${cert.id})" class="text-blue-600 hover:text-blue-800 mr-3">상세</button>
                    <button onclick="editCert(\${cert.id})" class="text-green-600 hover:text-green-800 mr-3">수정</button>
                    <button onclick="deleteCert(\${cert.id})" class="text-red-600 hover:text-red-800">삭제</button>
                  </td>
                </tr>
              \`;
            }).join('');
          }

          // Update pagination
          function updatePagination(data) {
            document.getElementById('totalCount').textContent = data.total || 0;
            document.getElementById('currentRange').textContent = 
              \`\${(data.page - 1) * 20 + 1}-\${Math.min(data.page * 20, data.total)}\`;
            
            document.getElementById('prevPageBtn').disabled = currentPage === 1;
            document.getElementById('nextPageBtn').disabled = currentPage >= totalPages;
          }

          // View certification detail
          window.viewCert = function(id) {
            window.location.href = '/admin/certifications/' + id;
          };

          // Edit certification
          window.editCert = async function(id) {
            try {
              const response = await fetch('/api/admin/certifications/' + id);
              const cert = await response.json();
              
              document.getElementById('modalTitle').textContent = '인증 정보 수정';
              document.getElementById('certId').value = cert.id;
              document.getElementById('companyNameInput').value = cert.company_name;
              document.getElementById('certNumberInput').value = cert.certificate_number;
              document.getElementById('certTypeInput').value = cert.certificate_type;
              document.getElementById('certBodyInput').value = cert.certification_body;
              document.getElementById('issueDateInput').value = cert.issue_date;
              document.getElementById('expiryDateInput').value = cert.expiry_date;
              document.getElementById('scopeInput').value = cert.scope || '';
              document.getElementById('addressInput').value = cert.address || '';
              document.getElementById('contactPersonInput').value = cert.contact_person || '';
              document.getElementById('contactEmailInput').value = cert.contact_email || '';
              document.getElementById('contactPhoneInput').value = cert.contact_phone || '';
              document.getElementById('statusInput').value = cert.status;
              
              document.getElementById('certModal').classList.remove('hidden');
            } catch (error) {
              alert('인증 정보를 불러오는데 실패했습니다.');
            }
          };

          // Delete certification
          window.deleteCert = async function(id) {
            if (!confirm('정말 삭제하시겠습니까?')) return;
            
            try {
              const response = await fetch('/api/admin/certifications/' + id, {
                method: 'DELETE'
              });
              
              if (response.ok) {
                alert('삭제되었습니다.');
                loadCertifications();
                loadStats();
              } else {
                alert('삭제에 실패했습니다.');
              }
            } catch (error) {
              alert('삭제 중 오류가 발생했습니다.');
            }
          };

          // Event Listeners
          document.getElementById('searchBtn').addEventListener('click', () => {
            currentSearch = document.getElementById('searchInput').value;
            currentCertType = document.getElementById('certTypeFilter').value;
            currentStatus = document.getElementById('statusFilter').value;
            currentPage = 1;
            loadCertifications();
          });

          document.getElementById('addNewBtn').addEventListener('click', () => {
            document.getElementById('modalTitle').textContent = '새 인증 추가';
            document.getElementById('certForm').reset();
            document.getElementById('certId').value = '';
            document.getElementById('certModal').classList.remove('hidden');
          });

          document.getElementById('closeModalBtn').addEventListener('click', () => {
            document.getElementById('certModal').classList.add('hidden');
          });

          document.getElementById('cancelBtn').addEventListener('click', () => {
            document.getElementById('certModal').classList.add('hidden');
          });

          document.getElementById('prevPageBtn').addEventListener('click', () => {
            if (currentPage > 1) {
              currentPage--;
              loadCertifications();
            }
          });

          document.getElementById('nextPageBtn').addEventListener('click', () => {
            if (currentPage < totalPages) {
              currentPage++;
              loadCertifications();
            }
          });

          // Form submit
          document.getElementById('certForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const id = data.id;
            delete data.id;
            
            try {
              const url = id ? '/api/admin/certifications/' + id : '/api/admin/certifications';
              const method = id ? 'PUT' : 'POST';
              
              const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              });
              
              if (response.ok) {
                alert(id ? '수정되었습니다.' : '추가되었습니다.');
                document.getElementById('certModal').classList.add('hidden');
                loadCertifications();
                loadStats();
              } else {
                const error = await response.json();
                alert('저장에 실패했습니다: ' + (error.error || '알 수 없는 오류'));
              }
            } catch (error) {
              alert('저장 중 오류가 발생했습니다.');
            }
          });

          // Initial load
          loadStats();
          loadCertifications();
        `
      }} />
    </div>
  )
}
