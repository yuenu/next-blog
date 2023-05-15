import path from 'node:path'
import fs from 'node:fs'
import matter from 'gray-matter'
import { PostMetadata } from '@/types'

export const getPostMetadata = (): PostMetadata[] => {
  const postsDirectory = path.join(process.cwd(), 'posts/')
  const postFiles = fs.readdirSync(postsDirectory)
  const markdownPosts = postFiles.filter((file) =>
    file.endsWith('.md')
  )
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(
      `${postsDirectory}${fileName}`,
      'utf8'
    )
    const matterResult = matter(fileContents)

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: fileName.replace('.md', ''),
    }
  })

  return posts
}