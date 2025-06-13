import { Layout } from '@/components/layout/layout'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/contexts/auth-context'
import { updateProfileSchema, UpdateProfileFormData } from '@/schemas/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { User, Mail, Calendar, Save, Shield } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Profile() {
  const { student, updateProfile, isLoading } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: student?.firstName || '',
      lastName: student?.lastName || '',
      email: student?.email || '',
    },
  })

  const onSubmit = async (data: UpdateProfileFormData) => {
    try {
      await updateProfile(data)
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao requisitar dados de profile')
    }
  }

  const handleCancel = () => {
    form.reset({
      firstName: student?.firstName || '',
      lastName: student?.lastName || '',
      email: student?.email || '',
    })
    setIsEditing(false)
  }

  const getInitials = (name?: string, lastName?: string) => {
    if (!name || !lastName) return 'FM'
    return `${name.charAt(0)}${lastName?.charAt(0)}`.toUpperCase()
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center">
              <User className="h-8 w-8 mr-3 text-teal-600" />
              Meu Perfil
            </h1>
            <p className="text-gray-600 mt-3 text-lg">
              Gerencie e atualize suas informações pessoais
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8 text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarFallback className="bg-teal-600 text-white text-2xl">
                  {getInitials(student?.firstName, student?.lastName)}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-gray-900">
                {student?.firstName} {student?.lastName}
              </h2>
              <p className="text-gray-600 mt-1">{student?.email}</p>
              <Badge variant="secondary" className="mt-3">
                <Shield className="h-3 w-3 mr-1" />
                Estudante
              </Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Informações Pessoais</CardTitle>
              {!isEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)} disabled={isLoading}>
                  Editar
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>name</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Seu name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>lastName</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="Seu lastName" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} placeholder="seu@email.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Separator />

                    <div className="flex space-x-4">
                      <Button type="submit" disabled={isLoading} className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </Form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">name</p>
                        <p className="text-gray-900">{student?.firstName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">lastName</p>
                        <p className="text-gray-900">{student?.lastName}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 md:col-span-2">
                      <div className="flex-shrink-0">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Email</p>
                        <p className="text-gray-900">{student?.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Membro desde</p>
                      <p className="text-gray-900">
                        {format(new Date(), 'MMMM yyyy', { locale: ptBR })}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status da conta</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">
                          Ativa
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Segurança da conta</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Mantenha suas informações sempre atualizadas. Se precisar alterar sua senha,
                    entre em contato com o suporte.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
