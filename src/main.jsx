import { ThemeModeProvider } from '@contexts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import 'typeface-ubuntu'

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
      <RouterProvider router={router} />
    </ThemeModeProvider>
  </React.StrictMode>
)
