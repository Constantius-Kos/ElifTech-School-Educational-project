import { Schema, model } from "mongoose"
import type { IUserCoupon } from "@shared/sharedTypes.js"

const UserCouponSchema = new Schema<IUserCoupon>({
    ownerId: { type: String, ref: 'User', required: true },
    shopName: { type: String, required: true },
    shopLogo: { type: String, required: true },
    discountAmount: { type: Number, required: true },
    expiryDate: { type: String, required: true },
    quantity: { type: Number, required: true },
    couponId: { type: String, ref: 'Coupon', required: true },

})

const UserCoupon = model<IUserCoupon>("UserCoupon", UserCouponSchema)

export default UserCoupon