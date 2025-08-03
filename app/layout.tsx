import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import Nav from '@/components/layout/nav'
import Footer from '@/components/layout/footer'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'MiniLinkedIn - Professional Networking',
    template: '%s | MiniLinkedIn'
  },
  description: 'Connect with professionals and grow your network',
  applicationName: 'MiniLinkedIn',
  referrer: 'origin-when-cross-origin',
  keywords: ['networking', 'career', 'professional', 'jobs', 'connections'],
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://yourdomain.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'MiniLinkedIn - Professional Networking',
    description: 'Connect with professionals and grow your network',
    url: 'https://yourdomain.com',
    siteName: 'MiniLinkedIn',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiniLinkedIn - Professional Networking',
    description: 'Connect with professionals and grow your network',
    creator: '@yourhandle',
    images: ['/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Nav />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          {/* <Toaster /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}