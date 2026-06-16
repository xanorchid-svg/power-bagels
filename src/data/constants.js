export const PACKS = [
  { count: 1,  price: 9,  ppu: 9.00, save: null },
  { count: 4,  price: 34, ppu: 8.50, save: 'Save 6%' },
  { count: 6,  price: 48, ppu: 8.00, save: 'Save 11%', popular: true },
  { count: 8,  price: 60, ppu: 7.50, save: 'Save 17%' },
  { count: 12, price: 84, ppu: 7.00, save: 'Save 22%' },
]

export const FLAVORS = [
  { key: 'plain',     name: 'Plain',           desc: 'Classic, clean. A blank canvas.',          bg: 'linear-gradient(135deg,#f0e8d4,#d0a840)' },
  { key: 'everything',name: 'Everything',      desc: 'Bold. Savory. Seeds, garlic, onion.',       bg: 'linear-gradient(135deg,#1a1030,#3a1a6e)' },
  { key: 'cinnamon',  name: 'Cinnamon Raisin', desc: 'Sweet warmth. Perfect with cream cheese.', bg: 'linear-gradient(135deg,#4a1a00,#8b3500)' },
]

export const DELIVERY_ZIPS = new Set([
  // Oceanside
  '92049','92051','92054','92056','92057','92058','92059','92060',
  // Carlsbad
  '92008','92009','92010','92011',
  // Vista
  '92081','92083','92084','92085',
  // San Marcos
  '92069','92078',
  // Escondido
  '92025','92026','92027','92029',
  // Encinitas / Solana Beach / Del Mar
  '92023','92024','92075','92014',
  // Rancho Santa Fe / Poway
  '92067','92064','92074',
  // San Diego central/north
  '92037','92093','92121','92122','92123','92126','92127','92128',
  '92129','92130','92131','92101','92102','92103','92104','92105',
  '92106','92107','92108','92109','92110','92111','92113','92114',
  '92115','92116','92117','92119','92120','92124',
  // La Mesa / El Cajon
  '91941','91942','91943','91944','91945','91946',
  '92019','92020','92021','92022',
  // Chula Vista / South Bay
  '91910','91911','91913','91914','91915',
  // Spring Valley
  '91977','91978',
])
