import { ListCheck, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getEstadoServicios } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";

export default async function EstadoServicio() {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  if (!sesion) {
    redirect("/");
  }

  const data = await getEstadoServicios();

  if (!permisos?.includes("Ver Clientes")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListCheck}
        description="En este apartado podrá ver todos los estados del servicio"
        screenName="Estados de servicio"
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
