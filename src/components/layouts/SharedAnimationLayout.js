import React from 'react'
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion'

export const SharedAnimationLayout = ({ children }) => (
  <AnimateSharedLayout type="crossfade">
    <AnimatePresence>{children}</AnimatePresence>
  </AnimateSharedLayout>
)
