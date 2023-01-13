export default {
  title: 'Footer',
  name: 'footer',
  type: 'document',
  fields: [
    {
      name: 'status',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: 'center',
      type: 'array',
      of: [{ type: 'linkWithLabel' }],
    },
    {
      name: 'right',
      type: 'array',
      of: [{ type: 'linkWithLabel' }],
    },
  ],
}
