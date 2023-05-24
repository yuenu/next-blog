'use client'

import { useEffect } from 'react'
import hljs from 'highlight.js'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import { useTheme } from 'next-themes'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.configure({
  ignoreUnescapedHTML: true,
})

export default function HeightLight() {
  const { theme } = useTheme()
  useEffect(() => {
    hljs.highlightAll()
    // document.querySelectorAll('pre code').forEach((el) => {
    //   hljs.highlightElement(el as HTMLElement)
    // })
  }, [])

  if (theme === 'light') {
    return <LightTheme />
  }

  if (theme === 'dark') {
    return <DarkTheme />
  }

  return null
}

function DarkTheme() {
  return (
    <style jsx global>
      {`
        .hljs {
          color: #abb2bf;
          background: #282c34;
        }

        .hljs-comment,
        .hljs-quote {
          color: #5c6370;
          font-style: italic;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
          color: #c678dd;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
          color: #e06c75;
        }

        .hljs-literal {
          color: #56b6c2;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta .hljs-string {
          color: #98c379;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
          color: #d19a66;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
          color: #61aeee;
        }

        .hljs-built_in,
        .hljs-title.class_,
        .hljs-class .hljs-title {
          color: #e6c07b;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }

        .hljs-link {
          text-decoration: underline;
        }
      `}
    </style>
  )
}

function LightTheme() {
  return (
    <style jsx global>
      {`
        .hljs {
          color: #383a42;
          background: #fafafa;
        }

        .hljs-comment,
        .hljs-quote {
          color: #a0a1a7;
          font-style: italic;
        }

        .hljs-doctag,
        .hljs-keyword,
        .hljs-formula {
          color: #a626a4;
        }

        .hljs-section,
        .hljs-name,
        .hljs-selector-tag,
        .hljs-deletion,
        .hljs-subst {
          color: #e45649;
        }

        .hljs-literal {
          color: #0184bb;
        }

        .hljs-string,
        .hljs-regexp,
        .hljs-addition,
        .hljs-attribute,
        .hljs-meta .hljs-string {
          color: #50a14f;
        }

        .hljs-attr,
        .hljs-variable,
        .hljs-template-variable,
        .hljs-type,
        .hljs-selector-class,
        .hljs-selector-attr,
        .hljs-selector-pseudo,
        .hljs-number {
          color: #986801;
        }

        .hljs-symbol,
        .hljs-bullet,
        .hljs-link,
        .hljs-meta,
        .hljs-selector-id,
        .hljs-title {
          color: #4078f2;
        }

        .hljs-built_in,
        .hljs-title.class_,
        .hljs-class .hljs-title {
          color: #c18401;
        }

        .hljs-emphasis {
          font-style: italic;
        }

        .hljs-strong {
          font-weight: bold;
        }

        .hljs-link {
          text-decoration: underline;
        }
      `}
    </style>
  )
}
