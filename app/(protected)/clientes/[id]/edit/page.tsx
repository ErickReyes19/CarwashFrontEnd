// /pages/clientes/[id]/editar/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../../components/Form";
import { getClienteById } from "../../actions";
import NoAcceso from "@/components/noAccess";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa
  const sesion = await getSession();
  const permisos = await getSessionPermisos();
  if (!sesion) {
    redirect("/");
  }

  if (!permisos?.includes("editar_cliente")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const cliente = await getClienteById(params.id);
  if (!cliente) {
    redirect("/clientes"); // Redirige si no se encuentra el cliente
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un cliente"
        screenName="Editar Cliente"
      />
      <Formulario
        isUpdate={true}
        initialData={cliente} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
