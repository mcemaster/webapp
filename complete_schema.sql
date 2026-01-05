-- [MCE Integrated Schema for Admin Full Features]

-- 1. Users (Existing)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'partner', 'admin'
  status TEXT DEFAULT 'active', -- 'active', 'blocked'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Partners (Approval System)
CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_name TEXT NOT NULL,
  ceo_name TEXT,
  biz_num TEXT,
  phone TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. RFQs (Supply Chain Requests)
CREATE TABLE IF NOT EXISTS rfqs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  client_name TEXT,
  budget TEXT,
  deadline DATE,
  status TEXT DEFAULT 'matching', -- 'matching', 'sent', 'completed'
  matched_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 4. Banners (Marketing)
CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  display_order INTEGER DEFAULT 0
);

-- 5. System Settings (SEO & Config)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- [Seed Data]
INSERT OR IGNORE INTO users (email, name, company_name, role) VALUES 
('admin@mce.re.kr', '최고관리자', 'MCE', 'admin'),
('user1@test.com', '김철수', '태성정밀', 'user'),
('user2@test.com', '이영희', '대영플라스틱', 'partner');

INSERT OR IGNORE INTO partners (company_name, ceo_name, biz_num, phone, status) VALUES 
('미래테크', '박미래', '504-11-22334', '010-1111-2222', 'pending'),
('한일철강', '이철수', '105-86-33445', '010-3333-4444', 'pending'),
('솔라에너지', '정태양', '606-22-77788', '010-5555-6666', 'approved');

INSERT OR IGNORE INTO rfqs (title, client_name, budget, status, matched_count) VALUES 
('전기차 배터리 케이스 가공', '(주)한화시스템 1차협력사', '5,000만원', 'matching', 3),
('의료기기 임플란트 시제품', '메디컬솔루션', '1,200만원', 'matching', 0),
('선박용 대형 밸브 주조', '부산조선해양', '1억 5천만원', 'sent', 5);

INSERT OR IGNORE INTO banners (title, image_url, is_active) VALUES 
('2026 정부지원사업 통합공고', 'https://images.unsplash.com/photo-1557804506-669a67965ba0', 1),
('ISO 인증 할인 프로모션', 'https://images.unsplash.com/photo-1551836022-d5d88e9218df', 0);

INSERT OR IGNORE INTO settings (key, value) VALUES 
('site_title', '기업지원-경인평 | 경영인증평가원'),
('seo_keywords', '경영인증평가원, ISO인증, 기업평가, 정부지원사업');
