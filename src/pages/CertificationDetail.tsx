import { useState } from 'hono/jsx'

interface CertFile {
  id: number
  file_type: string
  file_name: string
  file_url: string
  file_size: number
  uploaded_at: string
}

interface CertDetailProps {
  cert: any
  files: CertFile[]
}

export function CertificationDetail({ cert, files }: CertDetailProps) {
  const isValid = cert.status === 'VALID' && cert.expiry_date >= new Date().toISOString().split('T')[0]
  
  // Group files by type
  const certificateFiles = files.filter(f => f.file_type === 'iso_certificate')
  const scopeDocuments = files.filter(f => f.file_type === 'scope_document')
  const auditReports = files.filter(f => f.file_type === 'audit_report')
  const otherFiles = files.filter(f => f.file_type === 'other')
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }
  
  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <div class="bg-white border-b shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">{cert.company_name}</h1>
              <p class="text-sm text-gray-600 mt-1">인증서 상세 정보</p>
            </div>
            <span class={`px-6 py-3 rounded-full font-semibold text-lg ${
              isValid 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isValid ? '✓ 유효' : '✗ 만료'}
            </span>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Company Info */}
          <div class="lg:col-span-1">
            <div class="bg-white rounded-lg shadow-md p-6 sticky top-8">
              {cert.logo_url && (
                <div class="text-center mb-6 pb-6 border-b">
                  <img 
                    src={cert.logo_url} 
                    alt={cert.company_name} 
                    class="h-24 mx-auto object-contain"
                  />
                </div>
              )}
              
              <h3 class="text-lg font-semibold text-gray-900 mb-4">기업 정보</h3>
              
              <div class="space-y-4 text-sm">
                <div>
                  <label class="text-gray-600 font-medium">기업명</label>
                  <p class="text-gray-900 mt-1">{cert.company_name}</p>
                </div>
                
                <div>
                  <label class="text-gray-600 font-medium">주소</label>
                  <p class="text-gray-900 mt-1">{cert.address || '-'}</p>
                </div>
                
                {cert.website_url && (
                  <div>
                    <label class="text-gray-600 font-medium">웹사이트</label>
                    <a 
                      href={cert.website_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="text-blue-600 hover:underline mt-1 block"
                    >
                      {cert.website_url}
                    </a>
                  </div>
                )}
                
                {cert.contact_person && (
                  <>
                    <hr class="my-4" />
                    <h4 class="font-semibold text-gray-900 mb-2">담당자 정보</h4>
                    <div>
                      <label class="text-gray-600 font-medium">담당자</label>
                      <p class="text-gray-900 mt-1">{cert.contact_person}</p>
                    </div>
                    {cert.contact_email && (
                      <div>
                        <label class="text-gray-600 font-medium">이메일</label>
                        <p class="text-gray-900 mt-1">{cert.contact_email}</p>
                      </div>
                    )}
                    {cert.contact_phone && (
                      <div>
                        <label class="text-gray-600 font-medium">전화번호</label>
                        <p class="text-gray-900 mt-1">{cert.contact_phone}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div class="lg:col-span-2 space-y-6">
            {/* Certificate Information */}
            <div class="bg-white rounded-lg shadow-md p-6">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">인증 정보</h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="text-sm font-medium text-gray-600">인증서번호</label>
                  <p class="text-lg font-semibold text-gray-900 mt-1">{cert.certificate_number}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-600">인증 규격</label>
                  <p class="text-lg font-semibold text-gray-900 mt-1">{cert.certificate_type}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-600">인증기관</label>
                  <p class="text-gray-900 mt-1">{cert.certification_body}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-600">상태</label>
                  <p class="text-gray-900 mt-1">{cert.status === 'VALID' ? '유효' : '만료'}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-600">발급일</label>
                  <p class="text-gray-900 mt-1">{cert.issue_date}</p>
                </div>
                
                <div>
                  <label class="text-sm font-medium text-gray-600">만료일</label>
                  <p class={`mt-1 font-semibold ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {cert.expiry_date}
                  </p>
                </div>
              </div>
              
              {cert.scope && (
                <div class="mt-6 pt-6 border-t">
                  <label class="text-sm font-medium text-gray-600">인증 범위</label>
                  <p class="text-gray-900 mt-2 leading-relaxed">{cert.scope}</p>
                </div>
              )}
            </div>

            {/* ESG & ISO 26000 Compliance */}
            {(cert.esg_compliant || cert.iso26000_compliant || cert.management_evaluation_score) && (
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6">추가 인증 및 평가</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cert.esg_compliant && (
                    <div class="text-center p-4 bg-green-50 rounded-lg">
                      <div class="text-3xl mb-2">🌱</div>
                      <h3 class="font-semibold text-gray-900">ESG 경영</h3>
                      <p class="text-sm text-gray-600 mt-1">
                        {cert.esg_compliant === 'Y' ? '준수' : cert.esg_compliant === 'PARTIAL' ? '부분 준수' : '미준수'}
                      </p>
                    </div>
                  )}
                  
                  {cert.iso26000_compliant && (
                    <div class="text-center p-4 bg-blue-50 rounded-lg">
                      <div class="text-3xl mb-2">🤝</div>
                      <h3 class="font-semibold text-gray-900">ISO 26000</h3>
                      <p class="text-sm text-gray-600 mt-1">
                        {cert.iso26000_compliant === 'Y' ? '사회적 책임 이행' : '미이행'}
                      </p>
                    </div>
                  )}
                  
                  {cert.management_evaluation_score && (
                    <div class="text-center p-4 bg-purple-50 rounded-lg">
                      <div class="text-3xl mb-2">📊</div>
                      <h3 class="font-semibold text-gray-900">경영평가</h3>
                      <p class="text-2xl font-bold text-purple-600 mt-1">
                        {cert.management_evaluation_score}점
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ISO Certificate Files */}
            {certificateFiles.length > 0 && (
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span class="mr-2">📜</span>
                  ISO 인증서 파일
                </h2>
                
                <div class="space-y-3">
                  {certificateFiles.map(file => (
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-red-100 rounded flex items-center justify-center mr-4">
                          <span class="text-2xl">📄</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">{file.file_name}</p>
                          <p class="text-sm text-gray-500">
                            {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Scope Documents */}
            {scopeDocuments.length > 0 && (
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span class="mr-2">📋</span>
                  인증 범위 문서
                </h2>
                
                <div class="space-y-3">
                  {scopeDocuments.map(file => (
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-blue-100 rounded flex items-center justify-center mr-4">
                          <span class="text-2xl">📑</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">{file.file_name}</p>
                          <p class="text-sm text-gray-500">
                            {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Audit Reports */}
            {auditReports.length > 0 && (
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span class="mr-2">🔍</span>
                  심사 보고서
                </h2>
                
                <div class="space-y-3">
                  {auditReports.map(file => (
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-green-100 rounded flex items-center justify-center mr-4">
                          <span class="text-2xl">📊</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">{file.file_name}</p>
                          <p class="text-sm text-gray-500">
                            {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Other Files */}
            {otherFiles.length > 0 && (
              <div class="bg-white rounded-lg shadow-md p-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <span class="mr-2">📎</span>
                  기타 문서
                </h2>
                
                <div class="space-y-3">
                  {otherFiles.map(file => (
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div class="flex items-center">
                        <div class="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-4">
                          <span class="text-2xl">📁</span>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900">{file.file_name}</p>
                          <p class="text-sm text-gray-500">
                            {formatFileSize(file.file_size)} • {new Date(file.uploaded_at).toLocaleDateString('ko-KR')}
                          </p>
                        </div>
                      </div>
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* No Files Message */}
            {files.length === 0 && (
              <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <div class="text-5xl mb-4">📂</div>
                <h3 class="text-lg font-semibold text-gray-900 mb-2">등록된 파일이 없습니다</h3>
                <p class="text-gray-600">인증서 관련 문서가 아직 업로드되지 않았습니다.</p>
              </div>
            )}

            {/* Back Button */}
            <div class="flex justify-center pt-6">
              <a
                href="/certification-search"
                class="px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors"
              >
                ← 검색 페이지로 돌아가기
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
