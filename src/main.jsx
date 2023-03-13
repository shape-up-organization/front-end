import { ThemeModeProvider } from '@contexts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'typeface-ubuntu'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <App />
    </ThemeModeProvider>
  </React.StrictMode>
)
