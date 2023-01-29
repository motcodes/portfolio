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
        'bottom-0 left-0 right-0 flex text-white uppercase leading-[130%] text-[12px]',
        'from-[#0A0A0A] via-[#0a0a0ac2]',
        'relative bottom-0 px-3 py-6',
        'lg:fixed lg:flex-col lg:px-12 lg:pt-8 lg:pb-12 lg:gap-6 lg:bg-gradient-to-t xl:text-[14px]'
      )}
    >
      <div
        className={clsx(
          'flex justify-between flex-row flex-wrap w-full',
          'lg-max:gap-6'
        )}
      >
        <div className='lg-max:w-full'>
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
          <ul className={clsx('flex flex-col text-right gap-2', 'lg:flex-row')}>
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
        <p className='w-full lg:hidden '>Matthias Oberholzer &copy; {year}</p>
      </div>
    </footer>
  )
}
