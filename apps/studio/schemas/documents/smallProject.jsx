import React from 'react'
import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { EmojiMedia } from '../../components/emojiMedia'

const smallProject = {
  title: 'Small Project',
  name: 'smallProject',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'smallProject' }),
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
        maxLength: 96,
      },
    },
    {
      title: 'Timeperiod',
      name: 'timeperiod',
      type: 'string',
    },
    {
      title: 'Project description',
      name: 'projectDescription',
      type: 'text',
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
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title,
        media: EmojiMedia,
      }
    },
  },
}

export default smallProject
