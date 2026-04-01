import cl from "./Cart.module.css"
import { useForm } from "react-hook-form" // Импортируем хук
import { createOrder } from "../api/api"
import { useAppContext } from "../Context.tsx"

// Типизируем поля формы
interface IFormInput {
    name: string
    email: string
    phone: string
    address: string
}

function CartForm() {
    const { cartItems, dispatch, user } = useAppContext()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IFormInput>({
        mode: "onChange",
        defaultValues: {
            phone: "+"
        }
    })
    // Функция, которая вызовется, если валидация прошла успешно
    const onSubmit = async (data: IFormInput) => {
        try {
            const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

            // В data уже лежат name, email, phone, address
            const order = await createOrder({ ...data, items: cartItems, totalPrice, userId: user?._id })

            if (order) {
                dispatch({ type: "SET_ORDER", payload: order })
                reset() // Очищает форму после успешного заказа
            }

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <form className={cl.CartForm} onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Поле Name */}
            <input
                className={errors.name ? cl.InputError : ""}
                placeholder="Name"
                {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })}
            />
            {errors.name && <span className={cl.ErrorText}>{errors.name.message}</span>}

            {/* Поле Email */}
            <input
                className={errors.email ? cl.InputError : ""}
                type="email"
                placeholder="Email"
                {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "example@example.com" }
                })}
            />
            {errors.email && <span className={cl.ErrorText}>{errors.email.message}</span>}

            {/* Поле Phone */}
            <input
                className={errors.phone ? cl.InputError : ""}
                placeholder="Phone"
                {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                        value: /^\+\d{10,15}$/, // Начинается с +, затем от 10 до 15 цифр
                        message: "Format: + and 10-15 digits (e.g. +380...)"
                    }

                })}
                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.currentTarget;
                    if (!input.value.startsWith('+')) {
                        input.value = '+' + input.value.replace(/\+/g, '');
                    }
                }}

            />
            {errors.phone && <span className={cl.ErrorText}>{errors.phone.message}</span>}

            {/* Поле Address */}
            <input
                className={errors.address ? cl.InputError : ""}
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
            />
            {errors.address && <span className={cl.ErrorText}>{errors.address.message}</span>}

            <button disabled={cartItems.length === 0 || !isValid} type="submit">Submit</button>
        </form>
    )
}

export default CartForm
