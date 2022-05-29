import React from 'react'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { emojis } from '../objects/emojis'

const experience = {
  title: 'Experience',
  name: 'experience',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'experience' }),
    {
      title: 'Role',
      name: 'role',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Timeperiod',
      name: 'timeperiod',
      type: 'string',
    },
    {
      title: 'Company',
      name: 'company',
      type: 'string',
    },
    {
      title: 'Link to company',
      name: 'companyLink',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    },
  ],

  preview: {
    select: {
      title: 'company',
    },
    prepare({ title }) {
      return {
        title: title,
        media: (
          <span style={{ fontSize: '1.5rem' }}>
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </span>
        ),
      }
    },
  },
}

export default experience
