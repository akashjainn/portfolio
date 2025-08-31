import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akash Jain - Software Engineer',
  description: 'Full-stack software engineer specializing in scalable web applications and modern technologies. Portfolio showcasing innovative projects and professional experience.',
  keywords: 'software engineer, full-stack developer, React, Next.js, Python, JavaScript, Georgia Tech',
  authors: [{ name: 'Akash Jain' }],
  creator: 'Akash Jain',
  openGraph: {
    title: 'Akash Jain - Software Engineer',
    description: 'Full-stack software engineer specializing in scalable web applications and modern technologies.',
    url: 'https://akashjain.dev',
    siteName: 'Akash Jain Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jain - Software Engineer',
    description: 'Full-stack software engineer specializing in scalable web applications and modern technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={spaceGrotesk.className}>
        {children}
      </body>
    </html>
  )
}
