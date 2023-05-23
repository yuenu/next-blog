import { getPostMetadata } from '@/utils'
import { PostPreview } from '@/components'
import { Main } from '@/layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Posts | Josh Hsu',
}

export default function BlogPage() {
  const postMetadata = getPostMetadata()
  return (
    <Main className="mx-auto mt-10 w-full max-w-3xl">
      <div>
        {postMetadata
          .filter((post) => !post.hide)
          .map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
      </div>
    </Main>
  )
}
