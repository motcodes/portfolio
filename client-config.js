require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: 'production',
  },
}
