"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Search, Plus, Calendar, DollarSign } from "lucide-react";
import { Cierre } from "@/lib/Types";
import { formatLempiras } from "@/lib/utils";

interface CierreListProps {
  cierres: Cierre[];
}

export default function CierreListMobile({ cierres }: CierreListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCierres = cierres.filter((cierre) =>
    cierre.fecha.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      {/* Botón para nuevo cierre */}
      <Link href="/cierres/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo cierre
          <Plus />
        </Button>
      </Link>

      {/* Buscador */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar cierre por fecha..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de cierres filtrados */}
      {filteredCierres.map((cierre) => (
        <div
          key={cierre.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <h3 className="text-sm font-medium truncate">
                {new Date(cierre.fecha).toLocaleDateString()}
              </h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <DollarSign className="h-3 w-3 mr-1 text-green-500" />
                Total: {formatLempiras(cierre.total)}
              </p>
              <p className="text-xs text-gray-500">Métodos de pago:</p>
              {cierre.metodosPago.map((metodo, index) => (
                <p key={index} className="text-xs ml-4">
                  - {metodo.metodoPago}: {formatLempiras(metodo.total)}
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/cierres/${cierre.id}/view`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredCierres.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron cierres.</p>
      )}
    </div>
  );
}
