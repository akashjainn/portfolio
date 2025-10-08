import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '../styles/design-system.css'
import { RoleProvider } from '@/components/ui/role-personalization'

// Configure Inter as fallback (SF Pro will be loaded via CSS when available)
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://akashjain.dev'),
  title: {
    default: 'Akash Jain — Building reliable, real-time web systems',
    template: '%s | Akash Jain'
  },
  description: 'Georgia Tech CS major crafting accessible, measurable Next.js apps with telemetry and performance budgets. PropSage, StockSense, and more enterprise-grade projects.',
  keywords: [
    'next.js developer',
    'typescript engineer', 
    'real-time systems',
    'georgia tech computer science',
    'portfolio analytics',
    'accessible web development',
    'performance optimization',
    'telemetry monitoring'
  ],
  authors: [{ name: 'Akash Jain', url: 'https://akashjain.dev' }],
  creator: 'Akash Jain',
  openGraph: {
    title: 'Akash Jain — Building reliable, real-time web systems',
    description: 'Georgia Tech CS major focused on performant, accessible web systems with Next.js/TypeScript.',
    url: 'https://akashjain.dev',
    siteName: 'Akash Jain',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Akash Jain - Building reliable, real-time web systems'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jain — Building reliable, real-time web systems',
    description: 'Georgia Tech CS major focused on performant, accessible web systems.',
    images: ['/og-image.png']
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
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <RoleProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          {children}
        </RoleProvider>
      </body>
    </html>
  )
}
