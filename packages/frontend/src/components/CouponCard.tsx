import cl from "./CouponCard.module.css"
import type { ICoupon, IUserCoupon } from '@shared/sharedTypes.js'
import images from "../assets/images/index.js"
import Timer from "./shared/Timer.tsx"
import { buyCoupon } from "../api/api.js"
import { useAppContext } from "../Context.tsx"

interface CouponCardProps {
    coupon: ICoupon | IUserCoupon,
    place: "store" | "profile"
}

function CouponCard({ coupon, place }: CouponCardProps) {

    const { dispatch } = useAppContext()

    const handleBuyCoupon = async () => {
        console.log("handleBuyCoupon started")
        const token = localStorage.getItem("token")
        if (!coupon._id || !token) return
        const data = await buyCoupon(coupon._id, token)
        console.log("data", data)
        dispatch({ type: "SET_USER_COUPONS", payload: data.userCouponArray })
        console.log("handleBuyCoupon finished")
    }

    return (
        <div key={coupon._id} className={cl.CouponCard}>
            <div>{coupon.shopName}</div>
            <div className={cl.CouponCardBody}>
                <div className={cl.CouponCardBodyImg}>
                    <img src={images[coupon.shopLogo]} alt={coupon.shopName} className={cl.ShopImg} />
                </div>
                <div className={cl.CouponCardBodyInfo}>
                    <div>-{coupon.discountAmount}%</div>
                    <div className={cl.TimerContainer}>

                        <Timer expiryDate={coupon.expiryDate} />
                        {place === "store" && <button onClick={handleBuyCoupon}>Buy</button>}
                    </div>
                </div>
            </div>
            <div>{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'No expiry'}</div>
        </div>
    )
}

export default CouponCard