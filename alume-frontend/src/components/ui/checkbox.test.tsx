import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Checkbox } from './checkbox'

describe('Checkbox', () => {
  it('should render checkbox with label', () => {
    render(<Checkbox id="test">Test Checkbox</Checkbox>)

    expect(screen.getByLabelText('Test Checkbox')).toBeInTheDocument()
  })

  it('should handle checked state', async () => {
    const user = userEvent.setup()

    render(<Checkbox id="test">Test Checkbox</Checkbox>)

    const checkbox = screen.getByLabelText('Test Checkbox')
    await user.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it('should handle default checked state', () => {
    render(
      <Checkbox id="test" defaultChecked>
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Test Checkbox')).toBeChecked()
  })

  it('should handle controlled checked state', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()

    render(
      <Checkbox id="test" checked onChange={onChange}>
        Test Checkbox
      </Checkbox>,
    )

    const checkbox = screen.getByLabelText('Test Checkbox')
    await user.click(checkbox)

    expect(onChange).toHaveBeenCalled()
  })

  it('should handle disabled state', () => {
    render(
      <Checkbox id="test" disabled>
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Test Checkbox')).toBeDisabled()
  })

  it('should handle required state', () => {
    render(
      <Checkbox id="test" required>
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Test Checkbox')).toBeRequired()
  })

  it('should handle custom className', () => {
    render(
      <Checkbox id="test" className="custom-class">
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Test Checkbox')).toHaveClass('custom-class')
  })

  it('should handle custom name', () => {
    render(
      <Checkbox id="test" name="custom-name">
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Test Checkbox')).toHaveAttribute('name', 'custom-name')
  })

  it('should handle custom value', () => {
    render(
      <Checkbox id="test" value="custom-value">
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Test Checkbox')).toHaveAttribute('value', 'custom-value')
  })

  it('should handle custom aria-label', () => {
    render(
      <Checkbox id="test" aria-label="Custom Label">
        Test Checkbox
      </Checkbox>,
    )

    expect(screen.getByLabelText('Custom Label')).toBeInTheDocument()
  })
})
