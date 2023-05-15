import { getPostMetadata } from '@/utils'
import { PostPreview } from '@/components'

export default function Home() {
  const postMetadata = getPostMetadata()
  return (
    <main>
      <div>
        {postMetadata.map((post) => (
          <PostPreview key={post.slug} {...post} />
        ))}
      </div>
    </main>
  )
}
