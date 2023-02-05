import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export const useMatchMedia = (queries, callback) => {
  const handleChange = (e) => {
    callback(e)
  }

  useIsomorphicLayoutEffect(() => {
    const mediaQueryLists = queries.map((q) => window.matchMedia(q))

    mediaQueryLists.forEach((mq) => {
      mq.addListener(handleChange)
      if (mq.matches) callback(mq)
    })
    return () =>
      mediaQueryLists.forEach((mq) => mq.removeListener(handleChange))
  }, [])
}
