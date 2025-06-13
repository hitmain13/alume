import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/contexts/auth-context'
import { isTokenExpiringSoon } from '@/lib/auth'
import { ReactNode, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const authContext = useAuth()
  const location = useLocation()

  useEffect(() => {
    if (authContext?.student) {
      const token = localStorage.getItem('auth_token')
      if (token && isTokenExpiringSoon(token)) {
        authContext.refreshUser().catch(() => {
          toast.error('Sua sessão expirou. Por favor, faça login novamente.')
        })
      }
    }
  }, [])

  if (!authContext) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-red-600">Contexto de autenticação não disponível</p>
        </div>
      </div>
    )
  }

  const { isAuthenticated, isLoading } = authContext

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48 mx-auto" />
            <Skeleton className="h-4 w-32 mx-auto" />
          </div>
          <p className="text-sm text-gray-500">Verificando autenticação...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
