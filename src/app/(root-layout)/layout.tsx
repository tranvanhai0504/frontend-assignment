'use client'
import {
  type Chain,
  DefaultChains,
  SuiDevnetChain,
  SuiMainnetChain,
  SuiTestnetChain,
  WalletProvider,
} from '@suiet/wallet-kit'
import type React from 'react'

import Header from '@/components/Header'
import { Toaster } from '@/components/ui/toaster'

const SupportedChains: Chain[] = [
  // ...DefaultChains,
  SuiTestnetChain,
  SuiMainnetChain,
]

const RootLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex !text-[#EEEEEE]">
      <WalletProvider chains={SupportedChains}>
        <div
          className={`flex h-screen w-screen flex-1 flex-col items-center gap-2`}
        >
          <Header />
          <Toaster />
          <div className="w-full">{children}</div>
        </div>
      </WalletProvider>
    </div>
  )
}

export default RootLayout
