import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import {
  calculateMonthlyPayment,
  formatCurrency,
  formatPercentage,
  percentageToDecimal,
} from '@/lib/calculations'
import { simulationSchema, SimulationFormData } from '@/schemas/simulation'
import { Simulation, SimulationRequest } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Calculator, TrendingUp, DollarSign } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface SimulationFormProps {
  onSubmit: (data: SimulationRequest) => Promise<Simulation>
  isLoading?: boolean
}

export function SimulationForm({ onSubmit, isLoading = false }: SimulationFormProps) {
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0)

  const form = useForm<SimulationFormData>({
    resolver: zodResolver(simulationSchema),
    defaultValues: {
      total_amount: 10000,
      installments_number: 12,
      interest_per_month: 1.5,
    },
  })

  const watchedValues = form.watch()

  useEffect(() => {
    const { total_amount, installments_number, interest_per_month } = watchedValues

    if (total_amount && installments_number && interest_per_month !== undefined) {
      const payment = calculateMonthlyPayment(
        total_amount,
        percentageToDecimal(interest_per_month),
        installments_number,
      )
      setMonthlyPayment(payment)
    }
  }, [watchedValues])

  const handleSubmit = async (data: SimulationFormData) => {
    try {
      await onSubmit({
        total_amount: data.total_amount,
        installments_number: data.installments_number,
        interest_per_month: data.interest_per_month,
      })
      form.reset()
    } catch (error) {
      console.error('Erro ao criar simulação:', error)
    }
  }

  const totalPayment = monthlyPayment * (watchedValues.installments_number || 0)
  const totalInterest = totalPayment - (watchedValues.total_amount || 0)

  return (
    <div className="space-y-6" data-testid="simulation-form">
      <Card className="bg-gradient-to-r from-teal-50 to-indigo-50 border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-teal-900">
            <Calculator className="h-5 w-5" />
            <span>Resultado da Simulação</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg border">
              <DollarSign className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Parcela Mensal</p>
              <p
                className="text-2xl font-bold text-green-600"
                data-testid="calculated-monthly-payment"
              >
                {formatCurrency(monthlyPayment)}
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border">
              <TrendingUp className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total a Pagar</p>
              <p className="text-xl font-bold text-teal-600" data-testid="calculated-total-payment">
                {formatCurrency(totalPayment)}
              </p>
            </div>

            <div className="text-center p-4 bg-white rounded-lg border">
              <Badge variant="destructive" className="mb-2">
                Juros
              </Badge>
              <p className="text-sm text-gray-600">Total de Juros</p>
              <p className="text-xl font-bold text-red-600" data-testid="calculated-total-interest">
                {formatCurrency(totalInterest)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Parâmetros do Financiamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="total_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Total</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Input
                          type="number"
                          min={1000}
                          max={1000000}
                          step={1000}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="text-lg"
                          data-testid="total-amount-input"
                        />
                        <div className="px-3">
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={1000000}
                            min={1000}
                            step={1000}
                            className="w-full"
                            data-testid="total-amount-slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>R$ 1.000</span>
                            <span>R$ 1.000.000</span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>Valor entre R$ 1.000 e R$ 1.000.000</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="installments_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantidade de Parcelas</FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <Input
                          type="number"
                          min={1}
                          max={360}
                          step={1}
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="text-lg"
                          data-testid="installments-number-input"
                        />
                        <div className="px-3">
                          <Slider
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            max={360}
                            min={1}
                            step={1}
                            className="w-full"
                            data-testid="installments-number-slider"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>1 mês</span>
                            <span>360 meses</span>
                          </div>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Entre 1 e 360 parcelas ({field.value} meses ={' '}
                      {Math.round((field.value / 12) * 10) / 10} anos)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <FormField
                control={form.control}
                name="interest_per_month"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taxa de Juros ao Mês</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Slider
                          min={0}
                          max={50}
                          step={0.1}
                          value={[field.value]}
                          onValueChange={([value]) => field.onChange(value)}
                        />
                        <div className="text-sm text-muted-foreground">
                          {formatPercentage(field.value)}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator />

              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={isLoading}
                data-testid="submit-button"
              >
                {isLoading ? 'Calculando...' : 'Calcular Simulação'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
