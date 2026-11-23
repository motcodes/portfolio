import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { useStore } from '@/hooks'

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      // inline: Canvas sets position relative inline, a class could not override it;
      // z-index -1 keeps it under the page text inside the scrolling layer
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100svh',
        zIndex: -1,
      }}
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
