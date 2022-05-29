export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_PROJECT_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV !== 'production',
  apiVersion: '2022-05-29',
}
