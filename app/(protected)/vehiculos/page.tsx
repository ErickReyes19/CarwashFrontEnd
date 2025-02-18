import { Car, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getVehiculos } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import VehicleListMobile from "./components/vehiculos-list-mobile";

export default async function Clientes() {
  const sesion = await getSession();
  
  if (!sesion) {
    redirect("/");
  }
  
  
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("ver_vehiculos")) {
    return <NoAcceso />;
  }
  
  const data = await getVehiculos();
  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Car}
        description="En este apartado podrá ver todos los vehiculos y a que clientes estan asignados"
        screenName="Vehiculos"
      />
      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <VehicleListMobile vehiculos={data} />
      </div>

    </div>
  );
}
