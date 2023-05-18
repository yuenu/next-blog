import { getPostMetadata } from '@/utils'
import { PostPreview } from '@/components'
import { Main } from '@/layout'

export default function Home() {
  const postMetadata = getPostMetadata()
  return (
    <Main className="max-w-3xl mx-auto mt-10">
      <div className="space-y-3">
        {postMetadata.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </Main>
  )
}
