import { Router } from "express";
import { getShops } from "../Controllers/ShopController.js";

const router = Router();

router.get("/", getShops);

export default router;