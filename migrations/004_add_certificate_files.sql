-- 인증서 파일 저장 테이블
CREATE TABLE IF NOT EXISTS certification_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  certification_id INTEGER NOT NULL,
  file_type TEXT NOT NULL, -- 'iso_certificate', 'scope_document', 'audit_report', 'other'
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (certification_id) REFERENCES certifications(id) ON DELETE CASCADE
);

-- 인증서 테이블에 추가 필드 추가
ALTER TABLE certifications ADD COLUMN esg_compliant TEXT; -- 'Y', 'N', 'PARTIAL'
ALTER TABLE certifications ADD COLUMN iso26000_compliant TEXT; -- 'Y', 'N'
ALTER TABLE certifications ADD COLUMN management_evaluation_score INTEGER; -- 0-100
ALTER TABLE certifications ADD COLUMN certificate_pdf_url TEXT; -- 메인 인증서 PDF URL
ALTER TABLE certifications ADD COLUMN logo_url TEXT; -- 기업 로고 URL
ALTER TABLE certifications ADD COLUMN website_url TEXT; -- 기업 웹사이트

CREATE INDEX IF NOT EXISTS idx_cert_files_cert_id ON certification_files(certification_id);
CREATE INDEX IF NOT EXISTS idx_cert_files_type ON certification_files(file_type);
