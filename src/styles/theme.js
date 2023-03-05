import { Ubuntu } from 'next/font/google'

export const fontPrimary = Ubuntu({
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const base = {
  palette: {
    mode: 'light',
    error: {
      main: '#ED145B',
    },
    primary: {
      contrastText: '#FAFAFA',
      dark: '#25D6B6',
      main: '#23C7A8',
    },
    secondary: {
      main: '#00FCA8',
    },
    base: {
      black: '#222222',
      blue: '#42A5F5',
      red: '#ed1543',
    },
  },
  typography: {
    fontFamily: fontPrimary.style.fontFamily,
  },
}

const light = {
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

const dark = {
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

const getDesignTokens = mode => ({
  ...(mode === 'light' ? light : dark),
})

export { getDesignTokens }
