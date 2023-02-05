import { default as NextImage } from 'next/image'
import { useRef, useState } from 'react'

const emptyImage =
  'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='

export default function GalleryImage({
  src = emptyImage,
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
  const [isLoaded, setIsLoaded] = useState(false)

  const onLoad = () => {
    if (ref.current) setIsLoaded(true)
  }

  return (
    <div
      className={`overflow-clip w-fit rounded-[3px] bg-gray-50 ${className}`}
    >
      {src && (
        <NextImage
          ref={ref}
          src={src}
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
          fill={fill}
          onLoadingComplete={onLoad}
          quality={70}
        />
      )}
    </div>
  )
}
