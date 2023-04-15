import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ErrorPage } from '@pages/ErrorPage'
import { LandingPage } from '@pages/LandingPage'
import { LoggedPage } from '@pages/LoggedPage'
import { ProtectedLayout } from '@templates/ProtectedLayout'

import { FeedPage } from '@pages/FeedPage'
import { AuthProvider } from './AuthProvider'

const RoutesProvider = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        {/* <Route index element={<LandingPage />} /> */}
        <Route index element={<FeedPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="logged" element={<LoggedPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export { RoutesProvider }
