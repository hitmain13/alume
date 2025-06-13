import { z } from 'zod'

export const simulationSchema = z.object({
  total_amount: z
    .number()
    .min(1000, 'O valor total deve ser no mínimo R$ 1.000')
    .max(1000000, 'O valor total deve ser no máximo R$ 1.000.000'),
  installments_number: z
    .number()
    .min(1, 'A quantidade de parcelas deve ser no mínimo 1')
    .max(360, 'A quantidade de parcelas deve ser no máximo 360'),
  interest_per_month: z
    .number()
    .min(0, 'A taxa de juros deve ser no mínimo 0%')
    .max(50, 'A taxa de juros deve ser no máximo 50%'),
})

export const simulationFilterSchema = z.object({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  minInstallments: z.number().optional(),
  maxInstallments: z.number().optional(),
})

export type SimulationFormData = z.infer<typeof simulationSchema>
export type SimulationFilterData = z.infer<typeof simulationFilterSchema>
