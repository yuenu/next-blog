'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { uppercaseFirstLetter } from '@/utils'

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
          'flex flex-col px-3 py-1 border-2 border-gray-400 rounded-lg',
          'dark:border-amber-500'
        )}
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }>
        {uppercaseFirstLetter(theme || 'Loading...')}
      </button>
    </div>
  )
}

export default ThemeSwitch
