import React from 'react'
import clientConfig from '../../../client-config'
import BasePortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  return builder.image(source)
}

const serializer = {
  types: {
    image: (props) => {
      return (
        <figure>
          <img src={imageUrlFor(props.node.asset).url()} alt={props.node.alt} />
        </figure>
      )
    },
  },
}

const PortableText = ({ blocks }) => (
  <BasePortableText
    blocks={blocks}
    serializers={serializer}
    // {...clientConfig.sanity}
  />
)

export default PortableText
