import Link from 'next/link'
import clsx from 'clsx'
import { PostMetadata } from '@/types'

export const PostPreview = (post: PostMetadata) => {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={clsx(
        'aLink group',
        'px-4 mb-4 py-7 block',
        'border-2 hover:border-orange-400 border-transparent rounded-lg space-y-4'
      )}>
      <div className="flex justify-between">
        <h2 className="text-xl group-hover:text-orange-400">
          {post.title}
        </h2>
        <span className="text-gray-400 whitespace-nowrap">
          {post.date}
        </span>
      </div>
      <div className="opacity-70">{post.subtitle}</div>
    </Link>
  )
}
