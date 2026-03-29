import cl from "./Shop.module.css"
interface IHeader {
    setFlag: (flag: string) => void
    flag: string
}
function Header({ setFlag, flag }: IHeader) {
    return (
        <div className={cl.Header}>
            <div onClick={() => setFlag("shop")} className={`${cl.HeaderItem} ${flag === "shop" ? cl.Active : ""}`}>Shop</div>
            <div onClick={() => setFlag("cart")} className={`${cl.HeaderItem} ${flag === "cart" ? cl.Active : ""}`}>Cart</div>
        </div>
    )
}

export default Header