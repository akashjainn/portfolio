import type { Metadata, Viewport } from 'next'
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import '../styles/aurora.css'
import { AuroraEffects } from '@/components/journal/AuroraEffects'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://akashjain.xyz'),
  title: {
    default: 'Akash Jain — Vol. II',
    template: '%s | Akash Jain',
  },
  description:
    'Computer science, Georgia Tech. Interning at SpaceX on Starlink, summer \'26. Field journal of reliable systems, written from Atlanta.',
  authors: [{ name: 'Akash Jain', url: 'https://akashjain.xyz' }],
  creator: 'Akash Jain',
  openGraph: {
    title: 'Akash Jain — Vol. II',
    description: 'Field journal of reliable systems, written from Atlanta.',
    url: 'https://akashjain.xyz',
    siteName: 'Akash Jain',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jain — Vol. II',
    description: 'Field journal of reliable systems, written from Atlanta.',
  },
  icons: {
    icon: '/assets/favicon-bitten-a.svg',
    shortcut: '/assets/favicon-bitten-a.svg',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#06070F',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interTight.variable} ${jetBrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <div className="aurora-field" aria-hidden="true" />
        <div className="aurora-noise" aria-hidden="true" />
        <AuroraEffects />
        {children}
      </body>
    </html>
  )
}
