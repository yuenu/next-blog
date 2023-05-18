import Link from 'next/link'
import { ThemeSwitch } from './ThemeSwitch'

export const Header = ({ ...rest }) => {
  return (
    <header {...rest}>
      <div className="flex justify-between p-6">
        <Link href="/">
          <h1 className="text-2xl font-bold">Josh Hsu</h1>
        </Link>
        <div>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
