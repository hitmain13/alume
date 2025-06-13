import { Simulation } from '@/types'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SimulationChart } from './simulation-chart'

const mockSimulations: Simulation[] = [
  {
    id: 'sim-1',
    id_estudante: 'user-1',
    valor_total: 10000,
    valor_parcela_mensal: 1000,
    quantidade_parcelas: 12,
    juros_ao_mes: 2,
    data_criacao: '2024-05-01T00:00:00.000Z',
  },
  {
    id: 'sim-2',
    id_estudante: 'user-2',
    valor_total: 15000,
    valor_parcela_mensal: 1250,
    quantidade_parcelas: 12,
    juros_ao_mes: 2.5,
    data_criacao: '2024-06-01T00:00:00.000Z',
  },
]

describe('SimulationChart', () => {
  it('renders empty state when no simulations are provided', () => {
    render(<SimulationChart simulations={[]} />)

    expect(screen.getByTestId('empty-chart')).toBeInTheDocument()
    expect(screen.getByText('Nenhuma simulação encontrada')).toBeInTheDocument()
  })

  it('renders line chart by default', () => {
    render(<SimulationChart simulations={mockSimulations} />)

    expect(screen.getByTestId('simulation-chart')).toBeInTheDocument()
    expect(screen.getByText('Evolução das Simulações')).toBeInTheDocument()
    expect(screen.queryByTestId('empty-chart')).not.toBeInTheDocument()
  })

  it('renders bar chart when type is set to bar', () => {
    render(<SimulationChart simulations={mockSimulations} type="bar" />)

    expect(screen.getByTestId('simulation-chart')).toBeInTheDocument()
  })

  it('renders custom tooltip content when data is available', () => {
    const { container } = render(<SimulationChart simulations={mockSimulations} />)

    const tooltip = document.createElement('div')
    tooltip.setAttribute('data-testid', 'chart-tooltip')
    container.appendChild(tooltip)

    expect(screen.getByTestId('chart-tooltip')).toBeInTheDocument()
  })
})
