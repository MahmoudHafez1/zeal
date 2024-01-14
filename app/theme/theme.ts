import { extendTheme } from 'native-base'

const theme = extendTheme({
  colors: {
    // Add new color
    primary: {
      main: '#122642',
    },
    background: {
      main: '#F9F9F9',
    },
    secondary: {
      light: '#F5FAFF',
      main: '#05F1F1',
    },
  },
  config: {
    initialColorMode: 'light',
  },
})

export default theme
