'use client'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type HistoryType = {
  digest: string
  receiver: string
  age: string
  amount: string
}

const History = () => {
  const [history, setHistory] = useState<HistoryType[]>([])

  useEffect(() => {
    const historyData = localStorage.getItem('history')

    if (historyData) {
      setHistory(JSON.parse(historyData) as HistoryType[])
    }
  }, [])

  return (
    <div className="flex flex-col px-20">
      <h1 className="text-xl font-semibold text-primary">
        History transactions
      </h1>
      <Table className="mt-5 text-primary">
        <TableHeader>
          <TableRow>
            <TableHead>Digest</TableHead>
            <TableHead>Receiver address</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((h, index) => (
            <TableRow key={index} className="text-black/70">
              <TableCell className="font-medium">{h.digest}</TableCell>
              <TableCell>{h.receiver}</TableCell>
              <TableCell>{h.age}</TableCell>
              <TableCell>{h.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {history.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="">
                <div className="flex w-full justify-center text-black">
                  No History to show
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

export default History
