import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>기업지원-경인평</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%232563eb%22/><path d=%22M20 80 L20 20 L80 20 L80 80 L65 80 L65 50 L35 50 L35 80 Z%22 fill=%22white%22/></svg>" />
        <meta name="description" content="기업 인증, 평가, 매칭 솔루션 전문 기관" />
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
        <script defer src="/static/app.js"></script>
      </head>
      <body>
        {children}
      </body>
    </html>
  )
})