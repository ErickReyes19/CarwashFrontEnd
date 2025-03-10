import { getSession, getSessionPermisos } from "@/auth";
import { getClienteByIdView } from "../../actions";
import ClientInfoComponent from "../../components/clienteView";
import { redirect } from "next/navigation";
import NoAcceso from "@/components/noAccess";


export default async function ClientInfoPage({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("view_cliente")) {
    return <NoAcceso />;
  }


  const clientInfo = await getClienteByIdView(params.id);

  if (!clientInfo) {
    return (
      <div className="p-4">
        <p>No client information available.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <ClientInfoComponent clientInfo={clientInfo} />
    </div>
  );
}
