// /pages/clientes/[id]/editar/page.tsx
import HeaderComponent from "@/components/HeaderComponent";
import { Pencil } from "lucide-react";
import {  getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import { Formulario } from "../../components/Form";
import { getProductoById } from "../../actions";
import NoAcceso from "@/components/noAccess";

export default async function Edit({ params }: { params: { id: string } }) {
  // Verificar si hay una sesión activa

  const permisos = await getSessionPermisos();

  if (!permisos?.includes("editar_producto")) {
    return <NoAcceso />;
  }

  // Obtener el cliente por su ID
  const producto = await getProductoById(params.id);
  if (!producto) {
    redirect("/productos"); // Redirige si no se encuentra el cliente
  }


  return (
    <div>
      <HeaderComponent
        Icon={Pencil}
        description="En este apartado podrá editar un producto"
        screenName="Editar producto"
      />
      <Formulario
        isUpdate={true}
        initialData={producto} // Pasamos los datos del cliente al formulario
      />
    </div>
  );
}
