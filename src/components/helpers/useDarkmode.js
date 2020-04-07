import { useCallback } from 'react'
import { useMediaQuery } from './useMedia'
import { useLocalStorage } from './useLocalStorage'

function useDarkmode() {
  // const [state, setState] = useState(initialState)
  const [enabledState, setEnabledState] = useLocalStorage('dark-mode-enabled')
  const prefersDarkmode = usePrefersDarkmode()

  const enabled =
    typeof enabledState !== 'undefined' ? enabledState : prefersDarkmode

  const toggle = useCallback(() => setEnabledState(!enabled), [enabled])

  return [enabledState, toggle]
}

function usePrefersDarkmode() {
  return useMediaQuery('prefers-color-scheme: dark')
}
export { useDarkmode }
