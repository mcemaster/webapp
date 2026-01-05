# webapp

## Project Overview
- **Name**: webapp (MCE 경영인증평가원)
- **Goal**: 기업 맞춤형 정부지원사업 매칭 및 경영 컨설팅 플랫폼
- **Features**: 
  - 기업 진단 및 AI 기반 지원사업 매칭 (GPT-4o)
  - 공급사 찾기 및 비교 견적 (RFQ)
  - 경영 인증 및 심사 신청
  - 실시간 채팅 상담 (Mock)

## URLs
- **Production**: https://webapp.pages.dev (예시)
- **Local Dev**: http://localhost:3000

## Data Architecture
- **Data Models**: 
  - `users`: 회원 정보
  - `companies`: 기업 상세 재무/비재무 데이터
  - `grants`: 정부지원사업 공고 (크롤링 데이터)
  - `analysis_logs`: AI 분석 이력 및 사용량 추적
- **Storage Services**: 
  - **Cloudflare D1**: 관계형 데이터 저장 (SQLite)
  - **Cloudflare Pages**: 프론트엔드 호스팅

## User Guide
1. **로그인**: `/login` (데모 계정: user@example.com / 아무 비번)
2. **지원사업 매칭**: `/support-matching` 접속 -> 기업명 입력(예: '태성정밀') -> '분석 시작'
3. **결과 확인**: AI가 분석한 상위 3개 추천 공고 및 사유 확인

## Deployment
- **Platform**: Cloudflare Pages
- **Status**: ✅ Active
- **Tech Stack**: Hono + TypeScript + TailwindCSS + SQLite (D1)
- **Last Updated**: 2026-01-05

## Recent Updates
- **Real AI Integration**: `/api/analyze` 엔드포인트 연동 (OpenAI GPT-4o)
- **Usage Limiting**: 월 20회 무료 분석 제한 기능 추가
- **Database Seeding**: 실제 정부지원사업 공고 데이터(20+건) 시딩 완료
