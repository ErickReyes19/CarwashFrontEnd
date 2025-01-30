// /pages/facturas/create/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../components/Form";
import NoAcceso from "@/components/noAccess";

export default async function Create() {
  const sesion = await getSession();
  const permisos = await getSessionPermisos();

  // Redirige si no hay sesión
  if (!sesion) {
    redirect("/");
  }

  if (!permisos?.includes("Crear Clientes")) {
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para genero
  const initialData = {
    nombre: "",
    correo: "",
    telefono: "",
    genero: "Masculino",
    activo: true,
    // Asumiendo que quieres que "Masculino" sea el valor por defecto
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un nuevo Cliente"
        screenName="Cliente"
      />
      <Formulario
        isUpdate={false}
        initialData={initialData} // Aquí se pasan los datos iniciales para crear
      />
    </div>
  );
}
