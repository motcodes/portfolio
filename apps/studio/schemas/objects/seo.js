const seo = {
  title: 'Seo',
  name: 'seo',
  type: 'object',
  fields: [
    {
      title: 'Seo Title',
      name: 'seoTitle',
      type: 'string',
    },
    {
      title: 'Seo description',
      name: 'seoDescription',
      type: 'text',
      validation: (Rule) => Rule.max(160),
    },
    {
      title: 'Seo Image',
      name: 'seoImage',
      description: 'Image size: 1140x600',
      type: 'image',
    },
  ],
}

export default seo
