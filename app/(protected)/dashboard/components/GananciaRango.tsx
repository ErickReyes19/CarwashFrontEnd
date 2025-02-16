'use client';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { format, parseISO } from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { EarningsData } from "@/lib/Types";

interface EarningsChartProps {
  data: EarningsData[];
}

const chartConfig = {
  ganancias: {
    label: "Ganancias",
    color: "#4CAF50", // Color verde para las ganancias
  },
} satisfies ChartConfig;

export default function EarningsChart({ data }: EarningsChartProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Ganancias Diarias</CardTitle>
        <CardDescription>Visualización de ganancias por fecha</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis
                dataKey="fecha"
                tickFormatter={(value) => format(parseISO(value), "dd MMM")}
                tickLine={false}
                axisLine={false}
              />
              <YAxis tickFormatter={(value) => `HNL${value}`} tickLine={false} axisLine={false} />
              <Bar
                dataKey="ganancias"
                fill={chartConfig.ganancias.color} // Color verde para las barras
                radius={[4, 4, 0, 0]}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
