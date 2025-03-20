import { Package } from "lucide-react";
import { getSessionPermisos } from "@/auth";
import { getProductos } from "./actions";
import { DataTable } from "./components/data-table";
import HeaderComponent from "@/components/HeaderComponent";
import NoAcceso from "@/components/noAccess";
import { columns } from "./components/columns";
import ProductListMobile from "./components/product-list-mobile";
import { da } from "date-fns/locale";
// import EstadoServicioListMobile from "./components/estado-servicio-list-mobile";

export default async function EstadoServicio() {

    const permisos = await getSessionPermisos();

    const data = await getProductos();

    if (!permisos?.includes("ver_productos")) {
        return <NoAcceso />;
    }

    return (
        <div className="container mx-auto py-2">
            <HeaderComponent
                Icon={Package}
                description="En este apartado podrá ver todos los productos"
                screenName="Productos"
            />
            <div className="hidden md:block">
                <DataTable columns={columns} data={data} />
            </div>
            <div className="block md:hidden">
                <ProductListMobile productos={data} />
            </div>
        </div>
    );
}
