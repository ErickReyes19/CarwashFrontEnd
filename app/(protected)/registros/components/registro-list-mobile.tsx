"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, User, Search, Plus, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import EstadoDialog from "./dialogCambioEstado";
import { RegistroServicio } from "@/lib/Types";

interface ServiceRequestListProps {
  RegistroServicio: RegistroServicio[];
}

export default function ServiceRequestListMobile({ RegistroServicio }: ServiceRequestListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServicios = RegistroServicio.filter(
    (servicio) =>
      servicio.clienteNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.clienteCorreo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.estadoServicioNombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear una nueva solicitud */}
      <Link href="/registros/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nueva solicitud
          <Plus />
        </Button>
      </Link>

      {/* Buscador */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar solicitud..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de solicitudes filtradas */}
      {filteredServicios.map((servicio) => (
        <div
          key={servicio.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h3 className="text-sm font-medium truncate">{servicio.clienteNombre}</h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span className="truncate">{servicio.clienteCorreo}</span>
              </p>
              <p className="text-xs flex items-center">
                <span className="truncate">
                  Estado: {servicio.estadoServicioNombre}
                </span>
              </p>
              <p className="text-xs flex items-center">
                <span className="truncate">
                  Fecha: {new Date(servicio.fecha).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <Link href={`/registros/${servicio.id}/view`}>
                  <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                </Link>
                <Link href={`/registros/${servicio.id}/edit`}>
                  <DropdownMenuItem>Editar</DropdownMenuItem>
                </Link>
                <EstadoDialog registroId={servicio.id} />
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
      {filteredServicios.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron solicitudes.
        </p>
      )}
    </div>
  );
}
