"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Search, Plus, Car, Paintbrush, User } from "lucide-react"; // Importando más iconos
import { Input } from "@/components/ui/input";
import type { Vehiculo } from "@/lib/Types"; // Asegúrate de definir la interfaz Vehiculo

interface VehicleListProps {
  vehiculos: Vehiculo[];
}

export default function VehicleListMobile({ vehiculos }: VehicleListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredVehiculos = vehiculos.filter((vehiculo) =>
    vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.color.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Botón para crear un nuevo vehículo */}
      <Link href="/vehiculos/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo vehículo
          <Plus className="h-4 w-4" /> {/* Icono de Plus */}
        </Button>
      </Link>

      {/* Input de búsqueda */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar vehículo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /> {/* Icono de Search */}
      </div>

      {/* Listado de vehículos */}
      {filteredVehiculos.map((vehiculo) => (
        <div
          key={vehiculo.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            {/* Línea 1: Indicador y placa */}
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  vehiculo.activo ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <h3 className="text-sm font-medium truncate">{vehiculo.placa}</h3>
            </div>
            {/* Línea 2: Modelo, marca y color con iconos */}
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4 text-gray-500" />
                <p className="text-xs truncate">{vehiculo.modelo}</p>
              </div>
              <div className="flex items-center gap-1">
                <Paintbrush className="h-4 w-4 text-gray-500" />
                <p className="text-xs truncate">{vehiculo.marca}</p>
              </div>
              <div className="flex items-center gap-1">
              <Paintbrush className="h-4 w-4 text-gray-500" />
                <p className="text-xs truncate">{vehiculo.color}</p>
              </div>
            </div>
            {/* Línea 3: Lista de clientes asignados */}
            {vehiculo.clientes && vehiculo.clientes.length > 0 && (
              <p className="text-xs mt-1 truncate">
                <User className="h-4 w-4 inline-block text-gray-500" />
                Clientes: {vehiculo.clientes.map((cliente) => cliente.nombre).join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/vehiculos/${vehiculo.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" /> {/* Icono de Pencil */}
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredVehiculos.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron vehículos.</p>
      )}
    </div>
  );
}
