const about = {
  name: 'about',
  title: 'About',
  type: 'document',
  __experimental_actions: ['update', 'create', 'publish'],
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
      title: 'Copy',
      name: 'copy',
      type: 'blockContent',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'imageAlt',
    },
    {
      title: 'Experiences',
      name: 'experiences',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'experience' } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

export default about
