# 🚀 Cloudflare 배포 명령어 모음

새 프로젝트로 배포하기 위한 **모든 명령어**를 순서대로 정리했습니다.

---

## 🔑 1. API 토큰 설정

```bash
# API 토큰 환경변수 설정
export CLOUDFLARE_API_TOKEN="your_token_here"

# 확인
echo $CLOUDFLARE_API_TOKEN
```

---

## 🗄️ 2. D1 데이터베이스 생성

```bash
# 프로젝트 디렉토리로 이동
cd /home/user/webapp

# D1 데이터베이스 생성
npx wrangler d1 create mce-certification-db

# 출력된 database_id를 복사하세요!
```

---

## ⚙️ 3. wrangler.toml 업데이트

```bash
# wrangler.toml 파일 열기
nano wrangler.toml

# database_id를 위에서 복사한 ID로 변경
# 저장: Ctrl+O, Enter, Ctrl+X
```

또는 자동 업데이트:

```bash
# database_id 변수 설정
DB_ID="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

# wrangler.toml 자동 업데이트
sed -i "s/database_id = \"YOUR_NEW_DATABASE_ID_HERE\"/database_id = \"$DB_ID\"/" wrangler.toml

# 확인
cat wrangler.toml | grep database_id
```

---

## 📦 4. 빌드

```bash
# 프로젝트 빌드
npm run build

# 빌드 결과 확인
ls -lh dist/
```

---

## 🚀 5. Pages 배포

```bash
# Cloudflare Pages에 배포
npx wrangler pages deploy dist --project-name=mce-certification

# 또는 package.json 스크립트 사용
npm run deploy
```

---

## 🗄️ 6. 데이터베이스 마이그레이션

### 전체 마이그레이션 (한 번에)

```bash
# 1. certifications 테이블 생성
npx wrangler d1 execute mce-certification-db --remote \
  --file=migrations/003_create_certifications.sql

# 2. certificate_files 테이블 생성
npx wrangler d1 execute mce-certification-db --remote \
  --file=migrations/004_add_certificate_files.sql

# 3. 샘플 데이터 시딩
npx wrangler d1 execute mce-certification-db --remote \
  --file=seed_certifications.sql
```

### 마이그레이션 확인

```bash
# 데이터 개수 확인
npx wrangler d1 execute mce-certification-db --remote \
  --command="SELECT COUNT(*) as count FROM certifications"

# 전체 데이터 조회
npx wrangler d1 execute mce-certification-db --remote \
  --command="SELECT * FROM certifications LIMIT 5"

# 테이블 목록 확인
npx wrangler d1 execute mce-certification-db --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table'"
```

---

## 🎯 7. 자동 배포 스크립트

```bash
# 전체 프로세스 자동화
./deploy.sh

# 또는 대화형으로 실행
bash deploy.sh
```

---

## 🌐 8. 접속 테스트

```bash
# 인증 검색 페이지 테스트
curl -I https://mce-certification.pages.dev/certification0000

# API 테스트
curl "https://mce-certification.pages.dev/api/certifications/search?company_name=삼성전자주식회사&cert_number=KR-ISO9001-2024-001"

# JSON 포맷으로 확인
curl -s "https://mce-certification.pages.dev/api/certifications/search?company_name=삼성전자주식회사&cert_number=KR-ISO9001-2024-001" | jq '.'
```

---

## 🔧 9. 문제 해결 명령어

### D1 데이터베이스 목록 확인

```bash
npx wrangler d1 list
```

### D1 데이터베이스 정보 확인

```bash
npx wrangler d1 info mce-certification-db
```

### Pages 프로젝트 목록 확인

```bash
npx wrangler pages project list
```

### Pages 배포 내역 확인

```bash
npx wrangler pages deployment list --project-name=mce-certification
```

### 로그 확인

```bash
# 최신 배포 로그
npx wrangler pages deployment tail --project-name=mce-certification
```

---

## 🔄 10. Git 명령어

```bash
# 변경사항 확인
git status

# 스테이징
git add .

# 커밋
git commit -m "feat: 새 프로젝트로 분리"

# 푸시
git push origin genspark_ai_developer
```

---

## 📊 11. 환경 변수 관리

### CLI로 환경 변수 설정 (선택)

```bash
# OPENAI_API_KEY 설정
npx wrangler pages secret put OPENAI_API_KEY --project-name=mce-certification

# DART_API_KEY 설정
npx wrangler pages secret put DART_API_KEY --project-name=mce-certification

# 환경 변수 목록 확인
npx wrangler pages secret list --project-name=mce-certification
```

---

## 🧹 12. 정리 명령어

### 로컬 빌드 정리

```bash
# dist 폴더 삭제
rm -rf dist/

# node_modules 재설치
rm -rf node_modules/
npm install
```

### D1 데이터베이스 초기화

```bash
# ⚠️ 주의: 모든 데이터 삭제
npx wrangler d1 execute mce-certification-db --remote \
  --command="DELETE FROM certifications"

# 다시 시딩
npx wrangler d1 execute mce-certification-db --remote \
  --file=seed_certifications.sql
```

---

## 🎯 완전 자동화 (All-in-One)

```bash
#!/bin/bash

# 새 프로젝트 배포 완전 자동화 스크립트

# 1. API 토큰 설정
export CLOUDFLARE_API_TOKEN="your_token_here"

# 2. D1 생성
echo "D1 데이터베이스 생성 중..."
npx wrangler d1 create mce-certification-db

# 출력된 database_id를 복사하여 wrangler.toml 업데이트
echo "⚠️ database_id를 wrangler.toml에 복사하세요!"
echo "계속하려면 Enter를 누르세요..."
read

# 3. 빌드
echo "빌드 중..."
npm run build

# 4. 배포
echo "배포 중..."
npm run deploy

# 5. 마이그레이션
echo "D1 마이그레이션 중..."
npx wrangler d1 execute mce-certification-db --remote \
  --file=migrations/003_create_certifications.sql

npx wrangler d1 execute mce-certification-db --remote \
  --file=migrations/004_add_certificate_files.sql

npx wrangler d1 execute mce-certification-db --remote \
  --file=seed_certifications.sql

# 6. 확인
echo "데이터 확인 중..."
npx wrangler d1 execute mce-certification-db --remote \
  --command="SELECT COUNT(*) as count FROM certifications"

echo "✅ 배포 완료!"
echo "📍 https://mce-certification.pages.dev/certification0000"
```

---

## 📝 빠른 참조

### 프로젝트 정보

```
프로젝트명: mce-certification
데이터베이스: mce-certification-db
URL: https://mce-certification.pages.dev
```

### 주요 경로

```
인증 검색: /certification0000
관리자: /admin/certification0000_admin
DB 관리: /admin/certification0000_admin/database
독립형 HTML: /certification-search-standalone.html
```

---

## 🆘 자주 사용하는 명령어

```bash
# 빠른 재배포
npm run build && npm run deploy

# D1 데이터 확인
npx wrangler d1 execute mce-certification-db --remote \
  --command="SELECT * FROM certifications LIMIT 10"

# Pages 로그 보기
npx wrangler pages deployment tail --project-name=mce-certification

# 환경 변수 확인
npx wrangler pages secret list --project-name=mce-certification
```

---

## 📚 관련 문서

- **새 프로젝트 가이드**: `NEW_PROJECT_SETUP.md`
- **배포 가이드**: `DEPLOYMENT_QUICKSTART.md`
- **상세 가이드**: `CLOUDFLARE_SETUP_GUIDE.md`

---

**작성일**: 2026-01-09  
**프로젝트**: MCE 인증 시스템
