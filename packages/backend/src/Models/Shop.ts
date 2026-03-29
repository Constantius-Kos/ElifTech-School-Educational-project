import { Schema, model, Document } from "mongoose";
import type { IShop } from "@shared/types.js"



const shopSchema = new Schema<IShop>({
    name: { type: String, required: true },
    img: { type: String },
    rating: { type: Number },
    category: { type: String },
});

export default model<IShop>("Shop", shopSchema);