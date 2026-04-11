import cl from "./Profile.module.css"
import { useSearchParams, } from "react-router-dom"
import { useEffect } from "react"
import { useAppContext } from "../Context"
import images from "../assets/images/index.js"
import { getUserCoupons } from "../api/api.js"
import CouponCard from "./CouponCard.tsx"

function Profile() {
    const { userOrders, userCoupons, dispatch } = useAppContext()
    const [searchParams, setSearchParams] = useSearchParams({ tab: "orders" })
    const tab = searchParams.get("tab")
    const handleTabChange = (tab: string) => {
        setSearchParams({ tab })
    }

    //Отримуємо купони користувача
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            async function setUserCoupons(token: string) {
                const data = await getUserCoupons(token)
                dispatch({ type: "SET_USER_COUPONS", payload: data })
            }
            setUserCoupons(token)
        }
        return

    }, [dispatch])

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
                {tab === "coupons" && userCoupons?.map((coupon) => (
                    <CouponCard key={coupon._id} coupon={coupon} place="profile" />
                ))}
            </div>
        </div>
    )
}

export default Profile