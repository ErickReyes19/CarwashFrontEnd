'use client';
import { ArrowUpDown } from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Link from "next/link";
import { Cierre } from "@/lib/Types";

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
    cell: ({ row }) => {
      // Se formatea la fecha para mostrarla de forma legible
      const date = new Date(row.original.fecha);
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: "metodosPago",
    header: "Métodos de Pago",
    cell: ({ row }) => {
      const metodosPago = row.original.metodosPago;
      const totalPago = row.original.total;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Ver Métodos
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4">
            <div className="space-y-2">
              {metodosPago.map((metodo, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{metodo.metodoPago}</span>
                  <span>
                    {metodo.total.toLocaleString("es-HN", {
                      style: "currency",
                      currency: "HNL",
                    })}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>
                  {totalPago.toLocaleString("es-HN", {
                    style: "currency",
                    currency: "HNL",
                  })}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
              <span className="sr-only">Abrir Menú</span>
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
