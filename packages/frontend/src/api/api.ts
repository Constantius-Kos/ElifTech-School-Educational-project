import axios from "axios";
import type { IOrder } from "@shared/types.js"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3002";

export const getShops = async () => {
    const response = await axios.get(`${API_URL}/shops`);
    return response.data;
}

export const getProducts = async (shopId: string) => {
    const response = await axios.get(`${API_URL}/shops/${shopId}/products`);
    return response.data;
}

export const createOrder = async (order: IOrder) => {
    const response = await axios.post(`${API_URL}/orders`, order);
    return response.data;
}