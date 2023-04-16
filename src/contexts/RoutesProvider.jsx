import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatPage } from '@pages/ChatPage'
import { ErrorPage } from '@pages/ErrorPage'
import { FeedPage } from '@pages/FeedPage'
import { LandingPage } from '@pages/LandingPage'
import { SearchPage } from '@pages/SearchPage'

import { ProtectedLayout } from '@layouts/ProtectedLayout'

import { AuthProvider } from './AuthProvider'

const RoutesProvider = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route index element={<LandingPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path="feed" element={<FeedPage />} />
          <Route path="chats" element={<ChatPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
)

export { RoutesProvider }
