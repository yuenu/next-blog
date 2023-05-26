import { cn } from '@/lib/utils'

type CustomHeadingProps = React.ComponentPropsWithRef<
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
> & { Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }

const CustomHeading = (props: CustomHeadingProps) => {
  const { Tag, id, className, children, ...rest } = props
  return (
    <Tag
      id={id}
      className={cn(
        'group relative scroll-mt-20 whitespace-pre-wrap',
        className
      )}
      {...rest}
    >
      <a
        href={id && `#${id}`}
        className={cn(
          'translate-1/2 absolute inset-0 block translate-y-0',
          'rounded-lg px-2 text-xl no-underline opacity-0 shadow-sm',
          'ring-2 ring-slate-900/5 transition-all',
          'hover:bg-slate-100 hover:text-slate-700 hover:shadow hover:ring-slate-900/10',
          'group-hover:opacity-0',
          'dark:text-slate-400 dark:ring-slate-400/70 dark:hover:text-slate-700',
          'md:inset-auto md:-left-9 md:top-1/2 md:-translate-y-1/2 md:group-hover:opacity-100'
        )}
        aria-label="Anchor"
      >
        #
      </a>
      <span className="">{children}</span>
    </Tag>
  )
}
export const CustomH1 = (props: React.ComponentPropsWithoutRef<'h1'>) => (
  <CustomHeading
    Tag="h1"
    className="mt-2 scroll-m-20 text-4xl font-bold tracking-tight"
    {...props}
  />
)

export const CustomH2 = (props: React.ComponentPropsWithoutRef<'h2'>) => (
  <CustomHeading
    Tag="h2"
    className="mt-10 scroll-m-20 border-b-2 border-b-orange-400 pb-1 text-3xl font-semibold tracking-tight first:mt-0"
    {...props}
  />
)

export const CustomH3 = (props: React.ComponentPropsWithoutRef<'h3'>) => (
  <CustomHeading
    Tag="h3"
    className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight"
    {...props}
  />
)
