import { useAuth } from '@/contexts/auth-context'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Navbar } from './navbar'

vi.mock('@/contexts/AuthContext')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  }
})

describe('Navbar', () => {
  const mockNavigate = vi.fn()
  const mockLogout = vi.fn()
  const mockStudent = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useAuth).mockReturnValue({
      student: mockStudent,
      isAuthenticated: true,
      isLoading: false,
      login: vi.fn(),
      register: vi.fn(),
      logout: mockLogout,
      updateProfile: vi.fn(),
      refreshUser: vi.fn(),
    })
  })

  it('should render navigation links', () => {
    render(<Navbar />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Nova Simulação')).toBeInTheDocument()
    expect(screen.getByText('Histórico')).toBeInTheDocument()
    expect(screen.getByText('Perfil')).toBeInTheDocument()
  })

  it('should highlight active link', () => {
    render(<Navbar />)

    const activeLink = screen.getByText('Nova Simulação')
    expect(activeLink).toHaveClass('active')
  })

  it('should handle navigation', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const dashboardLink = screen.getByText('Dashboard')
    await user.click(dashboardLink)

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  it('should handle logout', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const logoutButton = screen.getByText('Sair')
    await user.click(logoutButton)

    expect(mockLogout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('should show user info', () => {
    render(<Navbar />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('should show theme toggle', () => {
    render(<Navbar />)

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
