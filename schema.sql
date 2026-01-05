-- [MCE Production Database Schema]

-- 1. Users Table (회원 정보)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'partner', 'admin'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Companies Table (기업 식별 데이터 - Deep Data)
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT NOT NULL,
  biz_num TEXT UNIQUE, -- 사업자번호
  industry_code TEXT, -- KSIC
  founding_date DATE,
  employee_count INTEGER,
  financial_json TEXT, -- 매출, 영업이익 등 JSON 저장
  certifications TEXT, -- 보유 인증 (comma separated)
  analyzed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 3. Grants Table (정부지원사업 공고 DB)
CREATE TABLE IF NOT EXISTS grants (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  agency TEXT NOT NULL, -- 전담기관
  type TEXT, -- R&D, Smart, Export, etc.
  max_amount INTEGER, -- 단위: 천원
  target_age_min INTEGER,
  target_age_max INTEGER,
  description TEXT,
  url TEXT,
  deadline DATE,
  embedding BLOB -- Vector Search를 위한 임베딩 데이터 (추후 사용)
);

-- 4. Analysis Logs (AI 분석 이력 & 사용량 추적)
CREATE TABLE IF NOT EXISTS analysis_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER, -- 사용량 제한 확인용
  company_id INTEGER,
  grant_id INTEGER,
  match_score INTEGER,
  ai_reasoning TEXT, -- (Legacy) 요약 텍스트
  result_json TEXT,  -- (New) 상세 분석 결과 전체 (차트 데이터 포함)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
