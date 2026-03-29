import cl from './Shop.module.css'
import type { IOrder, IOrderItem } from '@shared/types'
import imageMap from '../assets/images/index.js'

interface IOrderModalProps {
    order: IOrder
    setOrder: (order: IOrder | null) => void
    setOrderItems: (orderItems: IOrderItem[]) => void
}
function OrderModal({ order, setOrder, setOrderItems }: IOrderModalProps) {
    return (
        <div className={cl.OrderModal} onClick={() => { setOrder(null); setOrderItems([]) }}>
            <div className={cl.OrderModalContent} onClick={(e) => e.stopPropagation()}>
                <div className={cl.OrderModalHeader}>
                    <h2 style={{ color: '#4caf50' }}>Success!</h2>
                    <h3 style={{ color: '#4caf50' }}> Your order № {order._id} has been placed</h3>
                    <p>Date: {order.createdAt && new Date(order.createdAt).toLocaleString()}</p>
                    <p>Email: {order.email}</p>
                    <p>Phone: {order.phone}</p>
                    <p>Address: {order.address}</p>

                </div>
                <div className={cl.OrderModalBody}>
                    {order.items.map((item) => (
                        <div key={item.productId} className={cl.OrderItemCard}>
                            <img src={imageMap[item.img]} alt={item.name} />
                            <p>x{item.quantity}</p>
                            <p>{item.name}</p>
                            <p>Price: {item.price}</p>
                        </div>
                    ))}
                </div>
                <div className={cl.OrderModalFooter}>
                    <p>Total price: {order.totalPrice} UAH</p>
                    <button onClick={() => { setOrder(null); setOrderItems([]) }}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default OrderModal