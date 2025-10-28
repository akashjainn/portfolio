"use client"

/**
 * Wavy section divider with vibrant gradient colors
 * Inspired by organic, flowing shapes from psychedelic art
 */

interface WaveDividerProps {
  variant?: 'blue-purple' | 'pink-orange' | 'mint-yellow' | 'rainbow'
  className?: string
  flip?: boolean
}

export function WaveDivider({ 
  variant = 'blue-purple', 
  className = '',
  flip = false 
}: WaveDividerProps) {
  const gradientId = `wave-gradient-${variant}`
  
  const gradients = {
    'blue-purple': (
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(194, 100%, 50%)', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(271, 60%, 58%)', stopOpacity: 0.6 }} />
      </linearGradient>
    ),
    'pink-orange': (
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(335, 100%, 50%)', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(16, 100%, 60%)', stopOpacity: 0.6 }} />
      </linearGradient>
    ),
    'mint-yellow': (
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(163, 100%, 51%)', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(55, 100%, 58%)', stopOpacity: 0.6 }} />
      </linearGradient>
    ),
    'rainbow': (
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: 'hsl(194, 100%, 50%)', stopOpacity: 0.6 }} />
        <stop offset="33%" style={{ stopColor: 'hsl(271, 60%, 58%)', stopOpacity: 0.6 }} />
        <stop offset="66%" style={{ stopColor: 'hsl(335, 100%, 50%)', stopOpacity: 0.6 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(16, 100%, 60%)', stopOpacity: 0.6 }} />
      </linearGradient>
    )
  }

  return (
    <svg 
      className={`w-full h-12 md:h-16 ${flip ? 'rotate-180' : ''} ${className}`}
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {gradients[variant]}
      </defs>
      <path 
        fill={`url(#${gradientId})`}
        d="M0,50 Q150,20 300,50 T600,50 Q750,70 900,50 T1200,50 L1200,100 L0,100 Z"
      >
        <animate
          attributeName="d"
          dur="15s"
          repeatCount="indefinite"
          values="
            M0,50 Q150,20 300,50 T600,50 Q750,70 900,50 T1200,50 L1200,100 L0,100 Z;
            M0,50 Q150,70 300,50 T600,50 Q750,30 900,50 T1200,50 L1200,100 L0,100 Z;
            M0,50 Q150,20 300,50 T600,50 Q750,70 900,50 T1200,50 L1200,100 L0,100 Z
          "
        />
      </path>
    </svg>
  )
}

/**
 * Smaller decorative wave for inline use
 */
export function WaveAccent({ className = '' }: { className?: string }) {
  return (
    <svg 
      className={`inline-block w-16 h-4 ${className}`}
      viewBox="0 0 200 40"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wave-accent-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(194, 100%, 50%)', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(335, 100%, 50%)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path
        fill="url(#wave-accent-gradient)"
        d="M0,20 Q25,10 50,20 T100,20 Q125,30 150,20 T200,20 L200,40 L0,40 Z"
      />
    </svg>
  )
}
