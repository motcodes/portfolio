import { useEffect, useRef } from 'react'
import { useStore } from '@/hooks'

const Dom = ({ children }) => {
  const ref = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return (
    <div
      className='absolute top-0 left-0 z-10 w-screen h-full overflow-x-hidden font-light text-slate-300 dom'
      ref={ref}
    >
      {children}
    </div>
  )
}

export default Dom
