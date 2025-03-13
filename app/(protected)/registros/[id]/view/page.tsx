import HeaderComponent from "@/components/HeaderComponent"
import { Pencil } from "lucide-react"
import { getSession, getSessionPermisos } from "@/auth"
import { redirect } from "next/navigation"
import NoAcceso from "@/components/noAccess"
import { getRegistroServicioId } from "../../actions"
import RegistroServicioCard from "../../components/RegistroServicioCard "

export default async function Edit({ params }: { params: { id: string } }) {

  const permisos = await getSessionPermisos()
  if (!permisos?.includes("view_registro")) {
    return <NoAcceso />
  }

  // Obtener el registro de servicio por su ID
  const RegistroServicio = await getRegistroServicioId(params.id)
  if (!RegistroServicio) {
    redirect("/registros") // Redirige si no se encuentra el registro
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Mostrar el registro del servicio */}
      <RegistroServicioCard registro={RegistroServicio} />
    </div>
  )
}
