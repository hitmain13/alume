import { describe, it, expect } from 'vitest'
import { SimulationService } from './simulation.service'

describe('SimulationService', () => {
  const simulationService = new SimulationService()

  describe('calculateMonthlyInstallment', () => {
    it('should calculate monthly installment correctly', () => {
      const totalAmount = 10000
      const interestPerMonth = 2
      const installmentsNumber = 12

      const result = simulationService['calculateMonthlyInstallment'](
        totalAmount,
        interestPerMonth,
        installmentsNumber
      )

      expect(result).toBeCloseTo(945.6, 1)
    })

    it('should return correct value when interest rate is 0', () => {
      const totalAmount = 10000
      const interestPerMonth = 0
      const installmentsNumber = 12

      const result = simulationService['calculateMonthlyInstallment'](
        totalAmount,
        interestPerMonth,
        installmentsNumber
      )

      expect(result).toBe(833.33)
    })

    it('should handle large numbers correctly', () => {
      const totalAmount = 100000
      const interestPerMonth = 1.5
      const installmentsNumber = 24

      const result = simulationService['calculateMonthlyInstallment'](
        totalAmount,
        interestPerMonth,
        installmentsNumber
      )

      expect(result).toBeCloseTo(4992.94, 1)
    })
  })
})
