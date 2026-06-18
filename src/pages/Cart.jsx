// Cart.jsx
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Cart() {
  const { cart, updateQty, removeItem, cartTotal } = useCart()
  if (!cart.length) return (
    <main style={{ paddingTop: 68, textAlign: 'center', padding: '160px 48px' }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🛒</div>
      <p style={{ color: 'rgba(0,0,0,.3)', fontSize: 16, marginBottom: 24 }}>Your cart is empty.</p>
      <Link to="/order" className="btn-primary">Shop Bagels →</Link>
    </main>
  )
  return (
    <main style={{ paddingTop: 68, maxWidth: 960, margin: '0 auto', padding: '110px 48px 80px' }}>
      <h1 style={{ fontFamily: 'Satoshi,Inter,sans-serif', fontWeight: 900, fontSize: 40, color: 'var(--charcoal)', letterSpacing: '-.03em', marginBottom: 36 }}>Your Cart</h1>
      {cart.map(item => (
        <div key={`${item.flavor}-${item.count}`} style={{ display: 'flex', alignItems: 'center', gap: 18, background: 'var(--white)', borderRadius: 15, padding: '18px 22px', border: '1.5px solid rgba(0,0,0,.07)', marginBottom: 14 }}>
          <div style={{ width: 58, height: 58, borderRadius: 11, background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>🥯</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--charcoal)' }}>{item.flavor}</div>
            <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 2 }}>{item.count}-Pack · ${item.price} · 35g protein each</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => updateQty(item.flavor, item.count, -1)} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid rgba(0,0,0,.12)', background: 'none', cursor: 'pointer', fontSize: 17, fontWeight: 600 }}>−</button>
            <span style={{ fontWeight: 700, fontSize: 15, minWidth: 22, textAlign: 'center' }}>{item.qty}</span>
            <button onClick={() => updateQty(item.flavor, item.count, 1)} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid rgba(0,0,0,.12)', background: 'none', cursor: 'pointer', fontSize: 17, fontWeight: 600 }}>+</button>
          </div>
          <div style={{ fontWeight: 800, fontSize: 17, minWidth: 64, textAlign: 'right' }}>${(item.price * item.qty).toFixed(2)}</div>
          <div onClick={() => removeItem(item.flavor, item.count)} style={{ color: 'rgba(0,0,0,.18)', fontSize: 17, cursor: 'pointer', padding: 8 }}>✕</div>
        </div>
      ))}
      <div style={{ background: 'var(--white)', borderRadius: 18, padding: 28, border: '1.5px solid rgba(0,0,0,.07)', maxWidth: 400, marginLeft: 'auto', marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--gray)', marginBottom: 10 }}><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, color: 'var(--gray)', marginBottom: 10 }}><span>Delivery</span><span style={{ color: 'var(--green)' }}>Free</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, color: 'var(--charcoal)', marginTop: 14, paddingTop: 14, borderTop: '1.5px solid rgba(0,0,0,.07)' }}><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
        <button style={{ width: '100%', background: 'var(--green)', color: 'var(--white)', border: 'none', borderRadius: 13, padding: 17, fontSize: 14, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Inter,sans-serif', marginTop: 18 }}>
          Proceed to Checkout →
        </button>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 11, color: 'var(--gray)' }}>Secure checkout · Orders ship Sunday</div>
      </div>
    </main>
  )
}
