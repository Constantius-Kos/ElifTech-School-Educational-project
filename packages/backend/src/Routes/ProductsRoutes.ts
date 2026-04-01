import { Router } from "express";
import { getProducts } from "../Controllers/ProductController.js";

const router = Router();

router.get("/:shopId", getProducts);

export default router;