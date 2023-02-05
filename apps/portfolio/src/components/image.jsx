import { urlForImage } from '@/lib/sanity'
import { default as NextImage } from 'next/image'
import { useRef, useState } from 'react'

const emptyImage =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export default function Image({
  image,
  alt = 'Cover image',
  width = 1920,
  height = 1080,
  size = '100vw',
  className = '',
  imageClassName = '',
  fill = false,
  priority = false,
  mobileOnly = false,
  desktopOnly = false,
}) {
  const ref = useRef()
  const [isLoaded, setIsLoaded] = useState < boolean > false
  const aspectRatio = width / height
  const imageUrl =
    image &&
    urlForImage(image)
      ?.height(height)
      .width(width)
      .fit('crop')
      .auto('format')
      .url()

  const sanityLoader = ({ width, quality = 75 }) => {
    if (width === 1) return emptyImage
    else
      return urlForImage(image)
        .size(width, width / aspectRatio)
        .fit('crop')
        .quality(quality)
        .auto('format')
        .url()
  }

  const onLoad = () => {
    if (ref.current) setIsLoaded(true)
  }

  return (
    <div
      className={`overflow-clip w-fit rounded-[3px] bg-gray-50 ${className}`}
    >
      {imageUrl && (
        <NextImage
          ref={ref}
          src={imageUrl}
          className={`
            ${mobileOnly && 'lg:hidden'}
            ${desktopOnly && 'lg-max:hidden'}
            opacity-0 transition-opacity
            ${priority && 'block'}
            ${(priority || isLoaded) && 'opacity-100'}
            ${imageClassName}
          `}
          alt={alt}
          width={width}
          height={height}
          sizes={size}
          priority={priority}
          loader={sanityLoader}
          fill={fill}
          onLoadingComplete={onLoad}
        />
      )}
    </div>
  )
}
