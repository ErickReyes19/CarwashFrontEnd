"use client";
import { ArrowUpDown } from "lucide-react";
import { Cierre } from "@/lib/Types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Cierre>[] = [
  {
    accessorKey: "fecha",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Fecha
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "metodosPago",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="text-left"
      >
        Métodos de Pago
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const metodosPago = row.original.metodosPago;
      const totalPago = row.original.total; // Usar el total global enviado en la respuesta

      return (
        <div className="space-y-1">
          {metodosPago.map((metodo, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-semibold">{metodo.metodoPago}</span>
              <span className="text-xl">${metodo.total}</span>
            </div>
          ))}
          {/* Mostrar el total de todos los métodos de pago */}
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span className="text-xl">${totalPago}</span>
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const cierre = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <Link href={`/cierres/${cierre.id}/edit`}>
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </Link>
            <Link href={`/cierres/${cierre.id}/view`}>
              <DropdownMenuItem>Ver Detalle</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
