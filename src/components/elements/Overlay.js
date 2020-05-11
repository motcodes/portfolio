import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { H1 } from './Headings'
import { useDarkmode } from '../helpers'
import OverlayText from './OverlayText'

export function Overlay({ title }) {
  return (
    <>
      <Container
        initial={{ originX: 0, originY: 0 }}
        animate={{
          y: `100vh`,
          opacity: 0,
          visibility: `hidden`,
        }}
        transition={{
          default: {
            duration: 0.5,
            delay: 7.1,
            ease: 'easeOut',
          },
          y: {
            duration: 2,
            delay: 4.75,
            ease: 'easeOut',
          },
        }}
      ></Container>
      <Heading>
        <OverlayText title={title} />
      </Heading>
    </>
  )
}

const Container = styled(motion.div)`
  overflow-x: hidden;
  position: absolute;
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
const Heading = styled(motion.custom(H1))`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: fit-content;
  font-size: 6rem;
  z-index: 101;
`
