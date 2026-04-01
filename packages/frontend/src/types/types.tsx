import type { IShop, IProduct, IOrderItem, IOrder, IUser } from "@shared/sharedTypes.js"
import type { Dispatch } from "react"


export type Action =
    | { type: "SET_SHOPS"; payload: IShop[] }
    | { type: "SET_IS_LOADING"; payload: boolean }
    | { type: "SET_PRODUCTS"; payload: IProduct[] }
    | { type: "ADD_ITEM_TO_CART"; payload: IOrderItem }
    | { type: "CHANGE_CART_ITEM_QUANTITY"; payload: IOrderItem }
    | { type: "DELETE_ITEM_FROM_CART"; payload: IOrderItem }
    | { type: "CLEAR_ITEMS_IN_CART" }
    | { type: "SET_ORDER"; payload: IOrder | null }
    | { type: "SET_USER"; payload: IUser | null }
    | { type: "SET_USER_ORDERS"; payload: IOrder[] }

export interface IContext {
    shops: IShop[]
    dispatch: Dispatch<Action>
    isLoading: boolean
    products: IProduct[]
    cartItems: IOrderItem[]
    order: IOrder | null
    user: IUser | null
    userOrders: IOrder[] | null
}

export interface IState {
    shops: IShop[]
    isLoading: boolean
    products: IProduct[]
    cartItems: IOrderItem[]
    order: IOrder | null
    user: IUser | null
    userOrders: IOrder[] | null
}