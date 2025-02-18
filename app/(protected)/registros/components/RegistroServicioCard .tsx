'use client';
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { RegistroServicioView } from "./types"
import {sendInvoice} from "../actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatLempiras } from "@/lib/utils";
// Helper para obtener iniciales
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

// Lista de servicios
const ServiciosList: React.FC<{ servicios: Array<{ id: string; servicioNombre: string; precio: number }> }> = ({
  servicios,
}) => {
  const total = servicios.reduce((sum, servicio) => sum + servicio.precio, 0);

  return (
    <div>
      <ul className="space-y-1">
        {servicios.map((servicio) => (
          <li key={servicio.id} className="flex justify-between">
            <span>{servicio.servicioNombre}</span>
            <span className="font-semibold"> {formatLempiras(Number(servicio.precio))}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 border-t pt-2 flex justify-between font-bold">
        <span>Total:</span>
        <span> {formatLempiras(Number(total))}</span>
      </div>
    </div>
  );
};

// Tarjeta de totales de servicios
const TotalesServiciosCard: React.FC<{ registro: RegistroServicioView }> = ({ registro }) => {
  // Agrupar los servicios y calcular el total por tipo de servicio
  const totalesPorServicio = registro.vehiculos.flatMap((vehiculo) => vehiculo.servicios).reduce((acc, servicio) => {
    acc[servicio.servicioNombre] = (acc[servicio.servicioNombre] || 0) + servicio.precio;
    return acc;
  }, {} as Record<string, number>);

  // Calcular el total general
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
              <span className="font-semibold"> {formatLempiras(total)}</span>
            </li>
          ))}
        </ul>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total General:</span>
          <span className="text-green-600"> {formatLempiras(totalGeneral)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

// Tarjeta de vehículo y servicios
const VehiculoCard: React.FC<{ vehiculo: RegistroServicioView["vehiculos"][0] }> = ({ vehiculo }) => (
  <Card>
    <CardHeader>
      <CardTitle>
        {vehiculo.vehiculo.marca} {vehiculo.vehiculo.modelo}
      </CardTitle>
      <CardDescription>Placa: {vehiculo.vehiculo.placa}</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Color: {vehiculo.vehiculo.color}</p>
      <Separator className="my-2" />
      <h4 className="font-semibold mb-2">Servicios:</h4>
      <ServiciosList servicios={vehiculo.servicios} />
    </CardContent>
  </Card>
)

// Componente principal
const RegistroServicioCard: React.FC<{ registro: RegistroServicioView }> = ({ registro }) => {
  const { toast } = useToast();
  const handleEnviarCorreo = async () => {
    try {
      // Enviar el correo a la dirección del cliente
      await sendInvoice(registro, registro.cliente.correo);
      toast({
        title: "Correo enviado con exito",
        description:   `Se envio correctamente al correo ${registro.cliente.correo.substring(0,5)}****.`,
      });
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      toast({
        title: "Error al enviar el correo",
        description: "Ocurrió un error al enviar el correo, por favor intenta de nuevo.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="mt-4">
        <Button onClick={handleEnviarCorreo} className="btn btn-primary">
          Enviar Factura por Correo
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registro de Servicio</CardTitle>
          <CardDescription>ID: {registro.id}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Usamos grid con clases responsivas */}
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
        </CardContent>
      </Card>




      {/* Vehículos */}
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
      {/* Totales de Servicios */}
      <TotalesServiciosCard registro={registro} />
      {/* Empleados */}
      {/* Empleados */}
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
