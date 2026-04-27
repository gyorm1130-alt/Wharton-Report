import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta property="og:title" content="와튼영어스쿨 AI 월말 리포트 생성기"/>
        <meta property="og:description" content="학생 이름과 등급만 입력하면 AI가 30초 만에 완성!"/>
        <meta property="og:image" content="https://raw.githubusercontent.com/gyorm1130-alt/Wharton-Report/main/og-image.png"/>
        <meta property="og:url" content="https://wharton-report.vercel.app"/>
        <meta property="og:type" content="website"/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
