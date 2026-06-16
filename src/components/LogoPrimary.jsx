// Primary circular logo — exact recreation from brand guide
// Transparent background, cream text on purple disc
export default function LogoPrimary({ size = 120, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Top arc path for "POWER" */}
        <path id="arcPower" d="M 52,200 A 148,148 0 0,1 348,200" />
        {/* Bottom arc path for "BAGELS" */}
        <path id="arcBagels" d="M 44,230 A 156,156 0 0,0 356,230" />
        {/* Bottom tagline arc */}
        <path id="arcTagline" d="M 80,310 A 130,130 0 0,0 320,310" />
      </defs>

      {/* Main purple disc */}
      <circle cx="200" cy="200" r="196" fill="#4A237D" />

      {/* Inner ring detail */}
      <circle cx="200" cy="200" r="186" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

      {/* POWER arched text — top */}
      <text
        fontFamily="'Satoshi','Arial Black',sans-serif"
        fontWeight="900"
        fontSize="72"
        fill="#F5F0E8"
        letterSpacing="6"
      >
        <textPath href="#arcPower" startOffset="50%" textAnchor="middle">POWER</textPath>
      </text>

      {/* Center hole — white circle representing bagel hole */}
      <circle cx="200" cy="185" r="62" fill="#F5F0E8" />
      <circle cx="200" cy="185" r="44" fill="#4A237D" />

      {/* Green banner across middle */}
      <rect x="20" y="244" width="360" height="46" fill="#4A237D" />
      <line x1="20" y1="248" x2="380" y2="248" stroke="#7AC943" strokeWidth="3" />
      <line x1="20" y1="286" x2="380" y2="286" stroke="#7AC943" strokeWidth="3" />
      <text
        x="200" y="273"
        textAnchor="middle"
        fontFamily="'Satoshi','Arial',sans-serif"
        fontWeight="700"
        fontSize="19"
        fill="#7AC943"
        letterSpacing="2.5"
      >32Gs OF PROTEIN FOR EVERY BAGEL</text>

      {/* BAGELS arched text — bottom */}
      <text
        fontFamily="'Satoshi','Arial Black',sans-serif"
        fontWeight="900"
        fontSize="72"
        fill="#F5F0E8"
        letterSpacing="5"
      >
        <textPath href="#arcBagels" startOffset="50%" textAnchor="middle">BAGELS</textPath>
      </text>

      {/* Green leaf icon at bottom */}
      <g transform="translate(192, 352) scale(0.9)">
        <path d="M8,0 C8,0 0,8 0,14 C0,18.4 3.6,22 8,22 C12.4,22 16,18.4 16,14 C16,8 8,0 8,0 Z" fill="#7AC943" transform="translate(-4,-2) rotate(-20,8,11)"/>
        <path d="M8,0 C8,0 0,8 0,14 C0,18.4 3.6,22 8,22 C12.4,22 16,18.4 16,14 C16,8 8,0 8,0 Z" fill="#5e9932" transform="translate(4,-2) rotate(20,8,11)"/>
      </g>

      {/* ALL NATURAL. HIGH PROTEIN. tagline arc */}
      <text
        fontFamily="'Inter','Arial',sans-serif"
        fontWeight="600"
        fontSize="14"
        fill="#F5F0E8"
        letterSpacing="3"
        opacity="0.7"
      >
        <textPath href="#arcTagline" startOffset="50%" textAnchor="middle">ALL NATURAL. HIGH PROTEIN.</textPath>
      </text>
    </svg>
  )
}
