import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'

export const Header = ({ ...rest }) => {
  return (
    <header {...rest}>
      <div className="flex justify-between p-6">
        <Link href="/">
          <h1 className="text-3xl font-bold">Josh Hsu</h1>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/project" className="hover:text-red-500">
            Project
          </Link>
          <Link href="/blog" className="hover:text-red-500">
            Blog
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
