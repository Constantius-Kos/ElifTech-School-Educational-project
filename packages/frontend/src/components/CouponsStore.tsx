import cl from "./CouponsStore.module.css"
import { useAppContext } from "../Context.tsx"
import CouponCard from "./CouponCard.tsx"
function CouponsStore() {
    const { coupons } = useAppContext()
    return (
        <div className={cl.CouponsStore}>
            {coupons.map((coupon) => (
                <CouponCard key={coupon._id} coupon={coupon} place="store" />
            ))}
        </div>
    )
}

export default CouponsStore