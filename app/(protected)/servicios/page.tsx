import { NotebookText, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getServicios } from "./actions";
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

  if (!permisos?.includes("ver_servicios")) {
    return <NoAcceso />;
  }

  const data = await getServicios();
  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={NotebookText}
        description="En este apartado podrá ver todos los servicios que ofrece la empresa."
        screenName="Servicios"
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
