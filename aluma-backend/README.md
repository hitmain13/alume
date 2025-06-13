# Backend de financiamento estudantil - teste full-stack - Alume

API REST para simulação de financiamento estudantil com autenticação JWT.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma (ORM)
- PostgreSQL
- JWT
- Zod (validação)
- Vitest (testes)

## Setup

- Clone o repositório
- Instale as dependências:
```bash
npm install
```

- Copie o arquivo .env.example para .env e configure as variáveis

- Inicie o banco de dados com Docker:
```bash
docker-compose up -d
```

- Execute as migrações do Prisma:
```bash
npm prisma migrate dev
```

## Executando

Desenvolvimento:
```bash
npm dev
```

## Para rodar os testes

```bash
npm test
```

## Endpoints

### Autenticação

- POST /api/register - Registro de estudante
- POST /api/login - Login de estudante

### Simulações (requer autenticação)

- POST /api/simulations - Criar simulação
- GET /api/simulations - Listar simulações do estudante

## Autenticação

A API utiliza JWT para autenticação. O token expira em 5 minutos

Para acessar rotas protegidas, precisar incluir o header:
```
Authorization: Bearer seu_token_jwt
```

## Cálculo de parcelas

O valor da parcela mensal é calculado usando a fórmula de juros compostos (Price):

```
PMT = PV * (i / (1 - (1 + i)^-n))

Onde:
PMT = parcela mensal
PV = valor total do financiamento
i = juros ao mês (ex: 0.02 para 2%)
n = número de parcelas
```
