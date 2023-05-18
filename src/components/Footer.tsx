export const Footer = ({ ...rest }) => {
  return (
    <footer
      {...rest}
      className="mt-auto text-center text-orange-200 bg-stone-400">
      <div className="h-10">
        <h3 className="leading-10 ">
          Developed by <a href="https://github.com/yuenu">Josh Hsu</a>
        </h3>
      </div>
    </footer>
  )
}
