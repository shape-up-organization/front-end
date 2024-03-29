import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { ChatPage } from '@pages/ChatPage'
import { ErrorPage } from '@pages/ErrorPage'
import { FeedPage } from '@pages/FeedPage'
import { HelpPage } from '@pages/HelpPage'
import { LandingPage } from '@pages/LandingPage'
import { QuestsPage } from '@pages/QuestsPage'
import { SearchPage } from '@pages/SearchPage'
import { SettingsPage } from '@pages/SettingsPage'
import { UserPage } from '@pages/UserPage'

import { ProtectedLayout } from '@layouts/ProtectedLayout'

import { AuthProvider } from './AuthProvider'

const RoutesProvider = () => (
  <BrowserRouter>
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route index element={<LandingPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route element={<ProtectedLayout />}>
            <Route path="feed" element={<FeedPage />} />
            <Route path="chats" element={<ChatPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="profile" element={<UserPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="quests" element={<QuestsPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  </BrowserRouter>
)

export { RoutesProvider }
