'use client'

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ServicioGanancia } from "@/lib/Types"
import { formatLempiras } from "@/lib/utils" // Importa la función de formateo

interface PieChartServiciosProps {
  servicioGanancia: ServicioGanancia[]
}

export function PieChartServicios({ servicioGanancia }: PieChartServiciosProps) {

  const chartData = servicioGanancia.map((servicio, index) => ({
    name: `${servicio.nombreServicio} (${servicio.cantidad}): `, // Correcto
    value: servicio.ganancias, // Mantiene el número para el gráfico
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Servicios Realizados</CardTitle>
        <CardDescription>Resumen de ingresos</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          className="mx-auto w-full aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
          config={{}}
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie 
              data={chartData} 
              dataKey="value" 
              nameKey="name" 
              label={({ value }) => formatLempiras(value)} // Formatea solo la etiqueta
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
