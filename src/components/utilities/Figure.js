import React from 'react'
import ImageUrlBuilder from '@sanity/image-url'
import clientConfig from '../../../client-config'

const builder = ImageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  return builder.image(source)
}

export const Figure = ({ node }) => {
  const imageData = imageUrlFor(node.asset).url()
  return (
    <figure>
      <img src={imageData} alt={node.alt} />
    </figure>
  )
}
