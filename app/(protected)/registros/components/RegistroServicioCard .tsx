'use client';
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RegistroServicioView } from "./types"
import { sendInvoice } from "../actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatLempiras } from "@/lib/utils";
import { useState } from "react";
import { Loader, Loader2 } from "lucide-react";
// Helper para obtener iniciales
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// Lista de servicios
const ServiciosList: React.FC<{
  servicios: Array<{
    id: string;
    servicioNombre: string;
    precio: number;
    producto: Array<{
      productoId: string;
      cantidad: number;
      precio: number;
      nombre: string;
    }>;
  }>
}> = ({ servicios }) => {
  const total = servicios.reduce((sum, servicio) => {
    const totalProductos = servicio.producto.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    return sum + servicio.precio + totalProductos;
  }, 0);

  return (
    <div>
      <ul className="space-y-1">
        {servicios.map((servicio) => {
          const totalProductos = servicio.producto.reduce((sum, prod) => sum + (prod.precio * prod.cantidad), 0);
          return (
            <li key={servicio.id} className="flex flex-col border-b pb-2">
              <div className="flex justify-between">
                <span>{servicio.servicioNombre}</span>
                <span className="font-semibold">{formatLempiras(servicio.precio)}</span>
              </div>

              {/* Productos asociados al servicio */}
              {servicio.producto.length > 0 && (
                <ul className="mt-1 pl-4 text-sm text-gray-700">
                  {servicio.producto.map((producto) => (
                    <li key={producto.productoId} className="flex justify-between">
                      <span>{producto.nombre} (x{producto.cantidad})</span>
                      <span>{formatLempiras(producto.precio * producto.cantidad)}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Total del servicio incluyendo productos */}
              <div className="mt-1 flex justify-between font-bold text-green-600">
                <span>Total Servicio:</span>
                <span>{formatLempiras(servicio.precio + totalProductos)}</span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Total General */}
      <div className="mt-2 border-t pt-2 flex justify-between font-bold text-lg text-green-600">
        <span>Total General:</span>
        <span>{formatLempiras(total)}</span>
      </div>
    </div>
  );
};


const TotalesServiciosCard: React.FC<{ registro: RegistroServicioView }> = ({ registro }) => {
  const totalesPorServicio = registro.vehiculos.flatMap((vehiculo) => vehiculo.servicios).reduce((acc, servicio) => {
    const totalProductos = servicio.producto.reduce((sum, prod) => sum + (prod.precio * prod.cantidad), 0);
    const totalServicio = servicio.precio + totalProductos;

    acc[servicio.servicioNombre] = (acc[servicio.servicioNombre] || 0) + totalServicio;
    return acc;
  }, {} as Record<string, number>);

  const totalGeneral = Object.values(totalesPorServicio).reduce((sum, total) => sum + total, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Totales de Servicios</CardTitle>
        <CardDescription>Resumen de los costos por tipo de servicio</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {Object.entries(totalesPorServicio).map(([servicio, total]) => (
            <li key={servicio} className="flex justify-between">
              <span>{servicio}</span>
              <span className="font-semibold">{formatLempiras(total)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total General:</span>
          <span className="text-green-600">{formatLempiras(totalGeneral)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const VehiculoCard: React.FC<{ vehiculo: RegistroServicioView["vehiculos"][0] }> = ({ vehiculo }) => (
  <Card>
    <CardHeader>
      <CardTitle>
        {vehiculo.vehiculo.marca} {vehiculo.vehiculo.modelo}
      </CardTitle>
      <CardDescription>Placa: {vehiculo.vehiculo.placa.toUpperCase()}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Color: {vehiculo.vehiculo.color}</p>
      <Separator className="my-2" />
      <h4 className="font-semibold mb-2">Servicios:</h4>
      <ServiciosList servicios={vehiculo.servicios} />
    </CardContent>
  </Card>
)

const RegistroServicioCard: React.FC<{ registro: RegistroServicioView }> = ({ registro }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const handleEnviarCorreo = async () => {
    setLoading(true);
    try {
      await sendInvoice(registro, registro.cliente.correo);
      toast({
        title: "Correo enviado con éxito",
        description: `Se envió correctamente al correo ${registro.cliente.correo.substring(0, 5)}****.`,
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast({
        title: "Error al enviar el correo",
        description: "Ocurrió un error al enviar el correo, por favor intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <div className="mt-4">
        <Button
          onClick={handleEnviarCorreo}
          className="btn btn-primary flex items-center space-x-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <span>Enviando...</span> 
              <Loader2 className="animate-spin h-5 w-5 }" />
            </>
          ) : (
            <span>Enviar Factura por Correo</span>
          )}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Servicio</CardTitle>
          <CardDescription>ID: {registro.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">Cliente</h3>
              <p>{registro.cliente.nombre} {registro.cliente.apellido}</p>
              <p>{registro.cliente.correo}</p>
              {registro.cliente.telefono && <p>{registro.cliente.telefono}</p>}
            </div>
            <div>
              <h3 className="font-semibold text-lg">Detalles del Servicio</h3>
              <p>Fecha: {format(new Date(registro.fecha), "dd/MM/yyyy HH:mm")}</p>
              <Badge variant="outline">{registro.estadoServicio.nombre}</Badge>
              <p className="text-sm text-muted-foreground mt-1">{registro.estadoServicio.descripcion}</p>
            </div>
          </div>
          <div>
            <p className="font-bold">Descripción</p>
            <p>{registro.descripcion}</p>
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {registro.vehiculos.map((vehiculo) => (
          <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} />
        ))}
      </div>
      <Card className="border p-4">
        <CardHeader>
          <h3 className="text-lg font-bold">Detalles de Pagos</h3>
        </CardHeader>
        <CardContent>
          {registro.pagos.map((pago, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span className="font-bold">{pago.metodo_pago}</span>
              <span className="font-bold">{formatLempiras(pago.monto)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <TotalesServiciosCard registro={registro} />
      <Card>
        <CardHeader>
          <CardTitle>Empleados Asignados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {registro.empleados.map((empleado) => (
              <div key={empleado.id} className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{getInitials(empleado.nombre)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {empleado.nombre} {empleado.apellido}
                  </p>
                  <p className="text-sm text-muted-foreground">{empleado.correo}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegistroServicioCard
