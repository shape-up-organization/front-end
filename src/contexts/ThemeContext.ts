import { createContext } from 'react'

type ThemeContextType = {
  isDark: boolean
  // eslint-disable-next-line no-unused-vars
  setIsDark: (isDark: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export { ThemeContext, type ThemeContextType }
