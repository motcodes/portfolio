import { createGlobalStyle } from 'styled-components'
import { Black } from './utilities'

const GlobalStyle = createGlobalStyle`
  @import url("https://use.typekit.net/vux8nyf.css");
  html{
    box-sizing: border-box;
    color: ${Black}
  }

  *, *::before, *::after{
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
`
export default GlobalStyle
