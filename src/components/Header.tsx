import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import clsx from 'clsx'

export const Header = ({ ...rest }) => {
  return (
    <header {...rest}>
      <div className={clsx('flex justify-between p-4', 'md:p-6')}>
        <Link href="/">
          <h1 className="text-3xl font-bold">Josh Hsu</h1>
        </Link>
        <div className={clsx('flex items-center gap-8')}>
          <Link href="/posts" className="hover:text-orange-400">
            Posts
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
