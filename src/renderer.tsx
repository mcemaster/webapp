import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title id="page-title">MCE 경영인증평가원 | 기업 맞춤 정부지원사업 AI 매칭</title>
        <link rel="icon" href="/static/mce-symbol.png" />
        <meta id="meta-description" name="description" content="AI 기반 기업 맞춤형 정부지원사업 매칭, ISO 인증, 공급사 찾기 서비스를 제공합니다." />
        <meta id="meta-keywords" name="keywords" content="정부지원사업, ISO인증, 기업평가, AI매칭, 경영컨설팅" />
        
        {/* Open Graph Tags */}
        <meta id="og-title" property="og:title" content="MCE 경영인증평가원" />
        <meta id="og-description" property="og:description" content="AI 기반 기업 맞춤형 정부지원사업 매칭 서비스" />
        <meta id="og-image" property="og:image" content="https://www.mce.ai.kr/static/og-image.png" />
        <meta property="og:type" content="website" />
        <meta id="og-url" property="og:url" content="https://www.mce.ai.kr" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta id="twitter-title" name="twitter:title" content="MCE 경영인증평가원" />
        <meta id="twitter-description" name="twitter:description" content="AI 기반 기업 맞춤형 정부지원사업 매칭 서비스" />
        
        {/* Canonical */}
        <link id="canonical" rel="canonical" href="https://www.mce.ai.kr" />
        
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: '#0f172a',
                    secondary: '#334155',
                    accent: '#2563eb',
                  },
                  fontFamily: {
                    sans: ['Pretendard', 'Noto Sans KR', 'Malgun Gothic', 'sans-serif'],
                  },
                  animation: {
                    'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
                  },
                  keyframes: {
                    fadeInUp: {
                      '0%': { opacity: '0', transform: 'translateY(20px)' },
                      '100%': { opacity: '1', transform: 'translateY(0)' },
                    }
                  }
                }
              }
            }
          `
        }} />
        <link href="/static/style.css" rel="stylesheet" />
        <script src="/static/js/core.js"></script>
        <script defer src="/static/app.js"></script>
        
        {/* Dynamic SEO Loading Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Load dynamic SEO settings from database
            (async function loadSeoMeta() {
              try {
                const res = await fetch('/api/seo/meta');
                if (!res.ok) return;
                const meta = await res.json();
                
                // Update page title
                if (meta.title) {
                  document.getElementById('page-title').textContent = meta.title;
                }
                
                // Update meta description
                if (meta.description) {
                  document.getElementById('meta-description').content = meta.description;
                }
                
                // Update meta keywords
                if (meta.keywords) {
                  document.getElementById('meta-keywords').content = meta.keywords;
                }
                
                // Update Open Graph tags
                if (meta.og_title) {
                  document.getElementById('og-title').content = meta.og_title;
                  document.getElementById('twitter-title').content = meta.og_title;
                }
                if (meta.og_description) {
                  document.getElementById('og-description').content = meta.og_description;
                  document.getElementById('twitter-description').content = meta.og_description;
                }
                if (meta.og_image) {
                  document.getElementById('og-image').content = meta.og_image;
                }
                if (meta.url) {
                  document.getElementById('og-url').content = meta.url;
                  document.getElementById('canonical').href = meta.url;
                }
                
                // Add Schema.org structured data
                if (meta.company_name) {
                  const schema = {
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    'name': meta.company_name,
                    'url': meta.url || 'https://www.mce.ai.kr',
                    'telephone': meta.phone || '',
                    'email': meta.email || '',
                    'address': {
                      '@type': 'PostalAddress',
                      'streetAddress': meta.address || ''
                    }
                  };
                  
                  const scriptEl = document.createElement('script');
                  scriptEl.type = 'application/ld+json';
                  scriptEl.textContent = JSON.stringify(schema);
                  document.head.appendChild(scriptEl);
                }
              } catch(e) {
                console.log('SEO meta load error:', e);
              }
            })();
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
})
