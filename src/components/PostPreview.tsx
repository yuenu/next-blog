import Link from 'next/link'
import clsx from 'clsx'
import { PostMetadata } from '@/types'

export const PostPreview = (post: PostMetadata) => {
  return (
    <div className="px-4 mb-4 border-2 border-gray-500 py-7">
      <Link
        href={`/posts/${post.slug}`}
        className={clsx(
          'text-2xl underline underline-offset-2',
          'hover:text-indigo-700'
        )}>
        <h2>{post.title}</h2>
      </Link>
      <p>{post.date}</p>
    </div>
  )
}
