"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, PenToolIcon as Tool, DollarSign, Search, Plus } from "lucide-react";
import { Servicio } from "@/lib/Types";
import { formatLempiras } from "@/lib/utils";

interface ServiceListProps {
  servicios: Servicio[];
}

export default function ServiceListMobile({ servicios }: ServiceListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServicios = servicios.filter(
    (servicio) =>
      servicio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para nuevo servicio */}
      <Link href="/servicios/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo servicio
          <Plus />
        </Button>
      </Link>

      {/* Buscador */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar servicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de servicios filtrados */}
      {filteredServicios.map((servicio) => (
        <div
          key={servicio.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  servicio.activo ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <h3 className="text-sm font-medium truncate">{servicio.nombre}</h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <Tool className="h-3 w-3 mr-1" />
                <span className="truncate">{servicio.descripcion}</span>
              </p>
              <p className="text-xs flex items-center">
                <DollarSign className="h-3 w-3 mr-1" />
                Precio: {formatLempiras(Number(servicio.precio.toFixed(2)))}
              </p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/servicios/${servicio.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredServicios.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron servicios.</p>
      )}
    </div>
  );
}
