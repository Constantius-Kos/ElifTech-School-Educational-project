import type { Request, Response } from "express";
import Coupon from "../Models/Coupon.js";

export const getCoupons = async (req: Request, res: Response) => {
    try {
        const coupons = await Coupon.find({});
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons" });
    }
}