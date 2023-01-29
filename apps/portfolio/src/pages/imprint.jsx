import { PortableText } from '@/components/portableText'
import { imprintQuery, indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { PixelDistortion } from '@/components/pixelDistortion'
import { Header } from '@/components/header'
import clsx from 'clsx'

const DOM = ({ title, copy }) => {
  return (
    <>
      <main>
        <Header title={title} />
        <section
          className={clsx(
            'px-3 py-12',
            'lg:px-6 lg:max-w-2xl leading-[130%] lg:p-4'
          )}
        >
          <PortableText value={copy} />
        </section>
      </main>
    </>
  )
}

const R3F = () => {
  return <PixelDistortion />
}

const Page = ({ data }) => {
  return (
    <>
      <DOM {...data} />
      {/* <R3F r3f /> */}
    </>
  )
}

export default Page

export async function getStaticProps() {
  const data = await sanityClient.fetch(imprintQuery)
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
