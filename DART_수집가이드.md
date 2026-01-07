# DART 기업정보 수집 가이드 📊

## 개요
이 스크립트는 DART(전자공시시스템)에서 전체 기업 정보를 수집하여 Cloudflare D1 데이터베이스에 자동으로 저장합니다.

---

## 수집되는 정보

### 기본 정보
- 기업명 (한글/영문)
- 대표자명
- 기업 분류 (KOSPI/KOSDAQ/기타)
- 사업자등록번호
- 본점 주소
- 홈페이지 URL
- IR 홈페이지
- 전화번호/팩스번호
- 업종코드
- 설립일자
- 결산월

### 재무 정보 (2024, 2023, 2022)
- 자산총계
- 부채총계
- 자본총계
- 매출액
- 영업이익
- 당기순이익

### 임원 정보
- 임원명
- 직위
- 담당업무
- 최대 10명

### 주주 현황
- 주주명
- 보유주식수
- 지분율
- 최대 5명

### 직원 현황
- 총 직원수
- 평균 급여

---

## 🚀 실행 방법

### 방법 1: 로컬 PC에서 실행 (추천)

#### 1단계: Python 설치 확인
```bash
python --version
# 또는
python3 --version
```

#### 2단계: requests 라이브러리 설치
```bash
pip install requests
# 또는
pip3 install requests
```

#### 3단계: 스크립트 다운로드
GitHub에서 `dart_collector.py` 파일을 다운로드하거나, 아래 링크에서 복사:
- https://github.com/mcemaster/webapp/blob/main/dart_collector.py

#### 4단계: 스크립트 실행
```bash
python dart_collector.py
# 또는
python3 dart_collector.py
```

#### 실행 화면 예시:
```
============================================================
DART 전체 기업정보 수집기 (풀버전)
============================================================

1. 기업코드 다운로드 중...
   180,234개 기업 발견!

2. 상세정보 수집 시작...

[1/180,234] 삼성전자 | 대표:이재용 | 매출:3027512억 | 직원:123456
[2/180,234] LG전자 | 대표:조주완 | 매출:812345억 | 직원:75432
...

>>> 30개 업로드 중...
>>> 결과: 30개 기업 정보가 성공적으로 저장되었습니다.

...

============================================================
완료! 총 45,234개 기업 정보 업로드됨
오류: 124개
============================================================
```

---

## ⚙️ 설정 변경

### API 키 변경
파일 상단의 `KEY` 변수를 수정:
```python
KEY = "your-dart-api-key-here"
```

### 업로드 URL 변경
파일 상단의 `URL` 변수를 수정:
```python
URL = "https://your-domain.pages.dev/api/admin/companies/import-detail"
```

### 배치 크기 변경
한 번에 전송하는 기업 수를 조정 (기본: 30개):
```python
if len(batch) >= 30:  # 이 숫자를 변경
```

### 대기 시간 조정
API 호출 간 대기 시간 (기본: 0.3초):
```python
time.sleep(0.3)  # 이 숫자를 변경
```

---

## 📡 백엔드 API

### 엔드포인트
```
POST /api/admin/companies/import-detail
```

### 요청 형식
```json
{
  "companies": [
    {
      "corp_code": "00123456",
      "stock_code": "005930",
      "corp_name": "삼성전자",
      "corp_name_eng": "SAMSUNG ELECTRONICS CO.,LTD.",
      "ceo_nm": "이재용",
      "corp_cls": "Y",
      "bizr_no": "1234567890",
      "adres": "서울특별시 서초구...",
      "hm_url": "http://www.samsung.com",
      "ir_url": "http://ir.samsung.com",
      "phn_no": "02-1234-5678",
      "fax_no": "02-1234-5679",
      "induty_code": "264",
      "est_dt": "19690113",
      "acc_mt": "12",
      "financial": {
        "year": 2024,
        "total_assets": "48956700000000",
        "total_liabilities": "11234500000000",
        "total_equity": "37722200000000",
        "revenue": "30271520000000",
        "operating_profit": "4354320000000",
        "net_income": "3456780000000"
      },
      "executives": [
        {
          "name": "이재용",
          "position": "사장",
          "role": "대표이사"
        }
      ],
      "shareholders": [
        {
          "name": "국민연금",
          "shares": "167234567",
          "ratio": "8.51"
        }
      ],
      "employees": {
        "employee_count": 123456,
        "avg_salary": "120000000"
      }
    }
  ]
}
```

