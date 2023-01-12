import { create } from 'zustand'

export const useStore = create(() => ({
  router: null,
  dom: null,
}))
