import type { Metadata, Viewport } from 'next'
import { Source_Serif_4, JetBrains_Mono, Inter_Tight } from 'next/font/google'
import './globals.css'

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://akashjain.dev'),
  title: {
    default: 'Akash Jain — Field Journal',
    template: '%s | Akash Jain',
  },
  description:
    'A field journal of software work by Akash Jain — case studies, specimens, and personal study.',
  authors: [{ name: 'Akash Jain', url: 'https://akashjain.dev' }],
  creator: 'Akash Jain',
  openGraph: {
    title: 'Akash Jain — Field Journal',
    description: 'Case studies, specimens, and personal study.',
    url: 'https://akashjain.dev',
    siteName: 'Akash Jain',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Akash Jain — Field Journal' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jain — Field Journal',
    description: 'Case studies, specimens, and personal study.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sourceSerif4.variable} ${jetBrainsMono.variable} ${interTight.variable}`}
      suppressHydrationWarning
    >
      <body>
        {children}
      </body>
    </html>
  )
}
