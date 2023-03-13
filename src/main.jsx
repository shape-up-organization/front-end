import React from 'react'
import ReactDOM from 'react-dom/client'

import { SnackbarProvider } from 'notistack'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'typeface-ubuntu'

import { ThemeModeProvider } from '@contexts'

import { ErrorPage } from '@components/ErrorPage'
import { LandingPage } from '@components/LandingPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'logged',
    element: <h1>Logado</h1>,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeModeProvider>
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </ThemeModeProvider>
  </React.StrictMode>
)
