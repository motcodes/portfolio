export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'homepageImage',
    },
    {
      title: 'Project and Experience',
      name: 'projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    },
    {
      title: 'Collections',
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
};
