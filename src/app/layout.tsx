import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Source_Code_Pro } from 'next/font/google'
import Head from 'next/head'
import Script from 'next/script'
import { Footer, Header } from '@/components'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import ProgressBar from '@/components/ProgressBar'

import { ThemeProvider } from './providers'

const sourceCodePro = Source_Code_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['greek'],
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: {
    name: siteConfig.name,
    url: 'https://www.josh-hsu.com/',
  },
  creator: siteConfig.name,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  verification: {
    google: siteConfig.googleVerication,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <Head>
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
      </Head>
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
        className={cn(
          sourceCodePro.className,
          'flex min-h-screen flex-col bg-background'
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <ProgressBar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
