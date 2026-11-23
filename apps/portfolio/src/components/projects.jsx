import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { BlossomCarousel } from '@blossom-carousel/react'
import { useStore } from '@/hooks'

const setActive = (index) => {
  if (useStore.getState().activeProject !== index) {
    useStore.setState({ activeProject: index })
  }
}

const itemClassName = (active, index) =>
  clsx(
    'uppercase transition-opacity duration-300',
    active !== null && active !== index && 'opacity-40'
  )

export function ProjectList({ projects, className }) {
  const active = useStore((state) => state.activeProject)

  return (
    // the last hovered or focused project stays active after leaving the list
    <ul className={clsx('flex flex-col gap-2', className)}>
      {projects.map((project, index) => (
        <li key={project._id}>
          <button
            type='button'
            className={itemClassName(active, index)}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            {project.name}
          </button>
        </li>
      ))}
    </ul>
  )
}

// the list is rendered three times; scrolling rests in the middle copy and jumps
// by exactly one copy when it settles in an outer one, so the loop is seamless
const COPIES = 3

export function ProjectCarousel({ projects, className }) {
  const active = useStore((state) => state.activeProject)
  const carousel = useRef(null)
  // portrait stays until the user touches the carousel
  const interacted = useRef(false)

  useEffect(() => {
    const element = carousel.current.element
    const slides = element.children
    const count = projects.length
    let frame = 0
    let settle = 0

    const copyWidth = () => slides[count].offsetLeft - slides[0].offsetLeft
    const centerOf = (slide) =>
      slide.offsetLeft + slide.offsetWidth / 2 - element.clientWidth / 2

    // start on the first project of the middle copy
    element.scrollTo({ left: centerOf(slides[count]), behavior: 'instant' })

    const onInteract = () => {
      interacted.current = true
    }

    const wrap = () => {
      const width = copyWidth()
      const left = element.scrollLeft
      if (left < centerOf(slides[0]) + width / 2) {
        element.scrollTo({ left: left + width, behavior: 'instant' })
      } else if (left > centerOf(slides[count]) + width / 2) {
        element.scrollTo({ left: left - width, behavior: 'instant' })
      }
    }

    const onScroll = () => {
      // scrollend is missing in older Safari, so wait for scrolling to rest
      clearTimeout(settle)
      settle = setTimeout(wrap, 150)

      if (!interacted.current) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const center = element.scrollLeft + element.clientWidth / 2
        let closest = null
        let closestDistance = Infinity

        for (const slide of slides) {
          const distance = Math.abs(
            slide.offsetLeft + slide.offsetWidth / 2 - center
          )
          if (distance < closestDistance) {
            closestDistance = distance
            closest = slide
          }
        }

        if (closest) setActive(Number(closest.dataset.index))
      })
    }

    const interactions = ['pointerdown', 'wheel', 'keydown']
    for (const type of interactions) element.addEventListener(type, onInteract)
    element.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(settle)
      for (const type of interactions) {
        element.removeEventListener(type, onInteract)
      }
      element.removeEventListener('scroll', onScroll)
    }
  }, [projects.length])

  return (
    <BlossomCarousel
      ref={carousel}
      as='ul'
      // relative: slide offsetLeft is then measured inside the scroller
      className={clsx('relative snap-x snap-mandatory', className)}
    >
      {Array.from({ length: COPIES }, (_, copy) =>
        projects.map((project, index) => {
          // only the middle copy is exposed to assistive tech and keyboard
          const clone = copy !== 1
          return (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: copy is one of COPIES fixed clones, stable across renders
              key={`${copy}-${project._id}`}
              data-index={index}
              aria-hidden={clone || undefined}
              className='inline-block snap-center px-3 whitespace-nowrap'
            >
              <button
                type='button'
                tabIndex={clone ? -1 : undefined}
                className={itemClassName(active, index)}
                onClick={(event) => {
                  interacted.current = true
                  setActive(index)
                  const slide = event.currentTarget.parentElement
                  carousel.current.element.scrollTo({
                    left:
                      slide.offsetLeft +
                      slide.offsetWidth / 2 -
                      carousel.current.element.clientWidth / 2,
                    behavior: 'smooth',
                  })
                }}
              >
                {project.name}
              </button>
            </li>
          )
        })
      )}
    </BlossomCarousel>
  )
}
