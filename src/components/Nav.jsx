import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logoFoodOfJoy from '../assets/logo-food-of-joy.png'
import './Nav.css'

export default function Nav() {
  const { cartCount } = useCart()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/delivery', label: 'Take the Challenge' },
    { to: '/order',    label: 'Order A La Carte' },
    { to: '/faq',      label: 'F.A.Q.' },
  ]

  const close = () => setMenuOpen(false)

  return (
    <>
      {/* ── TOP BANNER ── */}
      <div className="nav-banner">
        Veggies Made Easy and Delicious
      </div>

      <nav className="nav">
        <Link to="/" className="nav-logo" onClick={close}>
          <img src={logoFoodOfJoy} alt="Food of Joy" className="nav-logo-img" />
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
            <Link to="/cart" className="nav-cart" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
            </Link>
          </li>
        </ul>

        {/* Mobile right — cart + hamburger */}
        <div className="nav-mobile-right">
          <Link to="/cart" className="nav-cart" onClick={close} aria-label="Cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {cartCount > 0 && <span className="nav-cart-count">{cartCount}</span>}
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
            <li><Link to="/" className={`mobile-link${pathname === '/' ? ' active' : ''}`} onClick={close}>Home</Link></li>
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
                Cart {cartCount > 0 && <span className="mobile-cart-count">{cartCount}</span>}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  )
}
