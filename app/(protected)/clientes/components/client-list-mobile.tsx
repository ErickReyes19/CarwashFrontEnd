"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, Pencil, Mail, Phone, User, Search, Plus } from "lucide-react";
import { Cliente } from "@/lib/Types";

interface ClientListProps {
  clientes: Cliente[];
}

export default function ClientListMobile({ clientes }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm)
  );

  return (
    <div className="space-y-4">
      {/* Botón para nuevo cliente */}
      <Link href="/clientes/create" className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo cliente
          <Plus />
        </Button>
      </Link>

      {/* Buscador */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar cliente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {/* Listado de clientes filtrados */}
      {filteredClientes.map((cliente) => (
        <div
          key={cliente.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  cliente.activo ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <h3 className="text-sm font-medium truncate">
                {cliente.nombre}
              </h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs flex items-center">
                <Mail className="h-3 w-3 mr-1" />
                <span className="truncate">{cliente.correo}</span>
              </p>
              <p className="text-xs flex items-center">
                <Phone className="h-3 w-3 mr-1" />
                {cliente.telefono}
              </p>
              <p className="text-xs flex items-center">
                <User className="h-3 w-3 mr-1" />
                {cliente.genero}
              </p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/clientes/${cliente.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/clientes/${cliente.id}/view`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredClientes.length === 0 && (
        <p className="text-center text-gray-500">No se encontraron clientes.</p>
      )}
    </div>
  );
}
