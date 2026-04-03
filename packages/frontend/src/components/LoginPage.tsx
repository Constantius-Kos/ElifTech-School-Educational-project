import cl from "./LoginPage.module.css"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { login } from "../api/api"
import { useAppContext } from "../Context.tsx"
interface ILoginForm {
    email: string
    password: string
}
function LoginPage() {
    const { dispatch } = useAppContext()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ILoginForm>({
        mode: "onChange",
    })
    const onSubmit = async (data: ILoginForm) => {
        try {
            const res = await login(data.email, data.password)
            dispatch({ type: "SET_USER", payload: res.user })
            localStorage.setItem("token", res.token)
            console.log(res)
            navigate("/shop")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={cl.LoginPage}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={cl.LoginPageBody}>
                    <input type="text" placeholder="Email" {...register("email", { required: true, pattern: { value: /^\S+@\S+\.\S+$/, message: "example@example.com" } })} />
                    {errors.email && <span className={cl.ErrorText}>{errors.email.message}</span>}
                    <input type="password" placeholder="Password" {...register("password", { required: true, minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                    {errors.password && <span className={cl.ErrorText}>{errors.password.message}</span>}
                    <button type="submit" className={cl.LoginButton} disabled={!isValid} >Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage