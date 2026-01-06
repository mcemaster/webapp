-- Add ceo_name column to companies table for direct CEO name storage
-- This allows storing CEO name without requiring a user_id reference

ALTER TABLE companies ADD COLUMN ceo_name TEXT;

-- Update existing test data to have ceo_name
UPDATE companies SET ceo_name = '[TEST] 테스트대표A' WHERE name = '[TEST] 테스트기업A';
UPDATE companies SET ceo_name = '[TEST] 테스트대표B' WHERE name = '[TEST] 테스트기업B';
UPDATE companies SET ceo_name = '[TEST] 테스트대표C' WHERE name = '[TEST] 테스트기업C';
