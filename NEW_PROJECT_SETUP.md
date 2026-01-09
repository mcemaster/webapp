# 🆕 새 Cloudflare Pages 프로젝트로 배포하기

기존 `webapp` 프로젝트와 **독립적으로** 인증 시스템을 새 프로젝트로 배포하는 가이드입니다.

---

## 📋 개요

**프로젝트명**: `mce-certification`  
**목적**: 인증 시스템을 독립 프로젝트로 분리하여 관리

---

## 🎯 Step-by-Step 가이드

### 1️⃣ API 토큰 준비 (5분)

기존에 생성한 API 토큰을 사용하거나 새로 생성하세요.

#### 새 토큰 생성 (권장)

1. **API 토큰 페이지 접속**:
   ```
   https://dash.cloudflare.com/profile/api-tokens
   ```

2. **"Create Token" → "Custom token"**

3. **필수 권한 설정**:
   ```
   ✓ Account → Cloudflare Pages → Edit
   ✓ Account → D1 → Edit
   ✓ Account → Workers Scripts → Edit
   ✓ Account → Account Settings → Read
   ```

4. **토큰 복사**

---

### 2️⃣ D1 데이터베이스 생성 (3분)

새 프로젝트에는 **새로운 데이터베이스**가 필요합니다.

#### CLI로 생성

터미널에서 실행:

```bash
# API 토큰 설정
export CLOUDFLARE_API_TOKEN="your_token_here"

# 프로젝트 디렉토리로 이동
cd /home/user/webapp

# D1 데이터베이스 생성
npx wrangler d1 create mce-certification-db
```

#### 출력 예시

```
✅ Successfully created DB 'mce-certification-db'

[[d1_databases]]
binding = "DB"
database_name = "mce-certification-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

#### ⚠️ 중요: database_id 복사

출력된 `database_id`를 복사하세요!

---

### 3️⃣ wrangler.toml 업데이트

`wrangler.toml` 파일을 열고 `database_id`를 업데이트하세요:

```toml
name = "mce-certification"
compatibility_date = "2026-01-04"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = "./dist"

[[d1_databases]]
binding = "DB"
database_name = "mce-certification-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ← 여기에 복사한 ID 입력

[browser]
binding = "MYBROWSER"
```

---

### 4️⃣ Cloudflare Pages 프로젝트 생성 (5분)

#### 웹 대시보드에서 생성

1. **Pages 대시보드 접속**:
   ```
   https://dash.cloudflare.com/pages
   ```

2. **"Create application" → "Connect to Git"**

3. **GitHub 연결**:
   - `mcemaster/webapp` 레포지토리 선택

4. **프로젝트 설정**:
   ```
   Project name: mce-certification
   Production branch: main (또는 genspark_ai_developer)
   ```

5. **빌드 설정**:
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: dist
   Root directory: /
   ```

6. **환경 변수**:
   ```
   OPENAI_API_KEY = [OpenAI 키]
   DART_API_KEY = [DART 키]
   ```

7. **"Save and Deploy"** 클릭

---

### 5️⃣ D1 데이터베이스 바인딩 (2분)

배포 완료 후:

1. **프로젝트 설정**:
   - Pages → `mce-certification` → Settings → Functions

2. **D1 database bindings**:
   - "Add binding" 클릭
   ```
   Variable name: DB
   D1 database: mce-certification-db
   ```

3. **재배포**:
   - Deployments → "Retry deployment"

---

### 6️⃣ 데이터베이스 마이그레이션 (5분)

터미널에서 실행:

```bash
# API 토큰 설정 (이미 했으면 생략)
export CLOUDFLARE_API_TOKEN="your_token_here"

# 프로젝트 디렉토리
cd /home/user/webapp

# 1. certifications 테이블 생성
npx wrangler d1 execute mce-certification-db --remote \
  --file=migrations/003_create_certifications.sql

# 2. certificate_files 테이블 생성
npx wrangler d1 execute mce-certification-db --remote \
  --file=migrations/004_add_certificate_files.sql

# 3. 샘플 데이터 시딩
npx wrangler d1 execute mce-certification-db --remote \
  --file=seed_certifications.sql

# 4. 데이터 확인
npx wrangler d1 execute mce-certification-db --remote \
  --command="SELECT COUNT(*) as count FROM certifications"
```

#### 출력 예시

```
┌───────┐
│ count │
├───────┤
│ 10    │
└───────┘
```

---

### 7️⃣ 자동 배포 스크립트 사용 (선택)

편리하게 한 번에 배포하려면:

```bash
# API 토큰 설정
export CLOUDFLARE_API_TOKEN="your_token_here"

# 스크립트 실행
./deploy.sh
```

---

## 🌐 접속 URL

배포 완료 후 다음 URL로 접속:

