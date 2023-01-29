const resolvelinkWithLabel = () => /*groq*/ `
  ...select(_type == 'linkWithLabel' => {
    ...select(defined(internal) => {
      "type": "internal",
      "label": internal.label,
      "slug": internal.reference->slug.current,
    }),
    ...select(defined(external) => {
      "type": "external",
      "label": external.label,
      "slug": external.url,
    }),
  }),
`

export const indexQuery = `
  *[_type == "homepage"][0]{
    seo,
    copy,
  }
`

export const imprintQuery = `
  *[_type == "imprint"][0]{
    title,
    copy,
    "seo": *[_type== "homepage"][0]{
      ...seo
    }
  }
`

export const galleryQuery = `
  *[_type == 'gallery'][0]{
    title,
    seo,
    // body[]{
    //   ...select(defined(asset) => {
    //     ...
    //   })
    // }
  }
`

export const footerQuery = `
  *[_type == "footer"][0]{
    ...,
    center[]{
      ${resolvelinkWithLabel()}
    },
    right[]{
      ${resolvelinkWithLabel()}
    },
  }
`
