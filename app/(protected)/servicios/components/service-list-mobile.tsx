import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, PenToolIcon as Tool, DollarSign } from "lucide-react";
import { Servicio } from "@/lib/Types";
import { formatLempiras } from "@/lib/utils";

interface ServiceListProps {
  servicios: Servicio[];
}

export default function ServiceListMobile({ servicios }: ServiceListProps) {
  return (
    <div className="space-y-4">
      {servicios.map((servicio) => (
        <div
          key={servicio.id}
          className="flex items-center justify-between p-4  rounded-lg shadow border"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  servicio.activo ? "bg-green-500" : "bg-red-500"
                }`}
              ></span>
              <h3 className="text-sm font-medium  truncate">
                {servicio.nombre}
              </h3>
            </div>
            <div className="mt-2 flex flex-col space-y-1">
              <p className="text-xs  flex items-center">
                <Tool className="h-3 w-3 mr-1" />
                <span className="truncate">{servicio.descripcion}</span>
              </p>
              <p className="text-xs  flex items-center">
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
    </div>
  );
}
