
import { CarwashForm } from "../../components/formCreateRegistroServicio";
import { getRegistroServicioIdGet } from "../../actions";
import { getClientesActivos } from "@/app/(protected)/clientes/actions";
import { getEstadoServiciosActivos } from "@/app/(protected)/estadoServicios/actions";
import { getEmpeleadosActivos } from "@/app/(protected)/empleados/actions";
import { getServiciosActivos } from "@/app/(protected)/servicios/actions";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";
import NoAcceso from "@/components/noAccess";
import { getProductos, getProductosSelect } from "@/app/(protected)/productos/actions";

export default async function EditCarwashPage({ params }: { params: { id: string } }) {
  try {
    
    
      const permisos = await getSessionPermisos();
      if (!permisos?.includes("editar_registro")) {
        return <NoAcceso />;
      }

      const clientes    = await getClientesActivos();
      const estados     = await getEstadoServiciosActivos();
      const empleados   = await getEmpeleadosActivos();
      const servicios   = await getServiciosActivos();
      const productos = await getProductosSelect();
      const initialData = await getRegistroServicioIdGet(params.id);


    if (!initialData) {
      return (
        <div className="container mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold text-red-500">Registro no encontrado</h1>
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Editar Registro de Carwash</h1>
        <CarwashForm
          isUpdate={true}
          initialData={{
            ...initialData,
            descripcion: initialData.descripcion || "",
            vehiculos: initialData.vehiculos.map((vehiculo: any) => ({
              ...vehiculo,
              servicios: vehiculo.servicios.map((servicio: any) => ({
                ...servicio,
                precio: Number(servicio.precio)
              }))
            }))
          }}
          clientes={clientes}
          estados={estados}
          empleados={empleados}
          servicios={servicios}
          productos={productos}
        />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar datos del formulario:", error);
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Error al cargar los datos</h1>
        <p>Intenta recargar la página.</p>
      </div>
    );
  }
}
