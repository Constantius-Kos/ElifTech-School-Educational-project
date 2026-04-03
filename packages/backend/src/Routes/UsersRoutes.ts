import { Router } from "express"
import { login, getProfile } from "../Controllers/UsersControllers.js"
import { authMiddleware } from "../authMiddleware.js"

const router = Router()

router.post("/login", login)
router.get("/profile", authMiddleware, getProfile)

export default router