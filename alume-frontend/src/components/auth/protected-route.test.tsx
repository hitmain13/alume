import { useAuth } from '@/contexts/auth-context'
import { render, screen } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { ProtectedRoute } from './protected-route'

vi.mock('@/contexts/AuthContext')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
    Navigate: ({ to }: { to: string }) => <div data-testid="navigate">{to}</div>,
  }
})

describe('ProtectedRoute', () => {
  const mockNavigate = vi.fn()
  const mockStudent = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
  })

  it('should show loading state when auth is loading', () => {
    vi.mocked(useAuth).mockReturnValue({
      student: null,
      isAuthenticated: false,
      isLoading: true,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
      refreshUser: vi.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should redirect to login when not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      student: null,
      isAuthenticated: false,
      isLoading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
      refreshUser: vi.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    expect(mockNavigate).toHaveBeenCalledWith('/login', {
      state: { from: '/dashboard' },
    })
  })

  it('should render children when authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      student: mockStudent,
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      updateProfile: vi.fn(),
      refreshUser: vi.fn(),
    })

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
  })

  it('should show error state when auth context is not available', () => {
    vi.mocked(useAuth).mockReturnValue(null as unknown as ReturnType<typeof useAuth>)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
    )

    expect(screen.getByText('Erro de autenticação')).toBeInTheDocument()
  })
})
