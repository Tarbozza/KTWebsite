import React from "react"
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Kanit, VT323 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const myFont = localFont({
  src: './fonts/font.ttf',
  variable: '--font-custom',
  display: 'swap',
})

const _kanit = Kanit({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "600", "800"],
});

const _vt323 = VT323({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: 'KT Thaibaan | เซิร์ฟเวอร์มายคราฟที่ดีที่สุด',
  description: 'เปิดประสบการณ์เอาชีวิตรอดในรูปแบบใหม่ สังคมดี ระบบเสถียร รองรับทั้ง Bedrock',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" className="dark">
      <body className={`font-sans antialiased ${myFont.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
