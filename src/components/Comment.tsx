'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'

export const Comment = () => {
  const { theme } = useTheme()

  return (
    <div id="comments" className="mt-10">
      <Giscus
        repo="yuenu/next-blog"
        repoId="R_kgDOJhnQ4w"
        categoryId="DIC_kwDOJhnQ484CWyYs"
        mapping="og:title"
        term="Welcome to My blog"
        reactionsEnabled="1"
        strict="0"
        emitMetadata="0"
        inputPosition="top"
        theme={theme}
        lang="zh-TW"
        loading="lazy"
      />
    </div>
  )
}
