import React from 'react'
import { AnimateSharedLayout } from 'framer-motion'

export const SharedAnimationLayout = ({ children }) => (
  <AnimateSharedLayout type="crossfade">{children}</AnimateSharedLayout>
)
