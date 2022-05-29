import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { CgCollage } from 'react-icons/cg'

const collection = {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: CgCollage,
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'collection' }),
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.',
      options: {
        maxLength: 160,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}

export default collection
