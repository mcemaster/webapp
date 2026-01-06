-- [MCE Test Data Seed]
-- 모든 테스트 데이터는 [TEST] 접두사로 구분

-- 1. 테스트 사용자 (3명)
INSERT OR IGNORE INTO users (email, name, company_name, role, created_at) VALUES 
('test1@test.com', '[TEST] 홍길동', '[TEST] 테스트기업A', 'user', datetime('now', '-5 days')),
('test2@test.com', '[TEST] 김영수', '[TEST] 테스트기업B', 'user', datetime('now', '-3 days')),
('test3@test.com', '[TEST] 박지민', '[TEST] 테스트기업C', 'partner', datetime('now', '-1 days'));

-- 2. 테스트 기업 데이터 (3개)
INSERT OR IGNORE INTO companies (name, biz_num, industry_code, founding_date, employee_count, financial_json, certifications, analyzed_at) VALUES 
('[TEST] 테스트기업A', '111-11-11111', 'C29', '2020-03-15', 45, '{"revenue": 5000000000, "operating_profit": 300000000}', 'ISO9001,ISO14001', datetime('now', '-5 days')),
('[TEST] 테스트기업B', '222-22-22222', 'C30', '2018-07-20', 120, '{"revenue": 12000000000, "operating_profit": 800000000}', 'ISO9001,IATF16949', datetime('now', '-3 days')),
('[TEST] 테스트기업C', '333-33-33333', 'J62', '2022-01-10', 25, '{"revenue": 2000000000, "operating_profit": 150000000}', 'ISO27001', datetime('now', '-1 days'));

-- 3. 테스트 파트너 신청 (3개)
INSERT OR IGNORE INTO partners (company_name, ceo_name, biz_num, phone, status, applied_at) VALUES 
('[TEST] 테스트파트너A', '[TEST] 김파트너', '444-44-44444', '010-1234-5678', 'pending', datetime('now', '-2 days')),
('[TEST] 테스트파트너B', '[TEST] 이파트너', '555-55-55555', '010-2345-6789', 'pending', datetime('now', '-1 days')),
('[TEST] 테스트파트너C', '[TEST] 박파트너', '666-66-66666', '010-3456-7890', 'approved', datetime('now', '-7 days'));

-- 4. 테스트 AI 분석 로그 (3개 + 7일간 분산 데이터)
INSERT OR IGNORE INTO analysis_logs (user_id, company_id, match_score, ai_reasoning, result_json, created_at) VALUES 
(1, 1, 92, '[TEST] 기업A 분석 완료 - 스마트공장 지원사업 적합', '{"data": [{"title": "스마트공장 보급확산", "matchScore": 92}], "matchCount": 5, "tokens_used": 1250}', datetime('now', '-6 days')),
(1, 2, 87, '[TEST] 기업B 분석 완료 - R&D 바우처 적합', '{"data": [{"title": "R&D 바우처", "matchScore": 87}], "matchCount": 3, "tokens_used": 980}', datetime('now', '-5 days')),
(2, 3, 95, '[TEST] 기업C 분석 완료 - AI 바우처 적합', '{"data": [{"title": "AI 바우처", "matchScore": 95}], "matchCount": 7, "tokens_used": 1500}', datetime('now', '-4 days'));

-- 5. 주간 활동 데이터를 위한 추가 분석 로그 (7일간)
INSERT OR IGNORE INTO analysis_logs (user_id, company_id, match_score, result_json, created_at) VALUES 
(1, 1, 88, '{"matchCount": 4, "service": "support"}', datetime('now', '-6 days', '+2 hours')),
(2, 2, 90, '{"matchCount": 6, "service": "support"}', datetime('now', '-5 days', '+3 hours')),
(1, 3, 85, '{"matchCount": 3, "service": "rfq"}', datetime('now', '-4 days', '+1 hours')),
(2, 1, 91, '{"matchCount": 5, "service": "support"}', datetime('now', '-3 days', '+4 hours')),
(1, 2, 89, '{"matchCount": 4, "service": "certification"}', datetime('now', '-2 days', '+2 hours')),
(2, 3, 93, '{"matchCount": 7, "service": "support"}', datetime('now', '-1 days', '+5 hours')),
(1, 1, 86, '{"matchCount": 3, "service": "rfq"}', datetime('now', '-0 days', '+1 hours'));
