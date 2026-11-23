import { create } from 'zustand'

export const useStore = create(() => ({
  router: null,
  dom: null,
  // index into the homepage projects, null = portrait
  activeProject: null,
}))
