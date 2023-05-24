'use client'

import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'react-feather'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div role="status" className="max-w-sm animate-pulse ">
        <div className="h-6 w-6 rounded-lg bg-gray-200 dark:bg-zinc-800"></div>
      </div>
    )
  }

  return (
    <div>
      <button
        aria-label="language switch"
        className={clsx('flex items-center', 'hover:text-orange-400')}
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}

export default ThemeSwitch
