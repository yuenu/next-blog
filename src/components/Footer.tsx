import clsx from 'clsx'
export const Footer = ({ ...rest }) => {
  return (
    <footer {...rest} className="mt-auto text-center text-stone-400">
      <div className="h-10">
        <h3 className="leading-10">
          Developed by{' '}
          <a
            href="https://github.com/yuenu"
            className={clsx(
              'text-stone-900 underline underline-offset-2',
              'dark:text-gray-50 dark:hover:text-orange-400',
              'hover:text-orange-400'
            )}>
            Josh Hsu
          </a>
        </h3>
      </div>
    </footer>
  )
}
