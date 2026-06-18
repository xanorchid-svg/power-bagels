import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import CouponPopup from './components/CouponPopup'
import Home from './pages/Home'
import Order from './pages/Order'
import Cart from './pages/Cart'
import Delivery from './pages/Delivery'
import FAQ from './pages/FAQ'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Nav />
      <CouponPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </CartProvider>
  )
}
