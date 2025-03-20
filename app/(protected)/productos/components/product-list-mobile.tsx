"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Search, Plus, Tag, FileText, DollarSign } from "lucide-react";
import type { Producto } from "@/lib/Types";
import { formatLempiras } from "@/lib/utils";

interface ProductListProps {
  productos: Producto[];
}

export default function ProductListMobile({ productos }: ProductListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <Link href={`/productos/create`} className="w-full md:w-auto">
        <Button className="w-full md:w-auto flex items-center gap-2">
          Nuevo producto
          <Plus />
        </Button>
      </Link>
      <div className="relative">
        <Input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {filteredProductos.map((producto) => (
        <div
          key={producto.id}
          className="flex items-center justify-between p-4 rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  producto.activo ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <h3 className="text-sm font-medium truncate">
                {producto.nombre}
              </h3>
            </div>
            <div className="mt-2 flex justify-between items-center">
              <p className="text-xs flex items-center">
                <FileText className="h-3 w-3 mr-1" />
                <span className="truncate">{producto.descripcion}</span>
              </p>
              <p className="text-xs flex items-center">
                {formatLempiras(producto.precio)}
              </p>
            </div>
          </div>
          <div className="flex items-center ml-4">
            <Link href={`/productos/${producto.id}/edit`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
      {filteredProductos.length === 0 && (
        <p className="text-center text-gray-500">
          No se encontraron productos.
        </p>
      )}
    </div>
  );
}
