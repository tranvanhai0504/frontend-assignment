'use client'
import {
  type Chain,
  SuiDevnetChain,
  SuiMainnetChain,
  SuiTestnetChain,
  WalletProvider,
} from '@suiet/wallet-kit'
import type React from 'react'

import AppProvider from '@/components/AppProvider'
import Header from '@/components/Header'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

const SupportedChains: Chain[] = [
  // ...DefaultChains,
  SuiMainnetChain,
  SuiTestnetChain,
  SuiDevnetChain,
]

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex">
      <AppProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider chains={SupportedChains}>
            <div
              className={`
                flex h-screen w-screen flex-1 flex-col items-center gap-2
              `}
            >
              <Header />
              <Toaster />
              <div className="w-full">{children}</div>
            </div>
          </WalletProvider>
        </ThemeProvider>
      </AppProvider>
    </div>
  )
}

export default RootLayout