| 페이지 | URL |
|--------|-----|
| **인증 검색** | `https://mce-certification.pages.dev/certification0000` |
| **관리자** | `https://mce-certification.pages.dev/admin/certification0000_admin` |
| **DB 관리** | `https://mce-certification.pages.dev/admin/certification0000_admin/database` |
| **독립형 HTML** | `https://mce-certification.pages.dev/certification-search-standalone.html` |

---

## ✅ 테스트

### 인증 검색 테스트

1. `/certification0000` 접속
2. 입력:
   - 기업명: `삼성전자주식회사`
   - 인증번호: `KR-ISO9001-2024-001`
3. "검색" 버튼 클릭

### API 테스트

```bash
curl "https://mce-certification.pages.dev/api/certifications/search?company_name=삼성전자주식회사&cert_number=KR-ISO9001-2024-001"
```

---

## 🔄 기존 프로젝트와 차이점

| 항목 | 기존 (webapp) | 새 프로젝트 (mce-certification) |
|------|--------------|--------------------------------|
| **프로젝트명** | webapp | mce-certification |
| **URL** | webapp.pages.dev | mce-certification.pages.dev |
| **데이터베이스** | webapp-production | mce-certification-db |
| **용도** | 통합 시스템 | 인증 시스템 전용 |

---

## 🔧 문제 해결

### ❌ D1 데이터베이스 생성 실패

**에러**: API 토큰 권한 부족

**해결**:
1. API 토큰에 D1 Edit 권한 추가
2. 다시 생성 시도

---

### ❌ 배포 시 database_id 오류

**에러**: `Database not found`

**해결**:
1. `wrangler.toml`에서 `database_id` 확인
2. D1 대시보드에서 데이터베이스 ID 확인:
   ```
   https://dash.cloudflare.com/d1
   ```

---

### ❌ D1 바인딩 오류

**에러**: `DB is not defined`

**해결**:
1. Settings → Functions → D1 database bindings 확인
2. Variable name: `DB` (대문자)
3. Database: `mce-certification-db`
4. 재배포

---

## 📊 배포 체크리스트

- [ ] API 토큰 준비
- [ ] D1 데이터베이스 생성
- [ ] `wrangler.toml` 업데이트
- [ ] Pages 프로젝트 생성
- [ ] GitHub 연결
- [ ] 환경 변수 설정
- [ ] 첫 배포 완료
- [ ] D1 바인딩 추가
- [ ] 재배포
- [ ] 데이터베이스 마이그레이션
- [ ] 접속 테스트 완료

---

## 🎯 자동 배포 설정

GitHub에 푸시하면 **자동 배포**:

```bash
# 코드 수정 후
git add .
git commit -m "update: ..."
git push origin main

# Cloudflare Pages가 자동으로 배포
```

---

## 🔗 커스텀 도메인 (선택)

### www.mce.re.kr 연결

1. **Pages 프로젝트 설정**:
   - Custom domains → "Set up a custom domain"

2. **도메인 추가**:
   ```
   www.mce.re.kr
   ```

3. **DNS 설정**:
   - Cloudflare DNS에 CNAME 추가
   - 또는 자동 설정 사용

4. **SSL 인증서**:
   - 자동으로 발급 (약 10-15분)

---

## 📚 추가 문서

- **빠른 시작**: `DEPLOYMENT_QUICKSTART.md`
- **상세 가이드**: `CLOUDFLARE_SETUP_GUIDE.md`
- **404 해결**: `배포_가이드_요약.md`

---

## 💡 왜 새 프로젝트로 분리하나요?

### 장점

1. **독립성**: 다른 시스템과 분리하여 관리
2. **확장성**: 인증 시스템만 독립적으로 확장 가능
3. **보안**: 별도 데이터베이스로 데이터 격리
4. **명확성**: URL이 더 명확함 (mce-certification.pages.dev)

### 단점

1. **추가 관리**: 별도 프로젝트 관리 필요
2. **중복 설정**: 환경 변수 등 중복 설정

---

## 🆚 어떤 방식을 선택해야 하나요?

### 기존 프로젝트 (webapp) 사용

- ✅ 통합 관리가 쉬움
- ✅ 설정 한 번만 필요
- ❌ URL이 복잡할 수 있음

### 새 프로젝트 (mce-certification) 사용

- ✅ 명확한 분리
- ✅ 독립적 관리
- ✅ URL이 명확함
- ❌ 설정이 추가로 필요

**추천**: 인증 시스템이 중요한 핵심 기능이라면 **새 프로젝트** 추천!

---

## 🎉 완료!

새 프로젝트 배포가 완료되면:

```
✅ https://mce-certification.pages.dev/certification0000
```

접속하여 테스트하세요!

---

**작성일**: 2026-01-09  
**프로젝트**: MCE 인증 시스템  
**버전**: 1.0
