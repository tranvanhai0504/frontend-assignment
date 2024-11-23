'use client'
import { Transaction } from '@mysten/sui/transactions'
import {
  addressEllipsis,
  ConnectButton,
  useAccountBalance,
  useWallet,
} from '@suiet/wallet-kit'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { type FormEvent, useEffect, useState } from 'react'
import { RiErrorWarningLine } from 'react-icons/ri'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { addressValidate } from '@/lib/utils'

export default function Home() {
  const wallet = useWallet()
  const router = useRouter()
  const { error, loading, balance } = useAccountBalance()
  const [step, setStep] = useState(0)
  const [address, setAddress] = useState('')
  const [isError, setIsError] = useState(false)
  const [amount, setAmount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (wallet.status !== 'connected') {
      router.push('/')
    }
  }, [wallet.status])

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
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="title text-primary">
          Connected Account: <b>{wallet.account?.address}</b>
        </h1>
        <h1 className="title text-primary">
          Current balance: <b>{Number(balance) / 1000000000} SUI</b>
        </h1>
      </div>
      <div className="mt-5 flex w-96 flex-col rounded-xl border p-4 shadow-lg">
        <h1 className="text-xl font-semibold text-primary">
          Transfer Sui balance
        </h1>
        {step === 0 && (
          <form
            action=""
            className="mt-4 space-y-4 text-black"
            onSubmit={(e) => {
              handleStepOne(e)
            }}
          >
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-normal text-black/70">
                Wallet Address
              </Label>
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
              className="rounded-lg bg-primary px-4 py-1 text-white"
            >
              Next
            </button>
          </form>
        )}
        {step === 1 && (
          <form
            action=""
            className="mt-4 space-y-4 text-black"
            onSubmit={handleStepTwo}
          >
            <div className="flex flex-col gap-2">
              <Label className="text-sm font-normal text-black/70">
                Enter the amount
              </Label>
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
                className="rounded-lg bg-black/10 px-4 py-1 text-black/50"
                onClick={() => setStep(0)}
              >
                back
              </button>
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-1 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Transfer'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
