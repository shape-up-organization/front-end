import { Outfit } from '@next/font/google'
import { createTheme } from '@mui/material/styles'

export const outfit = Outfit({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export const theme = createTheme({
  palette: {
    background: {
      default: '#F1F1F1',
      paper: '#FAFAFA',
    },
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
