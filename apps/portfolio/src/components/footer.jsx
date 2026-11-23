import clsx from 'clsx'
import { PortableText } from './portableText'
import { AutoLink } from './autoLink'

const EMAIL = {
  label: 'hello@mot.codes',
  slug: 'mailto://hello@mot.codes',
  type: 'external',
}

export function Footer({ status, center, right }) {
  const year = new Date().getFullYear().toString()

  return (
    <footer
      className={clsx(
        'right-0 bottom-0 left-0 flex text-[12px] leading-[130%] text-white uppercase',
        'relative bottom-0 px-3 py-6',
        'lg:fixed lg:flex-col lg:gap-6 lg:px-6 lg:pt-16 lg:pb-6',
        // mirrors the header gradient so content scrolling under the fixed footer stays readable
        'lg:bg-[linear-gradient(0deg,_#0D0D0D_22.4%,_rgba(13,13,13,0.6)_63.54%,_rgba(13,13,13,0)_100%)]'
      )}
    >
      <div
        className={clsx(
          'flex w-full flex-row flex-wrap justify-between',
          'lg-max:gap-6'
        )}
      >
        <div className='lg-max:hidden [&_p]:pb-0'>
          <PortableText value={status} />
        </div>
        {!!center?.length && (
          <ul className={clsx('flex flex-col gap-2', 'lg:flex-row')}>
            {center.map((item) => (
              <li key={item.slug}>
                <AutoLink {...item} />
              </li>
            ))}
            <li className='lg:hidden'>
              <AutoLink {...EMAIL} />
            </li>
          </ul>
        )}
        {!!right?.length && (
          <ul className={clsx('flex flex-col gap-2 text-right', 'lg:flex-row')}>
            {right.map((item) => (
              <li key={item.slug}>
                <AutoLink {...item} />
              </li>
            ))}
            <li className='lg-max:hidden'>
              <AutoLink {...EMAIL} />
            </li>
            <li className='lg-max:hidden'>&copy; {year}</li>
          </ul>
        )}
        <p className='w-full lg:hidden'>Matthias Oberholzer &copy; {year}</p>
      </div>
    </footer>
  )
}
