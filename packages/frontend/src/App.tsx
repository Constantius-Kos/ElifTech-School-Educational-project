import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import cl from './App.module.css'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Shop from './components/ShopPage.tsx'
import Cart from './components/Cart.tsx'
import LoginPage from './components/LoginPage.tsx'
import { useAppContext } from './Context.tsx'
import { useEffect } from 'react'
import { getShops, getUserOrders, getCoupons } from './api/api.js'
import Profile from './components/Profile.tsx'
function App() {
  const { isLoading, dispatch, user, order } = useAppContext()

  useEffect(() => {
    const fetchShops = async () => {
      dispatch({ type: "SET_IS_LOADING", payload: true })
      const shops = await getShops();
      dispatch({ type: "SET_SHOPS", payload: shops })
      dispatch({ type: "SET_IS_LOADING", payload: false })
    };
    fetchShops();
  }, [dispatch])

  useEffect(() => {
    const fetchUserOrders = async () => {
      if (!user || !user._id) return;

      try {
        const orders = await getUserOrders(user._id);
        dispatch({ type: "SET_USER_ORDERS", payload: orders })
        console.log("orders", orders)
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchUserOrders();
  }, [dispatch, user, order])

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await getCoupons();
      dispatch({ type: "SET_COUPONS", payload: coupons })
    };
    fetchCoupons();
  }, [dispatch])
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
        </Routes>
        <Footer />
      </Router>

    </>
  )
}

export default App
