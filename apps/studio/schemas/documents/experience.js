import {
  orderRankField,
  orderRankOrdering,
} from '@sanity/orderable-document-list'
import { CgBolt } from 'react-icons/cg'

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
  },
}

export default experience
