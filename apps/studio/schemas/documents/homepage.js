const homepage = {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
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
      title: 'Selected Works',
      name: 'selectedWorks',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'caseStudy' } }],
    },
    {
      title: 'Small Projects',
      name: 'smallProjects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'smallProject' } }],
    },
    {
      title: 'Photography Collections',
      name: 'collections',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'collection' } }],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
}

export default homepage
