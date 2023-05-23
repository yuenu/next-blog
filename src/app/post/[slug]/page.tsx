// import path from 'node:path'
// import fs from 'node:fs'

import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Main } from '@/layout'
import { allPosts } from 'contentlayer/generated'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'

import HeightLight from '@/components/HeightLight'

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

// const getPageContent = (slug: string) => {
//   const postsDirectory = path.join(process.cwd(), 'posts/')
//   const file = `${postsDirectory}${slug}.md`
//   const content = fs.readFileSync(file, 'utf-8')
//   const matterResult = matter(content)
//   return matterResult
// }

export const generateStaticParams = async () => {
  return allPosts.map((page) => ({
    slug: page.slug,
  }))
}

const PostPage = async (props: PageProps) => {
  const post = await getPageFromParams(props)

  if (!post) {
    return notFound()
  }

  const parsedDate = format(new Date(post.date), 'yyyy/MM/dd')

  return (
    <Main className="post-details">
      <HeightLight />
      <h1 className="post-title mb-3 text-3xl font-semibold">{post.title}</h1>
      <div className="mb-4">
        <time dateTime={parsedDate}>{parsedDate}</time>
      </div>
      <p className="mb-10 italic opacity-70">{post.subtitle}</p>
      <article className="post-content">
        <Markdown
          options={{
            overrides: {
              img: {
                component: Image,
                props: {
                  width: 786,
                  height: 500,
                  className: 'w-full object-cover',
                  priority: false,
                },
              },
              ul: {
                props: {
                  className: 'space-y-2',
                },
              },
            },
          }}
        >
          {post.body.raw}
        </Markdown>
      </article>
    </Main>
  )
}

export default PostPage
