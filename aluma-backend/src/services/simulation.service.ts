import { PrismaClient } from '@prisma/client'
import { createSimulationSchema } from '../schemas/simulation.schema'

const prisma = new PrismaClient()

export class SimulationService {
  async create(studentId: number, data: unknown) {
    console.log('Tentativa de criação de simulação')
    const { total_amount, installments_number, interest_per_month } =
      createSimulationSchema.parse(data)

    const monthly_installment_value = this.calculateMonthlyInstallment(
      total_amount,
      interest_per_month,
      installments_number
    )

    const simulation = await prisma.simulation.create({
      data: {
        student_id: studentId,
        total_amount,
        installments_number,
        interest_per_month,
        monthly_installment_value,
      },
    })

    return simulation
  }

  async listByStudent(studentId: number) {
    console.log('Tentativa de listagem de financiamentos por estudante')
    const simulations = await prisma.simulation.findMany({
      where: {
        student_id: studentId,
      },
      orderBy: {
        created_at: 'desc',
      },
    })

    console.log(simulations)
    return simulations
  }

  private calculateMonthlyInstallment(
    totalAmount: number,
    interestPerMonth: number,
    installmentsNumber: number
  ): number {
    const i = interestPerMonth / 100
    const pmt = totalAmount * (i / (1 - Math.pow(1 + i, -installmentsNumber)))
    return Number(pmt.toFixed(2))
  }
}
