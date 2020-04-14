import styled from 'styled-components'
import { Link } from 'gatsby'
export const A = styled.a`
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
export const PageLink = styled(Link)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: border 0.3s ease;
  color: ${({ theme }) => theme.colors.navText};
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.navText};
  }
  &.active {
    border-bottom: 2px solid ${({ theme }) => theme.colors.navText};
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
