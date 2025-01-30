import { Car, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getVehiculos } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";

export default async function Clientes() {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  if (!sesion) {
    redirect("/");
  }

  const data = await getVehiculos();

  if (!permisos?.includes("Ver Clientes")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Car}
        description="En este apartado podrá ver todos los vehiculos y a que clientes estan asignados"
        screenName="Vehiculos"
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
