import { Ubuntu } from 'next/font/google'
import { createTheme, ThemeOptions } from '@mui/material/styles'

export const ubuntu = Ubuntu({
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  preload: true,
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const base: ThemeOptions = {
  palette: {
    error: {
      main: '#ED145B',
    },
    primary: {
      main: '#23C7A8',
    },
    secondary: {
      main: '#00FCA8',
    },
  },
  typography: {
    fontFamily: ubuntu.style.fontFamily,
  },
}

const light = createTheme({
  ...base,
  palette: {
    ...base.palette,
    background: {
      default: '#F1F1F1',
      paper: '#FAFAFA',
    },
  },
})

const dark = createTheme({
  ...base,
  palette: {
    ...base.palette,
    background: {
      default: '#2B2B2B',
      paper: '#222222',
    },
  },
})

export const theme = {
  light,
  dark,
}
