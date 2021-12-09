import styled from 'styled-components'

export const Button = styled.button`
  padding: 2px 16px;
  background-position: 0 0;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  line-height: 33.4929px;
  text-align: left;
  text-decoration: none;
  text-shadow: none;
  text-underline-offset: 1px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  word-break: break-word;
  transition: border 0.2s ease-in-out, box-shadow 0.2s ease-in-out,
    background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:active {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px 0 inset;
    color: #ffffff;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(0, 129, 239, 0.2);
  }

  &:active:hover,
  &:focus:hover,
  &:focus {
    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: rgba(0, 0, 0, 0.12) 0 1px 3px 0 inset;
    color: #ffffff;
  }
`
