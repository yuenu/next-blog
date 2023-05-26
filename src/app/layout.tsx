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
  subsets: ['greek'],
  variable: '--font-sans',
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
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: '@yuenu',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
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
        className={cn(
          'flex min-h-screen flex-col bg-background font-sans',
          sourceCodePro.variable
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
