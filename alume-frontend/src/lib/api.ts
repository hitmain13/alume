import {
  Student,
  StudentRegistration,
  LoginCredentials,
  AuthResponse,
  Simulation,
  SimulationRequest,
  ApiErrorResponse,
} from '@/types'

import { getAuthHeaders } from './auth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`
    const headers = {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      const data = await response.json()

      if (!response.ok) {
        const error = data as ApiErrorResponse
        throw new ApiError(error.message || 'Erro na requisição', response.status, error.code)
      }

      return data as T
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError('Erro ao conectar com o servidor')
    }
  }

  private async authenticatedRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    })
  }

  async register(data: StudentRegistration): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  async getMe(): Promise<Student> {
    return this.authenticatedRequest<Student>('/api/me')
  }

  async updateMe(data: Partial<Student>): Promise<Student> {
    return this.authenticatedRequest<Student>('/api/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async createSimulation(data: SimulationRequest): Promise<Simulation> {
    return this.authenticatedRequest<Simulation>('/api/simulations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async getSimulationById(id: number): Promise<Simulation> {
    return this.authenticatedRequest<Simulation>(`/api/simulations/${id}`)
  }

  async deleteSimulation(id: number): Promise<void> {
    return this.authenticatedRequest<void>(`/api/simulations/${id}`, {
      method: 'DELETE',
    })
  }

  async getDashboardSummary(): Promise<Simulation[]> {
    return this.authenticatedRequest<Simulation[]>('/api/simulations')
  }
}

export const api = new ApiClient()
