import { Router } from "express";
import { createOrder } from "../Controllers/OrdersControllers.js";

const router = Router();

router.post("/", createOrder);

export default router;