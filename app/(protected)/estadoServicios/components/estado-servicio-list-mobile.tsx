"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, FileText, Search, Plus } from "lucide-react"
import { EstadoServicio } from "@/lib/Types"


interface EstadoServicioListProps {
  estadosServicio: EstadoServicio[]
}

export default function EstadoServicioListMobile({ estadosServicio  }: EstadoServicioListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEstados = estadosServicio.filter(
    (estado) =>
      estado.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estado.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <Link href={`/estadoServicios/create`} className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo estado
          <Plus />
        </Button>
      </Link>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar estado de servicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>
      {filteredEstados.map((estado) => (
        <div key={estado.id} className="flex items-center justify-between p-4 border rounded-lg shadow">
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span className={`w-2 h-2 rounded-full mr-2 ${estado.activo ? "bg-green-500" : "bg-red-500"}`}></span>
              <h3 className="text-sm font-medium truncate">{estado.nombre}</h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs  flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                <span className="truncate">{estado.descripcion}</span>
              </p> 
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/estadoServicios/${estado.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredEstados.length === 0 && <p className="text-center ">No se encontraron resultados.</p>}
    </div>
  )
}

