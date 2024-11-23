'use client'

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu'
import { useAccountBalance, useWallet } from '@suiet/wallet-kit'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AppContext } from './AppProvider'

const networkOptions = [
  { name: 'Sui Mainnet' },
  { name: 'Sui Devnet' },
  { name: 'Sui Testnet' },
]

export function SwitchNetworkButton() {
  const wallet = useWallet()
  const { setNetwork } = React.useContext(AppContext)

  const handleChangeNetwork = (value: string) => {
    setNetwork(value)
    wallet.chain = wallet.chains.find((chain) => chain.name === value)
  }

  React.useEffect(() => {
    if (!wallet.chain) return
    if (wallet.status === 'connected') {
      setNetwork(wallet.chain.name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.status])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          {wallet.chain?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Switch network</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={wallet.chain?.name}
          onValueChange={(value) => handleChangeNetwork(value)}
        >
          {networkOptions.map((option) => (
            <DropdownMenuRadioItem key={option.name} value={option.name}>
              {option.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
