import cl from './CartPage.module.css';
import CartForm from '../components/CartForm';
import CartItems from '../components/CartItems';
import OrderModal from '../components/OrderModal';
import { useAppContext } from '../context/Context.tsx';
function CartPage() {
  const { order, cartItems } = useAppContext();
  console.log('Cart order:', order);
  console.log('Cart cartItems:', cartItems);
  return (
    <div className={cl.Cart}>
      {order && <OrderModal />}
      {cartItems.length ? <CartForm /> : <p>Your cart is empty</p>}
      <CartItems />
    </div>
  );
}

export default CartPage;
