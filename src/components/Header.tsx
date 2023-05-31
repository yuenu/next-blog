import Link from 'next/link'

import { cn } from '@/lib/utils'

import ThemeSwitch from './ThemeSwitch'

export const Header = ({ ...rest }) => {
  return (
    <header {...rest}>
      <div className={cn('flex justify-between p-4', 'md:p-6')}>
        <Link href="/" className="aLink">
          <h1 className="text-3xl font-bold">Josh Hsu</h1>
        </Link>
        <div className={cn('aLink', 'flex items-center gap-8')}>
          <Link href="/posts" className={cn('hover:text-orange-400')}>
            Posts
          </Link>
          <Link
            href="/atom.xml"
            className={cn('hover:text-orange-400', 'hidden sm:block')}
          >
            RSS
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
