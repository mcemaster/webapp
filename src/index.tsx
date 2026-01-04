import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.render(
    <div>
      {/* Header with Logo */}
      <header class="header">
        <div class="container">
          <div class="logo-container">
            <svg class="logo" width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" rx="20" fill="#2563EB"/>
              <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white"/>
              <circle cx="50" cy="50" r="8" fill="#2563EB"/>
            </svg>
            <div class="logo-text">
              <h1>경영인증평가원</h1>
              <p>Management Certification Institute</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">제조를 잇다</h1>
          <p class="hero-subtitle">경영인증평가원은 제조의 수요와 공급을 온라인으로 연결합니다</p>
          <p class="hero-description">온라인 공장 플랫폼, 제조에 필요한 모든 것이 있습니다</p>
        </div>
      </section>

      {/* Factory Connection Overview */}
      <section class="overview-section">
        <div class="container">
          <h2 class="section-title">공장 연결 서비스</h2>
          <p class="section-subtitle">제조가 필요한 고객과 공장을 연결합니다</p>
          
          <div class="connection-cards">
            <div class="connection-card">
              <div class="card-icon client-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#EFF6FF"/>
                  <path d="M30 18C25.5817 18 22 21.5817 22 26C22 30.4183 25.5817 34 30 34C34.4183 34 38 30.4183 38 26C38 21.5817 34.4183 18 30 18Z" fill="#2563EB"/>
                  <path d="M20 40C20 36.134 23.134 33 27 33H33C36.866 33 40 36.134 40 40V44H20V40Z" fill="#2563EB"/>
                </svg>
              </div>
              <h3>고객용 서비스</h3>
              <p>부품제조, 제품개발, 완제품 위탁생산을 위한 파트너 공장을 쉽게 찾을 수 있습니다</p>
            </div>

            <div class="connection-card">
              <div class="card-icon factory-icon">
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#FEF3E8"/>
                  <rect x="18" y="22" width="24" height="20" rx="2" fill="#F59E0B"/>
                  <rect x="20" y="26" width="6" height="2" rx="1" fill="white"/>
                  <rect x="20" y="30" width="8" height="2" rx="1" fill="white"/>
                  <rect x="20" y="34" width="7" height="2" rx="1" fill="white"/>
                </svg>
              </div>
              <h3>공장용 서비스</h3>
              <p>온라인으로 영업하고 매일 새로운 고객과 견적요청을 받을 수 있습니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Factory Connection Section */}
      <section class="details-section">
        <div class="container">
          <h2 class="section-title">서비스 상세</h2>
          
          {/* Client Details */}
          <div class="detail-block">
            <div class="detail-header">
              <h3>고객을 위한 서비스</h3>
              <span class="badge client-badge">Client</span>
            </div>
            <div class="detail-content">
              <div class="detail-features">
                <div class="feature-item">
                  <div class="feature-number">01</div>
                  <div class="feature-info">
                    <h4>부품 제조</h4>
                    <p>정밀 가공, 금형, 주조, 프레스 등 다양한 부품 제조 파트너를 찾을 수 있습니다</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">02</div>
                  <div class="feature-info">
                    <h4>제품 개발</h4>
                    <p>아이디어부터 시제품 제작까지, 제품 개발 전 과정을 지원하는 파트너와 연결됩니다</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">03</div>
                  <div class="feature-info">
                    <h4>완제품 위탁생산</h4>
                    <p>OEM/ODM 생산이 가능한 공장을 찾아 대량 생산을 시작할 수 있습니다</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">04</div>
                  <div class="feature-info">
                    <h4>온라인 견적 요청</h4>
                    <p>도면과 사양서를 업로드하고 여러 공장으로부터 견적을 받아 비교할 수 있습니다</p>
                  </div>
                </div>
              </div>
              <button class="detail-button client-button">고객 서비스 시작하기</button>
            </div>
          </div>

          {/* Factory Details */}
          <div class="detail-block factory-block">
            <div class="detail-header">
              <h3>공장을 위한 서비스</h3>
              <span class="badge factory-badge">Factory</span>
            </div>
            <div class="detail-content">
              <div class="detail-features">
                <div class="feature-item">
                  <div class="feature-number">01</div>
                  <div class="feature-info">
                    <h4>온라인 영업</h4>
                    <p>영업 인력 없이도 온라인으로 고객을 만나고 견적 요청을 받을 수 있습니다</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">02</div>
                  <div class="feature-info">
                    <h4>공장 프로필 등록</h4>
                    <p>공장의 설비, 기술력, 생산 능력을 상세히 등록하여 고객에게 홍보할 수 있습니다</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">03</div>
                  <div class="feature-info">
                    <h4>견적 관리 시스템</h4>
                    <p>견적 요청을 체계적으로 관리하고 신속하게 응답할 수 있는 시스템을 제공합니다</p>
                  </div>
                </div>
                <div class="feature-item">
                  <div class="feature-number">04</div>
                  <div class="feature-info">
                    <h4>인증 파트너 혜택</h4>
                    <p>검증된 인증 파트너로 등록되면 우선 노출 및 다양한 마케팅 혜택을 받습니다</p>
                  </div>
                </div>
              </div>
              <button class="detail-button factory-button">공장 등록하기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Search CTA */}
      <section class="cta-section">
        <div class="container">
          <div class="cta-content">
            <h2>신뢰할 수 있는 파트너를 찾고 계신가요?</h2>
            <p>검증된 인증 파트너와 함께 성공적인 제조 프로젝트를 시작하세요</p>
            <div class="cta-buttons">
              <button class="cta-button primary">파트너 찾기</button>
              <button class="cta-button secondary">견적 요청하기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section class="process-section">
        <div class="container">
          <h2 class="section-title">이용 절차</h2>
          <p class="section-subtitle">간단한 4단계로 파트너 공장과 연결됩니다</p>
          
          <div class="process-steps">
            <div class="process-step">
              <div class="step-number">1</div>
              <h4>회원가입</h4>
              <p>간단한 정보 입력으로 회원가입</p>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-step">
              <div class="step-number">2</div>
              <h4>견적요청</h4>
              <p>도면/사양서 업로드 및 요청사항 입력</p>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-step">
              <div class="step-number">3</div>
              <h4>견적수신</h4>
              <p>여러 공장으로부터 견적 수신</p>
            </div>
            <div class="process-arrow">→</div>
            <div class="process-step">
              <div class="step-number">4</div>
              <h4>거래시작</h4>
              <p>최적의 파트너 선정 및 거래 시작</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-logo">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="white" opacity="0.1"/>
                <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white" opacity="0.8"/>
                <circle cx="50" cy="50" r="8" fill="white"/>
              </svg>
              <span>경영인증평가원</span>
            </div>
            <p>&copy; 2026 경영인증평가원. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
})

export default app
