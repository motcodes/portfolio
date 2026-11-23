import * as THREE from 'three'
import { useRef, useEffect, useMemo } from 'react'
import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMouse, useWindowSize, useWindowResize, useStore } from '@/hooks'
import { clamp } from '@/lib/maths'

import vertex from '../shader/vertex.glsl'
import fragment from '../shader/fragment.glsl'
import transition from '../shader/transition.glsl'

const settings = {
  // cells per axis, for the hover mosaic and the transition; matches grid in fragment.glsl
  grid: 24,
  mouse: 0.075,
  strength: 0.3,
  relaxation: 0.95,
  duration: 2.5,
  reducedDuration: 0.3,
  contain: 0.8,
}

// shortcut: past this many transitions at once the oldest snaps to done; flinging through all
// projects within one duration stays under it, raise it if a snap shows
const MAX_LAYERS = 12

// uv scale that covers the viewport (portrait) or contains the image at settings.contain (projects)
function fitScale(texture, viewportAspect, cover) {
  const imageAspect = texture.image.width / texture.image.height
  if (cover) {
    return viewportAspect > imageAspect
      ? [1, imageAspect / viewportAspect]
      : [viewportAspect / imageAspect, 1]
  }
  const width = Math.min(1, imageAspect / viewportAspect) * settings.contain
  return [1 / width, imageAspect / viewportAspect / width]
}

export const PixelDistortion = ({ images = [] }) => {
  const three = useThree()
  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const [mouse, setMouse] = useMouse()
  const activeProject = useStore((state) => state.activeProject)

  const mesh = useRef()
  const materialRef = useRef()
  const textureRef = useRef(null)
  // index 0 is the portrait, project i is texture i + 1
  // every change starts its own full transition at once; running ones keep playing underneath
  const stack = useRef({ base: 0, layers: [] })

  const textures = useTexture(['/me1920.jpg', ...images])

  const uniforms = useMemo(
    () => ({
      uComposite: { value: null },
      uDataTexture: { value: null },
      uFrameScale: { value: new THREE.Vector2(1, 1) },
    }),
    []
  )

  // offscreen: the base image, then one pass per running transition on top of the previous
  // result, so any number of transitions play at once and each pushes out what is below it
  const passes = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: transition,
      uniforms: {
        uFrom: { value: null },
        uTo: { value: null },
        uToScale: { value: new THREE.Vector2(1, 1) },
        uToTexel: { value: new THREE.Vector2(0, 0) },
        uProgress: { value: 1 },
        uSeed: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
      // texture2DGradEXT on WebGL1; built in on WebGL2
      extensions: { shaderTextureLOD: true },
    })
    const scene = new THREE.Scene()
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material))
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, -1, 1)
    const targets = [0, 1].map(
      () => new THREE.WebGLRenderTarget(1, 1, { depthBuffer: false })
    )
    return { material, scene, camera, targets, size: new THREE.Vector2() }
    // transition in deps: Fast Refresh swaps the source, an existing material would keep the old one
  }, [transition])

  useEffect(
    () => () => {
      passes.material.dispose()
      passes.targets.forEach((target) => target.dispose())
    },
    [passes]
  )

  function regenerateGrid() {
    const gridSize = settings.grid

    const width = gridSize
    const height = gridSize

    const size = width * height
    const data = new Float32Array(4 * size)

    textureRef.current = new THREE.DataTexture(
      data,
      width,
      height,
      THREE.RGBAFormat,
      THREE.FloatType
    )

    textureRef.current.magFilter = THREE.NearestFilter
    textureRef.current.minFilter = THREE.NearestFilter

    scatter()
    mesh.current.material.uniforms.uDataTexture.value = textureRef.current
  }

  // random pixel offsets that relax back to zero: the "assemble" animation
  function scatter() {
    const data = textureRef.current.image.data

    for (let i = 0; i < data.length; i += 4) {
      const r = Math.random() * 255 - 125
      const r1 = Math.random() * 255 - 125

      data[i] = r
      data[i + 1] = r1
      data[i + 2] = r
      data[i + 3] = 1
    }

    textureRef.current.needsUpdate = true
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
      resize()
    }
  }, [textures, mesh.current])

  useEffect(() => {
    const target = activeProject === null ? 0 : activeProject + 1
    const s = stack.current
    if (target === (s.layers.at(-1)?.to ?? s.base)) return

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    s.layers.push({
      to: target,
      progress: 0,
      duration: reduceMotion ? settings.reducedDuration : settings.duration,
      seed: Math.random() * 100,
    })
    if (s.layers.length > MAX_LAYERS) s.base = s.layers.shift().to
  }, [activeProject])

  useFrame((state, delta) => {
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

    const s = stack.current
    for (const layer of s.layers) {
      layer.progress = Math.min(1, layer.progress + delta / layer.duration)
    }
    // a finished layer covers the whole screen, everything below it is gone
    const done = s.layers.findLastIndex((layer) => layer.progress >= 1)
    if (done >= 0) {
      s.base = s.layers[done].to
      s.layers = s.layers.slice(done + 1)
    }

    const viewportAspect = windowWidth / windowHeight
    const fit = (index) =>
      fitScale(textures[index], viewportAspect, index === 0)
    const { gl } = state
    const { material, scene, camera, targets, size } = passes
    const pass = material.uniforms

    gl.getDrawingBufferSize(size)
    for (const target of targets) {
      if (target.width !== size.x || target.height !== size.y) {
        target.setSize(size.x, size.y)
      }
    }
    pass.uResolution.value.set(windowWidth, windowHeight)

    const incoming = (index) => {
      const [x, y] = fit(index)
      pass.uTo.value = textures[index]
      pass.uToScale.value.set(x, y)
      pass.uToTexel.value.set(x / size.x, y / size.y)
    }

    // base: at progress 1 the pass draws only the incoming image
    pass.uFrom.value = targets[1].texture
    incoming(s.base)
    pass.uProgress.value = 1
    gl.setRenderTarget(targets[0])
    gl.render(scene, camera)

    let current = 0
    let below = s.base
    for (const layer of s.layers) {
      pass.uFrom.value = targets[current].texture
      incoming(layer.to)
      pass.uProgress.value = layer.progress
      pass.uSeed.value = layer.seed
      current = 1 - current
      gl.setRenderTarget(targets[current])
      gl.render(scene, camera)
      below = layer.to
    }
    gl.setRenderTarget(null)

    const display = mesh.current.material.uniforms
    display.uComposite.value = targets[current].texture
    display.uFrameScale.value.fromArray(fit(below))
  })

  function resize() {
    three.setSize(windowWidth, windowHeight)
    three.camera.aspect = windowWidth / windowHeight
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
      {/* keyed by source: Fast Refresh swaps the string but three never recompiles an existing material */}
      <shaderMaterial
        key={fragment}
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
