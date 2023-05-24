import * as React from 'react'
import Image from 'next/image'
import { useMDXComponent } from 'next-contentlayer/hooks'

import { cn } from '@/lib/utils'

const components = {
  h1: ({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...rest}
    />
  ),
  h2: ({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        'mt-10 scroll-m-20 border-b-2 border-b-orange-400 pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...rest}
    />
  ),
  h3: ({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...rest}
    />
  ),
  h4: ({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...rest}
    />
  ),
  h5: ({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...rest}
    />
  ),
  h6: ({ className, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...rest}
    />
  ),
  a: ({ className, ...rest }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn('font-medium underline underline-offset-4', className)}
      {...rest}
    />
  ),
  p: ({ className, ...rest }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...rest}
    />
  ),
  ul: ({ className, ...rest }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn('my-6 ml-6 list-disc', className)} {...rest} />
  ),
  ol: ({ className, ...rest }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn('my-6 ml-6 list-decimal', className)} {...rest} />
  ),
  li: ({ className, ...rest }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn('mt-2', className)} {...rest} />
  ),
  blockquote: ({
    className,
    ...rest
  }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'mt-6 border-l-2 pl-6 italic [&>*]:text-gray-400',
        className
      )}
      {...rest}
    />
  ),
  img: ({
    className,
    alt,
    ...rest
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-md border', className)} alt={alt} {...rest} />
  ),
  hr: ({ ...rest }) => <hr className="my-4 md:my-8" {...rest} />,
  table: ({ className, ...rest }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn('w-full', className)} {...rest} />
    </div>
  ),
  tr: ({ className, ...rest }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn('even:bg-muted m-0 border-t p-0', className)} {...rest} />
  ),
  th: ({ className, ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...rest}
    />
  ),
  td: ({ className, ...rest }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...rest}
    />
  ),
  pre: ({ className, ...rest }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4',
        className
      )}
      {...rest}
    />
  ),
  code: ({ className, ...rest }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...rest}
    />
  ),
  Image,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
