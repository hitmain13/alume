import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { simulationFilterSchema, SimulationFilterData } from '@/schemas/simulation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

interface SimulationFiltersProps {
  onFilter: (filters: SimulationFilterData) => void
  onClear: () => void
  isLoading?: boolean
}

export function SimulationFilters({
  onFilter,
  onClear,
  isLoading = false,
}: SimulationFiltersProps) {
  const form = useForm<SimulationFilterData>({
    resolver: zodResolver(simulationFilterSchema),
    defaultValues: {
      min_amount: undefined,
      max_amount: undefined,
      min_installments: undefined,
      max_installments: undefined,
      start_date: undefined,
      end_date: undefined,
    },
  })

  const handleSubmit = (data: SimulationFilterData) => {
    onFilter(data)
  }

  const handleClear = () => {
    form.reset()
    onClear()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="min_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Mínimo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1000}
                        step={1000}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor Máximo</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1000}
                        step={1000}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="min_installments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcelas Mínimas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="max_installments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parcelas Máximas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        step={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="start_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Inicial</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="end_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data Final</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isLoading}>
                Filtrar
              </Button>
              <Button type="button" variant="outline" onClick={handleClear} disabled={isLoading}>
                Limpar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
