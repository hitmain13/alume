export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  created_at: string
  updated_at: string
}

export interface StudentRegistration {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  student: Student
}

export interface Simulation {
  id: number
  student_id: number
  total_amount: number
  installments_number: number
  interest_per_month: number
  monthly_installment_value: number
  created_at: string
  updated_at: string
}

export interface SimulationRequest {
  total_amount: number
  installments_number: number
  interest_per_month: number
}

export interface SimulationSummary {
  total_simulations: number
  total_amount: number
  average_installments: number
  average_interest: number
  recent_simulations: Simulation[]
}

export interface SimulationFilters {
  minValue?: number
  maxValue?: number
  minInstallments?: number
  maxInstallments?: number
  startDate?: string
  endDate?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  page: number
  total: number
  limit: number
}

export interface ApiErrorResponse {
  message: string
  code?: string
  status?: number
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}
