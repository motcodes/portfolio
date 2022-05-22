import { CgBolt } from 'react-icons/cg';
export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  icon: CgBolt,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Timeperiod',
      name: 'timeperiod',
      type: 'string',
    },
    {
      title: 'Project description',
      name: 'projectDescription',
      type: 'text',
    },
    {
      title: 'Link to project',
      name: 'projectLink',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
  ],

  preview: {
    select: {
      title: 'title',
    },
  },
};
