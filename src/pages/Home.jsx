import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import PackCard from '../components/PackCard'
import LogoWordmark from '../components/LogoWordmark'
import logoCircular from '../assets/logo-circular.png'
import { PACKS, DELIVERY_ZIPS } from '../data/constants'
import './Home.css'

let heroVideo
try {
  heroVideo = new URL('../assets/hero-bagels.mp4', import.meta.url).href
} catch {
  heroVideo = null
}

export default function Home() {
  const { addToCart } = useCart()
  const [zip, setZip] = useState('')
  const [zipResult, setZipResult] = useState(null)
  const revealRefs = useRef([])
  const barRefs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.1 })
    revealRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-w]').forEach(b => {
            b.style.width = b.getAttribute('data-w') + '%'
          })
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.3 })
    barRefs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  function checkZip(e) {
    e.preventDefault()
    if (!/^\d{5}$/.test(zip)) { setZipResult('invalid'); return }
    setZipResult(DELIVERY_ZIPS.has(zip) ? 'ok' : 'no')
  }

  const addRef = el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el) }
  const addBar = el => { if (el && !barRefs.current.includes(el)) barRefs.current.push(el) }

  const icons = [
    { emoji: '⚡', label: 'High Protein' },
    { emoji: '🌿', label: 'All Natural' },
    { emoji: '🌾', label: 'Real Ingredients' },
    { emoji: '🤍', label: 'Made for Everyday Fuel' },
  ]

  return (
    <main className="home">

      {/* ══ HERO — full bleed video, no overlay ══ */}
      <section className="hero">

        {/* Video — full bleed, no overlay */}
        <div className="hero-video-bg">
          {heroVideo && (
            <video autoPlay muted loop playsInline src={heroVideo} />
          )}
        </div>

        {/* 
          NO cream overlay — video shows full bleed.
          Text sits on top with its own drop shadows for legibility.
        */}

        <div className="hero-inner">
          <div className="hero-text-col">

            {/* Wordmark — 50% larger than before (was 260, now 390) */}
            <div className="hero-wordmark">
              <LogoWordmark width={390} dark />
            </div>

            {/* 32G stat */}
            <div className="hero-stat-block">
              <div className="hero-stat-32g">
                <span className="num">32G</span>
              </div>
              <div className="hero-stat-label">Protein</div>
              <div className="hero-stat-sub">For Every Bagel</div>
            </div>

            {/* Icons */}
            <div className="hero-icons">
              {icons.map((ic, i) => (
                <div key={i} className="hero-icon-item">
                  <div className="hero-icon-circle">{ic.emoji}</div>
                  <div className="hero-icon-label">{ic.label}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/order" className="hero-cta">Shop Bagels</Link>

            {/* Delivery checker */}
            <div className="d-check">
              <div className="d-check-lbl">📍 Check if we deliver to you</div>
              <form className="d-row" onSubmit={checkZip}>
                <input
                  className="d-input"
                  type="text"
                  placeholder="Enter your zip code"
                  maxLength={5}
                  inputMode="numeric"
                  value={zip}
                  onChange={e => { setZip(e.target.value); setZipResult(null) }}
                />
                <button className="d-btn" type="submit">Check →</button>
              </form>
              {zipResult === 'ok' && (
                <div className="d-result ok">
                  ✓ &nbsp;We deliver to you!&nbsp;
                  <Link to="/order" style={{ color:'inherit', fontWeight:700, textDecoration:'underline' }}>Order now →</Link>
                </div>
              )}
              {zipResult === 'no' && (
                <div className="d-result no">✗ &nbsp;Not in our zone yet — expanding soon.</div>
              )}
              {zipResult === 'invalid' && (
                <div className="d-result no">✗ &nbsp;Please enter a valid 5-digit zip code.</div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {[...Array(2)].map((_, r) =>
            ['Missing bread? We got you','32g Protein — Every Bagel','Plain · Everything · Cinnamon Raisin','Zero Artificial Ingredients','Delivering Within 30 Miles of San Diego','Real Ingredients. Serious Protein.']
              .map((t, i) => (
                <span key={`${r}-${i}`} className="ticker-item">
                  <span className="ticker-dot" />{t}
                </span>
              ))
          )}
        </div>
      </div>

      {/* WHY */}
      <section className="why-section">
        <div className="section-inner">
          <div ref={addRef} className="reveal">
            <span className="eyebrow">Why Power Bagels</span>
            <h2 className="display-lg" style={{ color:'var(--charcoal)' }}>
              Why this bagel beats<br />every other bagel.
            </h2>
          </div>
          <div className="why-grid">
            {[
              { icon:'⚡', title:'32g Protein from Real Sources', body:'Not powder dumped into dough. Every gram comes from whole wheat, whey isolate, and egg whites — the kind of protein your body actually uses.' },
              { icon:'🌿', title:'Read Every Ingredient', body:"Flip over a typical protein product and count the words you can't pronounce. Flip ours. Everything is real, intentional, nothing is hiding." },
              { icon:'🥯', title:'It Actually Tastes Like a Bagel', body:"Dense, chewy, satisfying. The thing you've been craving while everyone told you bread was the enemy. Turns out the problem was never the bagel." },
              { icon:'🧊', title:'Freeze. Toast. Done.', body:"Order a 12-pack, freeze them, grab one each morning and toast for 3 minutes. Zero planning. Maximum protein." },
              { icon:'📦', title:'Delivered Fresh to Your Door', body:'We bake and deliver fresh within 30 miles of Oceanside & San Diego. Enter your zip — most of the region is covered.' },
              { icon:'🍽️', title:'Meals, Not Just Macros', body:"Cream cheese. Avocado. Smoked salmon. Everything you'd put on a regular bagel — now that bagel is working as hard as you are." },
            ].map((c, i) => (
              <div key={i} ref={addRef} className="why-card reveal">
                <div className="why-icon">{c.icon}</div>
                <div className="why-card-title">{c.title}</div>
                <div className="why-card-body">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="compare-section">
        <div className="section-inner">
          <div ref={addRef} className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
            <span className="eyebrow eyebrow-lt">Missing Protein? Missing Bread?</span>
            <h2 className="display-lg" style={{ color:'var(--white)', marginBottom:12 }}>
              Other options compromise.<br /><span className="accent-green">Power Bagels doesn't.</span>
            </h2>
          </div>
          <div ref={el => { addRef(el); addBar(el) }} className="compare-grid reveal">
            <div>
              <div className="col-label">Typical Breakfast <span className="col-badge">Protein per serving</span></div>
              {[
                { label:'Plain bagel', g:'6g', w:19 },
                { label:'Greek yogurt', g:'10g', w:31 },
                { label:'2 eggs on toast', g:'14g', w:44 },
                { label:'Protein shake', g:'25g', w:78 },
                { label:'Protein bar', g:'20g', w:63 },
              ].map((b, i) => (
                <div key={i} className="bar-row">
                  <div className="bar-lbl"><span>{b.label}</span><span>{b.g}</span></div>
                  <div className="bar-track"><div className="bar-fill bf-red" data-w={b.w} style={{ width:0 }} /></div>
                </div>
              ))}
            </div>
            <div>
              <div className="col-label">Power Bagels <span className="col-badge pb">Always 32g</span></div>
              <div className="bar-row" style={{ marginBottom:24 }}>
                <div className="bar-lbl"><span>Power Bagel (any flavor)</span><span style={{ color:'var(--green)' }}>32g ✓</span></div>
                <div className="bar-track"><div className="bar-fill bf-green" data-w={100} style={{ width:0 }} /></div>
              </div>
              <div className="proof-box">
                <div className="proof-label">What else you get</div>
                {['Real whole-food ingredients — nothing artificial','Tastes like food you actually want to eat','Fills you up — no mid-morning crash','Delivered fresh to your door'].map((t, i) => (
                  <div key={i} className="proof-row"><span className="proof-check">✓</span><span className="proof-text">{t}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NUTRITION */}
      <section className="nutrition-section">
        <div className="section-inner">
          <div className="nutrition-inner">
            <div ref={addRef} className="reveal">
              <span className="eyebrow">Nutritional Value</span>
              <h2 className="display-lg" style={{ color:'var(--charcoal)', marginBottom:18 }}>
                The numbers<br />don't lie.
              </h2>
              <p style={{ color:'var(--gray)', fontSize:15, lineHeight:1.7, maxWidth:420 }}>
                Every macronutrient is intentional. Every ingredient earns its place.
              </p>
              <div className="n-list">
                {[
                  { icon:'🌾', name:'Whole Wheat Flour', desc:'Stone-ground, high-protein wheat. Foundation — not filler.' },
                  { icon:'🥛', name:'Whey Protein Isolate', desc:'Complete amino acid profile. Bioavailable. From real dairy.' },
                  { icon:'🥚', name:'Cage-Free Egg Whites', desc:'Adds structure, texture, and another clean protein source.' },
                  { icon:'🚫', name:'Zero Artificial Anything', desc:'No gums. No fillers. No preservatives. Full stop.' },
                ].map((n, i) => (
                  <div key={i} className="n-row">
                    <div className="n-icon">{n.icon}</div>
                    <div><div className="n-name">{n.name}</div><div className="n-desc">{n.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div ref={addRef} className="reveal nutrition-visual">
              <div className="ring-wrap">
                <svg width="320" height="320" viewBox="0 0 320 320">
                  <defs>
                    <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E68A00" />
                      <stop offset="100%" stopColor="#8AA05C" />
                    </linearGradient>
                  </defs>
                  <circle cx="160" cy="160" r="140" fill="var(--orange)" />
                  <circle cx="160" cy="160" r="120" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="16" />
                  <circle cx="160" cy="160" r="120" fill="none" stroke="url(#rg)"
                    strokeWidth="16" strokeLinecap="round"
                    strokeDasharray="754" strokeDashoffset="188"
                    transform="rotate(-90 160 160)" />
                  <text x="160" y="148" textAnchor="middle" fill="white" fontSize="68" fontWeight="900" fontFamily="Inter,sans-serif" letterSpacing="-4">32</text>
                  <text x="160" y="178" textAnchor="middle" fill="#8AA05C" fontSize="13" fontWeight="700" letterSpacing="3" fontFamily="Inter,sans-serif">GRAMS</text>
                  <text x="160" y="198" textAnchor="middle" fill="rgba(255,255,255,.38)" fontSize="12" letterSpacing="2" fontFamily="Inter,sans-serif">PROTEIN</text>
                </svg>
                <div className="ring-pills">
                  <div className="mpill mp1"><span className="mpill-val">280</span><span className="mpill-lbl">Cal</span></div>
                  <div className="mpill mp2"><span className="mpill-val">48g</span><span className="mpill-lbl">Carbs</span></div>
                  <div className="mpill mp3"><span className="mpill-val">4g</span><span className="mpill-lbl">Fat</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="section-inner">
          <div ref={addRef} className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
            <span className="eyebrow">Real People</span>
            <h2 className="display-lg" style={{ color:'var(--white)' }}>They switched.<br />They stayed.</h2>
          </div>
          <div className="testi-grid">
            {[
              { i:'JM', name:'Jessica M.', loc:'San Diego, CA', text:'"I\'ve tried every protein breakfast product. This is the only one I actually look forward to eating. It tastes like a real bagel because it IS a real bagel."' },
              { i:'DC', name:'David C.', loc:'Oceanside, CA', text:'"32g of protein for breakfast without drinking a shake? My kids eat these too — cinnamon raisin is their favorite. Zero artificial stuff is non-negotiable for our family."' },
              { i:'SR', name:'Sara R.', loc:'La Mesa, CA', text:'"Ordered the 12-pack. Froze them. Toast one every morning. My nutrition hasn\'t been this dialed in years. Game changer."' },
            ].map((t, idx) => (
              <div key={idx} ref={addRef} className="t-card reveal">
                <div className="t-stars">★★★★★</div>
                <p className="t-text">{t.text}</p>
                <div className="t-author">
                  <div className="t-avatar">{t.i}</div>
                  <div><div className="t-name">{t.name}</div><div className="t-meta">{t.loc} · Verified</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER EMBED */}
      <section className="order-embed">
        <div className="section-inner">
          <div ref={addRef} className="reveal" style={{ textAlign:'center' }}>
            <span className="eyebrow">Order Now</span>
            <h2 className="display-lg" style={{ color:'var(--charcoal)' }}>
              Pick your pack.<br /><span className="accent-orange">Power your week.</span>
            </h2>
          </div>
          <div className="pack-grid">
            {PACKS.map((p, i) => (
              <PackCard key={i} pack={p} onAdd={() => addToCart('Everything', p.count, p.price)} />
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:32 }}>
            <Link to="/order" className="btn-primary">Choose Your Flavor →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div ref={addRef} className="cta-inner reveal">
          <h2 className="display-lg" style={{ color:'var(--white)', marginBottom:14 }}>Power Your Day.<br />Naturally.</h2>
          <p className="cta-sub">Join thousands who swapped their protein shake for something they actually enjoy.</p>
          <Link to="/order" className="btn-primary">Shop Bagels →</Link>
        </div>
      </section>

      {/* FOOTER — circular logo image */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <img src={logoCircular} alt="Power Bagels" className="footer-logo-img" />
              <span className="footer-logo-text">Power Bagels</span>
            </div>
            <p className="footer-tagline">Real Ingredients. Serious Protein.<br />Delivering within 30 miles of Oceanside & San Diego, CA.</p>
          </div>
          <div><div className="footer-col-title">Shop</div><ul className="footer-links"><li><Link to="/order">Plain Bagels</Link></li><li><Link to="/order">Everything Bagels</Link></li><li><Link to="/order">Cinnamon Raisin</Link></li></ul></div>
          <div><div className="footer-col-title">Info</div><ul className="footer-links"><li><Link to="/delivery">Delivery Areas</Link></li><li><Link to="/faq">FAQ</Link></li><li><Link to="/about">About Alice</Link></li></ul></div>
          <div><div className="footer-col-title">Connect</div><ul className="footer-links"><li><a href="#">Instagram</a></li><li><a href="#">Facebook</a></li><li><a href="#">Contact Us</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Power Bagels. All rights reserved.</div>
          <div className="footer-copy"><span className="footer-green">32g protein</span> · All natural · Real ingredients</div>
        </div>
      </footer>

    </main>
  )
}
