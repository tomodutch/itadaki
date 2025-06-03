"use client"

import * as React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive weight chart"

const chartData = [
  { date: "2024-07-01", weight: 80.0 },
  { date: "2024-07-08", weight: 79.8 },
  { date: "2024-07-15", weight: 79.5 },
  { date: "2024-07-22", weight: 79.2 },
  { date: "2024-07-29", weight: 78.9 },
  { date: "2024-08-05", weight: 78.6 },
  { date: "2024-08-12", weight: 78.3 },
  { date: "2024-08-19", weight: 78.0 },
  { date: "2024-08-26", weight: 77.7 },
  { date: "2024-09-02", weight: 77.4 },
  { date: "2024-09-09", weight: 77.1 },
  { date: "2024-09-16", weight: 76.8 },
  { date: "2024-09-23", weight: 76.6 },
  { date: "2024-09-30", weight: 76.4 },
  { date: "2024-10-07", weight: 76.2 },
  { date: "2024-10-14", weight: 76.0 },
  { date: "2024-10-21", weight: 75.8 },
  { date: "2024-10-28", weight: 75.6 },
  { date: "2024-11-04", weight: 75.4 },
  { date: "2024-11-11", weight: 75.2 },
  { date: "2024-11-18", weight: 75.0 },
  { date: "2024-11-25", weight: 74.9 },
  { date: "2024-12-02", weight: 74.7 },
  { date: "2024-12-09", weight: 74.5 },
  { date: "2024-12-16", weight: 74.3 },
  { date: "2024-12-23", weight: 74.2 },
  { date: "2024-12-30", weight: 74.0 },
  { date: "2025-01-06", weight: 73.8 },
  { date: "2025-01-13", weight: 73.6 },
  { date: "2025-01-20", weight: 73.4 },
  { date: "2025-01-27", weight: 73.2 },
  { date: "2025-02-03", weight: 73.1 },
  { date: "2025-02-10", weight: 73.0 },
  { date: "2025-02-17", weight: 72.9 },
  { date: "2025-02-24", weight: 72.8 },
  { date: "2025-03-03", weight: 72.7 },
  { date: "2025-03-10", weight: 72.6 },
  { date: "2025-03-17", weight: 72.6 },
  { date: "2025-03-24", weight: 72.5 },
]

const chartConfig = {
  weight: {
    label: "Weight (kg)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function WeightChart(props: React.HTMLAttributes<HTMLDivElement>) {
  const [timeRange, setTimeRange] = React.useState("1y")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const lastDate = new Date("2025-03-24")
    let daysToSubtract = 365
    if (timeRange === "30d") daysToSubtract = 30
    if (timeRange === "7d") daysToSubtract = 7
    const startDate = new Date(lastDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <div {...props}>
      <div className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold leading-none tracking-tight text-foreground">
              Weight Progress
            </h2>
            <p className="text-sm text-muted-foreground">
              Your progress over the last year
            </p>
          </div>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select time range"
          >
            <SelectValue placeholder="Last year" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1y" className="rounded-lg">Last year</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
            <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="strokeProgress" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--color-blue-300)" />
                <stop offset="100%" stopColor="var(--primary)" />
              </linearGradient>

              <linearGradient id="fillWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-blue-300)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={40}
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            <Area
              dataKey="weight"
              type="monotone"
              stroke="var(--primary)"
              fill="url(#fillWeight)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  )
}
