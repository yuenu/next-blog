import Link from 'next/link'
import { PostMetadata } from '@/types'

export const PostPreview = (post: PostMetadata) => {
  return (
    <div className="p-3 text-white rounded-lg bg-indigo-950">
      <Link href={`/posts/${post.slug}`}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.subtitle}</p>
      <p>{post.date}</p>
    </div>
  )
}
