'use client'

import { TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

import { type HistoryType } from './HistoryCard'

type AggregatedData = {
  amount: number
  date: string
}

const chartConfig = {
  desktop: {
    label: 'desktop',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function TransferChart() {
  const [historyDataChart, setHistoryDataChart] = useState<AggregatedData[]>([])

  useEffect(() => {
    const historyData = localStorage.getItem('history')

    if (historyData) {
      setHistoryDataChart(
        aggregateData(JSON.parse(historyData) as HistoryType[]),
      )
    }
  }, [])

  function aggregateData(data: HistoryType[]): AggregatedData[] {
    const result: { [key: string]: number } = {}
    const now = new Date()
    const sevenDaysAgo = new Date(now)
    sevenDaysAgo.setDate(now.getDate() - 7)

    // Initialize result with all dates in the last 7 days
    for (let d = new Date(sevenDaysAgo); d <= now; d.setDate(d.getDate() + 1)) {
      const formattedDate = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}`
      result[formattedDate] = 0
    }

    data.forEach((item) => {
      const dateParts = item.age.split(' ')[1].split('/')
      const timeParts = item.age.split(' ')[0].split(':')
      const date = new Date(
        `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timeParts[0]}:${timeParts[1]}:00`,
      )

      console.log(date, sevenDaysAgo, now)

      if (date >= sevenDaysAgo && date <= now) {
        const formattedDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2].slice(-2)}`
        const amount = parseFloat(item.amount.split(' ')[0])

        result[formattedDate] += amount
      }
    })

    return Object.keys(result).map((date) => ({
      amount: result[date],
      date,
    }))
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl">Transfer Sui Chart</CardTitle>
        <CardDescription>Amount SUI transferred last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <BarChart accessibilityLayer data={historyDataChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="amount" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
