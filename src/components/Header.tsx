import Link from 'next/link'
import { ThemeSwitch } from './ThemeSwitch'

export const Header = ({ ...rest }) => {
  return (
    <header {...rest}>
      <div className="flex justify-between p-6">
        <Link href="/">
          <h1>Josh&apos;s blog</h1>
        </Link>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
