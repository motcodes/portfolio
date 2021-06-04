import { useCallback, useEffect } from 'react'
import { useMediaQuery } from './useMedia'
import { useLocalStorage } from './useLocalStorage'

function useDarkmode() {
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled')
  const prefersDarkmode = usePrefersDarkmode()

  const enabled =
    typeof enabledState !== 'undefined' ? enabledState : prefersDarkmode

  const toggle = useCallback(() => setEnabledState(!enabled), [
    enabled,
    setEnabledState,
  ])

  return [enabledState, toggle]
}

function usePrefersDarkmode() {
  return useMediaQuery('prefers-color-scheme: dark')
}
export { useDarkmode }
