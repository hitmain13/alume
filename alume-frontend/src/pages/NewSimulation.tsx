import { Layout } from '@/components/layout/layout'
import { SimulationForm } from '@/components/simulation/simulation-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSimulations } from '@/contexts/simulation-context'
import { SimulationRequest, Simulation } from '@/types'
import { Calculator, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function NewSimulation() {
  const navigate = useNavigate()
  const { createSimulation, isLoading } = useSimulations()

  const handleSubmit = async (data: SimulationRequest): Promise<Simulation> => {
    const simulation = await createSimulation(data)
    navigate('/dashboard')
    return simulation
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
              <Calculator className="h-8 w-8 mr-3 text-teal-600" />
              Nova Simulação
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Calcule sua parcela de financiamento estudantil personalizada
            </p>
          </div>
        </div>

        <Card className="mb-8 bg-teal-50 border-teal-200">
          <CardHeader>
            <CardTitle className="flex items-center text-teal-900">
              <Info className="h-5 w-5 mr-2" />
              Como funciona a simulação
            </CardTitle>
          </CardHeader>
          <CardContent className="text-teal-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-2">1. Valor Total</h4>
                <p className="text-sm">
                  Digite o valor total que você precisa financiar para seus estudos
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">2. Parcelas</h4>
                <p className="text-sm">Escolha em quantos meses você quer dividir o pagamento</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">3. Taxa de Juros</h4>
                <p className="text-sm">Defina a taxa de juros mensal para calcular sua parcela</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto">
          <SimulationForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <Card className="mt-8 max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Informações Importantes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📊 Cálculo das Parcelas</h4>
                <p className="text-sm text-gray-600">
                  Utilizamos a fórmula Price (PMT = PV × i / (1 - (1 + i)^-n)) para calcular
                  parcelas fixas com juros compostos.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💡 Dicas de Planejamento</h4>
                <p className="text-sm text-gray-600">
                  Simule diferentes cenários antes de decidir. Considere sua capacidade de pagamento
                  atual e futura.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🔒 Seus Dados</h4>
                <p className="text-sm text-gray-600">
                  Todas as simulações ficam salvas em sua conta para consulta posterior e
                  comparação.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📱 Próximos Passos</h4>
                <p className="text-sm text-gray-600">
                  Após a simulação, você pode revisar no histórico e eventualmente solicitar o
                  financiamento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
