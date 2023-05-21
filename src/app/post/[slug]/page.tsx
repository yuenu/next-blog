import path from 'node:path'
import fs from 'node:fs'
import Markdown from 'markdown-to-jsx'
import { getPostMetadata } from '@/utils'
import matter from 'gray-matter'
import { Main } from '@/layout'
import HeightLight from '@/components/HeightLight'
import Head from 'next/head'
import { Metadata, ResolvingMetadata } from 'next'

export async function generateMetadata(
  { params, searchParams }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const post = getPageContent(slug)

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: post.data.title + ' | Josh Hsu',
  }
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const getPageContent = (slug: string) => {
  const postsDirectory = path.join(process.cwd(), 'posts/')
  const file = `${postsDirectory}${slug}.md`
  const content = fs.readFileSync(file, 'utf-8')
  const matterResult = matter(content)
  return matterResult
}

export const generateStaticParams = async () => {
  const posts = getPostMetadata()
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
  }))
}

const PostPage = (props: Props) => {
  const slug = props.params.slug
  const post = getPageContent(slug)

  return (
    <>
      <Head>
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <Main className="post-details">
        <HeightLight />
        <h1 className="mb-2 text-3xl font-semibold">
          {post.data.title}
        </h1>
        <div className="mb-4">
          <time dateTime={post.data.date}>{post.data.date}</time>
        </div>
        <article className="post-content">
          <Markdown>{post.content}</Markdown>
        </article>
      </Main>
    </>
  )
}

export default PostPage
