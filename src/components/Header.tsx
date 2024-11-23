'use client'
import '@suiet/wallet-kit/style.css'

import { ConnectButton, ConnectModal, useWallet } from '@suiet/wallet-kit'
import clsx from 'clsx'
import { Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'

import { Switch } from '@/components/ui/switch'

import { Profile } from './Profile'
import { SwitchNetworkButton } from './SwitchNetworkButton'
import { Button } from './ui/button'
import { Label } from './ui/label'

const Header = () => {
  const wallet = useWallet()
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (wallet.connected) {
      setShowModal(false)
    }
  }, [wallet.connected])

  return (
    <header
      className={`
        sticky left-0 top-0 z-50 flex w-full items-center justify-end gap-10
        border-b bg-background px-20 py-4 backdrop-blur-md

        lg:justify-between
      `}
    >
      <div className="flex space-x-4">
        <Link
          href={'/home'}
          className={clsx(pathname !== '/home' && 'text-muted-foreground')}
        >
          Home
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="airplane-mode"
            checked={theme === 'dark'}
            onCheckedChange={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark')
            }}
          />
          <Label htmlFor="airplane-mode">
            {theme === 'light' ?
              <Sun size={15} />
            : <Moon size={15} />}
          </Label>
        </div>
        <SwitchNetworkButton />
        {wallet.status === 'connected' ?
          <Profile />
        : <ConnectModal
            open={showModal}
            onOpenChange={(open) => setShowModal(open)}
          >
            <Button className="!w-fit !px-4 !text-sm !font-semibold">
              Connect wallet
            </Button>
          </ConnectModal>
        }
      </div>
    </header>
  )
}

export default Header
