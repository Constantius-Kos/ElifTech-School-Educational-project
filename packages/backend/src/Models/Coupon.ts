import { Schema, model } from "mongoose";
import type { ICoupon } from "@shared/sharedTypes.js";

const couponSchema = new Schema<ICoupon>({
    shopName: { type: String, required: true },
    shopLogo: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    expiryDate: { type: String, required: true },
});

export default model<ICoupon>("Coupon", couponSchema);