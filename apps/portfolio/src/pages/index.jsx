import { PortableText } from '@/components/portableText'
import { indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { PixelDistortion } from '@/components/pixelDistortion'
import clsx from 'clsx'

const DOM = ({ data }) => {
  return (
    <>
      <main className='z-10 uppercase'>
        <div
          className={clsx(
            'flex flex-col items-start justify-end h-[100svh] lg:flex-row lg:px-6 lg:pt-6 pt-6 px-3',
            'pt-6 px-3',
            'lg:flex-row lg:px-6 lg:pt-6 lg:fixed lg:top-0 lg:left-0 lg:right-0 lg:justify-between'
          )}
        >
          <h1
            className={clsx(
              'text-[32px] leading-[100%]',
              'lg-max:fixed top-6 left-3',
              'lg:text-[48px]'
            )}
          >
            <span>Matthias&nbsp;&nbsp;M.</span>
            <br />
            <span>Oberholzer</span>
          </h1>
          <div
            className={clsx(
              'flex flex-col leading-[130%]',
              'text-[14px] max-w-[308px] pb-6',
              'lg:text-right lg:text-[16px] lg:max-w-[360px] lg:pb-0'
            )}
          >
            <PortableText value={data.copy} />
          </div>
        </div>
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
