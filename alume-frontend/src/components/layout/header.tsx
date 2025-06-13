import { ThemeToggle } from '@/components/common/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/contexts/auth-context'
import { cn } from '@/lib/utils'
import {
  Calculator,
  History,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  ArrowLeft,
  Home,
  Plus,
  FileText,
} from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Nova Simulação', href: '/simulation/new', icon: Calculator },
  { name: 'Histórico', href: '/simulation/history', icon: History },
  { name: 'Perfil', href: '/profile', icon: User },
]

const quickActions = [
  {
    name: 'Nova Simulação',
    href: '/simulation/new',
    icon: Plus,
    primary: true,
  },
  { name: 'Ver Histórico', href: '/simulation/history', icon: FileText },
]

export function Header() {
  const { student, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleBack = () => {
    navigate(-1)
  }

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName) return 'FM'
    return `${firstName?.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
  }

  const getCurrentPageTitle = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Dashboard'
    if (path === '/simulation/new') return 'Nova Simulação'
    if (path === '/simulation/history') return 'Histórico de Simulações'
    if (path === '/profile') return 'Meu Perfil'
    return 'Alume'
  }

  const showBackButton = location.pathname !== '/dashboard'

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            {showBackButton && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="lg:hidden h-10 w-10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            <Link
              to="/dashboard"
              className="flex items-center flex-col space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center justify-center p-4 rounded-lg">
                <img src="/alume.svg" alt="Alume" className="w-16 h-8" />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? 'text-teal-600 bg-teal-50'
                        : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50',
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {getCurrentPageTitle()}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.name}
                    asChild
                    variant={action.primary ? 'default' : 'outline'}
                    size="sm"
                    className="h-9"
                  >
                    <Link to={action.href}>
                      <Icon className="w-4 h-4 mr-2" />
                      {action.name}
                    </Link>
                  </Button>
                )
              })}
            </div>

            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="hidden lg:flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Voltar
              </Button>
            )}

            <ThemeToggle />

            <Button asChild variant="ghost" size="icon" className="h-10 w-10">
              <Link to="/dashboard">
                <Home className="h-5 w-5" />
              </Link>
            </Button>

            <div className="lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 p-4 border-b">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-teal-600 text-white">
                          {getInitials(student?.firstName, student?.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student?.firstName} {student?.lastName}
                        </p>
                        <p className="text-sm text-gray-500">{student?.email}</p>
                      </div>
                    </div>

                    <div className="p-4 border-b">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Ações Rápidas</h3>
                      <div className="space-y-2">
                        {quickActions.map((action) => {
                          const Icon = action.icon
                          return (
                            <Button
                              key={action.name}
                              asChild
                              variant={action.primary ? 'default' : 'outline'}
                              className="w-full justify-start"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <Link to={action.href}>
                                <Icon className="w-4 h-4 mr-2" />
                                {action.name}
                              </Link>
                            </Button>
                          )
                        })}
                      </div>
                    </div>

                    <div className="flex-1 p-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Navegação</h3>
                      <div className="space-y-1">
                        {navigation.map((item) => {
                          const Icon = item.icon
                          const isActive = location.pathname === item.href

                          return (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                                isActive
                                  ? 'text-teal-600 bg-teal-50'
                                  : 'text-gray-700 hover:text-teal-600 hover:bg-gray-50',
                              )}
                            >
                              <Icon className="w-5 h-5" />
                              <span>{item.name}</span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>

                    <div className="p-4 border-t">
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <LogOut className="w-5 h-5 mr-3" />
                        Sair
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-teal-600 text-white">
                        {getInitials(student?.firstName, student?.lastName)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {student?.firstName} {student?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">{student?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
