import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Home, ArrowLeft, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-indigo-50 px-4">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-16 w-16 text-teal-600" />
          </div>

          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Página não encontrada</h2>

          <p className="text-gray-600 mb-8">
            A página que você está procurando não existe ou foi movida.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/dashboard">
                <Home className="h-4 w-4 mr-2" />
                Ir para Dashboard
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full">
              <Link to="/login">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Fazer Login
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NotFound
