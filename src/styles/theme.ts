import { Outfit } from '@next/font/google'
import { createTheme } from '@mui/material/styles'

export const outfit = Outfit({
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  preload: true,
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const base = createTheme({
  palette: {
    error: {
      main: '#ED145B',
    },
    primary: {
      main: '#23C7A8',
    },
  },
  typography: {
    fontFamily: outfit.style.fontFamily,
  },
})

const light = createTheme({
  ...base,
  palette: {
    background: {
      default: '#F1F1F1',
      paper: '#FAFAFA',
    },
  },
})

const dark = createTheme({
  ...base,
  palette: {
    background: {
      default: '#2b2b2b',
      paper: '#222222',
    },
  },
})

export const theme = {
  light,
  dark,
}
