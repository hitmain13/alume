import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage } from '@/lib/calculations'
import { Simulation } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar, DollarSign, Percent, Target, Trash2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

interface SimulationCardProps {
  simulation: Simulation
  onDelete?: (id: number) => void
  showActions?: boolean
}

export function SimulationCard({ simulation, onDelete, showActions = true }: SimulationCardProps) {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(simulation.id)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow duration-200" data-testid="simulation-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900" data-testid="simulation-total">
            {formatCurrency(simulation.total_amount)}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs" data-testid="simulation-installments">
              {simulation.installments_number}x
            </Badge>
            {showActions && onDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                    data-testid="delete-button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Excluir simulação</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir esta simulação? Esta ação não pode ser
                      desfeita.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                      data-testid="confirm-delete"
                    >
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Parcela mensal</p>
              <p
                className="text-sm font-semibold text-green-600 truncate"
                data-testid="monthly-payment"
              >
                {formatCurrency(simulation.monthly_installment_value)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Percent className="h-4 w-4 text-orange-600" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Taxa mensal</p>
              <p
                className="text-sm font-semibold text-orange-600 truncate"
                data-testid="interest-rate"
              >
                {formatPercentage(simulation.interest_per_month / 100)}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-teal-600" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Parcelas</p>
              <p className="text-sm font-semibold text-teal-600 truncate">
                {simulation.installments_number} meses
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-purple-600" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500">Criada em</p>
              <p
                className="text-sm font-semibold text-purple-600 truncate"
                data-testid="creation-date"
              >
                {format(new Date(simulation.created_at), 'dd/MM/yyyy', {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Total a pagar:</span>
            <span className="font-semibold text-gray-700" data-testid="total-payment">
              {formatCurrency(simulation.total_amount)}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
            <span>Juros totais:</span>
            <span className="font-semibold text-red-600" data-testid="total-interest">
              {formatCurrency(simulation.total_amount - simulation.total_amount)}
            </span>
          </div>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4">
          <div className="flex justify-between items-center">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/simulation/${simulation.id}`}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Detalhes
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
