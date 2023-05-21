'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { uppercaseFirstLetter } from '@/utils'
import { Sun, Moon } from 'react-feather'

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
            'flex flex-col px-3 py-1 border-2 border-gray-400 rounded-lg',
            'dark:border-amber-500'
          )}
          onClick={() =>
            setTheme(theme === 'light' ? 'dark' : 'light')
          }>
          {uppercaseFirstLetter('Loading...')}
        </button>
      </div>
    )
  }

  return (
    <div>
      <button
        className={clsx(
          'flex items-center',
          'hover:text-orange-400'
          // 'flex flex-col px-3 py-1 border-2 border-gray-400 rounded-lg',
          // 'dark:border-amber-500'
        )}
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }>
        {theme === 'light' ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}

export default ThemeSwitch
