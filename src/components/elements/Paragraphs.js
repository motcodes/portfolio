import styled from 'styled-components'

export const Paragraph = styled.p`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  ${({ size }) => {
    if (size === 'large') {
      return `
        font-size: 24px;
        line-height: 30px;
      `
    }
    if (size === 'small') {
      return `
        font-size: 12px;
        line-height: 18px;
      `
    }
  }}
`
