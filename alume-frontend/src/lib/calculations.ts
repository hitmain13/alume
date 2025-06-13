export function calculateMonthlyPayment(
  totalAmount: number,
  interestRate: number,
  installmentsNumber: number,
): number {
  if (interestRate === 0) return totalAmount / installmentsNumber

  const i = interestRate
  const n = installmentsNumber
  const pv = totalAmount

  const pmt = (pv * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1)
  return Math.round(pmt * 100) / 100
}

export function calculateTotalPayment(monthlyPayment: number, numberOfPayments: number): number {
  return monthlyPayment * numberOfPayments
}

export function calculateTotalInterest(totalPayment: number, principal: number): number {
  return totalPayment - principal
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100)
}

export function percentageToDecimal(value: number): number {
  return value / 100
}

export function validateSimulationInputs(
  totalAmount: number,
  installmentsNumber: number,
  interestPerMonth: number,
): { isValid: boolean; message?: string } {
  if (totalAmount < 1000 || totalAmount > 1000000) {
    return {
      isValid: false,
      message: 'O valor total deve estar entre R$ 1.000 e R$ 1.000.000',
    }
  }

  if (installmentsNumber < 1 || installmentsNumber > 360) {
    return {
      isValid: false,
      message: 'A quantidade de parcelas deve estar entre 1 e 360',
    }
  }

  if (interestPerMonth < 0 || interestPerMonth > 50) {
    return {
      isValid: false,
      message: 'A taxa de juros deve estar entre 0% e 50% ao mês',
    }
  }

  return { isValid: true }
}
