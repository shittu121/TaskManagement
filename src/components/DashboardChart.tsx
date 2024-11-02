"use client"

import { Line, LineChart } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A line chart"

// Sample data for the chart
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

// Accepting a lineColor prop to change the line color dynamically
export function ChartDashboard({ lineColor = "var(--color-desktop)" }: { lineColor?: string }) {
  return (
    <Card className="w-20 lg:w-32 md:w-32 h-20 bg-slate-950 border-0">
      <CardContent className="pt-8 lg:pt-6 md:pt-6 -ml-3">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 0,
              right: 0,
            }}
            className=""
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Use the lineColor prop to change the stroke color */}
            <Line
              dataKey="desktop"
              type="natural"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
