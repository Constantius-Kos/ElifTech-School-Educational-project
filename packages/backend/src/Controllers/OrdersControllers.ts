import type { Request, Response } from "express";
import Order from "../Models/Order.js";
import type { IOrder } from "@shared/sharedTypes.js"

export const createOrder = async (req: Request<{}, {}, IOrder>, res: Response) => {
    try {
        const order = new Order(req.body);
        console.log(req.body);
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error creating order" });
    }
}

export const getUserOrders = async (req: Request<{ userId: string }>, res: Response) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error getting user orders" });
    }
}
