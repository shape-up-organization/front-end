import { ThemeModeProvider } from '@contexts'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import { SignupModal } from './SignupModal'

describe('SignupModal', () => {
  test('should render properly', () => {
    render(
      <ThemeModeProvider>
        <BrowserRouter>
          <SignupModal isOpen handleClose={vi.fn} />
        </BrowserRouter>
      </ThemeModeProvider>
    )

    expect(screen.getByText('Crie sua conta')).toBeInTheDocument()
  })
})
