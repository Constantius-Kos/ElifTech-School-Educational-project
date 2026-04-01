export interface IOrderItem {
    img: string,
    productId: string,
    name: string,
    price: number,
    quantity: number,
}

export interface IOrder {
    _id?: string,
    userId?: string,
    createdAt?: string,
    name: string,
    email: string,
    phone: string,
    address: string,
    items: IOrderItem[],
    totalPrice: number,
}
export interface IProduct {
    _id: string
    shopId: string,
    name: string,
    description: string,
    price: number,
    img: string,
    category: string,
}

export interface IShop {
    _id: string
    name: string;
    img: string;
    rating: number;
    category: string;
}

export interface IUser {
    _id?: string
    name?: string
    email: string
    password: string
}
