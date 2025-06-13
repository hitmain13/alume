import { z } from 'zod'

export const createSimulationSchema = z.object({
  total_amount: z.number().positive('Valor total deve ser positivo'),
  installments_number: z.number().int().min(1, 'Número de parcelas deve ser maior que 0'),
  interest_per_month: z.number().min(0, 'Juros deve ser maior ou igual a 0'),
})
