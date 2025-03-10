import { Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getClientes } from "./actions";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import ClientListMobile from "./components/client-list-mobile";

export default async function Clientes() {

  const permisos = await getSessionPermisos();
  
  if (!permisos?.includes("ver_clientes")) {
    return <NoAcceso />;
  }
  const data = await getClientes();

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={Users}
        description="En este apartado podrá ver todos los clientes"
        screenName="Clientes"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      <div className="block md:hidden">
        <ClientListMobile clientes={data} />
      </div>
    </div>
  );
}
