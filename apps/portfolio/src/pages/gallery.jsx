import { galleryQuery } from '@/lib/queries'
import { urlForImage } from '@/lib/sanity'
import { sanityClient } from '@/lib/sanity.server'
import { Header } from '@/components/header'
import clsx from 'clsx'
import Image from 'next/image'

const Page = ({ data, images }) => {
  const { title } = data
  return (
    <>
      <main>
        <Header title={title} />
        <section
          className={clsx(
            'px-3 py-12 grid grid-cols-1 gap-4',
            'md:grid-cols-2',
            'lg:px-6 lg:p-4 lg:grid-cols-3'
          )}
        >
          {!!images?.length &&
            images.map((col, index) => (
              <div key={index} className='flex flex-col gap-4'>
                {col.map((img) => (
                  <Image
                    width={512}
                    height={512 * img.ratio}
                    placeholder='blur'
                    blurDataURL={img.blur_hash}
                    key={img.id}
                    src={img.image}
                    alt='An image taken by Matthias Oberholzer'
                  />
                ))}
              </div>
            ))}
        </section>
      </main>
    </>
  )
}

export default Page

export async function getStaticProps() {
  const data = await sanityClient.fetch(galleryQuery)
  let _images = []
  for (let i = 1; i <= 20; i++) {
    const res = await fetch(
      `https://api.unsplash.com/users/matthiasoberholzer/photos?page=${i}&client_id=7fa359ea7087a00fe9e4d1e0646ecf7314644f43bb5687aeb1454f8152893109`
    )
    const image = await res.json()
    if (image[0]?.urls.small) {
      const _image = image.map((item) => ({
        id: item.id,
        blur_hash: `data:image/png;base64,${item.blur_hash}`,
        image: item.urls.small,
        link: item.links.html,
        ratio: item.width / item.height,
      }))
      _images = [..._images, ..._image]
    }
  }

  let arr = [[], [], []]
  for (let i = 0; i < _images.length; i++) {
    const index = i % 3
    arr[index] = [...arr[index], _images[i]]
  }
  const seoImage = urlForImage(data.seo.seoImage).url()

  return {
    props: {
      data,
      images: arr,
      title: data.seo.seoTitle,
      description: data.seo.seoDescription,
      ogImage: seoImage,
    },
  }
}
