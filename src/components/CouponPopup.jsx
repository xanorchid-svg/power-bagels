import { useState, useEffect } from 'react'
import './CouponPopup.css'

const COUPON_CODE = 'FIRSTBITE15'
const DELAY_MS = 4000 // show after 4s

export default function CouponPopup() {
  const [visible, setVisible]     = useState(false)
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError]         = useState('')

  useEffect(() => {
    // Don't show if already dismissed or subscribed this session
    const dismissed = sessionStorage.getItem('pb_popup_dismissed')
    if (dismissed) return
    const timer = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setVisible(false)
    sessionStorage.setItem('pb_popup_dismissed', '1')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email.')
      return
    }
    setError('')
    // In production: POST email to your newsletter service here
    setSubmitted(true)
    sessionStorage.setItem('pb_popup_dismissed', '1')
  }

  if (!visible) return null

  return (
    <div className="popup-overlay" onClick={e => { if (e.target === e.currentTarget) dismiss() }}>
      <div className="popup-card">

        {/* Close */}
        <button className="popup-close" onClick={dismiss} aria-label="Close">✕</button>

        {/* Donut decoration */}
        <div className="popup-donut">🥯</div>

        {!submitted ? (
          <>
            <div className="popup-eyebrow">First Order Special</div>
            <h2 className="popup-title">Get 15% Off<br />Your First Order</h2>
            <p className="popup-body">
              Subscribe to our newsletter and get a coupon code delivered instantly.
              Real ingredients. Serious protein. Real savings.
            </p>

            <form className="popup-form" onSubmit={handleSubmit}>
              <input
                className="popup-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                autoFocus
              />
              {error && <div className="popup-error">{error}</div>}
              <button className="popup-btn" type="submit">
                Get My Coupon →
              </button>
            </form>

            <p className="popup-fine">No spam. Unsubscribe anytime.</p>
          </>
        ) : (
          <div className="popup-success">
            <div className="popup-success-icon">✓</div>
            <h2 className="popup-title">Here's Your Code!</h2>
            <p className="popup-body">Use this code at checkout for 15% off your first order:</p>
            <div className="popup-code">
              <span className="popup-code-text">{COUPON_CODE}</span>
              <button
                className="popup-copy-btn"
                onClick={() => navigator.clipboard?.writeText(COUPON_CODE)}
              >
                Copy
              </button>
            </div>
            <p className="popup-fine" style={{ marginTop: 16 }}>
              Code saved to your inbox too. Happy bageling! 🥯
            </p>
            <button className="popup-btn" onClick={dismiss} style={{ marginTop: 20 }}>
              Shop Now →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
