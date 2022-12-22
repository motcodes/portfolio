import { Texture, DataTexture } from 'three'
import create from 'zustand'

export const ShaderState = {
  uDataTexture: new DataTexture(),
  uTexture: new Texture(),
  material: null,
}

export const useShaderStore = create(() => ShaderState)

export const setShaderState = (state) => {
  useShaderStore.setState(state)
}
