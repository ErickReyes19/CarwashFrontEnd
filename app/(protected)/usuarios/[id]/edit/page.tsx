// /pages/usuarios/[id]/editar/page.tsx
import { redirect } from "next/navigation";
import { Formulario } from "../../components/Form";
import { getUsuarioById } from "../../actions";
import { Pencil } from "lucide-react";
import NoAcceso from "@/components/noAccess";
import { getSession, getSessionPermisos } from "@/auth";
import HeaderComponent from "@/components/HeaderComponent";
import {
  getEmpleadoId,
  getEmpleadosSinUsuario,
} from "@/app/(protected)/empleados/actions";
import { getRolesActivos } from "@/app/(protected)/roles/actions";

export default async function Edit({ params }: { params: { id: string } }) {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  if (!sesion) {
    redirect("/");
  }

  if (!permisos?.includes("editar_Usuario")) {
    return <NoAcceso />;
  }

  const usuario = await getUsuarioById(params.id);
  const empleados = await getEmpleadosSinUsuario();
  const roles = await getRolesActivos();
  const empleadoAsignado = await getEmpleadoId(usuario?.empleado_id!);

  if (!usuario) {
    redirect("/usuarios");
  }

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrás editar un usuario"
        screenName="Editar Usuario"
      />
      <Formulario
        isUpdate={true}
        initialData={usuario}
        empleados={empleados}
        roles={roles}
        empleadoAsignado={empleadoAsignado}
      />
    </div>
  );
}
