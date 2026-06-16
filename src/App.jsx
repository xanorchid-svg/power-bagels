import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Order from './pages/Order'
import Cart from './pages/Cart'
import Delivery from './pages/Delivery'
import About from './pages/About'
import FAQ from './pages/FAQ'
import { CartProvider } from './context/CartContext'

export default function App() {
  return (
    <CartProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </CartProvider>
  )
}
