const homepage = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      title: 'Seo',
      name: 'seo',
      type: 'seo',
    },
    {
      title: 'Homepage Copy',
      name: 'copy',
      type: 'blockContent',
    },
    {
      title: 'Projects',
      name: 'projects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'homeProject' }] }],
    },
  ],
  preview: {
    prepare: ({ title }) => ({
      title: 'Homepage',
    }),
  },
}

export default homepage
