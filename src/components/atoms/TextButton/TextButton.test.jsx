import { screen, render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { TextButton } from './TextButton'

describe('TexteButton', () => {
  test('shoulder render button', () => {
    render(<TextButton />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
