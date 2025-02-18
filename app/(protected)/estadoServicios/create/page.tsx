import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../components/Form";  // Asegúrate de que el formulario sea para Empleados
import NoAcceso from "@/components/noAccess";

export default async function Create() {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  // Redirige si no hay sesión
  if (!sesion) {
    redirect("/");
  }

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_estado_servicios")) {  // Cambiado de "Crear Clientes" a "Crear Empleados"
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para genero
  const initialData = {
    nombre: "",
    descripcion: "",
    activo: true,
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un nuevo estado de servicio."
        screenName="Crear Estado"  // Cambié la pantalla a "Crear Empleado"
      />
      <Formulario
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
