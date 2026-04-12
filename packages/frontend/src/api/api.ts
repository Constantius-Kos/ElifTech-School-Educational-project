import axios from 'axios';
import type {
  ICoupon,
  IOrder,
  //   IProduct,
  IShop,
  IUser,
  IUserCoupon,
  ILoginResponse,
  IProductResponse,
} from '@shared/sharedTypes.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

export const getShops = async (): Promise<IShop[]> => {
  const response = await axios.get(`${API_URL}/shops`);
  return response.data;
};

export const getProducts = async (params: {
  shopId: string;
  page?: number;
  limit?: number;
}): Promise<IProductResponse> => {
  const { shopId, ...query } = params;
  console.log(query);
  const response = await axios.get(`${API_URL}/products/${shopId}`, {
    params: query,
  });
  return response.data;
};

export const createOrder = async (order: IOrder): Promise<IOrder> => {
  const response = await axios.post(`${API_URL}/orders/create`, order);
  return response.data;
};

export const login = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  const response = await axios.post(`${API_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

export const getUserOrders = async (userId: string): Promise<IOrder[]> => {
  const response = await axios.get(`${API_URL}/orders/user/${userId}`);
  return response.data;
};

export const getCoupons = async (): Promise<ICoupon[]> => {
  const response = await axios.get(`${API_URL}/coupons`);
  return response.data;
};

export const getProfile = async (token: string): Promise<IUser> => {
  const response = await axios.get(`${API_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const buyCoupon = async (
  couponId: string,
  token: string
): Promise<{ message: string; userCouponArray: IUserCoupon[] }> => {
  const response = await axios.post(
    `${API_URL}/coupons/buy`,
    { couponId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getUserCoupons = async (token: string): Promise<IUserCoupon[]> => {
  const response = await axios.get(`${API_URL}/coupons/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
