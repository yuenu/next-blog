import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  children: ReactNode
}

export const Main = ({ className, children }: Props) => {
  return (
    <main className={clsx('relative my-10 max-w-3xl py-6 lg:py-10', className)}>
      {children}
    </main>
  )
}
