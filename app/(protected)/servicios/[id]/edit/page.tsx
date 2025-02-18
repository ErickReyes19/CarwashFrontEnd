// /pages/clientes/[id]/editar/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../../components/Form";
import { getServicioId } from "../../actions";
import NoAcceso from "@/components/noAccess";

export default async function Edit({ params }: { params: { id: string } }) {
  const sesion = await getSession();
  if (!sesion) {
    redirect("/");
  }
  
  const permisos = await getSessionPermisos();
  if (!permisos?.includes("editar_servicios")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const servicio = await getServicioId(params.id);
  if (!servicio) {
    redirect("/servicios"); // Redirige si no se encuentra el servicio
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un servicio"
        screenName="Editar Cliente"
      />
      <Formulario
        isUpdate={true}
        initialData={servicio} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
