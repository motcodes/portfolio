import { CgFormatJustify } from 'react-icons/cg'

export default {
  name: 'imprint',
  title: 'Imprint',
  type: 'document',
  icon: CgFormatJustify,
  fields: [
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
      title: 'Copy',
      name: 'copy',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: ({ title }) => ({
      title,
    }),
  },
}
