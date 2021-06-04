import { useEffect } from 'react'
import { useAnimation } from 'framer-motion'

export const useAnimationOnMount = (
  animationName = 'animate',
  dependencies = []
) => {
  const controls = useAnimation()
  useEffect(() => {
    controls.start(animationName)
  }, dependencies)

  return controls
}
