// /pages/clientes/[id]/editar/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../../components/Form";
import { getEstadoservicioById } from "../../actions";
import NoAcceso from "@/components/noAccess";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_estados_servicios")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const empleado = await getEstadoservicioById(params.id);
  if (!empleado) {
    redirect("/estadoServicio"); // Redirige si no se encuentra el cliente
  }


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un estado servicio"
        screenName="Editar Estado Servicio"
      />
      <Formulario
        isUpdate={true}
        initialData={empleado} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
