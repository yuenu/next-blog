import Link from 'next/link'
import type { Post } from 'contentlayer/generated'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'

export const PostPreview = (post: Post) => {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={cn(
        'aLink group',
        'mb-4 block px-4 py-7',
        'space-y-4 rounded-lg border-2 border-transparent hover:border-orange-400'
      )}
    >
      <div className="flex justify-between">
        <h2 className="text-xl group-hover:text-orange-400">{post.title}</h2>
        <span className="whitespace-nowrap text-gray-400">
          {format(new Date(post.date), 'yyyy/MM/dd')}
        </span>
      </div>
      <div className="italic opacity-70">{post.subtitle}</div>
    </Link>
  )
}
