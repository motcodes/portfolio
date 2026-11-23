const homeProject = {
  name: 'homeProject',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}

export default homeProject
