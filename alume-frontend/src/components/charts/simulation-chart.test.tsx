import { Simulation } from '@/types'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { SimulationChart } from './simulation-chart'

describe('SimulationChart', () => {
  const mockSimulations: Simulation[] = [
    {
      id: '1',
      id_estudante: 'student-1',
      valor_total: 10000,
      quantidade_parcelas: 12,
      juros_ao_mes: 2.5,
      valor_parcela_mensal: 1000,
      data_criacao: '2024-03-01T00:00:00.000Z',
    },
    {
      id: '2',
      id_estudante: 'student-1',
      valor_total: 20000,
      quantidade_parcelas: 24,
      juros_ao_mes: 3.0,
      valor_parcela_mensal: 1200,
      data_criacao: '2024-03-02T00:00:00.000Z',
    },
  ]

  it('should render empty state when no simulations', () => {
    render(<SimulationChart simulations={[]} />)

    expect(screen.getByText('Nenhuma simulação para exibir')).toBeInTheDocument()
  })

  it('should render chart with data', () => {
    render(<SimulationChart simulations={mockSimulations} />)

    expect(screen.getByTestId('simulation-chart')).toBeInTheDocument()
  })

  it('should render bar chart when type is bar', () => {
    render(<SimulationChart simulations={mockSimulations} type="bar" />)

    expect(screen.getByTestId('simulation-chart')).toBeInTheDocument()
    expect(screen.getByTestId('simulation-chart')).toHaveAttribute('data-type', 'bar')
  })

  it('should render line chart when type is line', () => {
    render(<SimulationChart simulations={mockSimulations} type="line" />)

    expect(screen.getByTestId('simulation-chart')).toBeInTheDocument()
    expect(screen.getByTestId('simulation-chart')).toHaveAttribute('data-type', 'line')
  })

  it('should sort simulations by date', () => {
    render(<SimulationChart simulations={[...mockSimulations].reverse()} />)

    const chart = screen.getByTestId('simulation-chart')
    const data = JSON.parse(chart.getAttribute('data-values') || '[]')

    expect(data[0].valor_total).toBe(20000)
    expect(data[1].valor_total).toBe(10000)
  })
})
