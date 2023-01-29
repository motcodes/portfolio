import clsx from 'clsx'
import Link from 'next/link'

export function Header({ title }) {
  return (
    <header
      className={clsx(
        'sticky top-0 flex flex-col items-start justify-start pt-6 px-3 gap-3 uppercase',
        'bg-[linear-gradient(180deg,_#0D0D0D_34.38%,_rgba(13,13,13,0.6)_68.23%,_rgba(13,13,13,0)_100%)]',
        'lg:bg-[linear-gradient(180deg,_#0D0D0D_22.4%,_rgba(13,13,13,0.6)_63.54%,_rgba(13,13,13,0)_100%)]',
        'lg:flex-row lg:p-6 lg:sticky lg:top-0 lg:left-0 lg:right-0 lg:justify-between'
      )}
    >
      <h1 className={clsx('text-[32px] leading-[100%]', 'lg:text-[48px]')}>
        <Link href='/'>
          <span>Matthias&nbsp;&nbsp;M.</span>
          <br />
          <span>Oberholzer</span>
        </Link>
      </h1>
      <div
        className={clsx(
          'flex flex-col leading-[100%] text-[20px]',
          'lg:text-right lg:text-[32px] '
        )}
      >
        <h2>{title}</h2>
      </div>
    </header>
  )
}
