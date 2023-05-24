export type Post = {
  title: string
  subtitle: string
  date: string
  slug: string
  hide?: boolean
  tags?: string
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  keywords: string[]
  ogImage: string
  links: {
    github: string
  }
  googleVerication: string
}
