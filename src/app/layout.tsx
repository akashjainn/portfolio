import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Akash Jain - CS Student & Software Engineer',
  description: '3rd-year Computer Science student at Georgia Tech with software engineering experience. Built production systems serving 2M+ users during State Farm internship.',
  keywords: 'computer science student, software engineer intern, React, Next.js, TypeScript, JavaScript, Georgia Tech',
  authors: [{ name: 'Akash Jain' }],
  creator: 'Akash Jain',
  openGraph: {
    title: 'Akash Jain - CS Student & Software Engineer',
    description: '3rd-year Computer Science student at Georgia Tech with software engineering experience.',
    url: 'https://akashjain.dev',
    siteName: 'Akash Jain Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Jain - CS Student & Software Engineer',
    description: '3rd-year Computer Science student at Georgia Tech with software engineering experience.',
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
