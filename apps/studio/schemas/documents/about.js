export default {
  name: 'about',
  title: 'About',
  type: 'document',
  __experimental_actions: ['update', 'create', 'publish'],
  fields: [
    {
      title: 'Description',
      name: 'description',
      type: 'text',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'aboutImage',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};
