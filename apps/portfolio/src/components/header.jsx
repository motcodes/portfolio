import clsx from 'clsx'
import Link from 'next/link'

// the name: one line filling the width between the 12px margins on mobile, two lines on desktop
export function Name({ href }) {
  const name = (
    <>
      <span>Matthias&nbsp;&nbsp;M.</span> <br className='lg-max:hidden' />
      <span>Oberholzer</span>
    </>
  )

  return (
    <h1
      className={clsx(
        // the name renders about 12.2 × font size + 8px wide, so (100vw - 2 × 12px - 8px) / 12.2
        'leading-[100%] whitespace-nowrap text-[length:calc((100vw-32px)/12.2)]',
        'lg:text-[2rem] lg:whitespace-normal'
      )}
    >
      {href ? <Link href={href}>{name}</Link> : name}
    </h1>
  )
}

export function Header({ title }) {
  return (
    <header
      className={clsx(
        'sticky top-0 z-10 flex flex-col items-start justify-start gap-2 px-3 pt-3 pb-12 uppercase',
        'bg-[linear-gradient(180deg,_#0D0D0D_34.38%,_rgba(13,13,13,0.6)_68.23%,_rgba(13,13,13,0)_100%)]',
        'lg:bg-[linear-gradient(180deg,_#0D0D0D_22.4%,_rgba(13,13,13,0.6)_63.54%,_rgba(13,13,13,0)_100%)]',
        'lg:flex-row lg:justify-between lg:px-6 lg:pt-6'
      )}
    >
      <Name href='/' />
      <h2 className='text-[12px] leading-[130%] lg:text-right'>{title}</h2>
    </header>
  )
}
