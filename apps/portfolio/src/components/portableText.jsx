import { sanityConfig } from '@/lib/config'
import { PortableText as BasePortableText } from '@portabletext/react'
import Link from 'next/link'

const serializer = {
  block: {
    normal: ({ children }) => <p className='pb-2'>{children}</p>,
  },
  types: {
    hardBreak: () => <br className='h-4' />,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined

      return (
        <Link href={value.href} target={target} rel={rel} className='underline'>
          {children}
        </Link>
      )
    },
  },
}

export const PortableText = ({ value }) => (
  <BasePortableText
    value={value}
    components={serializer}
    style={{
      fontFeatureSettings: `'ordn' on, 'zero' on, 'case' on, 'ss02' on`,
    }}
    {...sanityConfig}
  />
)
