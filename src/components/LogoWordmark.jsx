// Secondary wordmark — exact match to brand guide
// "POWER" / "BAGELS" massive stacked, transparent bg, purple text
// Green dash + "REAL INGREDIENTS. SERIOUS PROTEIN." tagline
export default function LogoWordmark({ width = 280, dark = false, className = '' }) {
  const textColor = dark ? '#4A237D' : '#F5F0E8'
  const taglineColor = dark ? '#4A237D' : 'rgba(245,240,232,0.75)'
  const h = Math.round(width * 0.55)

  return (
    <svg
      width={width}
      height={h}
      viewBox="0 0 560 308"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* POWER */}
      <text
        x="0"
        y="138"
        fontFamily="'Satoshi','Arial Black',sans-serif"
        fontWeight="900"
        fontSize="148"
        fill={textColor}
        letterSpacing="-4"
      >POWER</text>

      {/* BAGELS */}
      <text
        x="0"
        y="282"
        fontFamily="'Satoshi','Arial Black',sans-serif"
        fontWeight="900"
        fontSize="148"
        fill={textColor}
        letterSpacing="-4"
      >BAGELS</text>

      {/* ™ */}
      <text
        x="516"
        y="100"
        fontFamily="'Inter',sans-serif"
        fontWeight="500"
        fontSize="22"
        fill={textColor}
        opacity="0.6"
      >™</text>

      {/* Green dash */}
      <rect x="0" y="295" width="80" height="5" rx="3" fill="#7AC943" />

      {/* REAL INGREDIENTS. SERIOUS PROTEIN. */}
      <text
        x="96"
        y="307"
        fontFamily="'Inter',sans-serif"
        fontWeight="700"
        fontSize="17"
        fill={taglineColor}
        letterSpacing="2.5"
      >REAL INGREDIENTS. SERIOUS PROTEIN.</text>
    </svg>
  )
}
