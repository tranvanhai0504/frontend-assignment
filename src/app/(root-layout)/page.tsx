'use client'
import {
  addressEllipsis,
  ConnectButton,
  useAccountBalance,
  useWallet,
} from '@suiet/wallet-kit'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const wallet = useWallet()
  const router = useRouter()
  const { error, loading, balance } = useAccountBalance()

  useEffect(() => {
    if (wallet.status === 'connected') {
      router.push('/home')
    }
  }, [wallet.status])

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="title text-primary">Connect your wallet to continue</h1>
      </div>
    </div>
  )
}
