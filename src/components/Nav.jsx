import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logoCircular from '../assets/logo-circular.png'
import './Nav.css'

export default function Nav() {
  const { cartCount } = useCart()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/',         label: 'Home' },
    { to: '/order',    label: 'Order' },
    { to: '/delivery', label: 'Delivery' },
    { to: '/about',    label: 'About Alice' },
    { to: '/faq',      label: 'FAQ' },
  ]

  const close = () => setMenuOpen(false)

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo" onClick={close}>
          <img src={logoCircular} alt="Power Bagels" className="nav-logo-img" />
          <span className="nav-logo-text">Power Bagels</span>
        </Link>

        {/* Desktop links */}
        <ul className="nav-links nav-links-desktop">
          {links.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className={`nav-link${pathname === to ? ' active' : ''}`}>
                {label}
              </Link>
            </li>
          ))}
          <li>
            <Link to="/cart" className="nav-cart">
              🛒 Cart <span className="nav-cart-count">{cartCount}</span>
            </Link>
          </li>
        </ul>

        {/* Mobile right — cart + hamburger */}
        <div className="nav-mobile-right">
          <Link to="/cart" className="nav-cart" onClick={close}>
            🛒 <span className="nav-cart-count">{cartCount}</span>
          </Link>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
            <span className={`ham-line${menuOpen ? ' open' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          <ul className="mobile-links">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`mobile-link${pathname === to ? ' active' : ''}`}
                  onClick={close}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/cart" className="mobile-link mobile-cart" onClick={close}>
                🛒 Cart {cartCount > 0 && <span className="mobile-cart-count">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
