import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { H1 } from './Headings'
import OverlayText from './OverlayText'

export function Overlay({ title }) {
  const [canScroll, setCanScroll] = useState(false)
  useEffect(() => {
    if (canScroll) {
      document.body.style.overflow = 'unset'
    } else {
      document.body.style.overflow = 'hidden'
    }
  }, [canScroll])

  return (
    <>
      <Container
        onAnimationComplete={() => setCanScroll(true)}
        initial={{ originX: 0, originY: 0 }}
        animate={{
          y: `100vh`,
          opacity: 0,
          visibility: `hidden`,
          display: `none`,
        }}
        transition={{
          default: {
            duration: 0.5,
            delay: 5.5,
            ease: 'easeOut',
          },
          y: {
            duration: 2,
            delay: 3.75,
            ease: 'easeOut',
          },
          display: {
            duration: 0.001,
            delay: 6.6,
          },
        }}
      />
      <Heading
        animate={{
          display: `none`,
        }}
        transition={{
          duration: 0.5,
          delay: 4,
          ease: 'easeOut',
        }}
      >
        <OverlayText title={title} />
      </Heading>
    </>
  )
}
export function UnmountOverlay() {
  return (
    <Container
      style={{ background: 'red' }}
      initial={{
        originX: 0,
        originY: 0,
        opacity: 0,
        visibility: `hidden`,
      }}
      animate={{
        y: 0,
        opacity: 1,
        visibility: `visible`,
      }}
      exit={{
        y: 0,
        opacity: 1,
        visibility: `visible`,
      }}
      transition={{
        default: {
          duration: 1,
          delay: 1,
          ease: 'easeOut',
        },
        y: {
          duration: 2,
          delay: 2,
          ease: 'easeOut',
        },
      }}
    />
  )
}

const Container = styled(motion.div)`
  overflow-x: hidden;
  position: fixed;
  bottom: 0;
  left: 0;

  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bg};
`
const Heading = styled(motion(H1))`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: fit-content;
  font-size: 6rem;
  z-index: 101;
`
