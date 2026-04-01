import type { Request, Response } from "express"
import User from "../Models/User.js"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email, password })
        if (!user) {
            const newUser = new User({ email, password })
            await newUser.save()
            res.status(201).json(newUser)
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
