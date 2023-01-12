const defaultImage = {
  name: 'imageAlt',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      options: {
        isHighlighted: true,
      },
    },
  ],
}

export default defaultImage
