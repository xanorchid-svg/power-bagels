import { useState } from 'react'
import { useCart } from '../context/CartContext'
import PackCard from '../components/PackCard'
import { PACKS, FLAVORS } from '../data/constants'

export default function Order() {
  const { addToCart } = useCart()
  const [selectedFlavor, setSelectedFlavor] = useState('everything')
  const [selectedPack, setSelectedPack] = useState(2)
  const flavor = FLAVORS.find(f => f.key === selectedFlavor)
  const pack = PACKS[selectedPack]

  return (
    <main style={{ paddingTop: 68 }}>
      <div className="page-hero">
        <h1 className="display-lg">Build Your Order</h1>
        <p>Choose your flavor, pick your pack, add to cart.</p>
      </div>

      <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(24px,5vw,56px) clamp(20px,4vw,48px)' }}>

        {/* Flavors */}
        <span className="eyebrow" style={{ display:'block', marginBottom:16 }}>Step 1 — Choose Your Flavor</span>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:16, marginBottom:48 }}>
          {FLAVORS.map(f => (
            <div key={f.key}
              onClick={() => setSelectedFlavor(f.key)}
              style={{ borderRadius:16, overflow:'hidden', cursor:'pointer', border:`2.5px solid ${selectedFlavor===f.key?'var(--green)':'transparent'}`, transition:'all .25s', boxShadow: selectedFlavor===f.key?'0 8px 28px rgba(138,160,92,.2)':'' }}>
              <div style={{ height:160, background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:56 }}>🥯</div>
              <div style={{ background:'var(--white)', padding:'16px 20px' }}>
                <div style={{ fontWeight:800, fontSize:18, color:'var(--charcoal)', letterSpacing:'-.02em' }}>{f.name}</div>
                <div style={{ fontSize:12, color:'var(--gray)', marginTop:3 }}>{f.desc}</div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, background:'rgba(230,138,0,.07)', borderRadius:7, padding:'5px 11px', marginTop:10 }}>
                  <span style={{ fontWeight:800, fontSize:13, color:'var(--orange)' }}>35g</span>
                  <span style={{ fontSize:10, color:'var(--gray)', letterSpacing:'.06em', textTransform:'uppercase' }}>Protein</span>
                </div>
                {selectedFlavor===f.key && <div style={{ marginTop:8, fontSize:11, fontWeight:700, color:'var(--green)' }}>✓ Selected</div>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'1fr clamp(240px,30%,340px)', gap:40, alignItems:'start' }}>
          <div>
            {/* Packs */}
            <span className="eyebrow" style={{ display:'block', marginBottom:16 }}>Step 2 — Choose Your Pack</span>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:12 }}>
              {PACKS.map((p, i) => (
                <PackCard key={i} pack={p} selected={selectedPack===i} onClick={() => setSelectedPack(i)} onAdd={() => addToCart(flavor.name, p.count, p.price)} />
              ))}
            </div>
          </div>

          {/* Summary */}
          <div style={{ background:'var(--white)', border:'1.5px solid rgba(0,0,0,.08)', borderRadius:20, padding:28, position:'sticky', top:88 }}>
            <div style={{ fontWeight:800, fontSize:17, color:'var(--charcoal)', marginBottom:22, paddingBottom:14, borderBottom:'1.5px solid rgba(0,0,0,.07)' }}>Your Order</div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--gray)', marginBottom:10 }}><span>Flavor</span><span style={{ fontWeight:700, color:'var(--charcoal)' }}>{flavor.name}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--gray)', marginBottom:10 }}><span>Pack</span><span style={{ fontWeight:700, color:'var(--charcoal)' }}>{pack.count} Bagel{pack.count>1?'s':''}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:14, color:'var(--gray)', marginBottom:10 }}><span>Per bagel</span><span>${pack.ppu.toFixed(2)}</span></div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:18, fontWeight:800, color:'var(--charcoal)', marginTop:14, paddingTop:14, borderTop:'1.5px solid rgba(0,0,0,.07)' }}><span>Total</span><span style={{ color:'var(--orange)' }}>${pack.price}</span></div>
            <button onClick={() => addToCart(flavor.name, pack.count, pack.price)} style={{ width:'100%', background:'var(--green)', color:'var(--white)', border:'none', borderRadius:13, padding:17, fontSize:14, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', cursor:'pointer', fontFamily:'Inter,sans-serif', marginTop:18 }}>
              Add to Cart →
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
