import { ListCheckIcon, Users } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { getClientes } from "./actions";
import { DataTable } from "./componets/data-table";
import { columns } from "./componets/columns";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
// import ClientListMobile from "./components/client-list-mobile

export default async function Clientes() {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  if (!sesion) {
    redirect("/");
  }

  const data = await getClientes();

  if (!permisos?.includes("ver_cierres")) {
    return <NoAcceso />;
  }

  return (
    <div className="container mx-auto py-2">
      <HeaderComponent
        Icon={ListCheckIcon}
        description="En este apartado podrá ver todos los cierres"
        screenName="Cierres"
      />

      <div className="hidden md:block">
        <DataTable columns={columns} data={data} />
      </div>
      {/* <div className="block md:hidden">
        <ClientListMobile clientes={data} />
      </div> */}
    </div>
  );
}
