import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useMediaQuery } from './useMedia'

export const useScrollInView = options => {
  const controls = useAnimation()
  const [ref, inView] = useInView(options)
  const isNotTouch = useMediaQuery(`not all and (hover: none)`)
  useEffect(() => {
    if (inView) {
      controls.start('scroll')
      // if (!isNotTouch) {
      //   controls.start('hover')
      // }
    }
  }, [controls, inView])

  return [ref, controls]
}
