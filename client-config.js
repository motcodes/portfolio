require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  sanity: {
    projectId: process.env.GATSBY_SANITY_PROJECT_ID,
    dataset: 'production',
  },
}
