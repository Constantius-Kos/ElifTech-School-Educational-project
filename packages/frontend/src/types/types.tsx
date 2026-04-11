import type {
  IShop,
  IProduct,
  IOrderItem,
  IOrder,
  IUser,
  ICoupon,
  IUserCoupon,
} from '@shared/sharedTypes.js';
import type { ActionDispatch } from 'react';

export type AppDispatch = ActionDispatch<[action: Action]>;

export type Action =
  | { type: 'LOGOUT' }
  | { type: 'SET_SHOPS'; payload: IShop[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_PRODUCTS'; payload: IProduct[] }
  | { type: 'ADD_ITEM_TO_CART'; payload: IOrderItem }
  | { type: 'CHANGE_CART_ITEM_QUANTITY'; payload: IOrderItem }
  | { type: 'DELETE_ITEM_FROM_CART'; payload: IOrderItem }
  | { type: 'CLEAR_ITEMS_IN_CART' }
  | { type: 'SET_ORDER'; payload: IOrder | null }
  | { type: 'SET_USER'; payload: IUser | null }
  | { type: 'SET_USER_ORDERS'; payload: IOrder[] }
  | { type: 'SET_COUPONS'; payload: ICoupon[] }
  | { type: 'SET_USER_COUPONS'; payload: IUserCoupon[] }
  | { type: 'SET_SELECTED_SHOP_ID'; payload: string };

export interface IContext {
  shops: IShop[];
  dispatch: ActionDispatch<[action: Action]>;
  isLoading: boolean;
  products: IProduct[];
  cartItems: IOrderItem[];
  order: IOrder | null;
  user: IUser | null;
  userOrders: IOrder[] | null;
  coupons: ICoupon[];
  userCoupons: IUserCoupon[];
  selectedShopId: string;
}

export interface IState {
  shops: IShop[];
  isLoading: boolean;
  products: IProduct[];
  cartItems: IOrderItem[];
  order: IOrder | null;
  user: IUser | null;
  userOrders: IOrder[] | null;
  coupons: ICoupon[];
  userCoupons: IUserCoupon[];
  selectedShopId: string;
}
