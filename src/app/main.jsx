import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  ChatProvider,
  RoutesProvider,
  SnackbarProvider,
  ThemeModeProvider,
} from '@contexts'

import '@styles/globals.css'
import 'typeface-ubuntu'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <SnackbarProvider>
        <ChatProvider>
          <RoutesProvider />
        </ChatProvider>
      </SnackbarProvider>
    </ThemeModeProvider>
  </React.StrictMode>
)
