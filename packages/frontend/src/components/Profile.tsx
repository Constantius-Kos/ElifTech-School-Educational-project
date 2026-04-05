import cl from "./Profile.module.css"
import { useSearchParams, } from "react-router-dom"
import { useAppContext } from "../Context"
import images from "../assets/images/index.js"
import Timer from "./shared/Timer.tsx"
function Profile() {
    const { userOrders, coupons } = useAppContext()
    const [searchParams, setSearchParams] = useSearchParams({ tab: "orders" })
    const tab = searchParams.get("tab")
    const handleTabChange = (tab: string) => {
        setSearchParams({ tab })
    }

    return (
        <div className={cl.Profile}>
            <div className={cl.ProfileHeader}>
                <h2 className={cl.BodyButtons} onClick={() => handleTabChange("orders")}>Orders</h2>
                <h2 className={cl.BodyButtons} onClick={() => handleTabChange("coupons")}>Coupons</h2>
            </div>
            <div className={cl.ProfileBody}>
                {tab === "orders" && userOrders?.map((order) => (
                    <div key={order._id} className={cl.OrderCard}>
                        <div>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'No date'}</div>
                        <div>{order.totalPrice} UAH ({order.items.length})</div>
                        <div className={cl.ItemsImgs}>
                            {order.items.map((item) => (
                                <div key={item.productId} className={cl.ItemImgContainer}>
                                    <img src={images[item.img]} alt={item.name} className={cl.ItemImg} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {tab === "coupons" && coupons?.map((coupon) => (
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
                                </div>
                            </div>
                        </div>
                        <div>{coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'No expiry'}</div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Profile