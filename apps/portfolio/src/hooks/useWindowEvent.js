import { useEffect } from 'react'
import debounce from 'debounce'

/**
 * We ensure there's only one event of each type
 */
export const events = {}
export const data = {
  pageYOffset: 0,
  innerWidth: 0,
  innerHeight: 0,
  documentHeight: 0,
  offsetWidth: 0,
}

/**
 * Mapping event
 * Because window events are unik, we can add
 * intensive getters to the returned event.
 */
const map = (e) => {
  const _e = { type: e.type }

  switch (e.type) {
    case 'scroll':
      if (e instanceof Event) data.pageYOffset = window.pageYOffset
      _e.pageYOffset = _e.scrollY = data.pageYOffset
      break

    case 'resize':
      if (e instanceof Event || !data.innerWidth) {
        data.innerWidth = window.innerWidth
        data.innerHeight = window.innerHeight
        data.documentHeight = document.documentElement.clientHeight
        data.offsetWidth = document.body.offsetWidth
      }

      _e.innerWidth = data.innerWidth
      _e.innerHeight = data.innerHeight
      _e.documentHeight = data.documentHeight
      _e.offsetWidth = data.offsetWidth
      break
  }

  return _e
}

export const useWindowEvent = (
  eventName,
  cb,
  triggerInit = false,
  useEffectProps = [],
  debounceDelay = 40
) => {
  useEffect(() => {
    const debounceCb = debounce(cb, debounceDelay)
    if (cb && eventName) {
      const event = events[eventName]
      if (event) {
        event.cbs.push(debounceDelay ? debounceCb : cb)
        if (triggerInit) {
          cb(map({ type: eventName, manual: true }))
        }
      } else {
        const event = {
          cbs: [debounceDelay ? debounceCb : cb],
          cb: () => null,
        }
        event.cb = (e) => {
          const m = map(e)
          event.cbs.forEach((ecb) => {
            ecb(m)
          })
        }

        window.addEventListener(eventName, event.cb)
        events[eventName] = event
        if (triggerInit) {
          cb(map({ type: eventName, manual: true }))
        }
      }
    }

    return () => {
      // cleanup event
      if (eventName) {
        const event = events[eventName]
        if (event) {
          const index = event.cbs.indexOf(debounceCb)
          if (index !== -1) {
            debounceCb.clear()
            event.cbs.splice(index, 1)
            if (event.cbs.length === 0) {
              window.removeEventListener(eventName, event.cb)
              events[eventName] = null
            }
          }
        }
      }
    }
  }, [eventName, ...useEffectProps])
}
