import { CgFormatJustify } from 'react-icons/cg'

export default {
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: CgFormatJustify,
  fields: [
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
        maxLength: 96,
      },
    },
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'imageAlt' }],
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
