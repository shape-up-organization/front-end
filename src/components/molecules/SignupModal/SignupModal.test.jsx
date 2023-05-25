import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { ThemeModeProvider } from '@contexts'
import { BrowserRouter } from 'react-router-dom'

import { SignupModal } from './SignupModal'

describe('SignupModal', () => {
  test('should render properly', () => {
    render(
      <ThemeModeProvider>
        <BrowserRouter>
          <SignupModal isOpen handleClose={vi.fn} switchModal={vi.fn} />
        </BrowserRouter>
      </ThemeModeProvider>
    )

    expect(screen.getByText('Sign up')).toBeInTheDocument()
  })
})
