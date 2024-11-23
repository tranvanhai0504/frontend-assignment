import { useWallet } from '@suiet/wallet-kit'
import React, { createContext } from 'react'

export const AppContext = createContext<{
  network: string | undefined
  setNetwork: (network: string) => void
}>({
  network: '',
  setNetwork: (network: string) => {},
})

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet()
  const [network, setNetwork] = React.useState(wallet.chain?.name)

  return (
    <AppContext.Provider
      value={{
        network,
        setNetwork,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
