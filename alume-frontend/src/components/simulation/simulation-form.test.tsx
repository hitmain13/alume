import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { SimulationForm } from './simulation-form'

describe('SimulationForm', () => {
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
  })

  it('should render form with default values', () => {
    render(<SimulationForm onSubmit={mockOnSubmit} />)

    expect(screen.getByTestId('valor-total-input')).toHaveValue(50000)
    expect(screen.getByTestId('quantidade-parcelas-input')).toHaveValue(24)
    expect(screen.getByTestId('juros-ao-mes-input')).toHaveValue(2.5)
  })

  it('should update monthly payment when values change', async () => {
    const user = userEvent.setup()
    render(<SimulationForm onSubmit={mockOnSubmit} />)

    const valorTotalInput = screen.getByTestId('valor-total-input')
    const parcelasInput = screen.getByTestId('quantidade-parcelas-input')
    const jurosInput = screen.getByTestId('juros-ao-mes-input')

    await user.clear(valorTotalInput)
    await user.type(valorTotalInput, '10000')

    await user.clear(parcelasInput)
    await user.type(parcelasInput, '12')

    await user.clear(jurosInput)
    await user.type(jurosInput, '2.5')

    expect(screen.getByTestId('calculated-monthly-payment')).toBeInTheDocument()
    expect(screen.getByTestId('calculated-total-payment')).toBeInTheDocument()
    expect(screen.getByTestId('calculated-total-interest')).toBeInTheDocument()
  })

  it('should call onSubmit with form data when submitted', async () => {
    const user = userEvent.setup()
    render(<SimulationForm onSubmit={mockOnSubmit} />)

    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      valor_total: 50000,
      quantidade_parcelas: 24,
      juros_ao_mes: 2.5,
    })
  })

  it('should show loading state when isLoading is true', () => {
    render(<SimulationForm onSubmit={mockOnSubmit} isLoading={true} />)

    const submitButton = screen.getByTestId('submit-button')
    expect(submitButton).toHaveTextContent('Salvando...')
    expect(submitButton).toBeDisabled()
  })

  it('should validate form inputs', async () => {
    const user = userEvent.setup()
    render(<SimulationForm onSubmit={mockOnSubmit} />)

    const valorTotalInput = screen.getByTestId('valor-total-input')
    const parcelasInput = screen.getByTestId('quantidade-parcelas-input')
    const jurosInput = screen.getByTestId('juros-ao-mes-input')

    await user.clear(valorTotalInput)
    await user.type(valorTotalInput, '500')

    await user.clear(parcelasInput)
    await user.type(parcelasInput, '0')

    await user.clear(jurosInput)
    await user.type(jurosInput, '51')

    const submitButton = screen.getByTestId('submit-button')
    await user.click(submitButton)

    expect(mockOnSubmit).not.toHaveBeenCalled()
  })
})
