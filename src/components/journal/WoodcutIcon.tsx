type IconName =
  | 'external-link'
  | 'back-arrow'
  | 'case-study'
  | 'specimen'
  | 'personal-study'
  | 'playground'
  | 'filter-x'
  | 'inspect-hand'
  | 'cv-download'
  | 'journal'

interface WoodcutIconProps {
  name: IconName
  size?: number
  className?: string
  'aria-hidden'?: boolean
}

const paths: Record<IconName, React.ReactElement> = {
  'external-link': (
    <>
      <path d="M8 4H4v12h12v-4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 4h4v4" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="4" x2="9" y2="11" strokeLinecap="round" />
    </>
  ),
  'back-arrow': (
    <>
      <line x1="16" y1="10" x2="4" y2="10" strokeLinecap="round" />
      <polyline points="8,6 4,10 8,14" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'case-study': (
    <>
      <rect x="4" y="3" width="12" height="15" rx="1" />
      <line x1="7" y1="7" x2="13" y2="7" strokeLinecap="round" />
      <line x1="7" y1="10" x2="13" y2="10" strokeLinecap="round" />
      <line x1="7" y1="13" x2="10" y2="13" strokeLinecap="round" />
    </>
  ),
  specimen: (
    <>
      <circle cx="10" cy="10" r="5" />
      <line x1="10" y1="3" x2="10" y2="5" strokeLinecap="round" />
      <line x1="10" y1="15" x2="10" y2="17" strokeLinecap="round" />
      <line x1="3" y1="10" x2="5" y2="10" strokeLinecap="round" />
      <line x1="15" y1="10" x2="17" y2="10" strokeLinecap="round" />
      <circle cx="10" cy="10" r="2" />
    </>
  ),
  'personal-study': (
    <>
      <circle cx="10" cy="10" r="7" />
      <line x1="10" y1="3" x2="10" y2="17" strokeLinecap="round" />
      <line x1="3" y1="10" x2="17" y2="10" strokeLinecap="round" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </>
  ),
  playground: (
    <>
      <rect x="3" y="3" width="6" height="6" rx="0.5" />
      <rect x="11" y="3" width="6" height="6" rx="0.5" />
      <rect x="3" y="11" width="6" height="6" rx="0.5" />
      <rect x="11" y="11" width="6" height="6" rx="0.5" />
    </>
  ),
  'filter-x': (
    <>
      <line x1="4" y1="6" x2="16" y2="6" strokeLinecap="round" />
      <line x1="6" y1="10" x2="14" y2="10" strokeLinecap="round" />
      <line x1="8" y1="14" x2="12" y2="14" strokeLinecap="round" />
      <line x1="13" y1="13" x2="17" y2="17" strokeLinecap="round" />
      <line x1="17" y1="13" x2="13" y2="17" strokeLinecap="round" />
    </>
  ),
  'inspect-hand': (
    <>
      <path d="M8 12V6a1.5 1.5 0 013 0v4" strokeLinecap="round" />
      <path d="M11 10a1.5 1.5 0 013 0v1" strokeLinecap="round" />
      <path d="M14 11a1.5 1.5 0 013 0v3l-1 3H9l-3-4a1.5 1.5 0 012-2l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'cv-download': (
    <>
      <path d="M4 16v2h12v-2" strokeLinecap="round" />
      <line x1="10" y1="3" x2="10" y2="13" strokeLinecap="round" />
      <polyline points="6,9 10,13 14,9" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  journal: (
    <>
      <rect x="4" y="2" width="12" height="17" rx="1" />
      <line x1="7" y1="6" x2="13" y2="6" strokeLinecap="round" />
      <line x1="7" y1="9" x2="13" y2="9" strokeLinecap="round" />
      <line x1="7" y1="12" x2="10" y2="12" strokeLinecap="round" />
      <line x1="4" y1="2" x2="4" y2="19" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
}

export function WoodcutIcon({
  name,
  size = 20,
  className,
  'aria-hidden': ariaHidden = true,
}: WoodcutIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className={className}
      aria-hidden={ariaHidden}
    >
      {paths[name]}
    </svg>
  )
}
