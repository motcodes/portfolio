import { useEffect } from 'react'
import { PortableText } from '@/components/portableText'
import { indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { PixelDistortion } from '@/components/pixelDistortion'
import { ProjectList, ProjectCarousel } from '@/components/projects'
import { Name } from '@/components/header'
import { useStore } from '@/hooks'
import clsx from 'clsx'

const DOM = ({ data }) => {
  const projects = data.projects ?? []

  // back to the portrait when leaving the page
  useEffect(() => () => useStore.setState({ activeProject: null }), [])

  return (
    <>
      <main className='z-10 uppercase'>
        <div
          className={clsx(
            'flex flex-col h-[100svh] pt-3 pb-6',
            'lg:flex-row lg:items-start lg:justify-between lg:h-auto lg:px-6 lg:pt-6',
            'lg:fixed lg:top-0 lg:left-0 lg:right-0'
          )}
        >
          <div className='px-3 lg:px-0'>
            <Name />
          </div>
          <div
            className={clsx(
              'flex flex-col leading-[130%]',
              'text-xs px-3 mt-2',
              'lg:text-right lg:max-w-[360px] lg:p-0 lg:mt-0'
            )}
          >
            <PortableText value={data.copy} />
          </div>
          {/* mt-1 plus the bio paragraph's pb-2 makes the 12px gap */}
          <div className='px-3 text-xs lg:mt-1 lg:hidden'>
            <PortableText value={data.status} />
          </div>
          <ProjectCarousel
            projects={projects}
            className='mt-auto text-[22px] leading-[130%] lg:hidden'
          />
        </div>
        <ProjectList
          projects={projects}
          className={clsx(
            'text-[16px] leading-[130%]',
            'lg-max:hidden fixed left-6 top-1/2 -translate-y-1/2'
          )}
        />
      </main>
    </>
  )
}

const R3F = ({ images }) => {
  return <PixelDistortion images={images} />
}

const Page = ({ data }) => {
  return (
    <>
      <DOM data={data} />
      <R3F r3f images={(data.projects ?? []).map((project) => project.image)} />
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
