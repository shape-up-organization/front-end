import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatPage } from '@pages/ChatPage'
import { ErrorPage } from '@pages/ErrorPage'
import { LandingPage } from '@pages/LandingPage'

import { ProtectedLayout } from '@layouts/ProtectedLayout'

import { AuthProvider } from './AuthProvider'

const RoutesProvider = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="chat" element={<ChatPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export { RoutesProvider }
