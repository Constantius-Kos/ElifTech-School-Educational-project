import type { Request, Response } from "express"
import User from "../Models/User.js"
import jwt from "jsonwebtoken"
import type { AuthRequest } from "../authMiddleware.js"
// import bcrypt from "bcryptjs"
// import { validationResult } from "express-validator"

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
function generateToken(user: any) {
    return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })
        if (!user) {
            const newUser = new User({ email, password })
            await newUser.save()
            const token = generateToken(newUser)
            res.status(201).json({ user: newUser, token })
        }
        const token = generateToken(user)
        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.userId
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}