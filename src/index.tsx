import { Hono } from 'hono'
import { renderer } from './renderer'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use(renderer)
app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.render(
    <div>
      {/* Header with Navigation */}
      <header class="header">
        <div class="container">
          <div class="header-content">
            <div class="logo-container">
              <svg class="logo" width="45" height="45" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" rx="20" fill="#1e40af"/>
                <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white"/>
                <circle cx="50" cy="50" r="8" fill="#1e40af"/>
              </svg>
              <div class="logo-text">
                <h1>경영인증평가원</h1>
                <p>Management Certification Institute</p>
              </div>
            </div>
            <nav class="nav">
              <a href="#intro">기관소개</a>
              <a href="#companies">인증업체</a>
              <a href="#rfq">견적요청</a>
              <a href="#contact">문의하기</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section class="hero-section">
        <div class="container">
          <h1 class="hero-title">신뢰할 수 있는 제조 파트너</h1>
          <p class="hero-subtitle">경영인증평가원이 검증한 우수 제조업체와 함께하세요</p>
          <div class="hero-buttons">
            <a href="#rfq" class="hero-button primary">견적 요청하기</a>
            <a href="#companies" class="hero-button secondary">인증업체 보기</a>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="intro" class="intro-section">
        <div class="container">
          <h2 class="section-title">경영인증평가원</h2>
          <p class="section-description">
            경영인증평가원은 제조업체의 품질, 기술력, 신뢰도를 엄격하게 평가하여 인증합니다.<br/>
            인증된 업체는 우수한 제조 능력과 관리 시스템을 갖추고 있으며, 안심하고 거래할 수 있습니다.
          </p>
          
          <div class="intro-cards">
            <div class="intro-card">
              <div class="intro-icon">🏆</div>
              <h3>엄격한 인증 기준</h3>
              <p>품질 관리, 생산 능력, 재무 건전성 등 다각도로 평가합니다</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">✓</div>
              <h3>검증된 업체</h3>
              <p>인증을 통과한 우수 제조업체만 등록됩니다</p>
            </div>
            <div class="intro-card">
              <div class="intro-icon">🤝</div>
              <h3>신뢰할 수 있는 거래</h3>
              <p>안전하고 투명한 거래 환경을 제공합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certified Companies Section */}
      <section id="companies" class="companies-section">
        <div class="container">
          <h2 class="section-title">인증 업체</h2>
          <p class="section-subtitle">경영인증평가원이 검증한 우수 제조업체</p>
          
          <div class="companies-grid">
            <div class="company-card">
              <div class="company-badge">인증</div>
              <h3>(주)정밀기계</h3>
              <p class="company-category">정밀 가공 · CNC 가공</p>
              <ul class="company-features">
                <li>5축 CNC 가공</li>
                <li>금속/플라스틱 가공</li>
                <li>시제품 제작</li>
              </ul>
              <button class="company-button">견적 요청</button>
            </div>

            <div class="company-card">
              <div class="company-badge">인증</div>
              <h3>(주)금형산업</h3>
              <p class="company-category">금형 제작 · 사출 성형</p>
              <ul class="company-features">
                <li>정밀 금형 설계/제작</li>
                <li>플라스틱 사출</li>
                <li>대량 생산</li>
              </ul>
              <button class="company-button">견적 요청</button>
            </div>

            <div class="company-card">
              <div class="company-badge">인증</div>
              <h3>(주)판금기술</h3>
              <p class="company-category">판금 · 용접</p>
              <ul class="company-features">
                <li>레이저 커팅</li>
                <li>절곡/성형</li>
                <li>용접 조립</li>
              </ul>
              <button class="company-button">견적 요청</button>
            </div>

            <div class="company-card">
              <div class="company-badge">인증</div>
              <h3>(주)표면처리</h3>
              <p class="company-category">표면처리 · 도금</p>
              <ul class="company-features">
                <li>양극산화</li>
                <li>전기도금</li>
                <li>분체도장</li>
              </ul>
              <button class="company-button">견적 요청</button>
            </div>

            <div class="company-card">
              <div class="company-badge">인증</div>
              <h3>(주)주조기술</h3>
              <p class="company-category">주조 · 단조</p>
              <ul class="company-features">
                <li>알루미늄 주조</li>
                <li>정밀 주조</li>
                <li>열간단조</li>
              </ul>
              <button class="company-button">견적 요청</button>
            </div>

            <div class="company-card">
              <div class="company-badge">인증</div>
              <h3>(주)조립제작</h3>
              <p class="company-category">조립 · 완제품</p>
              <ul class="company-features">
                <li>제품 조립</li>
                <li>OEM/ODM 생산</li>
                <li>포장/출하</li>
              </ul>
              <button class="company-button">견적 요청</button>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ Section */}
      <section id="rfq" class="rfq-section">
        <div class="container">
          <h2 class="section-title">견적 요청하기</h2>
          <p class="section-subtitle">인증 업체에 견적을 요청하고 최적의 파트너를 찾으세요</p>
          
          <div class="rfq-form-container">
            <form class="rfq-form" id="rfqForm">
              {/* 기본정보 */}
              <div class="form-section">
                <h3>기본정보</h3>
                
                <div class="form-group">
                  <label>프로젝트 이름 <span class="required">*</span></label>
                  <input type="text" name="projectName" placeholder="예) 로봇 부품 제작 프로젝트" required />
                  <span class="form-hint">0/30</span>
                </div>

                <div class="form-group">
                  <label>회사명 <span class="required">*</span></label>
                  <input type="text" name="companyName" placeholder="회사명을 입력하세요" required />
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label>담당자명 <span class="required">*</span></label>
                    <input type="text" name="contactName" placeholder="이름" required />
                  </div>
                  <div class="form-group">
                    <label>연락처 <span class="required">*</span></label>
                    <input type="tel" name="phone" placeholder="010-0000-0000" required />
                  </div>
                </div>

                <div class="form-group">
                  <label>이메일 <span class="required">*</span></label>
                  <input type="email" name="email" placeholder="email@example.com" required />
                </div>
              </div>

              {/* 제조 서비스 */}
              <div class="form-section">
                <h3>제조 서비스 선택 <span class="required">*</span></h3>
                
                <div class="service-categories">
                  <div class="service-category">
                    <h4>제품개발/부품제조</h4>
                    <div class="service-items">
                      <label class="service-item">
                        <input type="checkbox" name="service" value="원스톱 제품개발" />
                        <span>원스톱 제품개발</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="기구설계" />
                        <span>기구설계</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="제품 디자인" />
                        <span>제품 디자인</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="3D프린팅" />
                        <span>3D프린팅</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="절삭(CNC)" />
                        <span>절삭(CNC)</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="판금" />
                        <span>판금</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="프레스" />
                        <span>프레스</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="금형/사출 성형" />
                        <span>금형/사출 성형</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="주조" />
                        <span>주조</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="단조" />
                        <span>단조</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="용접" />
                        <span>용접</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="열처리" />
                        <span>열처리</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="표면처리" />
                        <span>표면처리</span>
                      </label>
                    </div>
                  </div>

                  <div class="service-category">
                    <h4>완제품/위탁생산</h4>
                    <div class="service-items">
                      <label class="service-item">
                        <input type="checkbox" name="service" value="조립" />
                        <span>조립</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="OEM 생산" />
                        <span>OEM 생산</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="ODM 생산" />
                        <span>ODM 생산</span>
                      </label>
                      <label class="service-item">
                        <input type="checkbox" name="service" value="포장" />
                        <span>포장</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 상세 정보 */}
              <div class="form-section">
                <h3>상세 정보</h3>
                
                <div class="form-group">
                  <label>수량</label>
                  <input type="number" name="quantity" placeholder="예) 1000" />
                </div>

                <div class="form-group">
                  <label>희망 납기</label>
                  <input type="date" name="deadline" />
                </div>

                <div class="form-group">
                  <label>도면 및 사양서</label>
                  <div class="file-upload">
                    <input type="file" id="fileUpload" multiple accept=".pdf,.dwg,.dxf,.stp,.step,.jpg,.png" />
                    <label for="fileUpload" class="file-upload-label">
                      <span>📎 파일 첨부</span>
                      <span class="file-hint">PDF, DWG, DXF, STP, STEP, 이미지 파일</span>
                    </label>
                  </div>
                </div>

                <div class="form-group">
                  <label>상세 요청사항</label>
                  <textarea name="details" rows="6" placeholder="제작하고자 하는 제품의 상세 사양, 재질, 마감 처리, 기타 요구사항을 자세히 작성해주세요."></textarea>
                </div>
              </div>

              {/* 제출 버튼 */}
              <div class="form-actions">
                <button type="button" class="form-button secondary">임시 저장</button>
                <button type="submit" class="form-button primary">견적 요청 발송</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" class="contact-section">
        <div class="container">
          <h2 class="section-title">문의하기</h2>
          <div class="contact-info">
            <div class="contact-item">
              <h4>📞 전화</h4>
              <p>02-1234-5678</p>
            </div>
            <div class="contact-item">
              <h4>📧 이메일</h4>
              <p>info@mce.re.kr</p>
            </div>
            <div class="contact-item">
              <h4>🕐 운영시간</h4>
              <p>평일 09:00 - 18:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="footer">
        <div class="container">
          <div class="footer-content">
            <div class="footer-info">
              <div class="footer-logo">
                <svg width="35" height="35" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="20" fill="white" opacity="0.1"/>
                  <path d="M30 50 L50 30 L70 50 L50 70 Z" fill="white" opacity="0.8"/>
                  <circle cx="50" cy="50" r="8" fill="white"/>
                </svg>
                <span>경영인증평가원</span>
              </div>
              <p class="footer-text">Management Certification Institute</p>
              <p class="footer-copyright">&copy; 2026 경영인증평가원. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
})

export default app
