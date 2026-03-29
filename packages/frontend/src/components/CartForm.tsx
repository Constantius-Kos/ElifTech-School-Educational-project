import cl from "./Shop.module.css"
import { useState } from "react"
import type { IOrderItem, IOrder } from "@shared/types"
import { createOrder } from "../api/api"

interface ICartFormProps {
    orderItems: IOrderItem[]
    setOrder: (order: IOrder) => void
}
function CartForm({ orderItems, setOrder }: ICartFormProps) {

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string>("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const order = await createOrder({ name, email, phone, address, items: orderItems, totalPrice })
        if (order) {
            setOrder(order)
            setName("")
            setEmail("")
            setPhone("")
            setAddress("")
        }
        console.log('order', order)
    }
    return (
        <form className={cl.CartForm} onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
            <button disabled={orderItems.length === 0 || !name || !email || !phone || !address} type="submit">Submit</button>
        </form>
    )
}

export default CartForm