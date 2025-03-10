import { List } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getananciasRango, getGananciaRango, getGananciasDia, getServiciosRango } from "./actions";

import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { EarningsChart } from "./components/GananciaRango";
import { DatePickerWithRange } from "../registros/components/datePicker";
import { GananciasDiarias } from "./components/Gananciasdiaras";
import { GananciasDiaRango } from "./components/GananciaDiariaRango";
import { PieChartServicios } from "./components/PieChartServicios";

// Componente para la vista de registros y gráfico de ganancias
export default async function Clientes({
  searchParams,
}: {
  searchParams: { from: string; to: string };
}) {
  // Verificar sesión y permisos

  const permisos = await getSessionPermisos();


  if (!permisos?.includes("ver_dashboard")) {
    return <NoAcceso />;
  }

  // Obtener parámetros de fecha
  const from = searchParams.from || new Date().toISOString().split("T")[0];
  const to = searchParams.to || from;

  // Obtener los datos de ganancias dentro del rango seleccionado
  const data = await getananciasRango(from, to);
  const gananciasDia = await getGananciasDia();
  const gananciasDiarias = await getGananciaRango(from, to);
  const servicioGanancia = await getServiciosRango(from, to);

  return (
    <div className="container mx-auto py-4 px-2 sm:px-6 lg:px-8">
      {/* Header Section */}
      <HeaderComponent
        Icon={List}
        description="En este apartado podrá ver todos los registros de los servicios"
        screenName="Registro de servicios"
      />

      {/* Date Picker Section */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-4">
        <div className="w-full sm:w-1/2 lg:w-1/3">
          <DatePickerWithRange />
        </div>
      </div>

      {/* Gráfico de Ganancias */}
      {/* <EarningsChart data={data} /> */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GananciasDiarias data={gananciasDia} />
        <GananciasDiaRango data={gananciasDiarias} desde={from} hasta={to} />
      </div>
      <EarningsChart data={data} />
      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PieChartServicios servicioGanancia={servicioGanancia.data} />

      </div>
    </div>
  );
}
