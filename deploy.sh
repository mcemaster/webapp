#!/bin/bash

# MCE Webapp 배포 스크립트
# 사용법: ./deploy.sh [token]

set -e

echo "================================================"
echo "  MCE 인증 시스템 배포 스크립트"
echo "================================================"
echo ""

# API 토큰 확인
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  if [ -z "$1" ]; then
    echo "⚠️  Cloudflare API 토큰이 설정되지 않았습니다."
    echo ""
    echo "다음 중 하나를 선택하세요:"
    echo ""
    echo "1. 환경변수로 설정:"
    echo "   export CLOUDFLARE_API_TOKEN=\"your_token_here\""
    echo "   ./deploy.sh"
    echo ""
    echo "2. 매개변수로 전달:"
    echo "   ./deploy.sh \"your_token_here\""
    echo ""
    exit 1
  else
    export CLOUDFLARE_API_TOKEN="$1"
    echo "✅ API 토큰이 설정되었습니다."
  fi
else
  echo "✅ API 토큰이 이미 설정되어 있습니다."
fi

echo ""

# 프로젝트 디렉토리 확인
if [ ! -f "package.json" ]; then
  echo "❌ package.json을 찾을 수 없습니다."
  echo "   프로젝트 루트 디렉토리에서 실행하세요."
  exit 1
fi

# 1. 빌드
echo "📦 Step 1: 프로젝트 빌드 중..."
echo "─────────────────────────────────────────────"
npm run build
if [ $? -eq 0 ]; then
  echo "✅ 빌드 완료"
else
  echo "❌ 빌드 실패"
  exit 1
fi
echo ""

# 2. 배포
echo "🚀 Step 2: Cloudflare Pages 배포 중..."
echo "─────────────────────────────────────────────"
npx wrangler pages deploy dist --project-name=webapp
if [ $? -eq 0 ]; then
  echo "✅ 배포 완료"
else
  echo "❌ 배포 실패"
  echo ""
  echo "💡 문제 해결 방법:"
  echo "1. API 토큰 권한 확인"
  echo "2. Cloudflare Pages 프로젝트 'webapp'이 존재하는지 확인"
  echo "3. CLOUDFLARE_SETUP_GUIDE.md 참고"
  exit 1
fi
echo ""

# 3. D1 마이그레이션 (선택사항)
read -p "🗄️  D1 데이터베이스 마이그레이션을 실행하시겠습니까? (y/N): " migrate

if [[ $migrate =~ ^[Yy]$ ]]; then
  echo ""
  echo "📊 Step 3: D1 데이터베이스 마이그레이션 중..."
  echo "─────────────────────────────────────────────"
  
  echo "1/3: certifications 테이블 생성..."
  npx wrangler d1 execute webapp-production --remote \
    --file=migrations/003_create_certifications.sql 2>&1 | grep -E "(success|error|failed)" || echo "완료"
  
  echo "2/3: certificate_files 테이블 생성..."
  npx wrangler d1 execute webapp-production --remote \
    --file=migrations/004_add_certificate_files.sql 2>&1 | grep -E "(success|error|failed)" || echo "완료"
  
  echo "3/3: 샘플 데이터 시딩..."
  npx wrangler d1 execute webapp-production --remote \
    --file=seed_certifications.sql 2>&1 | grep -E "(success|error|failed)" || echo "완료"
  
  echo "✅ 마이그레이션 완료"
  echo ""
  
  # 데이터 확인
  echo "📊 인증 데이터 확인 중..."
  npx wrangler d1 execute webapp-production --remote \
    --command="SELECT COUNT(*) as count FROM certifications"
  echo ""
fi

echo "================================================"
echo "  🎉 배포 완료!"
echo "================================================"
echo ""
echo "📍 접속 URL:"
echo "   - 인증 검색: https://webapp.pages.dev/certification0000"
echo "   - 관리자: https://webapp.pages.dev/admin/certification0000_admin"
echo ""
echo "💡 다음 단계:"
echo "   1. Pages 대시보드에서 배포 상태 확인"
echo "   2. D1 바인딩 설정 (Settings > Functions > D1 database bindings)"
echo "   3. 환경 변수 확인 (OPENAI_API_KEY, DART_API_KEY)"
echo ""
echo "📖 자세한 내용은 CLOUDFLARE_SETUP_GUIDE.md 참고"
echo ""
