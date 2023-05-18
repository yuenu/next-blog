'use client'

import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useTheme } from 'next-themes'
import { uppercaseFirstLetter } from '@/utils'

export const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <button
        className={clsx(
          'flex flex-col px-3 py-1 border-2 border-gray-400 rounded-lg',
          'dark:border-x-amber-500'
        )}
        onClick={() =>
          setTheme(theme === 'light' ? 'dark' : 'light')
        }>
        {uppercaseFirstLetter(theme)}
      </button>
    </div>
  )
}
