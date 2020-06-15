import { css } from 'styled-components'

// Media Queries
const size = {
  small: 480,
  med: 768,
  large: 1024,
  xl: 1440,
}

export const above = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${size[label]}px) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export const breakpoints = {
  ...size,
}
