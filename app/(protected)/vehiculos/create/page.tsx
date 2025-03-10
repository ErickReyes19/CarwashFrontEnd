import HeaderComponent from "@/components/HeaderComponent";
import { PlusCircle } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../components/Form";  // Asegúrate de que el formulario sea para Empleados
import NoAcceso from "@/components/noAccess";
import { getClientesActivos } from "../../clientes/actions";
import { colores, marcas } from "@/lib/data";

export default async function Create() {

  
  // Redirige si no hay sesión
  
  const permisos = await getSessionPermisos();
  // Verifica permisos para crear empleados
  if (!permisos?.includes("crear_vehiculos")) {  // Cambiado de "Crear Clientes" a "Crear Empleados"
    return <NoAcceso />;
  }
  const clientes = await getClientesActivos();
  // Inicializamos con un valor específico para vehiculo
  const initialData = {
    color: "",
    cliente_id: "",
    placa: "",
    marca: "",
    modelo: "",
    activo: true,
    clientes: []
  };

  return (
    <div>
      <HeaderComponent
        Icon={PlusCircle}
        description="En este apartado podrá crear un nuevo vehiculo y asignarlo a un cliente."
        screenName="Crear Vehiculo"  // Cambié la pantalla a "Crear Empleado"
      />
      <Formulario
      colores={colores}
      marcas={marcas}
      clientes={clientes}
        isUpdate={false}  // Esto es para indicar que estamos creando, no actualizando
        initialData={initialData}  // Datos iniciales para crear un nuevo empleado
      />
    </div>
  );
}
