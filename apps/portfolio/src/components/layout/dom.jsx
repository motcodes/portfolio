import { useEffect, useRef } from 'react'
import { useStore } from '@/hooks'

const Dom = ({ children }) => {
  const ref = useRef(null)

  useEffect(() => {
    useStore.setState({ dom: ref })
  }, [])

  return (
    <div
      className='dom absolute top-0 left-0 z-10 h-full w-screen overflow-x-hidden bg-[#0D0D0D] font-sans font-light text-slate-300'
      ref={ref}
    >
      {children}
    </div>
  )
}

export default Dom
