import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/calculations'
import { Simulation } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  TooltipProps,
} from 'recharts'

interface SimulationChartProps {
  simulations: Simulation[]
  type?: 'line' | 'bar'
}

export function SimulationChart({ simulations, type = 'line' }: SimulationChartProps) {
  const chartData = simulations
    .slice()
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((simulation, index) => ({
      id: simulation.id,
      index: index + 1,
      data: format(new Date(simulation.created_at), 'dd/MM', {
        locale: ptBR,
      }),
      valorTotal: simulation.total_amount,
      parcelaMensal: simulation.monthly_installment_value,
      quantidadeParcelas: simulation.installments_number,
      jurosAoMes: simulation.interest_per_month,
    }))
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900 mb-2">Simulação #{data.index}</p>
          <p className="text-sm text-gray-600 mb-1">Data: {data.data}</p>
          <p className="text-sm text-teal-600">Valor Total: {formatCurrency(data.valorTotal)}</p>
          <p className="text-sm text-green-600">Parcela: {formatCurrency(data.parcelaMensal)}</p>
          <p className="text-sm text-orange-600">Parcelas: {data.quantidadeParcelas}x</p>
          <p className="text-sm text-purple-600">Taxa: {data.jurosAoMes}% a.m.</p>
        </div>
      )
    }
    return null
  }

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Evolução das Simulações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <p className="text-lg font-medium">Nenhuma simulação encontrada</p>
              <p className="text-sm">Crie sua primeira simulação para ver os gráficos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução das Simulações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" fontSize={12} tick={{ fill: '#6B7280' }} />
                <YAxis
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="valorTotal"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="data" fontSize={12} tick={{ fill: '#6B7280' }} />
                <YAxis
                  fontSize={12}
                  tick={{ fill: '#6B7280' }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="valorTotal" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
