import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ErrorPage } from '@components/ErrorPage'
import { LandingPage } from '@components/LandingPage'
import { LoggedPage } from '@components/LoggedPage'
import { ProtectedLayout } from '@components/ProtectedLayout'

import { AuthProvider } from './AuthProvider'

const RoutesProvider = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="logged" element={<LoggedPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export { RoutesProvider }
