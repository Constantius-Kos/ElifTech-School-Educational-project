import cl from "./Cart.module.css"
import CartForm from "./CartForm"
import CartItems from "./CartItems"
import OrderModal from "./OrderModal"
import { useAppContext } from "../Context.tsx"
function Cart() {
    const { order, cartItems } = useAppContext()
    console.log('Cart order:', order)
    console.log('Cart cartItems:', cartItems)
    return (
        <div className={cl.Cart}>
            {order && <OrderModal />}
            {cartItems.length ? <CartForm /> : <p>Your cart is empty</p>}
            <CartItems />
        </div>
    )
}

export default Cart