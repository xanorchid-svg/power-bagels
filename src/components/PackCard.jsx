import './PackCard.css'

export default function PackCard({ pack, onAdd, selected, onClick }) {
  return (
    <div className={`pack-card${selected ? ' selected' : ''}`} onClick={onClick}>
      {pack.popular && <div className="pack-popular">Most Popular</div>}
      <div className="pack-num">{pack.count}</div>
      <div className="pack-unit">Bagel{pack.count > 1 ? 's' : ''}</div>
      <div className="pack-price">${pack.price}</div>
      <div className="pack-ppu">${pack.ppu.toFixed(2)}/bagel</div>
      <div className="pack-save">{pack.save || ''}</div>
      <button
        className="pack-add"
        onClick={e => { e.stopPropagation(); onAdd() }}
      >
        Add to Cart
      </button>
    </div>
  )
}
