import { useEffect, useState } from 'react'
import { useWindowSize } from './useWindowSize'

export const useMouse = () => {
  const { width, height } = useWindowSize()

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    vX: 0,
    vY: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: e.clientX / width,
        y: e.clientY / height,
        vX: mouse.x - mouse.prevX,
        vY: mouse.y - mouse.prevY,
        prevX: mouse.x,
        prevY: mouse.y,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [width, height, mouse])

  return [mouse, setMouse]
}
