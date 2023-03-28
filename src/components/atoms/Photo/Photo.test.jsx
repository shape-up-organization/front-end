import { render, screen } from '@testing-library/react'
import { expect, describe, test } from 'vitest'
import { Photo } from './Photo'

describe('Photo', () => {
  test('shoulder render photo', () => {
    render(<Photo />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
