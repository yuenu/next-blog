import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Main } from '@/layout'
import { allPosts } from 'contentlayer/generated'
import { format } from 'date-fns'
import { ArrowLeft } from 'react-feather'

import '@/styles/mdx.css'
import { cn } from '@/lib/utils'
import { Mdx } from '@/components/Markdown'

async function getPageFromParams(props: PageProps) {
  const slugAsParams = props.params?.slug
  const page = allPosts.find((post) => post.slug === slugAsParams)

  if (!page) {
    null
  }

  return page
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(props)

  if (!page) {
    return {}
  }

  return {
    title: page.title,
  }
}

type PageProps = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const generateStaticParams = async () => {
  return allPosts.map((page) => ({
    slug: page.slug,
  }))
}

const PostPage = async (props: PageProps) => {
  const post = await getPageFromParams(props)

  if (!post) {
    notFound()
  }

  const parsedDate = format(new Date(post.date), 'yyyy/MM/dd')

  return (
    <Main className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/posts"
        className={cn(
          'aLink absolute left-[-200px] top-14 hidden items-center rounded-md px-4 py-2 xl:inline-flex',
          'hover:bg-accent'
        )}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time dateTime={post.date} className="block text-sm text-gray-400">
            Published on {parsedDate}
          </time>
        )}
        <h1 className="font-heading mt-2 inline-block text-2xl leading-tight lg:text-4xl">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="bg-muted my-8 rounded-md border transition-colors"
          priority
        />
      )}
      <Mdx code={post.body.code} />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/posts"
          className={cn(
            'aLink flex items-center gap-2 rounded-md px-4 py-2',
            'hover:bg-accent'
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </Main>
  )
}

export default PostPage
