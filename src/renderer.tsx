import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>경영인증평가원 - 제조를 잇다</title>
        <meta name="description" content="경영인증평가원은 제조의 수요와 공급을 온라인으로 연결합니다" />
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
})
