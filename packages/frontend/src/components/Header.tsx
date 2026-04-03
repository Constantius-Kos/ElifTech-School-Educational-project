import { NavLink } from "react-router-dom"
import cl from "./Header.module.css"
import { useAppContext } from "../Context.tsx"
function Header() {
    const { cartItems, user, userOrders, dispatch } = useAppContext()
    // console.log("userOrders", userOrders)
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    const totalOrders = userOrders?.reduce((acc) => acc + 1, 0) || 0
    return (
        <nav className={cl.Header}>
            <NavLink
                to="/"
                className={({ isActive }) => isActive ? `${cl.Link} ${cl.Active}` : cl.Link}
            >
                Shop
            </NavLink>
            <div className={cl.Divider}>|</div>
            <NavLink
                to="/cart"
                className={({ isActive }) => isActive ? `${cl.Link} ${cl.Active}` : cl.Link}
            >
                Shopping Cart
                {totalItems > 0 && <span className={cl.Badge}>{totalItems}</span>}
                <div className={cl.Divider}>|</div>
            </NavLink>
            {user && <NavLink to="/profile" className={({ isActive }) => isActive ? `${cl.Link} ${cl.Active}` : cl.Link}>Profile {totalOrders > 0 && <span className={cl.Badge}>{totalOrders}</span>}
            </NavLink>
            }
            {user && <NavLink to="/login" className={cl.Login} onClick={() => { dispatch({ type: "LOGOUT" }); localStorage.removeItem("token") }}>Logout</NavLink>}
            {!user && <NavLink
                to="/login"
                className={cl.Login}
            >
                Login
            </NavLink>}
        </nav>
    )
}
export default Header