import { Router } from "express";
import { getCoupons, createUserCoupon, getUserCoupons } from "../Controllers/CouponsController.js";
import { authMiddleware } from "../authMiddleware.js";

const router = Router();

router.get("/", getCoupons);
router.post("/buy", authMiddleware, createUserCoupon);
router.get("/get", authMiddleware, getUserCoupons);

export default router;