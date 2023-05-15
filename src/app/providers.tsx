'use client'

import { ThemeProvider } from 'next-themes'

type IProps = {
  children: React.ReactNode
}

export function Providers({ children }: IProps) {
  return (
    <ThemeProvider attribute="class" enableSystem={true}>
      {children}
    </ThemeProvider>
  )
}
