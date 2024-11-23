import {
  addressEllipsis,
  useAccountBalance,
  useWallet,
} from '@suiet/wallet-kit'
import { ChevronDown, LogOut } from 'lucide-react'
import { useContext } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { AppContext } from './AppProvider'

export function Profile() {
  const wallet = useWallet()
  const { balance } = useAccountBalance()
  const { network } = useContext(AppContext)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="rounded-xl">
          {wallet.account?.address && addressEllipsis(wallet.account?.address)}{' '}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            {network} Balance:
            <DropdownMenuShortcut>
              {Number(balance) / 1000000000} SUI
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await wallet.disconnect()
          }}
          className="cursor-pointer"
        >
          Disconnect
          <DropdownMenuShortcut>
            <LogOut />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
