import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach } from 'vitest'

import { ThemeProvider, useTheme } from './theme-provider'

function TestComponent() {
  const { theme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('system')}>System</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  const storageKey = 'alume-ui-theme'

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('uses default theme if no theme is stored', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey={storageKey}>
        <TestComponent />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light')
    expect(document.documentElement.classList.contains('light')).toBe(true)
  })

  it('uses stored theme if available', () => {
    localStorage.setItem(storageKey, 'dark')

    render(
      <ThemeProvider defaultTheme="light" storageKey={storageKey}>
        <TestComponent />
      </ThemeProvider>,
    )

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('updates theme and localStorage when setTheme is called', async () => {
    const user = userEvent.setup()

    render(
      <ThemeProvider defaultTheme="light" storageKey={storageKey}>
        <TestComponent />
      </ThemeProvider>,
    )

    await user.click(screen.getByText('Dark'))

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark')
    expect(localStorage.getItem(storageKey)).toBe('dark')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })
})
