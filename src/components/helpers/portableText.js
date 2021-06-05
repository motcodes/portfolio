import React from 'react'
import clientConfig from '../../../client-config'
import { default as BasePortableText } from '@sanity/block-content-to-react'

const PortableText = ({ blocks }) => (
  <BasePortableText blocks={blocks} {...clientConfig.sanity} />
)

export default PortableText
