import React from 'react'
import ReactDOM from 'react-dom/client'

import { RoutesProvider, SnackbarProvider, ThemeModeProvider } from '@contexts'
import '@styles/globals.css'

import 'typeface-ubuntu'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <SnackbarProvider>
        <RoutesProvider />
      </SnackbarProvider>
    </ThemeModeProvider>
  </React.StrictMode>
)
