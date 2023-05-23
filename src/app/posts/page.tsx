import type { Metadata } from 'next'
import { PostPreview } from '@/components'
import { Main } from '@/layout'
import { allPosts } from 'contentlayer/generated'

export const metadata: Metadata = {
  title: 'Posts | Josh Hsu',
}

export default function BlogPage() {
  return (
    <Main className="mx-auto mt-10 w-full max-w-3xl">
      <div>
        {allPosts
          .filter((post) => post.published)
          .map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
      </div>
    </Main>
  )
}
