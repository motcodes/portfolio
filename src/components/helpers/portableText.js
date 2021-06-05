import React from 'react'
import clientConfig from '../../../client-config'
import BasePortableText from '@sanity/block-content-to-react'
import { ImageUrlBuilder } from '@sanity/image-url'

const builder = ImageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  return builder.image(source)
}

const serializer = {
  types: {
    image: props => (
      <figure>
        <img src={imageUrlFor(props.node.asset).url()} alt={props.node.alt} />
      </figure>
    ),
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
