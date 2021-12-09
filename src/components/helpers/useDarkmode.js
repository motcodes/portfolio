import { useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export function useDarkmode(defaultValue = false) {
  const getPrefersScheme = () => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    return !!defaultValue
  }

  const [isDarkmode, setDarkMode] = useLocalStorage(
    'darkMode',
    getPrefersScheme()
  )

  // Update darkMode if os prefers changes
  useEffect(() => {
    const handler = () => setDarkMode(getPrefersScheme)
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)')

    matchMedia.addEventListener('change', handler)

    return () => {
      matchMedia.removeEventListener('change', handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDarkMode])

  return {
    isDarkmode,
    toggle: () => setDarkMode((prev) => !prev),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  }
}
