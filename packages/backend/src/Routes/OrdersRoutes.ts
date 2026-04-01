import { Router } from "express";
import { createOrder, getUserOrders } from "../Controllers/OrdersControllers.js";

const router = Router();

router.post("/create", createOrder);
router.get("/user/:userId", getUserOrders);

export default router;