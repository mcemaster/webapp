# 🚀 Cloudflare Pages 배포 가이드

MCE 인증 시스템을 Cloudflare Pages에 배포하는 전체 과정입니다.

---

## 📋 목차

1. [사전 준비](#1-사전-준비)
2. [API 토큰 생성](#2-api-토큰-생성)
3. [Pages 프로젝트 생성](#3-pages-프로젝트-생성)
4. [D1 데이터베이스 설정](#4-d1-데이터베이스-설정)
5. [배포 확인](#5-배포-확인)
6. [문제 해결](#6-문제-해결)

---

## 1. 사전 준비

### 필요한 것들
- ✅ Cloudflare 계정
- ✅ GitHub 계정 (레포지토리: `mcemaster/webapp`)
- ✅ OpenAI API 키
- ✅ DART API 키

---

## 2. API 토큰 생성

### 2.1 토큰 생성 페이지 접속

1. 브라우저에서 다음 URL 접속:
   ```
   https://dash.cloudflare.com/profile/api-tokens
   ```

2. **"Create Token"** 버튼 클릭

### 2.2 권한 설정

1. **"Custom token"** 선택

2. **Token name** 입력:
   ```
   MCE Webapp Deployment Token
   ```

3. **Permissions** 설정 (4개 필수):

   | 리소스 타입 | 범위 | 권한 |
   |------------|------|------|
   | Account | Cloudflare Pages | Edit |
   | Account | D1 | Edit |
   | Account | Workers Scripts | Edit |
   | Account | Account Settings | Read |

   **설정 방법**:
   - "+ Add more" 버튼을 클릭하여 각 권한 추가
   - 드롭다운에서 리소스 타입과 권한 선택

4. **Account Resources** 설정:
   ```
   Include → All accounts
   ```

5. **Client IP Address Filtering** (선택사항):
   - 보안을 위해 특정 IP만 허용 가능
   - 기본값 사용 권장

6. **TTL (Time to live)**:
   ```
   권장: 1 year
   ```

### 2.3 토큰 생성 및 저장

1. **"Continue to summary"** 클릭

2. 설정 내용 확인

3. **"Create Token"** 클릭

4. **⚠️ 중요: 토큰 복사**
   ```
   생성된 토큰은 한 번만 표시됩니다!
   반드시 안전한 곳에 복사해두세요.
   ```

   예시:
   ```
   aBcD1234EfGh5678IjKl9012MnOp3456QrSt7890
   ```

---

## 3. Pages 프로젝트 생성

### 3.1 Pages 대시보드 접속

1. Cloudflare 대시보드 접속:
   ```
   https://dash.cloudflare.com
   ```

2. 좌측 메뉴에서 **"Workers & Pages"** 클릭

### 3.2 프로젝트 생성

1. **"Create application"** 버튼 클릭

2. **"Pages"** 탭 선택

3. **"Connect to Git"** 클릭

### 3.3 GitHub 연결

1. **"Connect GitHub"** 버튼 클릭

2. GitHub 로그인 (필요시)

3. **Cloudflare Pages 앱 권한 승인**:
   - "Install & Authorize" 클릭
   - 또는 "Only select repositories" 선택 후 `webapp` 추가

4. 레포지토리 선택:
   ```
   mcemaster/webapp
   ```

5. **"Begin setup"** 클릭

### 3.4 빌드 설정

다음 정보를 **정확히** 입력하세요:

#### 기본 설정
```
Project name: webapp

Production branch: main
```

#### 빌드 설정
```
Framework preset: None

Build command: npm run build

Build output directory: dist

Root directory: / (기본값)
```

#### 환경 변수

**"Add variable"** 버튼을 클릭하여 다음 변수 추가:

1. **OpenAI API 키**
   ```
   변수명: OPENAI_API_KEY
   값: [OpenAI API 키 입력]
   ```

2. **DART API 키**
   ```
   변수명: DART_API_KEY
   값: [DART API 키 입력]
   ```

### 3.5 배포 시작

1. 모든 설정 확인

2. **"Save and Deploy"** 클릭

3. 빌드 진행 상황 확인:
   - 실시간 로그 표시
   - 약 2-3분 소요

4. 배포 완료 시 URL 확인:
   ```
   https://webapp-xxx.pages.dev
   ```

---

## 4. D1 데이터베이스 설정

### 4.1 D1 바인딩 추가

1. **프로젝트 설정 페이지**로 이동:
   - Pages 대시보드에서 `webapp` 프로젝트 클릭
   - **"Settings"** 탭 클릭

2. **Functions** 섹션:
   - 좌측 메뉴에서 **"Functions"** 클릭

3. **D1 database bindings** 섹션:
   - **"Add binding"** 클릭

4. 바인딩 정보 입력:
   ```
   Variable name: DB
   D1 database: webapp-production
   ```

5. **"Save"** 클릭

6. **재배포 필요**:
   - "Deployments" 탭으로 이동
   - 최신 배포의 "..." 메뉴 클릭
   - **"Retry deployment"** 선택

### 4.2 데이터베이스 마이그레이션 (CLI)

배포가 완료되면 터미널에서 데이터베이스를 설정합니다.

#### 4.2.1 API 토큰 설정

```bash
# API 토큰 환경변수로 설정
export CLOUDFLARE_API_TOKEN="[위에서 생성한 토큰]"
```

#### 4.2.2 마이그레이션 실행

```bash
# 프로젝트 디렉토리로 이동
cd /home/user/webapp

# 1. certifications 테이블 생성
npx wrangler d1 execute webapp-production --remote \
  --file=migrations/003_create_certifications.sql

# 2. certificate_files 테이블 및 추가 컬럼
npx wrangler d1 execute webapp-production --remote \
  --file=migrations/004_add_certificate_files.sql

# 3. 샘플 데이터 시딩 (10개 기업)
npx wrangler d1 execute webapp-production --remote \
  --file=seed_certifications.sql
```

#### 4.2.3 확인

```bash
# 데이터 확인
npx wrangler d1 execute webapp-production --remote \
  --command="SELECT COUNT(*) as count FROM certifications"
```

출력 예시:
```
┌───────┐
│ count │
├───────┤
│ 10    │
└───────┘
```

---

## 5. 배포 확인

### 5.1 접속 URL

배포 완료 후 다음 URL로 접속하세요:

#### 사용자 페이지
```
https://webapp-xxx.pages.dev/certification0000
```

#### 관리자 페이지
```
https://webapp-xxx.pages.dev/admin/certification0000_admin
```

#### 독립형 HTML (아임웹 임베딩용)
```
https://webapp-xxx.pages.dev/certification-search-standalone.html
```

### 5.2 테스트

1. **인증 검색 테스트**:
   - `/certification0000` 접속
   - 기업명: `삼성전자주식회사`
   - 인증번호: `KR-ISO9001-2024-001`
   - 검색 버튼 클릭

2. **관리자 페이지 테스트**:
   - `/admin/certification0000_admin` 접속
   - 로그인 필요 (admin 계정)

3. **API 테스트**:
   ```bash
   curl "https://webapp-xxx.pages.dev/api/certifications/search?company_name=삼성전자주식회사&cert_number=KR-ISO9001-2024-001"
   ```

---

## 6. 문제 해결

### 6.1 빌드 실패

**증상**: 빌드 중 에러 발생

**해결방법**:
1. 빌드 로그 확인
2. `package.json` 의존성 확인
3. 환경 변수 올바른지 확인

### 6.2 D1 바인딩 오류

**증상**: "DB is not defined" 에러

**해결방법**:
1. Settings → Functions → D1 database bindings 확인
2. Variable name이 `DB`인지 확인
3. 재배포 실행

### 6.3 API 토큰 권한 부족

**증상**: "Unable to authenticate request [code: 10001]"

**해결방법**:
1. 새 API 토큰 생성 (위의 권한 설정 참고)
2. 다음 권한 필수:
   - Account → Cloudflare Pages → Edit
   - Account → D1 → Edit

### 6.4 환경 변수 누락

**증상**: OpenAI API 호출 실패

**해결방법**:
1. Settings → Environment variables 확인
2. `OPENAI_API_KEY` 추가
3. 재배포

---

## 7. 커스텀 도메인 설정 (선택사항)

### 7.1 도메인 추가

1. **프로젝트 설정**:
   - Pages 프로젝트 → "Custom domains" 탭

2. **도메인 추가**:
   ```
   www.mce.re.kr
   ```

3. **DNS 설정**:
   - Cloudflare DNS에 CNAME 레코드 추가
   - 또는 안내에 따라 설정

### 7.2 SSL 인증서

- Cloudflare가 자동으로 SSL 인증서 발급
- 약 10-15분 소요
- 이후 HTTPS 자동 적용

---

## 8. 자동 배포 설정

GitHub에 푸시하면 **자동으로 배포**됩니다:

```bash
# 코드 수정 후
git add .
git commit -m "update: ..."
git push origin main

# Cloudflare Pages가 자동으로 감지하고 배포
```

배포 상황은 Pages 대시보드에서 실시간 확인 가능합니다.

---

## 📞 추가 지원

문제가 계속되면:
1. Cloudflare 대시보드에서 빌드 로그 확인
2. GitHub Actions 로그 확인
3. D1 데이터베이스 연결 상태 확인

---

## ✅ 체크리스트

배포 완료 후 확인 사항:

- [ ] Pages 프로젝트 생성 완료
- [ ] GitHub 연결 및 첫 배포 성공
- [ ] D1 데이터베이스 바인딩 추가
- [ ] 데이터베이스 마이그레이션 실행
- [ ] 샘플 데이터 시딩 완료
- [ ] 인증 검색 페이지 정상 작동
- [ ] 관리자 페이지 접근 가능
- [ ] API 엔드포인트 정상 응답

모든 항목이 체크되면 배포 완료! 🎉

---

**작성일**: 2026-01-09
**버전**: 1.0
**프로젝트**: MCE 경영인증평가원 인증 시스템
