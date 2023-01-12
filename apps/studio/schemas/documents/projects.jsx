import { defineType, prepareConfig } from 'sanity'
import { EmojiMedia } from '../../components/emojiMedia'

export default defineType({
  title: 'Projects and Experiences',
  name: 'projects',
  type: 'document',
  fields: [
    {
      name: 'seo',
      type: 'seo',
    },
    {
      name: 'title',
      type: 'string',
    },
    {
      title: 'Selected Works',
      name: 'works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
            },
            {
              Title: 'Role or Type',
              name: 'type',
              type: 'string',
            },
            {
              title: 'Timeperiod',
              name: 'timeperiod',
              type: 'string',
            },
            {
              name: 'description',
              type: 'blockContent',
            },
            {
              title: 'Link',
              name: 'link',
              type: 'url',
              validation: (Rule) =>
                Rule.uri({
                  scheme: ['http', 'https'],
                }),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'timeperiod',
            },
            prepare: ({ title, subtitle }) => ({
              title,
              subtitle,
              media: EmojiMedia,
            }),
          },
        },
      ],
    },
  ],
})
