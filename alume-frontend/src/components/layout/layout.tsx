import { ReactNode } from 'react'

import { Footer } from './footer'
import { Header } from './header'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-teal-50 via-white to-indigo-50">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
