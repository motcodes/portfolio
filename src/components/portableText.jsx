import BasePortableText from '@sanity/block-content-to-react'
import clientConfig from '../../client-config'

const serializer = {
  types: {},
}

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializer}
    {...clientConfig.sanity}
  />
)

export default PortableText
