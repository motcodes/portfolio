import { sanityConfig } from '@/lib/config'
import BasePortableText from '@sanity/block-content-to-react'

const serializer = {
  types: {
    hardBreak: () => <br className='h-4' />,
  },
}

export const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializer}
    {...sanityConfig}
  />
)
