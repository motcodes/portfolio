import { PortableText } from '@/components/portableText'
import { imprintQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { Header } from '@/components/header'
import clsx from 'clsx'

const DOM = ({ title, copy }) => {
  return (
    <>
      <main>
        <Header title={title} />
        <section
          className={clsx(
            'px-3 pb-12 text-xs leading-[160%]',
            // bottom padding clears the fixed footer and its gradient
            'lg:px-6 lg:pb-32 lg:max-w-2xl'
          )}
        >
          <PortableText value={copy} />
        </section>
      </main>
    </>
  )
}

const Page = ({ data }) => {
  return (
    <>
      <DOM {...data} />
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
