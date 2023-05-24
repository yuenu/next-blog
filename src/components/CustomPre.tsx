'use client'

import { useEffect, useRef, useState } from 'react'

import { copyToClipboard, removeDuplicateNewLine } from '@/lib/copy'
import { cn } from '@/lib/utils'

type Props = React.ComponentPropsWithoutRef<'pre'>

function CustomPre({ children, className, ...props }: Props) {
  const preRef = useRef<HTMLPreElement>(null)

  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000)

    return () => clearTimeout(timer)
  }, [copied])

  const onClick = async () => {
    console.log('213')
    if (preRef.current?.innerText) {
      await copyToClipboard(removeDuplicateNewLine(preRef.current.innerText))
      setCopied(true)
    }
  }

  return (
    <div className="group relative">
      <pre
        {...props}
        ref={preRef}
        className={cn(
          className,
          'focus:outline-none',
          'mb-4 mt-6 overflow-x-auto rounded-lg border bg-gray-800 py-4 dark:bg-black'
        )}
      >
        <div className="absolute right-0 top-0 z-10 m-2 flex items-center rounded-md bg-[#282a36] dark:bg-[#262626]">
          <span
            className={cn('hidden px-2 text-xs text-green-400 ease-in', {
              'group-hover:flex': copied,
            })}
          >
            Copy！
          </span>

          <button
            type="button"
            aria-label="Copy to Clipboard"
            onClick={onClick}
            disabled={copied}
            className={cn(
              'hidden rounded-md border bg-transparent p-2 transition ease-in focus:outline-none group-hover:flex',
              {
                'border-green-400': copied,
                'border-gray-600 hover:border-gray-400 focus:ring-4 focus:ring-gray-200/50 dark:border-gray-700 dark:hover:border-gray-400':
                  !copied,
              }
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn('pointer-events-none h-4 w-4', {
                'text-gray-400 dark:text-gray-400': !copied,
                'text-green-400': copied,
              })}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                className={cn({ block: !copied, hidden: copied })}
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
                className={cn({ block: copied, hidden: !copied })}
              />
            </svg>
          </button>
        </div>

        {children}
      </pre>
    </div>
  )
}

export default CustomPre
