import React from 'react'
import clientConfig from '../../../client-config'
import { default as BasePortableText } from '@sanity/block-content-to-react'
import urlBuilder from '@sanity/image-url'

const urlFor = source => urlBuilder({ ...clientConfig.sanity }).image(source)

const serializer = {
  types: {
    mainImage: props => (
      <figure>
        <img
          src={urlFor(props.node.asset)
            .width(600)
            .url()}
          alt={props.node.alt}
        />
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
