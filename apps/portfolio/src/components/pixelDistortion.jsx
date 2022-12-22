import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMouse, useWindowSize, useWindowResize } from '@/hooks'
import { clamp } from '@/lib/maths'

import vertex from '../shader/vertex.glsl'
import fragment from '../shader/fragment.glsl'

const settings = {
  grid: 60,
  mouse: 0.075,
  strength: 0.3,
  relaxation: 0.95,
}

export const PixelDistortion = () => {
  const three = useThree()
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [mouse, setMouse] = useMouse()

  const mesh = useRef()
  const materialRef = useRef()
  const textureRef = useRef(null)

  const { imageTexture } = useTexture({
    imageTexture: '/me1920.jpg',
  })

  const uniforms = useMemo(
    () => ({
      time: {
        value: 0,
      },
      resolution: {
        value: new THREE.Vector4(),
      },
      uTexture: {
        value: null,
      },
      uDataTexture: {
        value: imageTexture,
      },
    }),
    [imageTexture]
  )

  function regenerateGrid() {
    const gridSize = settings.grid

    const width = gridSize
    const height = gridSize

    const size = width * height
    const data = new Float32Array(4 * size)

    for (let i = 0; i < size; i++) {
      let r = Math.random() * 255 - 125
      let r1 = Math.random() * 255 - 125

      const stride = i * 4

      data[stride] = r
      data[stride + 1] = r1
      data[stride + 2] = r
      data[stride + 3] = 1
    }

    textureRef.current = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat,
      THREE.FloatType
    )

    textureRef.current.magFilter = THREE.NearestFilter
    textureRef.current.minFilter = THREE.NearestFilter

    mesh.current.material.uniforms.uDataTexture.value = textureRef.current
    mesh.current.material.uniforms.uDataTexture.value.needsUpdate = true
  }

  useEffect(() => {
    const frustumSize = 1
    three.set({
      camera: new THREE.OrthographicCamera(
        frustumSize / -2,
        frustumSize / 2,
        frustumSize / 2,
        frustumSize / -2,
        -1000,
        1000
      ),
    })
  }, [three])

  useEffect(() => {
    if (mesh?.current) {
      regenerateGrid()

      imageTexture.needsUpdate = true
      mesh.current.material.uniforms.uTexture.value = imageTexture
      mesh.current.material.uniforms.uDataTexture.value = textureRef.current
      resize()
    }
  }, [imageTexture, mesh.current])

  useFrame((props) => {
    let data = textureRef?.current?.image.data
    if (!textureRef?.current?.image.data) return

    for (let i = 0; i < data.length; i += 4) {
      data[i] *= settings.relaxation
      data[i + 1] *= settings.relaxation
    }

    let gridMouseX = settings.grid * mouse.x
    let gridMouseY = settings.grid * (1 - mouse.y)
    let maxDist = settings.grid * settings.mouse
    let aspect = windowHeight / windowWidth

    for (let i = 0; i < settings.grid; i++) {
      for (let j = 0; j < settings.grid; j++) {
        let distance = (gridMouseX - i) ** 2 / aspect + (gridMouseY - j) ** 2
        let maxDistSq = maxDist ** 2

        if (distance < maxDistSq) {
          let index = 4 * (i + settings.grid * j)

          let power = maxDist / Math.sqrt(distance)
          power = clamp(power, 0, 10)
          data[index] += settings.strength * 100 * mouse.vX * power
          data[index + 1] -= settings.strength * 100 * mouse.vY * power
        }
      }
    }

    setMouse((prev) => ({ ...prev, vX: prev.vX * 0.9, vY: prev.vY * 0.9 }))

    textureRef.current.needsUpdate = true
    mesh.current.material.uniforms.time.value += 0.05
  })

  function resize() {
    three.setSize(windowWidth, windowHeight)
    three.camera.aspect = windowWidth / windowHeight

    const imageAspect = 1 / 1.5
    let a1 = 0
    let a2 = 0

    if (windowHeight / windowWidth > imageAspect) {
      a1 = (windowWidth / windowHeight) * imageAspect
      a2 = 1
    } else {
      a1 = 1
      a2 = windowHeight / windowWidth / imageAspect
    }

    mesh.current.material.uniforms.resolution.value.w = a2
    mesh.current.material.uniforms.resolution.value.x = windowWidth
    mesh.current.material.uniforms.resolution.value.y = windowHeight
    mesh.current.material.uniforms.resolution.value.z = a1

    three.camera.updateProjectionMatrix()
    regenerateGrid()
  }

  useWindowResize(
    () => {
      resize()
    },
    true,
    [windowWidth]
  )

  return (
    <mesh position={[0, 0, 0]} ref={mesh} scale={1}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        extensions={{
          derivatives: '#extension GL_OES_standard_derivatives : enable',
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
