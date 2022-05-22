import create from 'zustand'

export const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})
