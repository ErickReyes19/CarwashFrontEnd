import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import {getSessionPermisos } from "@/auth";
import NoAcceso from "@/components/noAccess";
import { Formulario } from "../components/Form";

export default async function Create() {

  const permisos = await getSessionPermisos();

  // Redirige si no hay sesión

  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_producto")) {  // Cambiado de "Crear Clientes" a "Crear Empleados"
    return <NoAcceso />;
  }

  // Inicializamos con un valor específico para genero
  const initialData = {
    nombre: "",
    descripcion: "",
    activo: true,
    precio: 0.0
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un nuevo producto."
        screenName="Crear Producto"  // Cambié la pantalla a "Crear Empleado"
      />
      <Formulario
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
