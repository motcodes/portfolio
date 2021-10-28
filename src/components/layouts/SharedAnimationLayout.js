import React from 'react'
import { AnimatePresence } from 'framer-motion'

export const SharedAnimationLayout = ({ children }) => (
  <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
)
