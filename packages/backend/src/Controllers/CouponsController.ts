import type { Request, Response } from "express";
import type { AuthRequest } from "../authMiddleware.js";
import User from "../Models/User.js";
import Coupon from "../Models/Coupon.js";
import UserCoupon from "src/Models/UserCouponSchema.js";

export const getCoupons = async (req: Request, res: Response) => {
    try {
        const coupons = await Coupon.find({});
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Error fetching coupons" });
    }
}

export const createUserCoupon = async (req: AuthRequest, res: Response) => {
    try {
        console.log('createUserCoupon started', req.body)
        const userId = req.userId
        const couponId = req.body.couponId
        if (!userId || !couponId) {
            return res.status(400).json({ message: "User ID or Coupon ID is missing or invalid" });
        }

        const user = await User.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" })



        const existingUserCoupon = await UserCoupon.findOne({ ownerId: userId, couponId: couponId })
        if (existingUserCoupon) {
            existingUserCoupon.quantity += 1
            await existingUserCoupon.save()
            const userCouponArray = await UserCoupon.find({ ownerId: userId })
            console.log('User coupon updated successfully')
            res.status(200).json({ message: "User coupon updated successfully", userCouponArray })
        }
        else {
            const coupon = await Coupon.findById(couponId)
            if (!coupon) return res.status(404).json({ message: "Coupon not found" })
            const newUserCoupon = new UserCoupon({
                ownerId: userId,
                shopName: coupon.shopName,
                shopLogo: coupon.shopLogo,
                discountAmount: coupon.discountAmount,
                expiryDate: coupon.expiryDate,
                couponId: coupon._id,
                quantity: 1,
            })
            await newUserCoupon.save()
            const userCouponArray = await UserCoupon.find({ ownerId: userId })
            console.log('User coupon created successfully')
            res.status(200).json({ message: "User coupon created successfully", userCouponArray })
        }
    } catch (error) {
        console.log('Error creating user coupon')
        res.status(500).json({ message: "Error creating user coupon" });
    }
}

export const getUserCoupons = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.status(400).json({ message: "User ID is missing or invalid" });
        }
        const userCoupons = await UserCoupon.find({ ownerId: userId })
        res.status(200).json(userCoupons)
    } catch (error) {
        console.log('Error fetching user coupons')
        res.status(500).json({ message: "Error fetching user coupons" });
    }
}