import { indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'

const DOM = ({ data }) => {
  return (
    <section className='flex items-end h-screen px-4'>
      <h1
        className='uppercase'
        style={{
          lineHeight: '110%',
          fontSize: `clamp(2.8rem, 16.4vw - 0.5rem, 7.4rem)`,
        }}
      >
        <span>Matthias&nbsp;&nbsp;M.</span>
        <br />
        <span>Oberholzer</span>
      </h1>
    </section>
  )
}

const R3F = () => {
  return <></>
}

const Page = ({ data }) => {
  return (
    <>
      <DOM data={data} />
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
