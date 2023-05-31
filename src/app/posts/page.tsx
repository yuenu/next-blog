import type { Metadata } from 'next'
import Link from 'next/link'
import { Main } from '@/layout'
import { allPosts, type Post } from 'contentlayer/generated'
import { compareDesc } from 'date-fns'

import { cn, formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Posts',
}

const PostPreview = (post: Post) => {
  return (
    <Link
      href={`/post/${post.slug}`}
      className={cn(
        'aLink group',
        'mb-4 block px-4 py-7',
        'space-y-4 rounded-lg border-2 border-transparent hover:border-orange-400'
      )}
    >
      <div className="flex justify-between gap-2">
        <h2 className="text-xl group-hover:text-orange-400">{post.title}</h2>
        <time className="whitespace-nowrap text-gray-400" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </div>
      <div className="italic opacity-70">{post.subtitle}</div>
    </Link>
  )
}

export default function PostsPage() {
  return (
    <Main className="mx-auto mt-10 w-full max-w-3xl">
      <div>
        {allPosts
          .filter((post) => post.published)
          .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
          .map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
      </div>
    </Main>
  )
}
