import { ScrollControls, Scroll } from '@react-three/drei'
import { PortableText } from '@/components/portableText'
import { indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'

const DOM = ({ data }) => {
  return <></>
}

const R3F = ({ data }) => {
  return (
    <ScrollControls
      pages={5} // Each page takes 100% of the height of the canvas
      distance={1} // A factor that increases scroll bar travel (default: 1)
      damping={6} // Friction, higher is faster (default: 4)
      horizontal={false} // Can also scroll horizontally (default: false)
      infinite={true} // Can also scroll infinitely (default: false)
    >
      <Scroll html>
        <section className='px-4'>
          <div className='flex items-end h-screen pb-3'>
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
          </div>
          <div
            className='mt-32 text-3xl uppercase'
            style={{
              fontWeight: '349',
              lineHeight: '125%',
              fontFeatureSettings: `'ordn' on, 'zero' on, 'case' on, 'ss02' on`,
            }}
          >
            <PortableText blocks={data.copy} />
          </div>
        </section>
      </Scroll>
    </ScrollControls>
  )
}

const Page = ({ data }) => {
  return (
    <>
      <DOM data={data} />
      <R3F r3f data={data} />
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
