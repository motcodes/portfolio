import React from 'react'
import BasePortableText from '@sanity/block-content-to-react'
import { Figure } from '../utilities'
import clientConfig from '../../../client-config'

const serializer = {
  types: {
    image: Figure,
  },
}

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializer}
    {...clientConfig.sanity}
  />
)

export default PortableText
