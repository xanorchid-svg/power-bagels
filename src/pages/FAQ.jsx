import { useState } from 'react'

const FAQS = [
  { q: 'What are the ingredients?', a: 'Whole wheat flour, whey protein isolate, cage-free egg whites, water, yeast, salt, and flavor-specific additions. That\'s it — nothing you can\'t pronounce.' },
  { q: 'How much protein is in each bagel?', a: 'Every bagel — regardless of flavor — contains 32 grams of protein. One bagel = 35g of real, complete protein from whole food sources.' },
  { q: 'Are all ingredients natural?', a: 'Yes. No artificial flavors, no artificial preservatives, no gums, no fillers. We use the same ingredients you\'d find in a well-stocked kitchen.' },
  { q: 'Where do you deliver?', a: 'Within 30 miles of Oceanside / San Diego, CA — covering most of San Diego County. Use the delivery checker to confirm your specific zip.' },
  { q: 'When do you deliver?', a: 'We deliver fresh on Sundays. You\'ll receive a text with your delivery window the day before.' },
  { q: 'How long do the bagels stay fresh?', a: 'In the fridge: up to 5 days. In the freezer: up to 3 months. We recommend ordering a larger pack and freezing what you don\'t eat immediately.' },
  { q: 'Can I freeze the bagels?', a: 'Absolutely — and we recommend it. Freeze individually, then toast straight from frozen for 3–4 minutes. They come out perfectly every time.' },
  { q: 'What pack sizes are available?', a: 'Packs of 1, 4, 6, 8, and 12 bagels. The bigger the pack, the lower the cost per bagel — down to $7 per bagel in the 12-pack.' },
  { q: 'Can I mix flavors in one pack?', a: 'Yes! Select your flavor on the order page — we\'re working on mix-pack options coming soon.' },
  { q: 'Are the bagels gluten-free?', a: 'No. Power Bagels are made with whole wheat flour and are not gluten-free.' },
  { q: 'What is your satisfaction policy?', a: 'If you\'re not happy with your order for any reason, contact us and we\'ll make it right. We stand behind every bagel.' },
]

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = i => setOpen(open === i ? null : i)

  return (
    <main style={{ paddingTop: 68 }}>
      <div className="page-hero">
        <h1 className="display-lg">FAQ</h1>
        <p>Everything you need to know before your first order.</p>
      </div>
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '72px 48px 100px' }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ borderBottom: '1.5px solid rgba(0,0,0,.08)', overflow: 'hidden' }}>
            <button
              onClick={() => toggle(i)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', fontFamily: 'Inter,sans-serif', textAlign: 'left' }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--charcoal)', flex: 1 }}>{f.q}</span>
              <div style={{ width: 26, height: 26, borderRadius: '50%', background: open === i ? 'var(--orange)' : 'rgba(230,138,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: open === i ? 'var(--white)' : 'var(--orange)', fontSize: 17, flexShrink: 0, transition: 'all .3s', transform: open === i ? 'rotate(45deg)' : 'none' }}>+</div>
            </button>
            <div style={{ maxHeight: open === i ? 200 : 0, overflow: 'hidden', transition: 'max-height .4s cubic-bezier(.22,1,.36,1)' }}>
              <div style={{ paddingBottom: 18, fontSize: 14, lineHeight: 1.8, color: 'var(--gray)' }}>{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
