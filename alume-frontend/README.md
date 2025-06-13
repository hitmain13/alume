# Alume - Plataforma de Financiamento Estudantil

Uma plataforma completa para estudantes de medicina simularem e gerenciarem financiamentos estudantis personalizados.

## Funcionalidades

### Sistema de Autenticação

- Login e cadastro de estudantes
- Proteção de rotas automática
- Gerenciamento de sessão com JWT
- Logout seguro
- Header e footer completos com navegação

### Interface Completa

- **Header responsivo** com logo, navegação e ações rápidas
- **Menu mobile** com sheet lateral
- **Footer informativo** com links úteis e informações da empresa
- **Navegação intuitiva** com botões de voltar e ir à homepage
- **Logout fácil** acessível em qualquer página

### Dashboard Inteligente

- Resumo das simulações recentes
- Cards com totalizadores (quantidade, valor médio, total financiado)
- Gráficos da evolução das simulações
- Acesso rápido às principais funcionalidades

### Simulador de Financiamento

- Calculadora interativa com feedback em tempo real
- Campos para valor total, quantidade de parcelas e taxa de juros
- Cálculo automático usando fórmula Price (PMT)
- Controles deslizantes para facilitar ajustes
- Validação completa dos dados

### Histórico de Simulações

- Lista completa de todas as simulações
- Filtros avançados (data, valor, parcelas)
- Paginação para grandes volumes
- Exclusão de simulações
- Visualização detalhada

### Gestão de Perfil

- Visualização e edição de dados pessoais
- Validação de formulários
- Atualização segura das informações

## Tecnologias Utilizadas

### Frontend

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **React Router 6** - Navegação SPA
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **TailwindCSS** - Estilização
- **Radix UI** - Componentes acessíveis
- **Recharts** - Gráficos interativos
- **Lucide React** - Ícones
- **Date-fns** - Manipulação de datas
- **Vite** - Build tool e dev server

### Gerenciamento de Estado

- **Context API** - Autenticação e simulações
- **React Query** - Cache e sincronização

### Utilitários

- **Class Variance Authority** - Variantes de componentes
- **clsx + tailwind-merge** - Utilidade de classes
- **Sonner** - Notificações toast

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── ui/             # Biblioteca de componentes base
│   ├── layout/         # Componentes de layout
│   ├── charts/         # Componentes de gráficos
│   └── ...
├── contexts/           # Contextos React (Auth, Simulations)
├── hooks/              # Hooks customizados
├── lib/                # Utilitários e configurações
├── pages/              # Páginas da aplicação
├── schemas/            # Esquemas de validação Zod
├── types/              # Definições TypeScript
└── main.tsx           # Ponto de entrada
```

## Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- npm

### 1. Clone o repositório

```bash
git clone <repository-url>
cd alume-frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local`:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Execute o projeto

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## Integração com Backend

Esta aplicação frontend está preparada para se integrar com a API backend especificada:

### Endpoints Esperados

```
POST /api/register      # Cadastro de estudante
POST /api/login         # Autenticação
GET  /api/me           # Dados do usuário
PUT  /api/me           # Atualizar perfil
POST /api/simulations  # Criar simulação
GET  /api/simulations  # Listar simulações
DELETE /api/simulations/:id # Excluir simulação
```

### Autenticação

- JWT Bearer token no header `Authorization`
- Tokens com expiração de 5 minutos
- Redirecionamento automático para login quando expirado

### Tratamento de Erros

- Interceptação automática de erros HTTP
- Mensagens de erro user-friendly
- Loading states e feedback visual

## Cálculos Financeiros

### Fórmula Price Implementada

```
PMT = PV × (i / (1 - (1 + i)^-n))
```

Onde:

- PMT = Parcela mensal
- PV = Valor presente (total do financiamento)
- i = Taxa de juros mensal
- n = Número de parcelas

### Validações

- Valor total: R$ 1.000 a R$ 1.000.000
- Parcelas: 1 a 360 meses
- Taxa de juros: 0% a 50% ao mês

## Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Layout fluido**: Adapta-se a diferentes tamanhos de tela
- **Touch friendly**: Controles otimizados para touch

---
