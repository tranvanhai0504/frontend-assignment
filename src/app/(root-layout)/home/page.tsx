'use client'

import { useWallet } from '@suiet/wallet-kit'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import HistoryCard from '@/components/HistoryCard'
import { TransferChart } from '@/components/TransferChart'
import TransferSuiCard from '@/components/TransferSuiCard'

export default function Home() {
  const wallet = useWallet()
  const router = useRouter()

  useEffect(() => {
    if (wallet.status !== 'connected') {
      router.push('/')
    }
  }, [wallet.status])

  return (
    <div className="flex flex-col space-y-5 px-20 pb-10">
      <div className="flex flex-col space-y-4">
        <h1 className="text-xl font-semibold">Features</h1>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="h-full">
          <TransferSuiCard />
        </div>
        <div className="col-span-2">
          <TransferChart />
        </div>
      </div>
      <div className="w-full">
        <HistoryCard />
      </div>
    </div>
  )
}
