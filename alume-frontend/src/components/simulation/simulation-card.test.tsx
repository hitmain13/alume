import { Simulation } from '@/types'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { format } from 'date-fns'
import { describe, it, expect, vi } from 'vitest'

import { SimulationCard } from './simulation-card'

const mockSimulation: Simulation = {
  id: 'sim-123',
  id_estudante: 'student-001',
  valor_total: 10000,
  quantidade_parcelas: 10,
  juros_ao_mes: 2.5,
  valor_parcela_mensal: 1200,
  data_criacao: new Date('2024-05-01').toISOString(),
}

describe('SimulationCard', () => {
  it('renders all simulation data correctly', () => {
    render(<SimulationCard simulation={mockSimulation} showActions={false} />)

    expect(screen.getByTestId('simulation-total')).toHaveTextContent('10.000')
    expect(screen.getByTestId('monthly-payment')).toHaveTextContent('1.200')
    expect(screen.getByTestId('interest-rate')).toHaveTextContent('2,50%')
    expect(screen.getByTestId('simulation-installments')).toHaveTextContent('10x')
    expect(screen.getByTestId('creation-date')).toHaveTextContent(
      format(new Date(mockSimulation.data_criacao), 'dd/MM/yyyy'),
    )
    expect(screen.getByTestId('total-payment')).toHaveTextContent('12.000')
    expect(screen.getByTestId('total-interest')).toHaveTextContent('2.000')
  })

  it('does not render delete button when showActions is false', () => {
    render(<SimulationCard simulation={mockSimulation} showActions={false} />)
    expect(screen.queryByTestId('delete-button')).not.toBeInTheDocument()
  })

  it('calls onDelete after confirmation', async () => {
    const handleDelete = vi.fn()
    const user = userEvent.setup()

    render(<SimulationCard simulation={mockSimulation} showActions onDelete={handleDelete} />)

    await user.click(screen.getByTestId('delete-button'))
    await user.click(await screen.findByTestId('confirm-delete'))

    expect(handleDelete).toHaveBeenCalledTimes(1)
    expect(handleDelete).toHaveBeenCalledWith('sim-123')
  })
})
