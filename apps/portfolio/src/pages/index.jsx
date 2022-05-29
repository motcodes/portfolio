import { indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'

const DOM = () => {
  return <h1>Matthias</h1>
}

const R3F = () => {
  return <></>
}

const Page = ({ data }) => {
  return (
    <>
      <DOM />
      <R3F r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  const data = await sanityClient.fetch(indexQuery)
  const seoImage = urlForImage(data.seo.seoImage).url()

  return {
    props: {
      data,
      title: data.seo.seoTitle,
      description: data.seo.seoDescription,
      ogImage: seoImage,
    },
  }
}
