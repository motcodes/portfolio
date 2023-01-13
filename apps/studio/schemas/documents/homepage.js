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
  ],
  preview: {
    prepare: ({ title }) => ({
      title: 'Homepage',
    }),
  },
}

export default homepage
