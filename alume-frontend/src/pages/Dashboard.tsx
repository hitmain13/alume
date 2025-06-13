import { Layout } from '@/components/layout/layout'
import { SimulationCard } from '@/components/simulation/simulation-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { SimulationChart } from '@/components/visualization/simulation-chart'
import { useAuth } from '@/contexts/auth-context'
import { api } from '@/lib/api'
import { formatCurrency } from '@/lib/calculations'
import { Simulation, SimulationSummary } from '@/types'
import { Calculator, DollarSign, TrendingUp, FileText, Plus, BarChart3 } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

type Summary = {
  total_simulations: number
  total_amount: number
  average_installments: number
  average_interest: number
  recent_simulations: Simulation[]
}

export default function Dashboard() {
  const { student } = useAuth()
  const [summary, setSummary] = useState<SimulationSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const calculateSummary = (simulations: Simulation[]): Summary => {
    const total_simulations = simulations.length
    const total_amount = simulations.reduce((acc, sim) => acc + sim.total_amount, 0)
    const average_installments =
      simulations.reduce((acc, sim) => acc + sim.installments_number, 0) / total_simulations || 0
    const average_interest =
      simulations.reduce((acc, sim) => acc + sim.interest_per_month, 0) / total_simulations || 0
    const recent_simulations = simulations.slice(0, 5)

    return {
      total_simulations,
      total_amount,
      average_installments,
      average_interest,
      recent_simulations,
    }
  }

  const loadDashboardData = useCallback(async () => {
    try {
      setIsLoading(true)
      const simulations = await api.getDashboardSummary()
      const summaryData = calculateSummary(simulations)
      setSummary(summaryData)
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadDashboardData()
  }, [loadDashboardData])

  const welcomeMessage = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Bom dia'
    if (hour < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {welcomeMessage()}, {student?.firstName}! 👋
          </h1>
          <p className="text-gray-600 mt-2">Gerencie suas simulações de financiamento estudantil</p>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-teal-50 to-indigo-50 rounded-xl p-6 border border-teal-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-teal-900 mb-2">
                  Pronto para simular um financiamento?
                </h2>
                <p className="text-teal-700 text-sm">
                  Use nossa calculadora avançada ou revise suas simulações anteriores
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button asChild>
                  <Link to="/simulation/new">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Simulação
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/simulation/history">
                    <FileText className="w-4 h-4 mr-2" />
                    Ver Histórico
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Simulações
              </CardTitle>
              <Calculator className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  {summary?.total_simulations || 0}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Simulações realizadas</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Financiado</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(summary?.total_amount || 0)}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Soma de todos os valores</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Média de Parcelas</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-orange-600">
                  {Math.round(summary?.average_installments || 0)}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Parcelas por simulação</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Juros Médio</CardTitle>
              <TrendingUp className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold text-red-600">
                  {(summary?.average_interest || 0).toFixed(2)}%
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">Taxa média mensal</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Simulações Recentes</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/simulation/history">Ver todas</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {isLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-6 w-32" />
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Skeleton className="h-4 w-20 mb-1" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                          <div>
                            <Skeleton className="h-4 w-16 mb-1" />
                            <Skeleton className="h-5 w-20" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : summary?.recent_simulations && summary.recent_simulations.length > 0 ? (
                summary.recent_simulations.map((simulation) => (
                  <SimulationCard key={simulation.id} simulation={simulation} showActions={false} />
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhuma simulação encontrada
                    </h3>
                    <p className="text-gray-600 mb-4">Crie sua primeira simulação para começar</p>
                    <Button asChild>
                      <Link to="/simulation/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Criar Simulação
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Evolução das Simulações</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>

            {isLoading ? (
              <Card>
                <CardContent className="p-6">
                  <Skeleton className="h-80 w-full" />
                </CardContent>
              </Card>
            ) : (
              <SimulationChart simulations={summary?.recent_simulations || []} type="line" />
            )}
          </div>
        </div>

        <Card className="mt-8 bg-gradient-to-r from-teal-50 to-indigo-50 border-teal-200">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-teal-900 mb-3">
              💡 Dicas para um bom financiamento
            </h3>
            <ul className="space-y-2 text-teal-800 text-sm">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Compare diferentes cenários de parcelas e juros
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Considere parcelas que caibam no seu orçamento
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Lembre-se: períodos maiores = parcelas menores, mas mais juros
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
