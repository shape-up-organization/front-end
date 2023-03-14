import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  closeSnackbar,
  MaterialDesignContent,
  SnackbarProvider,
} from 'notistack'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import 'typeface-ubuntu'

import Close from '@mui/icons-material/Close'
import { IconButton, styled } from '@mui/material'

import { AuthProvider, ThemeModeProvider } from '@contexts'

import { ErrorPage } from '@components/ErrorPage'
import { LandingPage } from '@components/LandingPage'
import { LoggedPage } from '@components/LoggedPage'
import { ProtectedLayout } from '@components/ProtectedLayout'
import { getDesignTokens } from '@styles/theme'

import '@styles/globals.css'

const StyledNotistack = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent-success': {
    backgroundColor: getDesignTokens('light').palette.success.main,
  },
  '&.notistack-MuiContent-error': {
    backgroundColor: getDesignTokens('light').palette.error.main,
  },
}))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <SnackbarProvider
        autoHideDuration={5000}
        action={snackbarId => (
          <IconButton onClick={() => closeSnackbar(snackbarId)}>
            <Close fontSize="small" />
          </IconButton>
        )}
        Components={{
          success: StyledNotistack,
          error: StyledNotistack,
        }}
      >
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<ErrorPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route element={<ProtectedLayout />}>
                <Route path="logged" element={<LoggedPage />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeModeProvider>
  </React.StrictMode>
)
