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
      <div>
        <button
          aria-label="language switch"
          type="button"
          className={clsx(
            'flex flex-col rounded-lg border-2 border-gray-400 px-3 py-1',
            'dark:border-amber-500'
          )}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Loading...
        </button>
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
