import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DELIVERY_ZIPS } from '../data/constants'

export default function Delivery() {
  const [zip, setZip] = useState('')
  const [result, setResult] = useState(null)

  function check(e) {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip)) { setResult('invalid'); return }
    setResult(DELIVERY_ZIPS.has(zip) ? 'ok' : 'no')
  }

  return (
    <main style={{ paddingTop: 68 }}>
      <div className="page-hero">
        <h1 className="display-lg">Do We Deliver To You?</h1>
        <p>Fresh-baked within 30 miles of Oceanside & San Diego, CA.</p>
      </div>

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '56px 48px 0' }}>
        <form onSubmit={check}>
          <label style={{ fontWeight: 700, fontSize: 15, color: 'var(--charcoal)', marginBottom: 12, display: 'block' }}>Enter your zip code</label>
          <div style={{ display: 'flex', gap: 11, marginBottom: 14 }}>
            <input
              type="text" maxLength={5} inputMode="numeric" placeholder="e.g. 92054"
              value={zip} onChange={e => { setZip(e.target.value); setResult(null) }}
              style={{ flex: 1, background: 'var(--white)', border: '2px solid rgba(230,138,0,.17)', borderRadius: 13, padding: '15px 20px', fontSize: 17, fontWeight: 600, fontFamily: 'Inter,sans-serif', outline: 'none' }}
            />
            <button type="submit" style={{ background: 'var(--orange)', color: 'var(--white)', border: 'none', borderRadius: 13, padding: '15px 26px', fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Inter,sans-serif', whiteSpace: 'nowrap' }}>
              Check →
            </button>
          </div>
          {result === 'ok' && <div style={{ borderRadius: 13, padding: '16px 20px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(138,160,92,.1)', color: 'var(--green-dk)', border: '1.5px solid rgba(138,160,92,.22)' }}>✓ &nbsp;We deliver to your area! <Link to="/order" style={{ color: 'inherit', fontWeight: 700, textDecoration: 'underline' }}>Order now →</Link></div>}
          {result === 'no' && <div style={{ borderRadius: 13, padding: '16px 20px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(255,70,70,.07)', color: '#c03333', border: '1.5px solid rgba(255,70,70,.15)' }}>✗ &nbsp;Not in our zone yet — expanding soon.</div>}
          {result === 'invalid' && <div style={{ borderRadius: 13, padding: '16px 20px', fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(255,70,70,.07)', color: '#c03333', border: '1.5px solid rgba(255,70,70,.15)' }}>✗ &nbsp;Please enter a valid 5-digit zip code.</div>}
        </form>
      </div>

      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 48px' }}>
        <div style={{ background: 'linear-gradient(160deg,#e4eef8,#c8d8ee)', borderRadius: 20, height: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
          <div style={{ fontSize: 48 }}>📍</div>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--orange)', background: 'var(--white)', borderRadius: 100, padding: '8px 22px', boxShadow: '0 4px 14px rgba(0,0,0,.1)' }}>30-Mile Radius · Oceanside & San Diego, CA</div>
          <div style={{ fontSize: 13, color: '#668', textAlign: 'center' }}>Oceanside · Carlsbad · Vista · Escondido · San Diego · La Mesa · El Cajon & more</div>
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto 80px', padding: '0 48px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
        {[
          { city: 'North County', zips: 'Oceanside · Carlsbad · Vista · San Marcos · Escondido · Encinitas' },
          { city: 'San Diego Central', zips: 'Mission Valley · Hillcrest · North Park · Pacific Beach · Del Mar' },
          { city: 'East County & South', zips: 'La Mesa · El Cajon · Chula Vista · Spring Valley' },
        ].map((a, i) => (
          <div key={i} style={{ background: 'var(--white)', borderRadius: 13, padding: '18px 20px', border: '1.5px solid rgba(0,0,0,.07)' }}>
            <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--charcoal)', marginBottom: 6 }}>{a.city}</div>
            <div style={{ fontSize: 11, color: 'var(--gray)', lineHeight: 1.7 }}>{a.zips}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
