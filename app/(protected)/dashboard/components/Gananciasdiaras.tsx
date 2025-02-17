'use client'

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { GananciasDia } from "@/lib/Types"
import { formatLempiras } from "@/lib/utils"

const chartConfig = {
    total: {
        label: "Ganancias Diarias: ",
        color: "hsl(var(--chart-1))", // Color dinámico aquí
    }
} satisfies ChartConfig

export function GananciasDiarias({ data }: { data: GananciasDia }) {
    const totalVisitors = data.total
    const currentDate = new Date()
    const currentDay = currentDate.getDate()
    const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
    const currentYear = currentDate.getFullYear()
    const formattedDate = `${currentDay} de ${currentMonth} de ${currentYear}`

    // Crear el objeto adecuado para el gráfico
    const chartData = [{ total: totalVisitors }]

    return (
        <Card className="flex flex-col h-56">
            <CardHeader className="items-center pb-0">
                <CardTitle>Ganancias del día</CardTitle>
                <CardDescription>{`${formattedDate}`}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                style={{ height: "220px" }}
                    config={chartConfig}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={100}
                        outerRadius={140}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} >
                            <Label 
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {formatLempiras(totalVisitors) || "0"}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Ganancias
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="total"
                            stackId="a"
                            cornerRadius={7}
                            fill="var(--color-total)"
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
