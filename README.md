# 경영인증평가원 (MCI Korea)

## 프로젝트 개요
- **이름**: 경영인증평가원 공식 홈페이지
- **목표**: 현대적이고 신뢰감 있는 디자인으로 기업 인증 및 매칭 서비스 제공
- **주요 기능**:
  - 기업 소개 및 인증 평가 서비스 안내
  - 실시간 견적 요청 (RFQ) 시스템
  - 반응형 모바일 최적화 UI

## 디자인 시스템 (Design System)
- **Framework**: Tailwind CSS (CDN)
- **Color Palette**:
  - Primary: Slate 900 (`#0f172a`) - 신뢰, 무게감
  - Accent: Blue 600 (`#2563eb`) - 전문성, 비즈니스
- **Typography**: Pretendard (System Font Fallback)

## 주요 URL
- **개발 서버**: http://localhost:3000
- **API**: `POST /api/rfq`

## 설치 및 실행
```bash
# 의존성 설치
npm install

# 빌드 및 실행
npm run build
pm2 start ecosystem.config.cjs
```

## 업데이트 내역 (v2.0)
- **UI/UX 전면 개편**: Tailwind CSS 도입으로 모던 디자인 적용
- **반응형 개선**: 모바일 메뉴 및 그리드 레이아웃 최적화
- **인터랙션 강화**: 호버 효과, 스무스 스크롤, 폼 제출 피드백 개선
