import styled from 'styled-components'
import { above } from '../utilities'

export const H1 = styled.h1`
  font-weight: 700;
  font-style: normal;
  font-size: 2rem;
  line-height: 1.5;

  ${above.med`
    font-size: 3rem;
  `}
`
export const H2 = styled.h2`
  font-style: normal;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.5;

  ${above.med`
    font-size: 2rem;
  `}
`
export const H3 = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.5;

  ${above.med`
    font-size: 1.5rem;
  `}
`
export const H4 = styled.h4`
  font-style: normal;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.5;

  ${above.med`
    font-size: 1rem;
  `}
`
export const H5 = styled.h5`
  font-style: normal;
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.5;

  ${above.med`
    font-size: 0.875rem;
  `}
`
