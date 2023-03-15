import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { galleryQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { Header } from '@/components/header'
import GalleryImage from '@/components/galleryImage'
import useDevice from '@/hooks/useDevice'

// const Page = ({ data, images }) => {
const Page = () => {
  // const { title } = data
  // const [_images, setImages] = useState([images])
  // const device = useDevice()
  // const size = `(max-width: 767px) 100vw,
  //             (max-width: 1023px) 50vw,
  //             33vw`

  // TODO: add infinite scroller to fetch images

  // useEffect(() => {
  //   let modulo = device === 'desktop' ? 3 : device === 'tablet' ? 2 : 1
  //   if (modulo > 1) {
  //     let arr = Array.from(Array(modulo), () => [])
  //     for (let i = 0; i < images.length; i++) {
  //       const index = i % modulo
  //       arr[index] = [...arr[index], images[i]]
  //     }
  //     setImages(arr)
  //   }
  // }, [device])

  return (
    <>
      <main>
        <Header title={'Coming soon...'} />
        <section
          className={clsx(
            'px-3 py-12 grid grid-cols-1 gap-4 min-h-screen',
            'md:grid-cols-2',
            'lg:px-6 lg:p-4 lg:grid-cols-3'
          )}
        >
          <h1>Coming soon...</h1>
          {/* {!!_images?.length &&
            _images.map((col, index) => (
              <div key={index} className='flex flex-col gap-4'>
                {col.map((img) => (
                  <>
                    <GalleryImage
                      width={375}
                      height={375 * img.ratio}
                      size={size}
                      priority={index === 0}
                      key={img.id}
                      src={img.imageSmall}
                      alt='An image taken by Matthias Oberholzer'
                      className={clsx(`aspect-[${375}/${375 * img.ratio}]`)}
                      mobileOnly
                    />
                    <GalleryImage
                      width={640}
                      height={640 * img.ratio}
                      size={size}
                      priority={index < 2}
                      key={img.id}
                      src={img.imageRegular}
                      alt='An image taken by Matthias Oberholzer'
                      className={clsx(`aspect-[${640}/${640 * img.ratio}]`)}
                      desktopOnly
                    />
                  </>
                ))}
              </div>
            ))} */}
        </section>
      </main>
    </>
  )
}

export default Page

// export async function getStaticProps() {
//   const data = await sanityClient.fetch(galleryQuery)
//   let _images = []
//   for (let i = 1; i <= 3; i++) {
//     const res = await fetch(
//       `https://api.unsplash.com/users/matthiasoberholzer/photos?page=${i}&client_id=7fa359ea7087a00fe9e4d1e0646ecf7314644f43bb5687aeb1454f8152893109`
//     )
//     const image = await res.json()
//     if (image[0]?.urls.regular) {
//       const _image = image.map((item) => ({
//         id: item.id,
//         blur_hash: `data:image/png;base64,${item.blur_hash}`,
//         imageSmall: item.urls.small,
//         imageRegular: item.urls.regular,
//         link: item.links.html,
//         ratio: item.width / item.height,
//       }))
//       _images = [..._images, ..._image]
//     }
//   }

//   const seoImage = urlForImage(data.seo.seoImage).url()

//   return {
//     props: {
//       data,
//       images: _images,
//       title: data.seo.seoTitle,
//       description: data.seo.seoDescription,
//       ogImage: seoImage,
//     },
//   }
// }
