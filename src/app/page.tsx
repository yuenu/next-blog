import { getPostMetadata } from '@/utils'
import { PostPreview } from '@/components'
import { Main } from '@/layout'

export default function Home() {
  const postMetadata = getPostMetadata()
  return (
    <Main className="w-full max-w-3xl mx-auto mt-10">
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
