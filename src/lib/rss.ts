import { writeFileSync } from 'fs'
import path from 'path'
import { allPosts } from 'contentlayer/generated'
import { compareDesc, parseISO } from 'date-fns'
import { Feed } from 'feed'

import { siteConfig } from '@/config/site'

export const generateRSS = () => {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'zh',
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Josh Hsu`,
    author: {
      name: siteConfig.name,
      link: siteConfig.url,
    },
  })

  allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((post) => {
      const url = `${siteConfig.url}/posts/${post.slug}`
      feed.addItem({
        id: url,
        link: url,
        title: post.title,
        description: post.title,
        date: parseISO(post.date),
        category: post.tags.split('/').map((name) => ({ name })),
        image: post.image,
        author: [
          {
            name: siteConfig.name,
            link: siteConfig.url,
          },
        ],
      })
    })

  writeFileSync('./public/rss.xml', feed.atom1())
  writeFileSync('./public/atom.xml', feed.atom1())
  writeFileSync('./public/feed.json', feed.json1())
}
