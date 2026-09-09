import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export function signAdminToken(): string {
  return jwt.sign({ sub: 'admin', role: 'admin' }, env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const token = header.slice('Bearer '.length)
  try {
    jwt.verify(token, env.JWT_SECRET)
    return next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' })
  }
}
