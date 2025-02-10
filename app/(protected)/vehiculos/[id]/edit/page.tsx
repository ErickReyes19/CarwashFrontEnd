// /pages/clientes/[id]/editar/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../../components/Form";
import { getVehiculoById } from "../../actions";
import NoAcceso from "@/components/noAccess";
import { colores, marcas } from "@/lib/data";
import { getClientesActivos } from "@/app/(protected)/clientes/actions";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa
  const sesion = await getSession();
  const permisos = await getSessionPermisos();
  if (!sesion) {
    redirect("/");
  }

  if (!permisos?.includes("Editar Clientes")) {
    return <NoAcceso />;
  }
  const clientes = await getClientesActivos();
  // Obtener el cliente por su ID
  const vehiculo = await getVehiculoById(params.id);
  if (!vehiculo) {
    redirect("/vehiculos"); // Redirige si no se encuentra el cliente
  }

  const initialData = {
    ...vehiculo,
    // cliente_id: vehiculo.clientes[0].id,
    clienteVehiculo: vehiculo.clientes.map(cliente => ({
      id: cliente.id,
      nombre: cliente.nombre,
    })),
  };

  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un cliente"
        screenName="Editar Cliente"
      />
      <Formulario
        isUpdate={true}
        initialData={initialData}
        clientes={clientes}
        colores={colores}
        marcas={marcas}
        // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
