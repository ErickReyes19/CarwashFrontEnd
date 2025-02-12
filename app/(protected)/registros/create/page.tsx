// app/carwash/page.tsx (o pages/carwash/index.tsx en la estructura de páginas tradicional)
import React from "react";
import { ClienteRegistro, EmpleadoRegistro, EstadoRegistro, ServicioRegistro, VehiculoRegistro } from "../components/types";
import { CarwashForm } from "../components/formCreateRegistroServicio";
import { getClientesActivos } from "../../clientes/actions";
import { getEstadoServiciosActivos } from "../../estadoServicios/actions";
import {  obtenerVehiculoPorCliente } from "../../vehiculos/actions";
import { getEmpeleadosActivos } from "../../empleados/actions";
import { getServiciosActivos } from "../../servicios/actions";


export default async function CarwashPage(){
  const clientes = await getClientesActivos();

  const estados = await getEstadoServiciosActivos();

  const empleados = await getEmpeleadosActivos();


  const servicios = await getServiciosActivos();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Carwash</h1>
      <CarwashForm
        clientes={clientes}
        estados={estados}
        empleados={empleados}
        servicios={servicios}
      />
    </div>
  );
}
