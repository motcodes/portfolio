import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const useScrollInView = options => {
  const controls = useAnimation()
  const [ref, inView] = useInView(options)
  useEffect(() => {
    if (inView) {
      controls.start('scroll')
    }
  }, [controls, inView])

  return [ref, controls]
}
