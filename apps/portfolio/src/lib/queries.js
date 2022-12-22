export const indexQuery = `
 *[_type == "homepage"][0]{
   seo,
   copy,
   image,
   collections[]->{
     mainImage,
     title,
     "slug": slug.current
   },
   selectedWorks[]->{
     description,
     projectLink,
     title,
     timeperiod
   },
   smallProjects[]->{
     title,
     timeperiod,
     "slug": slug.current,
     projectDescription
   },
 }
`
