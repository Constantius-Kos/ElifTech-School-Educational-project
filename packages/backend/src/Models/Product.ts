import { Schema, model, Document, Types } from "mongoose";
import type { IProduct } from "@shared/types.js"



const productSchema = new Schema<IProduct>({
    shopId: { type: String, ref: "Shop", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    img: { type: String },
    category: { type: String },
});

export default model<IProduct>("Product", productSchema);