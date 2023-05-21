import '@/assets/styles/globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Source_Code_Pro } from 'next/font/google'
import { Providers } from './providers'
import { Header, Footer } from '@/components'
import ProgressBar from '@/components/ProgressBar'
import Script from 'next/script'

const sourceCodePro = Source_Code_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['greek'],
})

export const metadata: Metadata = {
  title: 'Josh Hsu',
  description: '分享各種前端技術，React、Redux、Vue',
  authors: {
    name: 'Josh Hsu',
    url: 'https://www.josh-hsu.com/',
  },
  verification: {
    google: 'KZBb0S0rhul6XzJAVOnwGLIjaMU90vfBR5-cdW5Y0iQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-MJE37S0CFV"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-MJE37S0CFV');
        `}
      </Script>
      <body
        className={clsx(
          sourceCodePro.className,
          'min-h-screen flex flex-col bg-gray-100 dark:bg-[#121212]'
        )}>
        <Providers>
          <Header />
          <ProgressBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
