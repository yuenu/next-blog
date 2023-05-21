import clsx from 'clsx'
import Link from 'next/link'
import { Main } from '@/layout'
import { getPostMetadata } from '@/utils'
import { BookOpen, GitHub, Linkedin } from 'react-feather'
import React from 'react'

function Info() {
  return (
    <div>
      <p className="text-[#8c8c8c] mb-1">Hi, I&apos;m </p>
      <h1 className="mb-8 text-4xl text-orange-400">Josh Hsu</h1>
      <p>
        I am a front-end engineer, And eager to learn new web
        techniques.
      </p>
      <div
        id="soical"
        className={clsx(
          'flex items-center gap-3 my-10 flex-wrap',
          'sm:flex-auto'
        )}>
        <Link
          href="/posts"
          className={clsx(
            'aLink',
            'flex items-center gap-2 px-4 py-2 bg-orange-400 border-2 border-orange-400 rounded-lg text-white',
            'w-full sm:w-auto'
          )}>
          <BookOpen /> Read my posts
        </Link>
        <a
          target="_blank"
          rel="noopener"
          href="https://github.com/yuenu"
          title="Link to my GitHub profile"
          className={clsx(
            'flex items-center gap-2 px-4 py-2 text-orange-400 border-2 border-orange-400 rounded-lg',
            'hover:bg-[#fb923c17] hover: dark:hover:bg-[#343434]',
            'flex-1 sm:flex-none'
          )}>
          <GitHub />
          GitHub
        </a>
        <a
          target="_blank"
          rel="noopener"
          href="https://www.linkedin.com/in/josh-hsu-yuenu/"
          title="Link to my LinkedIn profile"
          className={clsx(
            'flex items-center gap-2 px-4 py-2 text-orange-400 border-2 border-orange-400 rounded-lg',
            'hover:bg-[#fb923c17] dark:hover:bg-[#343434]',
            'flex-1 sm:flex-none'
          )}>
          <Linkedin />
          LinkedIn
        </a>
      </div>
    </div>
  )
}

type HeadingProps = {
  children?: React.ReactNode
}

function Heading(props: HeadingProps) {
  return (
    <h2 className="text-2xl text-orange-400">{props.children}</h2>
  )
}

export default function Home() {
  const postMetadata = getPostMetadata()
  return (
    <Main
      className={clsx(
        'w-full max-w-3xl mx-auto mt-10 px-4',
        'md:px-0'
      )}>
      <Info />
      <div className="my-4">
        <Heading>Posts</Heading>
        <ul className="flex flex-col gap-4 pl-5 my-6 list-disc">
          {postMetadata
            .filter((post) => !post.hide)
            .map((post) => (
              <li key={post.slug}>
                <span className="text-sm text-gray-400">
                  {post.date}
                </span>{' '}
                <Link
                  href={`/post/${post.slug}`}
                  className={clsx(
                    'aLink',
                    'decoration-2 underline-offset-4',
                    'hover:text-orange-400 hover:underline'
                  )}>
                  {post.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="my-4">
        <Heading>Projects</Heading>
        <ul className="flex flex-col gap-4 pl-5 my-6 list-disc">
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://github.com/yuenu/react-final-marquee"
              title="React final marquee"
              className="underline decoration-2 underline-offset-4 hover:decoration-orange-400">
              React final marquee
            </a>
            :Easy way to use marquee for react
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener"
              href="https://recipe-next-yuenu.vercel.app/"
              title="Recipe next"
              className="underline decoration-2 underline-offset-4 hover:decoration-orange-400">
              Recipe next
            </a>
            :Explore the world of culinary delights and discover your
            ultimate source of cooking inspiration
          </li>
        </ul>
      </div>
    </Main>
  )
}
