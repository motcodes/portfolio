import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useStore } from '@/hooks'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      className='bg-[#0D0D0D]'
      mode='concurrent'
      orthographic
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
