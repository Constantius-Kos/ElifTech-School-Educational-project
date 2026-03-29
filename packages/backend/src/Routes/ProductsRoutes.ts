import { Router } from "express";
import { getProducts } from "../Controllers/ProductController.js";

const router = Router();

router.get("/:shopId/products", getProducts);

export default router;