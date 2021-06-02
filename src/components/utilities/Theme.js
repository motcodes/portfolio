import * as colors from './Colors'
import gradients from './Gradients'
import { shadows } from '.'

export const LightTheme = {
  colors: {
    primary: colors.Blue,
    light: colors.LightBlue,
    dark: colors.DarkBlue,
    text: colors.Black,
    navText: colors.DarkGrey,
    grey: colors.DarkGrey,
    bg: colors.BackgroundLightmode,
    gradient: gradients[0],
    lightText: 'rgba(255, 255, 255, 0.7)',
    cardText: `#FFF`,
    shadowPrimary: shadows[0],
    shadowPrimaryHover: shadows[1],
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
    bg: colors.BackgroundDarkmode,
    gradient: gradients[1],
    lightText: 'rgba(0, 0, 0, 0.5)',
    cardText: colors.Black,
    shadowPrimary: shadows[2],
    shadowPrimaryHover: shadows[3],
  },
}
