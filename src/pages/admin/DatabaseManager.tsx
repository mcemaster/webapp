export function DatabaseManager() {
  return (
    <div class="p-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">데이터베이스 관리</h1>
        <p class="text-gray-600 mt-2">데이터베이스 마이그레이션 및 초기 데이터 설정</p>
      </div>

      {/* Status Cards */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">데이터베이스</p>
              <p id="dbStatus" class="text-2xl font-bold text-gray-900 mt-2">확인 중...</p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🗄️</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">인증서 수</p>
              <p id="certCount" class="text-2xl font-bold text-gray-900 mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">📜</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600">파일 수</p>
              <p id="fileCount" class="text-2xl font-bold text-gray-900 mt-2">0</p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">📎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Migration Section */}
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">1️⃣ 데이터베이스 마이그레이션</h2>
        <p class="text-gray-600 mb-6">
          처음 설치 시 데이터베이스 테이블을 생성합니다. (한 번만 실행)
        </p>

        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 class="font-semibold text-gray-900">003_create_certifications</h3>
              <p class="text-sm text-gray-500">인증서 테이블 생성</p>
            </div>
            <button
              id="migrate003Btn"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              실행
            </button>
          </div>

          <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h3 class="font-semibold text-gray-900">004_add_certificate_files</h3>
              <p class="text-sm text-gray-500">인증서 파일 테이블 생성</p>
            </div>
            <button
              id="migrate004Btn"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              실행
            </button>
          </div>
        </div>
      </div>

      {/* Seed Data Section */}
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">2️⃣ 샘플 데이터 삽입</h2>
        <p class="text-gray-600 mb-6">
          10개의 샘플 인증 기업 데이터를 데이터베이스에 삽입합니다.
        </p>

        <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h3 class="font-semibold text-gray-900">seed_certifications</h3>
            <p class="text-sm text-gray-500">삼성전자, 현대자동차 등 10개 기업</p>
          </div>
          <button
            id="seedDataBtn"
            class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
          >
            실행
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">3️⃣ 인증서 파일 업로드</h2>
        <p class="text-gray-600 mb-6">
          인증서에 첨부할 PDF, 문서 파일을 업로드합니다.
        </p>

        <form id="fileUploadForm" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              인증서 선택
            </label>
            <select
              id="certSelect"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">인증서를 선택하세요</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              파일 타입
            </label>
            <select
              id="fileType"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="iso_certificate">📜 ISO 인증서</option>
              <option value="scope_document">📋 인증 범위 문서</option>
              <option value="audit_report">🔍 심사 보고서</option>
              <option value="other">📎 기타 문서</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              파일 선택
            </label>
            <input
              type="file"
              id="fileInput"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <p class="text-xs text-gray-500 mt-1">
              지원 형식: PDF, DOC, DOCX, JPG, PNG (최대 10MB)
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              파일 URL (또는 업로드)
            </label>
            <input
              type="url"
              id="fileUrl"
              placeholder="https://example.com/certificate.pdf"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p class="text-xs text-gray-500 mt-1">
              파일을 직접 업로드하거나 URL을 입력하세요
            </p>
          </div>

          <button
            type="submit"
            class="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            📤 파일 추가
          </button>
        </form>
      </div>

      {/* Logs Section */}
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">📋 실행 로그</h2>
        <div
          id="logContainer"
          class="bg-gray-900 text-green-400 font-mono text-sm p-4 rounded-lg h-64 overflow-y-auto"
        >
          <div>시스템 준비 완료. 명령을 실행하세요...</div>
        </div>
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Utility function to add log
          function addLog(message, type = 'info') {
            const logContainer = document.getElementById('logContainer');
            const timestamp = new Date().toLocaleTimeString('ko-KR');
            const color = type === 'error' ? 'text-red-400' : type === 'success' ? 'text-green-400' : 'text-blue-400';
            const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : '➜';
            logContainer.innerHTML += \`<div class="\${color}">[\${timestamp}] \${prefix} \${message}</div>\`;
            logContainer.scrollTop = logContainer.scrollHeight;
          }

          // Load database status
          async function loadStatus() {
            try {
              const statsRes = await fetch('/api/admin/certifications/stats');
              const stats = await statsRes.json();
              
              document.getElementById('certCount').textContent = stats.total || 0;
              document.getElementById('dbStatus').textContent = stats.total > 0 ? '✓ 정상' : '⚠️ 초기화 필요';
              
              // Load file count
              const certsRes = await fetch('/api/admin/certifications?page=1&limit=100');
              const certsData = await certsRes.json();
              
              let totalFiles = 0;
              for (const cert of certsData.certifications || []) {
                const filesRes = await fetch('/api/certifications/' + cert.id + '/detail');
                const filesData = await filesRes.json();
                if (filesData.success && filesData.files) {
                  totalFiles += filesData.files.length;
                }
              }
              
              document.getElementById('fileCount').textContent = totalFiles;
              
              // Load cert options
              const certSelect = document.getElementById('certSelect');
              certSelect.innerHTML = '<option value="">인증서를 선택하세요</option>';
              (certsData.certifications || []).forEach(cert => {
                const option = document.createElement('option');
                option.value = cert.id;
                option.textContent = \`\${cert.company_name} - \${cert.certificate_number}\`;
                certSelect.appendChild(option);
              });
              
              addLog('데이터베이스 상태 로드 완료', 'success');
            } catch (error) {
              addLog('상태 로드 실패: ' + error.message, 'error');
              document.getElementById('dbStatus').textContent = '오류';
            }
          }

          // Execute migration 003
          document.getElementById('migrate003Btn').addEventListener('click', async () => {
            const btn = document.getElementById('migrate003Btn');
            btn.disabled = true;
            btn.textContent = '실행 중...';
            addLog('003 마이그레이션 실행 중...');
            
            try {
              const response = await fetch('/api/admin/db/migrate/003', { method: 'POST' });
              const data = await response.json();
              
              if (data.success) {
                addLog('003 마이그레이션 완료!', 'success');
                btn.textContent = '완료';
                btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                btn.classList.add('bg-green-600');
                loadStatus();
              } else {
                throw new Error(data.error || '마이그레이션 실패');
              }
            } catch (error) {
              addLog('오류: ' + error.message, 'error');
              btn.disabled = false;
              btn.textContent = '재시도';
            }
          });

          // Execute migration 004
          document.getElementById('migrate004Btn').addEventListener('click', async () => {
            const btn = document.getElementById('migrate004Btn');
            btn.disabled = true;
            btn.textContent = '실행 중...';
            addLog('004 마이그레이션 실행 중...');
            
            try {
              const response = await fetch('/api/admin/db/migrate/004', { method: 'POST' });
              const data = await response.json();
              
              if (data.success) {
                addLog('004 마이그레이션 완료!', 'success');
                btn.textContent = '완료';
                btn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                btn.classList.add('bg-green-600');
                loadStatus();
              } else {
                throw new Error(data.error || '마이그레이션 실패');
              }
            } catch (error) {
              addLog('오류: ' + error.message, 'error');
              btn.disabled = false;
              btn.textContent = '재시도';
            }
          });

          // Seed data
          document.getElementById('seedDataBtn').addEventListener('click', async () => {
            const btn = document.getElementById('seedDataBtn');
            btn.disabled = true;
            btn.textContent = '실행 중...';
            addLog('샘플 데이터 삽입 중...');
            
            try {
              const response = await fetch('/api/admin/db/seed/certifications', { method: 'POST' });
              const data = await response.json();
              
              if (data.success) {
                addLog(\`샘플 데이터 삽입 완료! (\${data.inserted}건 추가, \${data.duplicates}건 중복)\`, 'success');
                btn.textContent = '완료';
                btn.classList.remove('bg-green-600', 'hover:bg-green-700');
                btn.classList.add('bg-gray-600');
                loadStatus();
              } else {
                throw new Error(data.error || '시드 실패');
              }
            } catch (error) {
              addLog('오류: ' + error.message, 'error');
              btn.disabled = false;
              btn.textContent = '재시도';
            }
          });

          // File upload
          document.getElementById('fileUploadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const certId = document.getElementById('certSelect').value;
            const fileType = document.getElementById('fileType').value;
            const fileInput = document.getElementById('fileInput');
            const fileUrl = document.getElementById('fileUrl').value;
            
            if (!certId) {
              alert('인증서를 선택하세요.');
              return;
            }
            
            if (!fileUrl && !fileInput.files[0]) {
              alert('파일을 선택하거나 URL을 입력하세요.');
              return;
            }
            
            addLog('파일 업로드 중...');
            
            try {
              let finalUrl = fileUrl;
              let fileName = 'certificate_document.pdf';
              let fileSize = 0;
              let mimeType = 'application/pdf';
              
              // If file is uploaded, we need to handle it
              if (fileInput.files[0]) {
                const file = fileInput.files[0];
                fileName = file.name;
                fileSize = file.size;
                mimeType = file.type;
                
                // For demo, we'll use a placeholder URL
                // In production, you'd upload to Cloudflare R2 or similar
                finalUrl = \`/uploads/\${Date.now()}_\${fileName}\`;
                addLog('파일 로컬 저장 경로: ' + finalUrl);
              }
              
              const response = await fetch(\`/api/admin/certifications/\${certId}/files\`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  file_type: fileType,
                  file_name: fileName,
                  file_url: finalUrl,
                  file_size: fileSize,
                  mime_type: mimeType
                })
              });
              
              const data = await response.json();
              
              if (data.success) {
                addLog('파일 추가 완료!', 'success');
                document.getElementById('fileUploadForm').reset();
                loadStatus();
              } else {
                throw new Error(data.error || '파일 추가 실패');
              }
            } catch (error) {
              addLog('오류: ' + error.message, 'error');
            }
          });

          // Initial load
          loadStatus();
        `
      }} />
    </div>
  )
}
