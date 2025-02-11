// app/carwash/page.tsx (o pages/carwash/index.tsx en la estructura de páginas tradicional)
import React from "react";
import { ClienteRegistro, EmpleadoRegistro, EstadoRegistro, ServicioRegistro, VehiculoRegistro } from "../components/types";
import { CarwashForm } from "../components/formCreateRegistroServicio";


export default function CarwashPage() {
  // Datos de ejemplo. En una aplicación real estos datos se obtendrían desde una API o base de datos.
  const clientes: ClienteRegistro[] = [
    { id: "98114417-4262-4e70-adad-24a6fb04f6b4", nombre: "Cliente A" },
    { id: "otro-cliente-uuid", nombre: "Cliente B" },
  ];

  const estados: EstadoRegistro[] = [
    { id: "673dc2c7-847a-4084-8816-85306a306e46", nombre: "Pendiente" },
    { id: "otro-estado-uuid", nombre: "En Proceso" },
  ];

  const empleados: EmpleadoRegistro[] = [
    { id: "c024b2e7-e793-4f7d-8d88-6aedea06b56f", nombre: "Empleado 1" },
    { id: "otro-empleado-uuid", nombre: "Empleado 2" },
  ];

  const vehiculos: VehiculoRegistro[] = [
    { id: "24c3e81d-5ef7-4957-a109-5f04c5e652d3", nombre: "Vehículo 1" },
    { id: "42d685c0-cea8-41f1-a750-b637f9bfac06", nombre: "Vehículo 2" },
  ];

  const servicios: ServicioRegistro[] = [
    {
      id: "03534ed4-28a8-4695-9ba1-29dc3adc29da",
      nombre: "Lavado",
      precio: 300,
    },
    {
      id: "9c5d36a7-354e-4db5-bb40-b77852154900",
      nombre: "Encerado",
      precio: 300,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Carwash</h1>
      <CarwashForm
        clientes={clientes}
        estados={estados}
        empleados={empleados}
        vehiculos={vehiculos}
        servicios={servicios}
      />
    </div>
  );
}
