import * as colors from './Colors'
import gradients from './Gradients'

export const LightTheme = {
  colors: {
    primary: colors.Blue,
    light: colors.LightBlue,
    dark: colors.DarkBlue,
    text: colors.Black,
    navText: colors.DarkGrey,
    grey: colors.DarkGrey,
    bg: `#FFF`,
    gradient: gradients[0],
  },
}

export const DarkTheme = {
  colors: {
    primary: colors.BlueDarkmode,
    light: colors.LightBlueDarkmode,
    dark: colors.DarkBlueDarkmode,
    text: `#FFF`,
    navText: colors.LightGrey,
    grey: colors.LightGrey,
    bg: `#0F1217`,
    gradient: gradients[1],
  },
}
