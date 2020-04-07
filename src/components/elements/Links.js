import styled from 'styled-components'

export const Link = styled.a`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

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
  }};
`
