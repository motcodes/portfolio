import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html{
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.text};
    /* font-family: 'Inter', sans-serif; */
    font-family: work-sans, sans-serif;
    background-color: ${({ theme }) => theme.colors.bg};
  }

  *, *::before, *::after{
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: auto;
    &::-webkit-scrollbar {
        width: 0px;
    }
    @media(min-width: 1024px){
      &::-webkit-scrollbar {
        width: 0px;
      }

      &::-webkit-scrollbar-track {
        /* background: ${({ theme }) => theme.colors.bg}; */
        background: ${({ theme }) => theme.colors.bg};
      }
      
      ::-webkit-scrollbar-thumb {
        background: #888;
        /* background: ${({ theme }) => theme.colors.grey}; */
        border: 3px solid ${({ theme }) => theme.colors.bg};
        border-radius: 8px;
        width: 8px;
        padding: 0 1px
      }
    }
  }
  h1,h2,h3,h4,h5,h6{
    font-family: objektiv-mk2, sans-serif;
    font-style: normal;
  }
  li {
    list-style-position: inside
  }
  li > ol {
    margin-left: 1.45rem;
    margin-bottom: calc(1.45rem / 2);
    margin-top: calc(1.45rem / 2);
  }
  li > ul {
    margin-left: 1.45rem;
    margin-bottom: calc(1.45rem / 2);
    margin-top: calc(1.45rem / 2);
  }

  
`
export default GlobalStyle
