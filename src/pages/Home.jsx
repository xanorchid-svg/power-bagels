import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logoHero from '../assets/logo-hero-new.png'
import logoFoodOfJoy from '../assets/logo-food-of-joy.png'
import nutritionFacts from '../assets/nutrition-facts-plain.png'
import { DELIVERY_ZIPS } from '../data/constants'
import './Home.css'

let heroVideo
try {
  heroVideo = new URL('../assets/hero-bagels.mp4', import.meta.url).href
} catch {
  heroVideo = null
}

export default function Home() {
  const [zip, setZip] = useState('')
  const [zipResult, setZipResult] = useState(null)
  const [orderZip, setOrderZip] = useState('')
  const [orderZipResult, setOrderZipResult] = useState(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
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

  function checkOrderZip(e) {
    e.preventDefault()
    if (!/^\d{5}$/.test(orderZip)) { setOrderZipResult('invalid'); return }
    setOrderZipResult(DELIVERY_ZIPS.has(orderZip) ? 'ok' : 'no')
  }

  function handleEmailSubmit(e) {
    e.preventDefault()
    if (email.includes('@')) setEmailSent(true)
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

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-video-bg">
          {heroVideo && <video autoPlay muted loop playsInline src={heroVideo} />}
        </div>

        <div className="hero-inner">
          <div className="hero-text-col">

            {/* Logo — new PNG with transparent bg, larger */}
            <div className="hero-wordmark">
              <img src={logoHero} alt="Power Bagels" className="hero-logo-img" />
            </div>

            {/* 35G stat */}
            <div className="hero-stat-block">
              <div className="hero-stat-num">35G</div>
              <div className="hero-stat-label">Protein</div>
              <div className="hero-stat-sub">For Every Bagel</div>
            </div>

            {/* Icons — bigger circles, bolder labels */}
            <div className="hero-icons">
              {icons.map((ic, i) => (
                <div key={i} className="hero-icon-item">
                  <div className="hero-icon-circle">{ic.emoji}</div>
                  <div className="hero-icon-label">{ic.label}</div>
                </div>
              ))}
            </div>

            {/* CTA — unchanged */}
            <Link to="/order" className="hero-cta">Shop Bagels</Link>

            {/* Delivery checker — result shown inline, panel doesn't grow */}
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
              <div className={`d-result-slot ${zipResult ? 'has-result' : ''}`}>
                {zipResult === 'ok' && (
                  <div className="d-result ok">✓ We deliver to you! <Link to="/order" style={{ color:'inherit', fontWeight:700, textDecoration:'underline' }}>Order →</Link></div>
                )}
                {zipResult === 'no' && (
                  <div className="d-result no">✗ Not in our zone yet — expanding soon.</div>
                )}
                {zipResult === 'invalid' && (
                  <div className="d-result no">✗ Please enter a valid 5-digit zip.</div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker">
        <div className="ticker-track" aria-hidden="true">
          {[...Array(2)].map((_, r) =>
            ['Missing bread? We got you','35g Protein — Every Bagel','Plain · Everything · Blueberry · Sesame','Zero Artificial Ingredients','Real Ingredients. Serious Protein.','Freshly Baked. Same-Day Delivered.']
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
              { icon:'⚡', title:'35g Complete Plant-Based Protein', body:'While most bagels have around 10g protein, Power Bagels give you 35g of complete plant protein with all nine essential amino acids.' },
              { icon:'🌿', title:'It Actually Tastes Like a Bagel', body:"Dense, chewy, satisfying. The thing you've been craving while everyone told you bread was the enemy. Turns out the problem was never the bagel." },
              { icon:'🌾', title:'Simpler Ingredients, Better for You', body:'Made with only 8 simple ingredients. No preservatives, artificial additives, modified starches, or added sugar — just real food your body can recognize.' },
              { icon:'🧊', title:'High Fiber to Keep Your Gut Healthy', body:'Each bagel gives you 10g fiber — about one-third of the daily fiber most adults need. The fiber feeds the good bacteria in your gut microbiome.' },
              { icon:'📦', title:'Delivered Fresh to Your Door', body:'We bake fresh and deliver twice each week on Sundays and Wednesdays. Your bagels arrive fresh and ready — never sitting on a shelf for days.' },
              { icon:'🍽️', title:'Pre-Sliced and Individually Wrapped', body:'Every Power Bagel is pre-sliced and individually wrapped. Toast it, build a quick sandwich, or grab one on the go. So easy and delicious!' },
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

      {/* COMPARE — video background */}
      <section className="compare-section">
        <div className="compare-video-bg">
          {heroVideo && <video autoPlay muted loop playsInline src={heroVideo} />}
        </div>
        <div className="compare-overlay" />
        <div className="section-inner" style={{ position:'relative', zIndex:2 }}>
          <div ref={addRef} className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
            <span className="eyebrow eyebrow-lt">Missing Protein? Missing Bread?</span>
            <h2 className="display-lg" style={{ color:'var(--white)', marginBottom:12 }}>
              Other options compromise.<br /><span style={{ color:'#fff', fontStyle:'italic' }}>Power Bagels doesn't.</span>
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
              <div className="col-label">Power Bagels <span className="col-badge pb">Always 35g</span></div>
              <div className="bar-row" style={{ marginBottom:24 }}>
                <div className="bar-lbl"><span>Power Bagel (any flavor)</span><span style={{ color:'var(--white)' }}>35g ✓</span></div>
                <div className="bar-track"><div className="bar-fill bf-green" data-w={100} style={{ width:0 }} /></div>
              </div>
              <div className="proof-box">
                <div className="proof-label">What else you get</div>
                {['Real ingredients — nothing artificial','Tastes like food you actually want to eat','Fills you up — no mid-morning crash','Delivered fresh to your door'].map((t, i) => (
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
            <div ref={addRef} className="reveal nutrition-copy">
              <span className="eyebrow">Nutritional Value</span>
              <h2 className="display-lg" style={{ color:'var(--charcoal)', marginBottom:18 }}>
                The numbers<br />don't lie.
              </h2>
              <p className="nutrition-body">
                Unlike ordinary bagels that leave you hungry a few hours later, Power Bagels™ are designed to keep you fueled and satisfied all morning.
              </p>
              <p className="nutrition-body">
                Each bagel delivers <strong>35g of complete plant-based protein</strong>, <strong>10g of fiber</strong>, and wholesome complex carbohydrates from whole grains — all for just 260 calories. No added sugar, no preservatives, no artificial anything.
              </p>
              <p className="nutrition-body nutrition-ingredients">
                <strong>Ingredients:</strong> Water, wheat gluten, lupin flour, whole grain wheat flour, yellow pea protein, dates, instant yeast, sea salt.
              </p>
            </div>
            <div ref={addRef} className="reveal nutrition-visual">
              <img
                src={nutritionFacts}
                alt="Nutrition Facts — Power Bagels Plain"
                className="nutrition-facts-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testi-section">
        <div className="section-inner">
          <div ref={addRef} className="reveal" style={{ textAlign:'center', marginBottom:56 }}>
            <span className="eyebrow eyebrow-orange">Real People</span>
            <h2 className="display-lg" style={{ color:'#ffffff' }}>They switched.<br />They stayed.</h2>
          </div>
          <div className="testi-grid">
            {[
              { i:'JM', name:'Jessica M.', loc:'San Diego, CA', text:'"I\'ve tried every protein breakfast product. This is the only one I actually look forward to eating. It tastes like a real bagel because it IS a real bagel."' },
              { i:'DC', name:'David C.', loc:'Oceanside, CA', text:'"35g of protein for breakfast without drinking a shake? My kids eat these too — blueberry is their favorite. Zero artificial stuff is non-negotiable for our family."' },
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

      {/* ══ CTA + EMAIL — now ABOVE order section ══ */}
      <section className="cta-section">
        <div className="cta-video-bg">
          {heroVideo && <video autoPlay muted loop playsInline src={heroVideo} />}
        </div>
        <div className="cta-overlay" />
        <div ref={addRef} className="cta-inner reveal">
          <h2 className="display-lg" style={{ color:'var(--white)', marginBottom:14 }}>
            Power Your Day.<br />Naturally.
          </h2>
          <p className="cta-sub">Join thousands who swapped their protein shake for something they actually enjoy.</p>
          <Link to="/order" className="btn-primary cta-shop-btn">Shop Bagels →</Link>

          <div className="email-signup">
            <p className="email-signup-label">Get updates, recipes, and first access to new flavors.</p>
            {emailSent ? (
              <div className="email-success">✓ You're in! Talk soon.</div>
            ) : (
              <form className="email-row" onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  className="email-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="email-btn">Join the List</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ ORDER — now BELOW CTA ══ */}
      <section className="order-embed">
        <div className="section-inner">
          <div ref={addRef} className="reveal" style={{ textAlign:'center' }}>
            <span className="eyebrow">Order Now</span>
            <h2 className="display-lg" style={{ color:'var(--charcoal)' }}>
              Pick your pack.
            </h2>
          </div>

          {/* Flat price card — replaces pack grid */}
          <div className="flat-price-block">
            <div className="flat-price-hero">
              <span className="flat-price-num">$3.72</span>
              <span className="flat-price-per">per bagel</span>
            </div>
            <div className="flat-price-pills">
              <span className="flat-pill">🚚 $5.95 Flat Delivery Fee</span>
              <span className="flat-pill">✨ Freshly Made &amp; Delivered Same Day</span>
            </div>
            <p className="flat-price-details">
              Each bagel is individually packaged. Keep at room temperature for up to 3 days, in the fridge for up to 7 days, or freeze them. We deliver to most zip codes in San Diego and North County.
            </p>

            {/* Zip checker */}
            <div className="d-check flat-zip-check">
              <div className="d-check-lbl">📍 Check if we deliver to you</div>
              <form className="d-row" onSubmit={checkOrderZip}>
                <input
                  className="d-input"
                  type="text"
                  placeholder="Enter your zip code"
                  maxLength={5}
                  inputMode="numeric"
                  value={orderZip}
                  onChange={e => { setOrderZip(e.target.value); setOrderZipResult(null) }}
                />
                <button className="d-btn" type="submit">Check →</button>
              </form>
              <div className={`d-result-slot ${orderZipResult ? 'has-result' : ''}`}>
                {orderZipResult === 'ok' && (
                  <div className="d-result ok">✓ We deliver to you! <Link to="/order" style={{ color:'inherit', fontWeight:700, textDecoration:'underline' }}>Order now →</Link></div>
                )}
                {orderZipResult === 'no' && <div className="d-result no">✗ Not in our zone yet — expanding soon.</div>}
                {orderZipResult === 'invalid' && <div className="d-result no">✗ Please enter a valid 5-digit zip.</div>}
              </div>
            </div>

            <Link to="/order" className="btn-primary flat-order-btn">Order Bagels →</Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div>
            <div className="footer-logo">
              <img src={logoFoodOfJoy} alt="Food of Joy" className="footer-logo-img footer-foj-img" />
              <div className="footer-logo-text-group">
                <span className="footer-logo-subbrand">Power Bagels</span>
                <span className="footer-logo-parent">by Food of Joy</span>
              </div>
            </div>
            <p className="footer-tagline">Real Ingredients. Serious Protein.</p>
          </div>
          <div><div className="footer-col-title">Shop</div><ul className="footer-links"><li><Link to="/order">Plain Bagels</Link></li><li><Link to="/order">Everything Bagels</Link></li><li><Link to="/order">Sesame</Link></li></ul></div>
          <div><div className="footer-col-title">Info</div><ul className="footer-links"><li><Link to="/delivery">Delivery Areas</Link></li><li><Link to="/faq">FAQ</Link></li></ul></div>
          <div><div className="footer-col-title">Connect</div><ul className="footer-links"><li><a href="#">Instagram</a></li><li><a href="#">Facebook</a></li><li><a href="#">Contact Us</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2026 Power Bagels. All rights reserved.</div>
          <div className="footer-copy"><span className="footer-green">35g protein</span> · All natural · Real ingredients</div>
        </div>
      </footer>

    </main>
  )
}
