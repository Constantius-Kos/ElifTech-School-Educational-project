import type { Request, Response } from "express";
import Shop from "../Models/Shop.js";

export const getShops = async (req: Request, res: Response) => {
    try {
        const shops = await Shop.find();
        console.log("Магазины отправлены")
        res.json(shops);
    } catch (error) {
        res.status(500).json({ message: "Error fetching shops" });
    }
}