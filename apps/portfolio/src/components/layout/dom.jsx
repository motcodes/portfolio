import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useStore } from '@/hooks'
import { canUseDom } from '@/helpers'

gsap.registerPlugin(ScrollTrigger)

const Dom = ({ children }) => {
  const ref = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const scroll = import('locomotive-scroll').then((LocomotiveScroll) => {
      new LocomotiveScroll.default({
        el: containerRef.current,
        smooth: true,
      })
    })

    return () => scroll.destroy()
  }, [])

  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
      ref={ref}
    >
      <div ref={containerRef}>{children}</div>
    </div>
  )
}

export default Dom
