import { Schema, model, Document } from "mongoose";
import type { IOrder } from "@shared/types.js"


const OrderSchema = new Schema<IOrder>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    items: [{
        img: { type: String, required: true },
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    }],
    totalPrice: { type: Number, required: true },
}, { timestamps: true });

export default model<IOrder>("Order", OrderSchema);