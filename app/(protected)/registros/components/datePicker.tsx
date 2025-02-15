"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const today = new Date()
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: today,
    to: today,
  })
  const router = useRouter()

  const handleSelectDate = (range: DateRange | undefined) => {
    if (!range) return // Si el rango es undefined, no hacer nada

    setDate(range)

    const from = range.from ? format(range.from, "yyyy-MM-dd") : ""
    const to = range.to ? format(range.to, "yyyy-MM-dd") : ""
    
    // Solo actualiza la URL si ambas fechas son válidas
    if (from && to) {
      router.push(`?from=${from}&to=${to}`)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "P", { locale: es })} -{" "}
                  {format(date.to, "P", { locale: es })}
                </>
              ) : (
                format(date.from, "P", { locale: es })
              )
            ) : (
              <span>Selecciona una fecha</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}