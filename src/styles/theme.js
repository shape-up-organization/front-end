import { Ubuntu } from 'next/font/google'

export const fontPrimary = Ubuntu({
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
})

const colors = {
  black: '#303030',
  blue: '#42A5F5',
  red: '#ed1543',
  white: '#F9F9F9',
}

const base = {
  palette: {
    mode: 'light',
    colors,
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
    link: colors.black,
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
    link: colors.white,
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
