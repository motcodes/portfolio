import { CgBolt } from 'react-icons/cg'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'

const caseStudy = {
  title: 'Case Study',
  name: 'caseStudy',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'caseStudy' }),
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
      },
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Client',
      name: 'client',
      type: 'string',
    },
    {
      title: 'Timeperiod',
      name: 'timeperiod',
      type: 'string',
    },
    {
      title: 'Role',
      name: 'role',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'role' } }],
    },
    {
      title: 'Type',
      name: 'type',
      type: 'reference',
      to: [{ type: 'category' }],
    },
    {
      title: 'Link to project',
      name: 'projectLink',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
    {
      title: 'Body',
      name: 'body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'seo.seoImage',
    },
  },
}

export default caseStudy
