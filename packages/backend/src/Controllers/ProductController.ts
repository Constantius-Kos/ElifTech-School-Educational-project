import type { Request, Response } from "express";
import Product from "../Models/Product.js";

export const getProducts = async (req: Request<{ shopId: string }>, res: Response) => {
    try {
        const { shopId } = req.params;
        const products = await Product.find({ shopId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" });
    }
}