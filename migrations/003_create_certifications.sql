-- 인증 기업 정보 테이블
CREATE TABLE IF NOT EXISTS certifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  certificate_number TEXT NOT NULL UNIQUE,
  certificate_type TEXT NOT NULL, -- ISO 9001, ISO 14001, ISO 45001, etc.
  certification_body TEXT NOT NULL, -- 인증기관명
  issue_date TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  scope TEXT, -- 인증 범위
  status TEXT DEFAULT 'VALID', -- VALID, EXPIRED, SUSPENDED
  contact_person TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 검색 성능을 위한 인덱스
CREATE INDEX IF NOT EXISTS idx_cert_company_name ON certifications(company_name);
CREATE INDEX IF NOT EXISTS idx_cert_number ON certifications(certificate_number);
CREATE INDEX IF NOT EXISTS idx_cert_type ON certifications(certificate_type);
CREATE INDEX IF NOT EXISTS idx_cert_status ON certifications(status);
