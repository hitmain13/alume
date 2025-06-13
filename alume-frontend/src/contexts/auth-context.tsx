import { api } from '@/lib/api'
import { getStoredUser, setStoredUser, setToken, clearAuthData } from '@/lib/auth'
import { Student, StudentRegistration, LoginCredentials, ApiError } from '@/types'
import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface AuthContextType {
  student: Student | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: StudentRegistration) => Promise<void>
  logout: () => void
  updateProfile: (data: Partial<Student>) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const initializeAuth = async () => {
    try {
      const storedUser = getStoredUser()
      if (storedUser) {
        setStudent(storedUser)
        await refreshUser()
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error)
      clearAuthData()
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initializeAuth()
  }, [])

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true)
      const response = await api.login(credentials)
      setStudent(response.student)
      setStoredUser(response.student)
      setToken(response.token)
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao fazer login')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (data: StudentRegistration) => {
    try {
      setIsLoading(true)
      const response = await api.register(data)
      setStudent(response.student)
      setStoredUser(response.student)
      setToken(response.token)
      toast.success('Cadastro realizado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao fazer cadastro')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setStudent(null)
    clearAuthData()
    navigate('/login')
  }

  const updateProfile = async (data: Partial<Student>) => {
    try {
      setIsLoading(true)
      const updatedStudent = await api.updateMe(data)
      setStudent(updatedStudent)
      setStoredUser(updatedStudent)
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      const apiError = error as ApiError
      toast.error(apiError.message || 'Erro ao atualizar perfil')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const refreshUser = async () => {
    try {
      const updatedStudent = await api.getMe()
      setStudent(updatedStudent)
      setStoredUser(updatedStudent)
    } catch (error) {
      console.error('Erro ao atualizar dados do usuário:', error)
      clearAuthData()
      navigate('/login')
    }
  }

  return (
    <AuthContext.Provider
      value={{
        student,
        isAuthenticated: !!student,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
