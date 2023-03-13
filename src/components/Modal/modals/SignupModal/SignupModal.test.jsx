import { ThemeModeProvider } from '@contexts'
import { render } from '@testing-library/react'
import { describe, test, vi } from 'vitest'
import { SignupModal } from './SignupModal'

describe('SignupModal', () => {
  test('should render properly', () => {
    render(
      <ThemeModeProvider>
        <SignupModal isOpen handleClose={vi.fn} />
      </ThemeModeProvider>
    )
  })
})
