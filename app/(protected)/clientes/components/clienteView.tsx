"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { User, Car, Wrench, Calendar, DollarSign, Phone } from "lucide-react";
import { formatLempiras } from "@/lib/utils";

interface Vehicle {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  color: string;
  activo: boolean;
}

interface ServiceDetail {
  precio: number;
  servicio: {
    nombre: string;
    descripcion: string;
  };
}

interface ServiceVehicle {
  id: string;
  vehiculoConcatenado: string;
  detalles: ServiceDetail[];
}

interface Employee {
  nombre: string;
  apellido: string;
}

interface ServiceRecord {
  id: string;
  fecha: string;
  estadoServicio: {
    nombre: string;
  };
  empleados: Employee[];
  registroServicioVehiculos: ServiceVehicle[];
}

interface ClientInfo {
  id: string;
  nombre: string;
  correo: string;
  telefono: string;
  genero: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
  vehiculos: Vehicle[];
  registroServicios: ServiceRecord[];
}

export default function ClientInfoComponent({
  clientInfo,
}: {
  clientInfo?: ClientInfo;
}) {
  const [activeTab, setActiveTab] = useState("vehicles");

  if (!clientInfo) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <p>No se encontró el cliente.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full mx-auto space-y-4">
      {/* Información del cliente */}
      <Card className="w-full  mx-auto  p-6 shadow-lg border border-muted-200 rounded-md">
        {/* Encabezado con avatar, nombre, correo y estado */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {clientInfo.nombre
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">{clientInfo.nombre}</h2>
              <p className="text-sm text-muted-foreground">{clientInfo.correo}</p>
            </div>
          </div>
          <Badge
            variant={clientInfo.activo ? "default" : "destructive"}
            className="text-sm py-1 px-3"
          >
            {clientInfo.activo ? "Activo" : "Inactivo"}
          </Badge>
        </div>

        <Separator className="my-4" />

        {/* Datos adicionales en dos columnas en pantallas medianas y más grandes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User className="h-5 w-5" />
            <span className="font-medium">Género:</span>
            <span>{clientInfo.genero}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-5 w-5" />
            <span className="font-medium">Creado:</span>
            <span>{format(new Date(clientInfo.createdAt), "dd/MM/yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-5 w-5" />
            <span className="font-medium">Número:</span>
            <span>{clientInfo.telefono}</span>
          </div>
        </div>
      </Card>


      {/* Tabs para Vehículos y Servicios */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
            <TabsTrigger value="services">Servicios</TabsTrigger>
          </TabsList>
          <TabsContent value="vehicles">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clientInfo.vehiculos.map((vehicle) => (
                  <Card
                    key={vehicle.id}
                    className="flex flex-col md:flex-row items-start p-4 gap-4 shadow-lg border rounded-xl"
                  >
                    {/* Eliminar ícono en móvil */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <Car className={`h-8 w-8 text-gray-600`} />
                    </div>

                    {/* Detalles del vehículo */}
                    <div className="flex flex-col md:flex-grow text-center md:text-left space-y-2">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        {/* Punto verde o rojo */}
                        <span
                          className={`w-3 h-3 rounded-full ${vehicle.activo ? "bg-green-500" : "bg-red-500"
                            }`}
                        ></span>
                        <h3 className="text-lg font-semibold">
                          {vehicle.marca} {vehicle.modelo}
                        </h3>
                      </div>

                      {/* Información adicional */}
                      <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 text-gray-600 text-sm">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Placa:</span>{" "}
                          {vehicle.placa.toUpperCase()}
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">Color:</span>{" "}
                          {vehicle.color}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="services">
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientInfo.registroServicios.map((service) => {
                  const total = service.registroServicioVehiculos.reduce(
                    (sum, vehicleService) =>
                      sum +
                      vehicleService.detalles.reduce(
                        (subSum, detail) => subSum + detail.precio,
                        0
                      ),
                    0
                  );

                  return (
                    <Card key={service.id} className="m-0 p-2">
                      <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between p-0">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-5 w-5 text-blue-500" />
                          <span className="font-bold text-lg ">
                            {format(
                              new Date(service.fecha),
                              "dd/MM/yyyy HH:mm"
                            )}
                          </span>
                        </div>
                        <Badge variant="secondary" className="mt-2 md:mt-0">
                          {service.estadoServicio.nombre}
                        </Badge>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="text-sm text-muted-foreground mb-2">
                          <span className="font-semibold">Empleados:</span>{" "}
                          {service.empleados
                            .map((e) => `${e.nombre} ${e.apellido}`)
                            .join(", ")}
                        </div>
                        <Separator className="my-2" />
                        {service.registroServicioVehiculos.map(
                          (vehicleService) => (
                            <div key={vehicleService.id} className="mb-2">
                              <h4 className="font-semibold text-base text-gre">
                                {vehicleService.vehiculoConcatenado}
                              </h4>
                              <ul className="list-disc list-inside ml-4 space-y-1">
                                {vehicleService.detalles.map(
                                  (detail, index) => (
                                    <li
                                      key={index}
                                      className="flex items-center justify-between text-gray-400"
                                    >
                                      <span>{detail.servicio.nombre}</span>
                                      <span className="flex items-center gap-1  font-light">
                                        {formatLempiras(detail.precio)}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                        <Separator className="my-4" />
                        {/* Total destacado */}
                        <div className="flex items-center justify-between font-semibold text-lg ">
                          <span>Total:</span>
                          <span className="flex items-center gap-1 text-green-600">
                            {formatLempiras(total)}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
