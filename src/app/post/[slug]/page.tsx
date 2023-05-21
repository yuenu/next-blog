import path from 'node:path'
import fs from 'node:fs'
import Markdown from 'markdown-to-jsx'
import { getPostMetadata } from '@/utils'
import matter from 'gray-matter'
import { Main } from '@/layout'
import HeightLight from '@/components/HeightLight'
import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'

export async function generateMetadata(
  props: Props,
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const slug = props.params.slug
  const post = getPageContent(slug)
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
  }))
}

const PostPage = (props: Props) => {
  const slug = props.params.slug
  const post = getPageContent(slug)

  return (
    <>
      <Main className="post-details">
        <HeightLight />
        <h1 className="mb-3 text-3xl font-semibold">
          {post.data.title}
        </h1>
        <div className="mb-4">
          <time dateTime={post.data.date}>{post.data.date}</time>
        </div>
        <p className="mb-10 opacity-70">{post.data.subtitle}</p>
        <article className="post-content">
          <Markdown
            options={{
              overrides: {
                img: {
                  component: Image,
                  props: {
                    width: 786,
                    height: 500,
                    class: 'w-full object-cover',
                  },
                },
              },
            }}>
            {post.content}
          </Markdown>
        </article>
      </Main>
    </>
  )
}

export default PostPage
