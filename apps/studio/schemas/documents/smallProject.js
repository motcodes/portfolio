import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { CgBolt } from 'react-icons/cg'

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
  },
}

export default smallProject
