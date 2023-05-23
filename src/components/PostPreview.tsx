import Link from 'next/link'
import clsx from 'clsx'
import type { Post } from 'contentlayer/generated'

export const PostPreview = (post: Post) => {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={clsx(
        'aLink group',
        'mb-4 block px-4 py-7',
        'space-y-4 rounded-lg border-2 border-transparent hover:border-orange-400'
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-xl group-hover:text-orange-400">{post.title}</h2>
        <span className="whitespace-nowrap text-gray-400">{post.date}</span>
      </div>
      <div className="italic opacity-70">{post.subtitle}</div>
    </Link>
  )
}
