'use client'
import '@suiet/wallet-kit/style.css'

import { ConnectButton, useWallet } from '@suiet/wallet-kit'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const wallet = useWallet()

  return (
    <header
      className={`
        sticky left-0 top-0 z-50 flex w-full items-center justify-end gap-10
        bg-background bg-transparent px-20 py-4 backdrop-blur-md

        lg:justify-between
      `}
    >
      <div className="flex space-x-4 text-primary">
        <Link href={'/home'}>Home</Link>
        <Link href={'/history'}>History</Link>
      </div>
      <div className="flex items-center space-x-4">
        <h1 className="title text-primary">
          <b>{wallet.chain?.name}</b>
        </h1>
        <ConnectButton label="Connect" />
      </div>
    </header>
  )
}

export default Header
