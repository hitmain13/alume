import { Response } from 'express'
import { ZodError } from 'zod'

export class UnauthorizedError extends Error {
  statusCode = 401
  constructor(message: string = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export function errorHandler(err: unknown, res: Response) {
  console.error('Erro detalhado:', err)

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.errors,
    })
  }

  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).json({
      error: err.message,
    })
  }

  if (err instanceof Error) {
    return res.status(500).json({
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    })
  }

  return res.status(500).json({
    error: 'Internal server error',
  })
}
