import { describe, it, expect } from 'vitest'

import {
  calculateMonthlyPayment,
  calculateTotalPayment,
  calculateTotalInterest,
  formatCurrency,
  formatPercentage,
  percentageToDecimal,
  validateSimulationInputs,
} from './calculations'

describe('calculateMonthlyPayment', () => {
  it('should calculate correct monthly payment with interest', () => {
    const result = calculateMonthlyPayment(10000, 0.01, 12)
    expect(result).toBeCloseTo(888.49, 2)
  })

  it('should handle zero interest', () => {
    const result = calculateMonthlyPayment(12000, 0, 12)
    expect(result).toBe(1000)
  })
})

describe('calculateTotalPayment', () => {
  it('should calculate total payment correctly', () => {
    const result = calculateTotalPayment(1000, 12)
    expect(result).toBe(12000)
  })
})

describe('calculateTotalInterest', () => {
  it('should calculate total interest correctly', () => {
    const result = calculateTotalInterest(12000, 10000)
    expect(result).toBe(2000)
  })
})

describe('formatCurrency', () => {
  it('should format number as BRL currency', () => {
    const result = formatCurrency(1234.56)
    expect(result).toBe('R$ 1.234,56')
  })
})

describe('formatPercentage', () => {
  it('should format number as percentage with 2 decimals', () => {
    const result = formatPercentage(0.1234)
    expect(result).toBe('12,34%')
  })
})

describe('percentageToDecimal', () => {
  it('should convert percentage to decimal', () => {
    const result = percentageToDecimal(12)
    expect(result).toBe(0.12)
  })
})

describe('validateSimulationInputs', () => {
  it('should return valid for correct inputs', () => {
    const result = validateSimulationInputs(50000, 60, 2)
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('should catch value <= 0', () => {
    const result = validateSimulationInputs(0, 60, 2)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Valor total deve ser maior que zero')
  })

  it('should catch value > 1,000,000', () => {
    const result = validateSimulationInputs(2000000, 60, 2)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Valor total não pode exceder R$ 1.000.000')
  })

  it('should catch invalid parcel quantity', () => {
    const result = validateSimulationInputs(50000, 0, 2)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Quantidade de parcelas deve estar entre 1 e 360')
  })

  it('should catch interest rate out of range', () => {
    const result = validateSimulationInputs(50000, 60, 60)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Taxa de juros deve estar entre 0% e 50% ao mês')
  })

  it('should return multiple errors if multiple issues exist', () => {
    const result = validateSimulationInputs(-100, 0, -5)
    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(1)
  })
})
