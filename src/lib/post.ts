import fs from 'fs'
import path from 'path'
import { Post } from '@/types'
import matter from 'gray-matter'

export const getPostMetadata = (): Post[] => {
  const postsDirectory = path.join(process.cwd(), 'posts/')
  const postFiles = fs.readdirSync(postsDirectory)
  const markdownPosts = postFiles.filter((file) => file.endsWith('.md'))
  const posts = markdownPosts.map((fileName) => {
    const fileContents = fs.readFileSync(`${postsDirectory}${fileName}`, 'utf8')
    const matterResult = matter(fileContents)

    return {
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle,
      date: matterResult.data.date,
      hide: matterResult.data.hide,
      slug: fileName.replace('.md', ''),
    }
  })

  return posts
}
