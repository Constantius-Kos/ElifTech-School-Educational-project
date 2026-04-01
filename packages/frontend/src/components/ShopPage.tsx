import ShopSidebar from "./ShopSidebar"
import ProductGreed from "./ProductGreed"
import cl from "./ShopPage.module.css"
import { useAppContext } from "../Context.tsx"

function ShopPage() {
    const { products } = useAppContext()
    return (
        <div className={cl.ShopPage}>
            <ShopSidebar />
            <ProductGreed key={products[0]?.shopId || 'empty'} />
        </div>
    )
}

export default ShopPage