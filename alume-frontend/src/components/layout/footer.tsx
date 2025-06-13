import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cx } from 'class-variance-authority'
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube, ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'

const footerLinks = {
  platform: [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Nova Simulação', href: '/simulation/new' },
    { name: 'Histórico', href: '/simulation/history' },
    { name: 'Meu Perfil', href: '/profile' },
  ],
  support: [
    { name: 'Central de Ajuda', href: '/help' },
    { name: 'Como Funciona', href: '/how-it-works' },
    { name: 'Perguntas Frequentes', href: '/faq' },
    { name: 'Contato', href: '/contact' },
  ],
  legal: [
    { name: 'Termos de Uso', href: '/terms' },
    { name: 'Política de Privacidade', href: '/privacy' },
    { name: 'Política de Cookies', href: '/cookies' },
  ],
}

const socialLinks = [
  { name: 'Youtube', href: '#', icon: Youtube },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
]

export function Footer({ className }: { className?: string }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className={cx('bg-gray-200 text-gray-300', className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg">
                <img src="/alume.svg" alt="Alume" className="w-10 h-10" />
              </div>
              <div>
                <p className="text-sm text-gray-800 font-bold">Financiamento Estudantil</p>
              </div>
            </div>
            <p className="text-sm text-teal-600 leading-relaxed">
              A plataforma líder em financiamento estudantil para medicina, conectando estudantes às
              melhores oportunidades de financiamento personalizadas.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">contato@alume.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-teal-600" />
                <span className="text-teal-600">São Paulo, SP</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-teal-600 mb-4">Plataforma</h4>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-teal-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-teal-600 mb-4">Suporte</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-teal-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-teal-600 mb-4">Legal</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-teal-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div>
              <h5 className="text-sm font-semibold text-teal-600 mb-3">Redes Sociais</h5>
              <div className="flex space-x-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-teal-800" />

        <div className="flex flex-col justify-end md:flex-row items-center space-y-4 md:space-y-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="text-teal-600 hover:bg-teal-700 hover:text-white"
          >
            <ArrowUp className="h-4 w-4 mr-1" />
            Voltar ao topo
          </Button>
        </div>
      </div>
    </footer>
  )
}
