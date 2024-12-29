import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, compareAsc } from "date-fns";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function FormateadorFecha(dateString : string) {
  const fecha = format(dateString, "MM/dd/yyyy");

  return fecha;
}

