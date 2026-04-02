import axios from "axios";
import type { ICoupon, IOrder, IProduct, IShop, IUser,  } from "@shared/sharedTypes.js"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export const getShops = async (): Promise<IShop[]> => {
    const response = await axios.get(`${API_URL}/shops`);
    return response.data;
}

export const getProducts = async (shopId: string): Promise<IProduct[]> => {
    const response = await axios.get(`${API_URL}/products/${shopId}`);
    return response.data;
}

export const createOrder = async (order: IOrder): Promise<IOrder> => {
    const response = await axios.post(`${API_URL}/orders/create`, order);
    return response.data;
}

export const login = async (email: string, password: string): Promise<IUser> => {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
}

export const getUserOrders = async (userId: string,): Promise<IOrder[]> => {
    const response = await axios.get(`${API_URL}/orders/user/${userId}`);
    return response.data;
}

export const getCoupons = async (): Promise<ICoupon[]> => {
    const response = await axios.get(`${API_URL}/coupons`);
    return response.data;
}