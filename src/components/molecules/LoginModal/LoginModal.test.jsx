import { render, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { ThemeModeProvider } from '@contexts'
import { BrowserRouter } from 'react-router-dom'
import { LoginModal } from './LoginModal'

vi.mock('@contexts/AuthProvider', () => ({
  useAuth: vi.fn().mockReturnValue({
    signIn: vi.fn(),
  }),
}))

describe('LoginModal', () => {
  function renderCorrectly({ isOpen, handleClose, switchModal }) {
    return render(
      <ThemeModeProvider>
        <BrowserRouter>
          <LoginModal
            isOpen={isOpen}
            handleClose={handleClose}
            switchModal={switchModal}
          />
        </BrowserRouter>
      </ThemeModeProvider>
    )
  }
  test('Render correctly', () => {
    const { asFragment, findByText } = renderCorrectly({ isOpen: true })

    waitFor(() =>
      expect(asFragment(findByText('Esqueceu sua senha'))).toBeInTheDocument()
    )
  })
})
