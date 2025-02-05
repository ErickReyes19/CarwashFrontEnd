// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { NotebookPen, PlusCircle } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../components/Form";
import NoAcceso from "@/components/noAccess";
import { describe } from "node:test";

export default async function Create() {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  // Redirige si no hay sesión
  if (!sesion) {
    redirect("/");
  }

  if (!permisos?.includes("Crear_Servicio")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para genero
  const initialData = {
    nombre: "",
    descripcion: "",
    precio: 0.00,
    activo: true,
    // Asumiendo que quieres que "Masculino" sea el valor por defecto
  };

  return (
    <div>
      <HeaderComponent
        Icon={NotebookPen}
        description="En este apartado podrá crear un nuevo servicio"
        screenName="Servicios"
      />
      <Formulario
        isUpdate={false}
        initialData={initialData} // Aquí se pasan los datos iniciales para crear
      />
    </div>
  );
}
