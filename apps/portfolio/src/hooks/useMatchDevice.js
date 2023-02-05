import { useMatchMedia } from './useMatchMedia'

export const devices = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
}

export const useMatchDevice = (callback) => {
  const queries = {
    mobile: `(max-width: ${devices.tablet - 1}px)`,
    tablet: `(min-width: ${devices.tablet}px) and (max-width: ${
      devices.desktop - 1
    }px)`,
    desktop: `(min-width: ${devices.desktop}px)`,
  }

  const entries = Object.entries(queries)

  useMatchMedia(
    entries.map((e) => e[1]),
    (e) => {
      if (e.matches) {
        callback(entries.find((v) => v[1] === e.media)[0])
      }
    }
  )
}
