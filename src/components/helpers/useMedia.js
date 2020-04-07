import { useLayoutEffect, useState } from 'react'
import { canUseDom } from './canUseDom'

export function useMediaQuery(mediaQuery) {
  const [matches, setMatches] = useState(() =>
    canUseDom ? window.matchMedia(mediaQuery).matches : false
  )
  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(mediaQuery)
    const listener = e => setMatches(e.matches)
    mediaQueryList.addListener(listener)
    return () => mediaQueryList.removeListener(listener)
  }, [mediaQuery])

  return matches
}
