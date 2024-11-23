'use client'
import { Transaction } from '@mysten/sui/transactions'
import {
  addressEllipsis,
  ConnectButton,
  useAccountBalance,
  useWallet,
} from '@suiet/wallet-kit'
import clsx from 'clsx'
import { type FormEvent, useContext, useEffect, useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

import { AppContext } from '@/components/AppProvider'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { addressValidate } from '@/lib/utils'

const TransferSuiCard = () => {
  const wallet = useWallet()
  const [step, setStep] = useState(0)
  const [amount, setAmount] = useState(0)
  const [address, setAddress] = useState('')
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { balance } = useAccountBalance()

  console.log(balance)

  const { toast } = useToast()
  const { network } = useContext(AppContext)

  const handleStepOne = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (address === '') {
      setIsError(true)
      return
    }

    if (!addressValidate(address)) {
      setIsError(true)
      return
    }
    setStep(1)
    setIsError(false)
  }

  const handleStepTwo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (amount === 0) {
      setIsError(true)
      return
    }

    if (amount > Number(balance) / 1000000000) {
      setIsError(true)
      return
    }

    // Transfer logicF
    setIsLoading(true)

    handleTransfer()
      .then((res) => {
        toast({
          title: 'Transaction successful',
          description: 'digest: ' + res.digest,
          action: (
            <ToastAction
              altText="View Transaction"
              onClick={() => {
                const network = wallet.chain?.name.split(' ')[1].toLowerCase()
                const url = `https://suiscan.xyz/${network}/tx/${res.digest}`
                window.open(url, '_blank')?.focus()
              }}
            >
              View transaction
            </ToastAction>
          ),
        })
        handleAddHistory(res.digest)
      })
      .catch((error) => {
        toast({
          title: 'Transaction failed',
          description: error.message,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleAddHistory = (digest: string) => {
    const historyData = localStorage.getItem('history')
    const history = historyData ? JSON.parse(historyData) : []

    history.push({
      digest,
      receiver: addressEllipsis(address),
      age: new Date().toLocaleString(),
      amount: amount + ' SUI',
    })

    localStorage.setItem('history', JSON.stringify(history))
  }

  const handleTransfer = async () => {
    const tx = new Transaction()
    tx.setGasBudget(2000000)

    const [coin] = tx.splitCoins(tx.gas, [amount * 1000000000])

    tx.transferObjects([coin], address)

    const resData = await wallet.signAndExecuteTransaction({
      transaction: tx,
    })

    return resData
  }

  return (
    <div className="flex w-full flex-col rounded-xl border p-4 shadow">
      <h1 className="text-xl font-semibold text-primary">
        Transfer Sui balance
      </h1>
      {step === 0 && (
        <form
          action=""
          className="mt-4 space-y-4"
          onSubmit={(e) => {
            handleStepOne(e)
          }}
        >
          <div className="flex flex-col gap-2">
            <Label className="text-sm font-normal">Wallet Address</Label>
            <Textarea
              value={address}
              onChange={(e) => {
                setAddress(e.target.value)
                setIsError(!addressValidate(e.target.value))
              }}
              className={clsx(isError && 'border-[#F32013]')}
            />
            {isError && (
              <Label
                className={`
                  flex items-center space-x-1 font-normal text-[#F32013]
                `}
              >
                <RiErrorWarningLine />
                <p>Invalid address</p>
              </Label>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-foreground px-4 py-1 text-muted"
          >
            Next
          </button>
        </form>
      )}
      {step === 1 && (
        <form action="" className="mt-4 space-y-4" onSubmit={handleStepTwo}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <Label className="text-sm font-normal">Enter the amount</Label>
              <Label className="text-sm font-normal">
                Current balance: {Number(balance) / 1000000000} SUI
              </Label>
            </div>
            <span className="flex space-x-2">
              <Input
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value))
                  setIsError(false)
                }}
                type="number"
                pattern="[0-9]+([\.,][0-9]+)?"
                step="0.01"
                className={clsx(isError && 'border-[#F32013]')}
              />
              <button
                type="button"
                onClick={() => {
                  setAmount(Number(balance) / 1000000000 - 0.02)
                  setIsError(false)
                }}
                className="rounded-xl px-2 text-sm text-[#0080ff]/90"
              >
                Max
              </button>
            </span>
            {isError && (
              <Label
                className={`
                  flex items-center space-x-1 font-normal text-[#F32013]
                `}
              >
                <RiErrorWarningLine />
                <p>Invalid amount</p>
              </Label>
            )}
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="rounded-lg bg-foreground/50 px-4 py-1 text-muted"
              onClick={() => setStep(0)}
            >
              back
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-1 text-muted"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Transfer'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default TransferSuiCard
