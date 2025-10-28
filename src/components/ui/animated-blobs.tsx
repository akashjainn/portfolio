"use client"

/**
 * Animated organic blob shapes inspired by psychedelic art style
 * - Low opacity (15%) to not interfere with content readability
 * - Slow, smooth 20-30s animation cycles
 * - Uses vibrant gradient colors from design system
 */

export function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Blob 1 - Electric Blue to Cyber Purple */}
      <svg 
        className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] opacity-15 animate-blob-slow"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blob-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(194, 100%, 50%)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(271, 60%, 58%)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path fill="url(#blob-gradient-1)">
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M400,200 Q550,150 650,300 Q700,450 600,600 Q450,700 300,600 Q150,450 200,300 Q250,150 400,200 Z;
              M420,220 Q520,180 630,320 Q680,460 590,590 Q460,680 320,590 Q170,460 220,320 Q270,180 420,220 Z;
              M400,200 Q550,150 650,300 Q700,450 600,600 Q450,700 300,600 Q150,450 200,300 Q250,150 400,200 Z
            "
          />
        </path>
      </svg>

      {/* Blob 2 - Hot Pink to Neon Orange */}
      <svg 
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] opacity-15 animate-blob-slower"
        viewBox="0 0 700 700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blob-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(335, 100%, 50%)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(16, 100%, 60%)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path fill="url(#blob-gradient-2)">
          <animate
            attributeName="d"
            dur="30s"
            repeatCount="indefinite"
            values="
              M350,150 Q500,100 600,250 Q650,400 550,550 Q400,650 250,550 Q100,400 150,250 Q200,100 350,150 Z;
              M370,170 Q480,120 590,260 Q630,390 540,530 Q410,630 270,530 Q120,390 170,260 Q220,120 370,170 Z;
              M350,150 Q500,100 600,250 Q650,400 550,550 Q400,650 250,550 Q100,400 150,250 Q200,100 350,150 Z
            "
          />
        </path>
      </svg>

      {/* Blob 3 - Acid Yellow to Neon Mint */}
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 animate-blob-medium"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="blob-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(55, 100%, 58%)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'hsl(163, 100%, 51%)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path fill="url(#blob-gradient-3)">
          <animate
            attributeName="d"
            dur="22s"
            repeatCount="indefinite"
            values="
              M300,120 Q450,80 540,220 Q580,360 490,480 Q360,560 220,480 Q80,360 120,220 Q180,80 300,120 Z;
              M320,140 Q430,100 520,230 Q560,350 480,460 Q370,540 240,460 Q100,350 140,230 Q200,100 320,140 Z;
              M300,120 Q450,80 540,220 Q580,360 490,480 Q360,560 220,480 Q80,360 120,220 Q180,80 300,120 Z
            "
          />
        </path>
      </svg>
    </div>
  )
}

/**
 * Smaller animated accents for section headers
 */
export function BlobAccent({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={`inline-block w-8 h-8 opacity-60 ${className}`}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="accent-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'hsl(194, 100%, 50%)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(335, 100%, 50%)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="40" fill="url(#accent-gradient)">
        <animate
          attributeName="r"
          dur="3s"
          repeatCount="indefinite"
          values="40;45;40"
        />
      </circle>
    </svg>
  )
}
