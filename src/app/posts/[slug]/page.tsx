import path from 'node:path'
import fs from 'node:fs'
import Markdown from 'markdown-to-jsx'
import { getPostMetadata } from '@/utils'
import matter from 'gray-matter'

type IPageProps = {
  params: { slug: string }
  searchParams: Record<string, string | undefined>
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

const PostPage = (props: IPageProps) => {
  const slug = props.params.slug
  const post = getPageContent(slug)
  return (
    <div>
      <h1>This is a post: {slug}</h1>
      <article className="prose lg:prose-xl">
        <Markdown>{post.content}</Markdown>
      </article>
    </div>
  )
}

export default PostPage
