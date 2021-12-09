import React from 'react'
import clientConfig from '../../../client-config'
import BasePortableText from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_PROJECT_DATASET,
})

export function imageUrlFor(source) {
  return builder.image(source)
}

const serializer = {
  types: {
    image: (props) => {
      const url = imageUrlFor(props.node.asset).url()
      return (
        <figure>
          <img
            src={url}
            alt={props.node.alt || 'collection Image'}
            srcSet={`https://cdn.sanity.io/images/${clientConfig.sanity.projectId}/${clientConfig.sanity.dataset}/${props.node.asset._ref}`}
          />
        </figure>
      )
    },
  },
}

const PortableText = ({ blocks }) => (
  <BasePortableText blocks={blocks} serializers={serializer} />
)

export default PortableText
