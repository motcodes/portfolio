import { PortableText } from '@/components/portableText'
import { indexQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { PixelDistortion } from '@/components/pixelDistortion'
import Link from 'next/link'

const DOM = ({ data }) => {
  return (
    <>
      <section className='z-10 px-3 font-light uppercase'>
        <div className='flex flex-col items-start justify-between h-screen py-6 h-[100svh]'>
          <h1 className='uppercase text-[32px] leading-[100%]'>
            <span>Matthias&nbsp;&nbsp;M.</span>
            <br />
            <span>Oberholzer</span>
          </h1>
          <div
            className='flex flex-col text-[14px] leading-[130%] gap-4'
            style={{
              fontFeatureSettings: `'ordn' on, 'zero' on, 'case' on, 'ss02' on`,
            }}
          >
            <p>
              Matthias is a web developer, student, and Awwwards Young Jury
              Member who currently explores the world of creative and
              interactive coding.
            </p>
            <p>
              He Enjoys everything UX/UI, motion design, typography, photography
              and building Legos while Brewing a v60.
            </p>
          </div>
        </div>
        <div className='flex flex-col py-6 gap-6 text-[12px] leading-[130%]'>
          <p>
            Currently Working at{' '}
            <Link href='https://numbered.com' target='_blank' rel='noopener'>
              <span className='underline'>Numbered</span>
            </Link>
          </p>
          <div className='flex justify-between '>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href='/imprint'>Imprint</Link>
              </li>
              <li>
                <Link href='/projects'>Projects</Link>
              </li>
              <li>
                <Link href='/gallery'>Gallery</Link>
              </li>
              {/* TODO: copy email field */}
              <li>hello@mot.codes</li>
            </ul>
            <ul className='flex flex-col text-right gap-2'>
              <li>
                <Link
                  href='https://twitter.com/motcodes'
                  target='_blank'
                  rel='noopener'
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href='https://www.linkedin.com/in/matthiasoberholzer/'
                  target='_blank'
                  rel='noopener'
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href='https://github.com/motcodes'
                  target='_blank'
                  rel='noopener'
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href='https://unsplash.com/@matthiasoberholzer'
                  target='_blank'
                  rel='noopener'
                >
                  Unsplash
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

const R3F = ({ data }) => {
  return <PixelDistortion />
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
