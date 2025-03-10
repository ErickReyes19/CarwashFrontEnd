import { ListCheck, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getEstadoServicios } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import EstadoServicioListMobile from "./components/estado-servicio-list-mobile";

export default async function EstadoServicio() {

  const permisos = await getSessionPermisos();


  const data = await getEstadoServicios();

  if (!permisos?.includes("ver_estados_servicios")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListCheck}
        description="En este apartado podrá ver todos los estados del servicio"
        screenName="Estados de servicio"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <EstadoServicioListMobile estadosServicio={data} />
      </div>
    </div>
  );
}
