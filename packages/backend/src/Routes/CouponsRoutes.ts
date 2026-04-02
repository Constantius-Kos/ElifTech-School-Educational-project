import { Router } from "express";
import { getCoupons } from "../Controllers/CouponsController.js";

const router = Router();

router.get("/", getCoupons);

export default router;