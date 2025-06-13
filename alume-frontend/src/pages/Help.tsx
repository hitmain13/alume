import { Layout } from '@/components/layout/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  HelpCircle,
  Calculator,
  DollarSign,
  FileText,
  Mail,
  Phone,
  MessageCircle,
} from 'lucide-react'

const faqItems = [
  {
    question: 'Como funciona o cálculo das parcelas?',
    answer:
      'Utilizamos a fórmula Price (PMT = PV × i / (1 - (1 + i)^-n)) para calcular parcelas fixas com juros compostos. Esta é a fórmula padrão usada por bancos e instituições financeiras.',
  },
  {
    question: 'Posso alterar uma simulação depois de criada?',
    answer:
      'Atualmente não é possível alterar simulações existentes. Recomendamos criar uma nova simulação com os parâmetros desejados. Você pode excluir simulações antigas se necessário.',
  },
  {
    question: 'Qual é o valor mínimo e máximo para financiamento?',
    answer:
      'O valor mínimo é R$ 1.000 e o máximo é R$ 1.000.000. O número de parcelas pode variar de 1 a 360 meses (30 anos).',
  },
  {
    question: 'Como posso solicitar um financiamento real?',
    answer:
      'Esta plataforma é para simulações. Para solicitar um financiamento real, entre em contato conosco através dos canais disponíveis e nossa equipe te orientará sobre os próximos passos.',
  },
  {
    question: 'Meus dados estão seguros?',
    answer:
      'Sim! Utilizamos criptografia SSL/TLS e seguimos as normas da LGPD para proteger seus dados pessoais. Nunca compartilhamos suas informações com terceiros sem seu consentimento.',
  },
]

const supportChannels = [
  {
    name: 'Email',
    description: 'Resposta em até 24 horas',
    contact: 'suporte@alume.com',
    icon: Mail,
  },
  {
    name: 'Telefone',
    description: 'Seg-Sex 8h às 18h',
    contact: '(11) 9999-9999',
    icon: Phone,
  },
  {
    name: 'Chat Online',
    description: 'Disponível agora',
    contact: 'Iniciar conversa',
    icon: MessageCircle,
  },
]

export default function Help() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <HelpCircle className="h-10 w-10 mr-3 text-teal-600" />
            Central de Ajuda
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontre respostas para suas dúvidas sobre financiamento estudantil e uso da plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-teal-600" />
                  Perguntas Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                      {index < faqItems.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-teal-600" />
                  Como Usar a Plataforma
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Faça seu cadastro</h4>
                      <p className="text-sm text-gray-600">
                        Crie sua conta com email e senha seguros
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Acesse o simulador</h4>
                      <p className="text-sm text-gray-600">
                        Use nossa calculadora para simular diferentes cenários
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Compare opções</h4>
                      <p className="text-sm text-gray-600">
                        Analise suas simulações no histórico e escolha a melhor
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-teal-100 text-teal-600 rounded-full text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Entre em contato</h4>
                      <p className="text-sm text-gray-600">
                        Fale conosco para solicitar seu financiamento
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-teal-600" />
                  Precisa de Ajuda?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {supportChannels.map((channel, index) => {
                    const Icon = channel.icon
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Icon className="h-5 w-5 text-teal-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{channel.name}</h4>
                          <p className="text-xs text-gray-500">{channel.description}</p>
                          <p className="text-sm text-teal-600">{channel.contact}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator className="my-6" />

                <div className="text-center">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Dicas Importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="text-green-800">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Sempre compare diferentes cenários antes de decidir
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Considere sua capacidade de pagamento atual e futura
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Períodos maiores = parcelas menores, mas mais juros totais
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Mantenha suas informações de perfil sempre atualizadas
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}
