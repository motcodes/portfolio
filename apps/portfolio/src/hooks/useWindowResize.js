import { useWindowEvent } from './useWindowEvent'

export const useWindowResize = (
  cb,
  triggerInit = false,
  useEffectProps = [],
  debounceDelay = 40
) => useWindowEvent('resize', cb, triggerInit, useEffectProps, debounceDelay)
