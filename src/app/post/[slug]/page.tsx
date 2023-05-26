import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Main } from '@/layout'
import { allPosts } from 'contentlayer/generated'
import { ArrowLeft } from 'react-feather'

import '@/styles/mdx.css'
import { absoluteUrl, cn, formatDate } from '@/lib/utils'
import { Mdx } from '@/components/Markdown'

import { env } from '../../../..//env.mjs'

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

  const url = env.NEXT_PUBLIC_APP_URL

  const ogUrl = new URL(`${url}/api/og`)
  ogUrl.searchParams.set('heading', page.title)
  ogUrl.searchParams.set('type', 'Blog Post')
  ogUrl.searchParams.set('mode', 'dark')

  return {
    title: page.title,
    description: `${page.title} - ${page.subtitle}`,
    openGraph: {
      title: page.title,
      description: page.subtitle,
      type: 'article',
      url: absoluteUrl(page.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
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
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="font-heading mt-2 inline-block text-3xl leading-tight md:text-4xl">
          {post.title}
        </h1>
      </div>
      {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-slate-100 transition-colors"
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
