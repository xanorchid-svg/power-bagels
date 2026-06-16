import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logoCircular from '../assets/logo-circular.png'
import './Nav.css'

export default function Nav() {
  const { cartCount } = useCart()
  const { pathname } = useLocation()

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/order',    label: 'Order' },
    { to: '/delivery', label: 'Delivery' },
    { to: '/about',    label: 'About Alice' },
    { to: '/faq',      label: 'FAQ' },
  ]

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        {/* 
          mix-blend-mode: multiply removes the cream/white background
          so only the purple disc shows on the dark nav 
        */}
        <img
          src={logoCircular}
          alt="Power Bagels"
          className="nav-logo-img"
        />
        <span className="nav-logo-text">Power Bagels</span>
      </Link>
      <ul className="nav-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className={`nav-link${pathname === to ? ' active' : ''}`}>
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link to="/cart" className="nav-cart">
            🛒 Cart
            <span className="nav-cart-count">{cartCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
