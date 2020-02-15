import styled from 'styled-components'
import { H2 } from './Headings'

export const Card = styled.div`
  height: 16rem;
  background: transparent;
  border: 2px solid ${props => props.theme.colors.primary};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Heading = styled(H2)`
  padding: 2rem;
  text-align: center;
`
Card.Heading = Heading
