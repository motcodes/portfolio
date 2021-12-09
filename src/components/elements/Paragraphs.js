import styled from 'styled-components'

export const Paragraph = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 1rem;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.text};

  @media (prefers-color-scheme: dark) {
    letter-spacing: 0.3px;
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
        font-size: 14px;
        line-height: 21px;
      `
    }
  }};
`
