import '@/assets/styles/globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Source_Code_Pro } from 'next/font/google'
import { Providers } from './providers'
import { Header, Footer } from '@/components'
import ProgressBar from '@/components/ProgressBar'

const sourceCodePro = Source_Code_Pro({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['greek'],
})

export const metadata: Metadata = {
  title: 'Josh Hsu',
  description: '',
  authors: {
    name: 'Josh Hsu',
    url: '',
  },
  verification: {
    google: '',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
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
