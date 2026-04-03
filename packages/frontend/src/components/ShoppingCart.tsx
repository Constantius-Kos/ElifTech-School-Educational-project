import cl from './Shop.module.css';
import CartForm from './CartForm';
import CartItems from './CartItems';
import OrderModal from './OrderModal';
import { useAppContext } from '../Context.tsx';



function ShoppingCart() {
  const { order } = useAppContext()
  return <div className={cl.ShoppingCart}>
    {order && <OrderModal />}
    <CartForm />
    <CartItems />
  </div>;
}

export default ShoppingCart;
