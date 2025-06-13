import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Footer } from './footer'

describe('Footer', () => {
  it('should render footer with copyright', () => {
    render(<Footer />)

    expect(screen.getByText(/© 2024 Alume/i)).toBeInTheDocument()
  })

  it('should render social media links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /twitter/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /instagram/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
  })

  it('should render navigation links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /sobre/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /termos/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /privacidade/i })).toBeInTheDocument()
  })

  it('should render with correct classes', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-background', 'border-t')
  })

  it('should render with custom className', () => {
    render(<Footer className="custom-class" />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('custom-class')
  })

  it('should render with default className when not provided', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('bg-background', 'border-t')
  })
})
