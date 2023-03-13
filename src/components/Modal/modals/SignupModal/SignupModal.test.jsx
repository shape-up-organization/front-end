import { ThemeModeProvider } from '@contexts'
import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import { SignupModal } from './SignupModal'

describe('SignupModal', () => {
  test('should render properly', () => {
    render(
      <ThemeModeProvider>
        <SignupModal isOpen handleClose={vi.fn} />
      </ThemeModeProvider>
    )

    expect(screen.getByText('Crie sua conta')).toBeInTheDocument()
  })
})
