// /pages/clientes/[id]/editar/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { FormularioRol } from "../../components/Formulario";
import { getRolesPermisoById, getRolesPermisos } from "../../actions";
import NoAcceso from "@/components/noAccess";
import { getPermisosActivos } from "@/app/(protected)/permisos/actions";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa
  const sesion = await getSession();
  const permisos = await getSessionPermisos();
  if (!sesion) {
    redirect("/");
  }

  if (!permisos?.includes("editar_roles")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const roles = await getRolesPermisoById(params.id);
  if (!roles) {
    redirect("/roles"); // Redirige si no se encuentra el cliente
  }

  const permisosData = await getPermisosActivos();

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un rol y asignarle permisos"
        screenName="Editar Rol"
      />
      <FormularioRol
        isUpdate={true}
        initialData={roles} // Pasamos los datos del cliente al formulario
        permisos={permisosData}
      />
    </div>
  );
}
