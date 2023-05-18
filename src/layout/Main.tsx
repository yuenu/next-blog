import { ReactNode } from 'react'
import clsx from 'clsx'

type Props = {
  className?: string
  children: ReactNode
}

export const Main = ({ className, children }: Props) => {
  return (
    <main className={clsx('max-w-3xl mx-auto mt-10', className)}>
      {children}
    </main>
  )
}
