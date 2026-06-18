// About.jsx
export default function About() {
  return (
    <main style={{ paddingTop: 68 }}>
      <div style={{ background: 'var(--charcoal)', minHeight: '60vh', display: 'flex', alignItems: 'center', padding: '80px 48px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(230,138,0,.2) 0%, transparent 65%)' }} />
        <div style={{ maxWidth: 1320, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <span className="eyebrow eyebrow-lt">About Alice</span>
            <h1 className="display-lg" style={{ color: 'var(--white)', marginBottom: 20 }}>Built by someone tired<br />of compromising.</h1>
            <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 16, lineHeight: 1.8, fontWeight: 300 }}>
              <strong style={{ color: 'rgba(255,255,255,.88)' }}>Alice didn't set out to build a food brand.</strong> She set out to solve her own breakfast problem — too busy to cook, too health-conscious to grab whatever was easy, and deeply tired of protein shakes.<br /><br />
              She started baking protein bagels in her San Diego kitchen because nothing she could buy was both <strong style={{ color: 'rgba(255,255,255,.88)' }}>real food and real protein</strong>. She brought them to friends. Friends told friends. And here we are.<br /><br />
              Every bagel is made from ingredients Alice would feed her own family — because she does.
            </p>
          </div>
          <div style={{ width: '100%', aspectRatio: '4/5', borderRadius: 22, background: 'linear-gradient(160deg,#C97800,#E68A00)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <span style={{ fontFamily: 'Satoshi,Inter,sans-serif', fontWeight: 900, fontSize: 100, color: 'rgba(255,255,255,.12)', letterSpacing: '-.05em' }}>A</span>
            <div style={{ position: 'absolute', bottom: 22, left: 22, background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,.14)', borderRadius: 11, padding: '11px 16px', color: 'var(--white)', fontWeight: 700, fontSize: 14 }}>Alice · Founder, Power Bagels</div>
          </div>
        </div>
      </div>
      <div style={{ background: 'var(--cream)', padding: '90px 0' }}>
        <div className="section-inner">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="eyebrow">What We Stand For</span>
            <h2 className="display-md" style={{ color: 'var(--charcoal)' }}>The values baked into every bagel.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
            {[
              { icon: '⚡', title: 'Powerful', text: 'High protein to fuel your everyday. Not a supplement — real food that works.' },
              { icon: '🌿', title: 'Natural', text: 'Made with real, all-natural ingredients. Nothing Alice can\'t pronounce.' },
              { icon: '🤍', title: 'Wholesome', text: 'Good for your body and your lifestyle. Food that fits real people.' },
              { icon: '✦', title: 'Simple', text: 'Clean, minimal ingredients. Maximum impact. Nothing hiding.' },
            ].map((v, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '30px 18px', background: 'var(--white)', borderRadius: 18, border: '1.5px solid rgba(0,0,0,.06)' }}>
                <div style={{ fontSize: 34, marginBottom: 14 }}>{v.icon}</div>
                <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--charcoal)', marginBottom: 7 }}>{v.title}</div>
                <div style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.6 }}>{v.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
