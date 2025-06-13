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
  if (!simulations || simulations.length === 0) {
    return (
      <Card data-testid="empty-chart">
        <CardHeader>
          <CardTitle>Evolução das Simulações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            <div className="text-center">
              <p className="text-lg font-medium">Nenhuma simulação encontrada</p>
              <p className="text-sm">Crie sua primeira simulação para ver os gráficos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const chartData = simulations
    .slice()
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((simulation, index) => ({
      id: simulation.id,
      index: index + 1,
      data: format(new Date(simulation.created_at), 'dd/MM', {
        locale: ptBR,
      }),
      totalAmount: simulation.total_amount,
      monthlyInstallmentsValue: simulation.monthly_installment_value,
      installmentsNumber: simulation.installments_number,
      interestPerMonth: simulation.interest_per_month,
    }))

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div
          className="bg-background p-3 border border-border rounded-lg shadow-lg"
          data-testid="chart-tooltip"
        >
          <p className="font-semibold text-foreground mb-2">Simulação #{data.index}</p>
          <p className="text-sm text-muted-foreground mb-1">Data: {data.data}</p>
          <p className="text-sm text-teal-600">Valor Total: {formatCurrency(data.totalAmount)}</p>
          <p className="text-sm text-green-600">
            Parcela: {formatCurrency(data.monthlyInstallmentsValue)}
          </p>
          <p className="text-sm text-orange-600">Parcelas: {data.installmentsNumber}x</p>
          <p className="text-sm text-purple-600">Taxa: {data.interestPerMonth}% a.m.</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card data-testid="simulation-chart">
      <CardHeader>
        <CardTitle>Evolução das Simulações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {type === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="data"
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  activeDot={{
                    r: 6,
                    stroke: 'hsl(var(--primary))',
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="data"
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis
                  fontSize={12}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="totalAmount" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
