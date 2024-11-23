import '@/styles/globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'fe assignment',
  description: 'Generated by create next app',
}

const gilroy = localFont({
  src: [
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Thin.otf',
      weight: '100',
      style: 'thin',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Xlight.otf',
      weight: '200',
      style: 'extra-light',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Medium.otf',
      weight: '500',
      style: 'medium',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy SemiBold.otf',
      weight: '600',
      style: 'semi-bold',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Bold.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy XBold.otf',
      weight: '800',
      style: 'extra-bold',
    },
    {
      path: '../../public/fonts/gilroy/SVN-Gilroy Black.otf',
      weight: '900',
      style: 'black',
    },
  ],
  variable: '--font-gilroy',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1"
        />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="mask-icon" href="/favicon.png" color="#000000" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body
        className={`
          ${gilroy.variable}
        `}
      >
        {children}
      </body>
    </html>
  )
}
