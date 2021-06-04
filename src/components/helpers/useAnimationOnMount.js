import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'

export const useAnimationOnMount = (animationName = 'animate') => {
  const controls = useAnimation()
  useEffect(() => {
    controls.start(animationName)
  }, [animationName, controls])

  return controls
}
