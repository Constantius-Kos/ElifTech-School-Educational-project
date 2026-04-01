import { Router } from "express"
import { login,  } from "../Controllers/UsersControllers.js"

const router = Router()

router.post("/login", login)

export default router