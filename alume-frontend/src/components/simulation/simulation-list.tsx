import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatPercentage } from '@/lib/calculations'
import { Simulation } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface SimulationListProps {
  simulations: Simulation[]
  onDelete: (id: number) => Promise<void>
  isLoading?: boolean
}

export function SimulationList({ simulations, onDelete, isLoading = false }: SimulationListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Minhas Simulações</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Parcelas</TableHead>
              <TableHead>Taxa de Juros</TableHead>
              <TableHead>Valor da Parcela</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {simulations.map((simulation) => (
              <TableRow key={simulation.id}>
                <TableCell>
                  {format(new Date(simulation.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                </TableCell>
                <TableCell>{formatCurrency(simulation.total_amount)}</TableCell>
                <TableCell>{simulation.installments_number}x</TableCell>
                <TableCell>{formatPercentage(simulation.interest_per_month)}</TableCell>
                <TableCell>{formatCurrency(simulation.monthly_installment_value)}</TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(simulation.id)}
                    disabled={isLoading}
                  >
                    Excluir
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
