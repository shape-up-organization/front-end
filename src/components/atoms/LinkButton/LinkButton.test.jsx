import { ThemeModeProvider } from '@contexts'
import { screen, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import { LinkButton } from './LinkButton'

describe('Testes in LinkButton', () => {
  test('shoulder render link button ', () => {
    render(
      <ThemeModeProvider>
        <BrowserRouter>
          <LinkButton>txt</LinkButton>
        </BrowserRouter>
      </ThemeModeProvider>
    )
    expect(screen.getByText('txt')).toBeInTheDocument()
  })
  const handleClick = vi.fn()
  test.only('click LinkButton test', () => {
    render(
      <ThemeModeProvider>
        <BrowserRouter>
          <LinkButton onClick={handleClick}>txt</LinkButton>
        </BrowserRouter>
      </ThemeModeProvider>
    )
    userEvent.click(screen.getByText('txt'))
    waitFor(() => expect(handleClick).toHaveBeenCalledTimes())
  })
})
