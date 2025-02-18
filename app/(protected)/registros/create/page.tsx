// app/carwash/page.tsx (o pages/carwash/index.tsx en la estructura de páginas tradicional)
import React from "react";
import { CarwashForm } from "../components/formCreateRegistroServicio";
import { getClientesActivos } from "../../clientes/actions";
import { getEstadoServiciosActivos } from "../../estadoServicios/actions";
import { getEmpeleadosActivos } from "../../empleados/actions";
import { getServiciosActivos } from "../../servicios/actions";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import NoAcceso from "@/components/noAccess";


export default async function CarwashPage(){

  const sesion = await getSession();
  
  if (!sesion) {
    redirect("/");
  }
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("crear_registro")) {
    return <NoAcceso />;
  }

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
