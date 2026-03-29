import { useState } from 'react';
import cl from './Shop.module.css';
import CartForm from './CartForm';
import CartItems from './CartItems';
import OrderModal from './OrderModal';
import type { IOrderItem, IOrder } from '@shared/types';

interface IShoppingCart {
  orderItems: IOrderItem[]
  updateOrderItem: (quantity: number, orderItem: IOrderItem) => void
  setOrderItems: (orderItems: IOrderItem[]) => void
  deleteOrderItem: (orderItem: IOrderItem) => void
}


function ShoppingCart({ orderItems, updateOrderItem, setOrderItems, deleteOrderItem }: IShoppingCart) {
  const [order, setOrder] = useState<IOrder | null>(null)


  return <div className={cl.ShoppingCart}>
    {order && <OrderModal order={order} setOrder={setOrder} setOrderItems={setOrderItems} />}
    <CartForm orderItems={orderItems} setOrder={setOrder} />
    <CartItems orderItems={orderItems} updateOrderItem={updateOrderItem} deleteOrderItem={deleteOrderItem}  />
  </div>;
}

export default ShoppingCart;
