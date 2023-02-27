import { Ubuntu } from 'next/font/google'
import { ThemeOptions } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'

export const fontPrimary = Ubuntu({
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const base: ThemeOptions = {
  palette: {
    mode: 'light',
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
    fontFamily: fontPrimary.style.fontFamily,
  },
}

const light: ThemeOptions = {
  ...base,
  palette: {
    ...base.palette,
    mode: 'light',
    background: {
      default: '#F1F1F1',
      paper: '#FAFAFA',
    },
  },
}

const dark: ThemeOptions = {
  ...base,
  palette: {
    ...base.palette,
    mode: 'dark',
    background: {
      default: '#2B2B2B',
      paper: '#222222',
    },
  },
}

const getDesignTokens = (mode: PaletteMode) => ({
  ...(mode === 'light' ? light : dark),
})

export { getDesignTokens }
