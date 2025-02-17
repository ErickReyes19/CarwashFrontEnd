'use client'

import { TrendingUp } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { EarningsData } from "@/lib/Types"
import { formatLempiras } from "@/lib/utils"
import { format, parseISO } from "date-fns"

const chartConfig = {
  ganancias: {
    label: "Ganancias",
    color: "hsl(var(--chart-1))",
  },
} 

interface EarningsChartProps {
  data: EarningsData[]
}

export function EarningsChart({ data }: EarningsChartProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Ganancias por Fecha</CardTitle>
        <CardDescription>Ingresos diarios</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full"
        style={{ height: "200px" }} // Altura fija igual al primer gráfico
        config={chartConfig}>
          <LineChart

            data={data}
            margin={{
              top: 10,
              left: 12,
              right: 12,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis
              dataKey="fecha"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => format(parseISO(value), "dd MMM")}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => formatLempiras(value)}
            />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatLempiras(value as number)}
                />
              }
            />
            <Line
              type="linear"
              dataKey="ganancias"
              stroke={chartConfig.ganancias.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Muestra ganancias diarias
        </div>
      </CardFooter>
    </Card>
  )
}
