import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import schemaTypes from './schemas/schema'
import deskStructure from './deskStructure'

const SinglePages = ['about', 'homepage', 'projects']

export default defineConfig({
  name: 'studio',
  title: 'studio',
  projectId: import.meta.env.SANITY_STUDIO_API_PROJECT_ID,
  dataset: import.meta.env.SANITY_STUDIO_API_DATASET,
  plugins: [
    deskTool({ structure: (S, context) => deskStructure(S, context) }),
    visionTool({
      // Note: These are both optional
      defaultApiVersion: 'v2021-10-21',
      defaultDataset: 'some-dataset',
    }),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !SinglePages.includes(templateItem.templateId)
        )
      }
      return prev
    },
    actions: (prev, { schemaType }) => {
      if (SinglePages.includes(schemaType)) {
        return prev.filter(
          ({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action)
        )
      }
      return prev
    },
  },
})
