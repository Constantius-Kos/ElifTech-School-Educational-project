import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
export interface AuthRequest extends Request {
    userId?: string
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(' ')[1]

    if (!token) return res.status(401).json({ message: 'No token' })
    try {
        const JWT_SECRET = process.env.JWT_SECRET || 'secret'

        // 2. Типизируем результат декодирования
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string }

        // 3. Используем 'id', так как именно его вы сохраняли при логине
        req.userId = decoded.id
        next()
    } catch {
        res.status(401).json({ message: 'Invalid token' })
    }
}