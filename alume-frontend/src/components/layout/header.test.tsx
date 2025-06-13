import { useAuth } from '@/contexts/auth-context'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useNavigate } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Header } from './header'

vi.mock('@/contexts/AuthContext')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  }
})

describe('Header', () => {
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

  it('should render header with logo and navigation', () => {
    render(<Header />)

    expect(screen.getByText('Alume')).toBeInTheDocument()
    expect(screen.getByText('Financiamento Estudantil')).toBeInTheDocument()
  })

  it('should show back button when not on dashboard', () => {
    render(<Header />)

    expect(screen.getByRole('button', { name: /voltar/i })).toBeInTheDocument()
  })

  it('should handle back navigation', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const backButton = screen.getByRole('button', { name: /voltar/i })
    await user.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should handle logout', async () => {
    const user = userEvent.setup()
    render(<Header />)

    const avatarButton = screen.getByRole('button', { name: /john doe/i })
    await user.click(avatarButton)

    const logoutButton = screen.getByText('Sair')
    await user.click(logoutButton)

    expect(mockLogout).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith('/login')
  })

  it('should show user initials in avatar', () => {
    render(<Header />)

    const avatar = screen.getByText('JD')
    expect(avatar).toBeInTheDocument()
  })

  it('should show quick actions', () => {
    render(<Header />)

    expect(screen.getByText('Nova Simulação')).toBeInTheDocument()
    expect(screen.getByText('Ver Histórico')).toBeInTheDocument()
  })

  it('should show theme toggle', () => {
    render(<Header />)

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
