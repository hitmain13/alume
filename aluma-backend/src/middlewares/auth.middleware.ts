import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const tokenSchema = z.object({
  authorization: z.string().regex(/^Bearer .+$/),
})

type JwtPayload = {
  id: number
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = tokenSchema.parse(req.headers)

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

    req.user = { id: decoded.id }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido ou expirado' })
  }
}
