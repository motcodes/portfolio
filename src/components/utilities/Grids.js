import styled from 'styled-components'
import { above } from './Breakpoints'

export const PrimaryGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, minmax(3rem, 6rem));
  ${above.med`
    grid-template-columns: repeat(9, minmax(3rem, 6rem));
  `}
  grid-gap: 1rem;
  grid-row-gap: 0;
`