### 응답 형식
```json
{
  "success": true,
  "message": "30개 기업 정보가 성공적으로 저장되었습니다.",
  "inserted": 30
}
```

---

## 🗄️ 데이터베이스 저장

### Cloudflare D1 테이블: `companies`

수집된 모든 데이터는 `companies` 테이블에 자동으로 저장됩니다:

```sql
CREATE TABLE companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  stock_code TEXT,
  ceo TEXT,
  address TEXT,
  industry TEXT,
  website TEXT,
  phone TEXT,
  established_date TEXT,
  
  -- 재무 정보 (JSON)
  revenue TEXT,
  operating_profit TEXT,
  net_income TEXT,
  total_assets TEXT,
  total_liabilities TEXT,
  total_equity TEXT,
  
  -- 기타 정보 (JSON)
  executives TEXT,
  shareholders TEXT,
  employee_count INTEGER,
  avg_salary TEXT,
  
  -- 인증 및 기타
  certifications TEXT,
  capabilities TEXT,
  iaf_codes TEXT,
  
  -- 타임스탬프
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  analyzed_at TEXT
);
```

---

## ⚠️ 주의사항

### 1. API 호출 제한
- DART API는 일일 호출 횟수 제한이 있을 수 있습니다
- 장시간 실행 시 네트워크 안정성 확인 필요

### 2. 실행 시간
- 전체 기업 (약 18만개) 수집 시 **약 15~20시간** 소요
- 중간에 중단되어도 이미 업로드된 데이터는 유지됨

### 3. 에러 처리
- 네트워크 오류나 API 오류는 자동으로 스킵
- 최종 집계에 오류 개수 표시

### 4. 중복 데이터
- `corp_code`가 같은 기업은 자동으로 업데이트됨
- 최신 정보로 덮어쓰기

---

## 🔍 트러블슈팅

### 문제: "requests 모듈을 찾을 수 없습니다"
```bash
pip install requests
```

### 문제: "타임아웃 오류"
```python
time.sleep(0.5)  # 대기 시간 늘리기
```

### 문제: "업로드 실패"
- 인터넷 연결 확인
- URL이 정확한지 확인
- Cloudflare D1 데이터베이스 상태 확인

### 문제: "DART API 키 오류"
- DART 포털에서 새 API 키 발급
- KEY 변수를 정확하게 입력했는지 확인

---

## 📊 진행 상황 모니터링

### 관리자 페이지에서 확인
```
https://your-domain.pages.dev/admin
```

### DB에서 직접 확인
```bash
# Wrangler CLI 사용
npx wrangler d1 execute webapp-production --command "SELECT COUNT(*) FROM companies"
```

---

## 💡 팁

### 1. 부분 실행
특정 범위만 수집하려면:
```python
for i, c in enumerate(corps[:1000]):  # 처음 1000개만
```

### 2. 로그 저장
```bash
python dart_collector.py > dart_log.txt 2>&1
```

### 3. 백그라운드 실행 (Linux/Mac)
```bash
nohup python3 dart_collector.py &
```

### 4. 중단 후 재실행
- 이미 저장된 기업은 자동으로 업데이트
- 처음부터 다시 실행해도 안전

---

## 📞 지원

문제가 발생하면:
1. GitHub Issues 등록
2. 로그 파일 첨부
3. 오류 메시지 캡처

---

**마지막 업데이트**: 2026-01-07
