import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import cl from './App.module.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Shop from './components/ShopPage.tsx'
import Cart from './components/Cart.tsx'
import LoginPage from './components/LoginPage.tsx'
import { useAppContext } from './Context.tsx'
import { useEffect } from 'react'
import { getShops, getUserOrders, getCoupons, getProfile } from './api/api.js'
import Profile from './components/Profile.tsx'
import CouponsStore from './components/CouponsStore.tsx'
function App() {
  const { isLoading, dispatch, user, order } = useAppContext()

  // Отримуємо магазини та купони, у випдаку логіна + дані користувача
  useEffect(() => {
    const initApp = async () => {
      dispatch({ type: "SET_IS_LOADING", payload: true })

      try {
        const token = localStorage.getItem("token")

        //Запускаємо все паралельно
        const [shops, coupons] = await Promise.all([
          getShops(),
          getCoupons()
        ])
        dispatch({ type: "SET_SHOPS", payload: shops })
        dispatch({ type: "SET_COUPONS", payload: coupons })

        //Якщо є токен, відновлюємо профіль
        if (token) {
          const userData = await getProfile(token)
          dispatch({ type: "SET_USER", payload: userData })
        }
      } catch (error) {
        console.error("Initialization error:", error)
      } finally {
        dispatch({ type: "SET_IS_LOADING", payload: false })
      }
    }
    initApp()
  }, [dispatch])

  // Отримуємо замовлення користувача
  useEffect(() => {

    const userId = user?._id
    if (!userId) return
    const fetchOrders = async () => {
      try {
        const orders = await getUserOrders(userId)
        dispatch({ type: "SET_USER_ORDERS", payload: orders })
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      }
    }
    fetchOrders()
  }, [dispatch, user?._id, order])


  return (
    <>
      {isLoading && (
        <div className={cl.Loader}>
          <div className={cl.Spinner} />
        </div>
      )}

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coupons" element={<CouponsStore />} />
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
