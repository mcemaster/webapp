# 🚀 빠른 배포 가이드

404 에러 해결 및 Cloudflare Pages 배포를 위한 **단계별 가이드**입니다.

---

## ⚡ 빠른 시작 (5분)

### 1️⃣ API 토큰 생성

1. **Cloudflare API 토큰 페이지 접속**:
   ```
   https://dash.cloudflare.com/profile/api-tokens
   ```

2. **"Create Token" → "Custom token"** 선택

3. **필수 권한 추가** (4개):
   - Account → **Cloudflare Pages** → Edit
   - Account → **D1** → Edit
   - Account → **Workers Scripts** → Edit
   - Account → **Account Settings** → Read

4. **"Create Token"** 클릭 후 **토큰 복사**
   ```
   예: aBcD1234EfGh5678IjKl9012MnOp3456QrSt7890
   ```

---

### 2️⃣ Pages 프로젝트 생성

1. **Pages 대시보드 접속**:
   ```
   https://dash.cloudflare.com/pages
   ```

2. **"Create application" → "Connect to Git"**

3. **GitHub 연결**:
   - `mcemaster/webapp` 레포지토리 선택

4. **빌드 설정**:
   ```
   Project name: webapp
   Build command: npm run build
   Build output directory: dist
   ```

5. **환경 변수 추가**:
   - `OPENAI_API_KEY`: [OpenAI 키]
   - `DART_API_KEY`: [DART 키]

6. **"Save and Deploy"** 클릭

---

### 3️⃣ D1 바인딩 추가

1. **프로젝트 설정**:
   - Pages → `webapp` → Settings → Functions

2. **D1 database bindings**:
   ```
   Variable name: DB
   D1 database: webapp-production
   ```

3. **재배포**:
   - Deployments → "Retry deployment"

---

### 4️⃣ 데이터베이스 마이그레이션

터미널에서 실행:

```bash
# API 토큰 설정
export CLOUDFLARE_API_TOKEN="[위에서 복사한 토큰]"

# 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 자동 배포 스크립트 실행
./deploy.sh
```

또는 수동으로:

```bash
# 1. 빌드
npm run build

# 2. 배포
npx wrangler pages deploy dist --project-name=webapp

# 3. 데이터베이스 마이그레이션
npx wrangler d1 execute webapp-production --remote \
  --file=migrations/003_create_certifications.sql

npx wrangler d1 execute webapp-production --remote \
  --file=migrations/004_add_certificate_files.sql

npx wrangler d1 execute webapp-production --remote \
  --file=seed_certifications.sql
```

---

## 🌐 접속 URL

배포 완료 후:

| 페이지 | URL |
|--------|-----|
| **인증 검색** | `https://webapp.pages.dev/certification0000` |
| **관리자** | `https://webapp.pages.dev/admin/certification0000_admin` |
| **독립형 HTML** | `https://webapp.pages.dev/certification-search-standalone.html` |

---

## ✅ 테스트

### 검색 테스트

1. `/certification0000` 접속
2. 입력:
   - 기업명: `삼성전자주식회사`
   - 인증번호: `KR-ISO9001-2024-001`
3. "검색" 클릭

### API 테스트

```bash
curl "https://webapp.pages.dev/api/certifications/search?company_name=삼성전자주식회사&cert_number=KR-ISO9001-2024-001"
```

---

## 🔧 문제 해결

### ❌ 문제: API 토큰 권한 부족

**에러**: `Unable to authenticate request [code: 10001]`

**해결**:
1. 새 API 토큰 생성 (위의 권한 확인)
2. 다음 권한 **필수**:
   - Cloudflare Pages → Edit
   - D1 → Edit

---

### ❌ 문제: D1 바인딩 오류

**에러**: `DB is not defined`

**해결**:
1. Settings → Functions → D1 database bindings 확인
2. Variable name: `DB` (대문자)
3. 재배포 실행

---

### ❌ 문제: 빌드 실패

**해결**:
1. 빌드 로그 확인 (Pages 대시보드)
2. `package.json` 확인
3. 환경 변수 확인

---

## 📖 자세한 가이드

더 자세한 내용은 다음 문서를 참고하세요:

- **전체 가이드**: `CLOUDFLARE_SETUP_GUIDE.md`
- **프로젝트 README**: `README.md`

---

## 🎯 체크리스트

- [ ] API 토큰 생성 (4개 권한)
- [ ] Pages 프로젝트 생성
- [ ] GitHub 연결 및 배포
- [ ] D1 바인딩 추가
- [ ] 환경 변수 설정
- [ ] 데이터베이스 마이그레이션
- [ ] 접속 테스트 완료

모두 완료하면 **404 에러 해결**! 🎉

---

**문제가 계속되면?**

1. Cloudflare 대시보드에서 빌드 로그 확인
2. `./deploy.sh` 스크립트 실행
3. 이 문서의 문제 해결 섹션 참고

**작성일**: 2026-01-09
