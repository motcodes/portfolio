import { motion } from 'framer-motion'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { X } from 'react-feather'
import styled from 'styled-components'
import { canUseDom } from '../helpers'

function Modal({ children, defaultOpen = true }, ref) {
  const [isOpen, setOpen] = useState(defaultOpen)

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }),
    []
  )

  const handleEscape = useCallback(e => {
    if (e.keyCode === 27) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape, false)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [handleEscape, isOpen])

  if (canUseDom) {
    return createPortal(
      isOpen ? (
        <>
          <Backdrop onClick={() => setOpen(false)}>
            <Container>
              <Header>
                <CloseButton
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.125 }}
                  whileTap={{ scale: 0.9275 }}
                />
              </Header>
              {children}
            </Container>
          </Backdrop>
        </>
      ) : null,
      document.getElementById('portal')
    )
  } else {
    return null
  }
}

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
  display: grid;
  place-items: center;
`

const Container = styled(motion.div)`
  padding: 1rem;
  min-height: 4rem;
  width: 90%;
  max-width: 800px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(20px) saturate(160%) brightness(110%);
  box-shadow: 0 0.3px 2.6px rgba(0, 0, 0, 0.034),
    0 2.1px 6px rgba(0, 0, 0, 0.049), 0 6px 10.7px rgba(0, 0, 0, 0.06),
    0 13px 17.8px rgba(0, 0, 0, 0.07), 0 25.5px 29.4px rgba(0, 0, 0, 0.081),
    0 49px 51.3px rgba(0, 0, 0, 0.096), 0 108px 111px rgba(0, 0, 0, 0.13);
  z-index: 20;
`

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

const CloseButton = styled(motion(X))`
  cursor: pointer;
`

export default forwardRef(Modal)
