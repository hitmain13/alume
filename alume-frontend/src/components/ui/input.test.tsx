import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Input } from './input'

describe('Input', () => {
  it('should render input with label', () => {
    render(<Input>Name</Input>)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('should handle input changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<Input onChange={handleChange}>Name</Input>)

    const input = screen.getByLabelText('Name')
    await user.type(input, 'John')

    expect(handleChange).toHaveBeenCalled()
    expect(input).toHaveValue('John')
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled>Name</Input>)

    const input = screen.getByLabelText('Name')
    expect(input).toBeDisabled()
  })

  it('should show required indicator when required', () => {
    render(<Input required>Name</Input>)

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(<Input className="custom-class">Name</Input>)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveClass('custom-class')
  })

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter your name">Name</Input>)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveAttribute('placeholder', 'Enter your name')
  })

  it('should render with type', () => {
    render(<Input type="password">Password</Input>)

    const input = screen.getByLabelText('Password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('should render with value', () => {
    render(<Input value="John">Name</Input>)

    const input = screen.getByLabelText('Name')
    expect(input).toHaveValue('John')
  })
})
