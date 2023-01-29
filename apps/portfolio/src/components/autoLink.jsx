import clsx from 'clsx'
import Link from 'next/link'

const linkClassName = clsx(
  'relative inline-block leading-snug',
  'after:absolute after:bottom-[45%] after:left-0 after:w-full after:h-[1px] after:bg-white',
  'after:scale-x-0 hover:after:scale-x-100 after:origin-right',
  'hover:after:scale-x-100 hover:after:scale-x-0 hover:after:origin-left',
  'after:transition-transform after:duration-500 after:ease-quart-out after:transform-gpu'
)

export const AutoLink = ({ slug, type, label }) => {
  return type === 'internal' ? (
    <Link className={linkClassName} href={`/${slug}`}>
      {label}
    </Link>
  ) : (
    <Link className={linkClassName} href={slug} target='_blank' rel='noopener'>
      {label}
    </Link>
  )
}
