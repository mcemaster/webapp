import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.render(
    <div>
      {/* Hero Section */}
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">제조를 잇다, 경영인증평가원</h1>
          <p class="hero-subtitle">경영인증평가원은 제조의 수요와 공급을 온라인으로 연결합니다</p>
          <p class="hero-description">온라인 공장 플랫폼, 제조에 필요한 모든 것이 있습니다</p>
        </div>
      </section>

      {/* Services Overview */}
      <section class="services-overview">
        <div class="container">
          <div class="service-cards">
            <div class="service-card">
              <div class="service-icon">🏭</div>
              <h3>공장 연결</h3>
            </div>
            <div class="service-card">
              <div class="service-icon">👥</div>
              <h3>외국인 채용</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Factory Connection Section */}
      <section class="factory-connection-section">
        <div class="container">
          <h2 class="section-title">공장 연결</h2>
          <p class="section-subtitle">제조가 필요한 고객과 공장을 연결합니다</p>
          
          <div class="connection-grid">
            {/* CAPA Client */}
            <div class="connection-card">
              <div class="connection-image-wrapper">
                <div class="connection-image client-image">
                  <div class="image-placeholder">
                    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="200" height="150" fill="#E8F4F8"/>
                      <path d="M100 45C91.7157 45 85 51.7157 85 60C85 68.2843 91.7157 75 100 75C108.284 75 115 68.2843 115 60C115 51.7157 108.284 45 100 45Z" fill="#3B82F6"/>
                      <path d="M75 85C68.3726 85 63 90.3726 63 97V105H137V97C137 90.3726 131.627 85 125 85H75Z" fill="#3B82F6"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="connection-content">
                <h4 class="connection-label">고객용</h4>
                <h3 class="connection-title">부품제조, 제품개발,<br/>완제품 위탁생산</h3>
                <p class="connection-description">파트너 공장을 쉽게 찾을 수 있어요!</p>
                <button class="connection-button">자세히 보기</button>
              </div>
            </div>

            {/* CAPA Partners */}
            <div class="connection-card">
              <div class="connection-image-wrapper">
                <div class="connection-image partners-image">
                  <div class="image-placeholder">
                    <svg width="200" height="150" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="200" height="150" fill="#FEF3E8"/>
                      <rect x="60" y="40" width="80" height="60" rx="4" fill="#F59E0B"/>
                      <rect x="70" y="50" width="20" height="3" rx="1.5" fill="white"/>
                      <rect x="70" y="60" width="30" height="3" rx="1.5" fill="white"/>
                      <rect x="70" y="70" width="25" height="3" rx="1.5" fill="white"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div class="connection-content">
                <h4 class="connection-label">공장용</h4>
                <h3 class="connection-title">공장 영업?<br/>이제 온라인에서 하세요!</h3>
                <p class="connection-description">매일 새로운 고객과 견적요청이 쏟아집니다</p>
                <button class="connection-button">자세히 보기</button>
              </div>
            </div>
          </div>

          <div class="partner-search-section">
            <h3 class="partner-search-title">신뢰할 수 있는 파트너를 직접 찾아보세요</h3>
            <p class="partner-search-description">온라인으로 원하는 파트너를 직접 찾아 상담 및 견적을 요청할 수 있습니다</p>
            <button class="partner-search-button">추천 인증 파트너 보기</button>
          </div>
        </div>
      </section>

      {/* Recruitment Section */}
      <section class="recruitment-section">
        <div class="container">
          <h2 class="section-title">외국인 채용</h2>
          <p class="section-subtitle">외국인 채용도 가능해요</p>
          <p class="section-description">구인난을 겪고 있는 제조공장을 위한 맞춤형 외국인 인력을 소개합니다.</p>
          
          <div class="recruitment-content">
            <div class="recruitment-image-wrapper">
              <div class="recruitment-image">
                <div class="image-placeholder">
                  <svg width="300" height="250" viewBox="0 0 300 250" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="300" height="250" fill="#F0FDF4"/>
                    <circle cx="150" cy="90" r="35" fill="#10B981"/>
                    <path d="M100 140C100 125.088 112.088 113 127 113H173C187.912 113 200 125.088 200 140V180H100V140Z" fill="#10B981"/>
                    <rect x="110" y="195" width="80" height="8" rx="4" fill="#10B981" opacity="0.6"/>
                    <rect x="110" y="210" width="100" height="8" rx="4" fill="#10B981" opacity="0.6"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="recruitment-info">
              <h3 class="recruitment-title">동포비자 보유 인력 연결로<br/>채용절차가 간편합니다.</h3>
              
              <div class="recruitment-features">
                <div class="recruitment-feature">
                  <div class="feature-icon">✓</div>
                  <div class="feature-text">
                    <h4>검증된 인력만 매칭</h4>
                  </div>
                </div>
                <div class="recruitment-feature">
                  <div class="feature-icon">✓</div>
                  <div class="feature-text">
                    <h4>전국 단위의 고려인 구직자 풀 보유</h4>
                  </div>
                </div>
                <div class="recruitment-feature">
                  <div class="feature-icon">✓</div>
                  <div class="feature-text">
                    <h4>3일 이내 이력서 발송</h4>
                  </div>
                </div>
                <div class="recruitment-feature">
                  <div class="feature-icon">✓</div>
                  <div class="feature-text">
                    <h4>검증된 인력 정보를 온라인으로 제공</h4>
                  </div>
                </div>
              </div>
              
              <button class="recruitment-button">채용 문의하기</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="container">
          <p>&copy; 2026 경영인증평가원. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
})

export default app
