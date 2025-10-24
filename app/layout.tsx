import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ConditionalHeader } from "@/components/conditional-header"
import { Providers } from "@/components/providers"

// Using link tags for fonts to avoid build-time fetching in restricted environments

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "REBIRTH - The Future of Tokenized Commerce",
    template: "%s — REBIRTH",
  },
  description:
    "The future of collaborative ownership. Create tokenized projects where your community holds real equity. Launch businesses, apps, and ideas with true shared ownership.",
  generator: "v0.app",
  applicationName: "REBIRTH",
  keywords: [
    "tokenization",
    "community ownership",
    "revenue share",
    "crowdfunding",
    "defi",
    "investing",
  ],
  authors: [{ name: "REBIRTH" }],
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "REBIRTH - The Future of Tokenized Commerce",
    description:
      "Tokenize businesses with true shared ownership. Investors earn revenue share; customers earn with every purchase.",
    siteName: "REBIRTH",
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: "REBIRTH" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@rebirth_xyz",
    title: "REBIRTH - The Future of Tokenized Commerce",
    description:
      "Tokenize businesses with true shared ownership. Investors earn revenue share; customers earn with every purchase.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "technology",
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap" />
      </head>
      <body className="font-sans antialiased">
        <a href="#content" className="skip-to-content">Skip to content</a>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <ConditionalHeader />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
