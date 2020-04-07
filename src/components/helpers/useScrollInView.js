import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from './useMedia'

export const useScrollInView = exitAnimation => {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const isNotTouch = useMediaQuery(`not all and (hover: none)`)
  useEffect(() => {
    if (inView) {
      controls.start('scroll')
      if (!isNotTouch) {
        controls.start('hover')
      }
    }
    // else if (!inView && typeof exitAnimation !== 'undefined') {
    //   controls.start(exitAnimation)
    // }
  }, [controls, inView, isNotTouch])

  return {
    ref,
    controls,
  }
}
