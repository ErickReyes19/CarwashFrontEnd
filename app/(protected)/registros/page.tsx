import { List, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getRegistros } from "./actions";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { DataTable } from "./components/data-table";
import ServiceRequestListMobile from "./components/registro-list-mobile";
import { DatePickerWithRange } from "./components/datePicker";

// Este es un Server Component que obtiene los parámetros del query directamente en el servidor
export default async function Clientes({
  searchParams,
}: {
  searchParams: { from: string; to: string };
}) {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  if (!sesion) {
    redirect("/");
  }

  const from = searchParams.from || new Date().toISOString().split("T")[0];
  const to = searchParams.to || from;

  const data = await getRegistros(from, to);

  if (!permisos?.includes("Ver_registros")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={List}
        description="En este apartado podrá ver todos los registros de los servicios"
        screenName="Registro servicios"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <DatePickerWithRange className="mb-2" />
        <ServiceRequestListMobile RegistroServicio={data} />
      </div>
    </div>
  );
}
