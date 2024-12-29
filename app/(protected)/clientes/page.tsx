


import { ArrowDownToDot, Grid, Package, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession, getSessionPermisos } from "@/auth";
import { redirect } from "next/navigation";



export default async function Clientes() {
    const sesion = await getSession()
    const permisos = await getSessionPermisos()
    if(!sesion){
        redirect("/")
    }
    
    return (
        <div className="container mx-auto py-2">
            ${permisos?.forEach(permiso=>(

            <p>${permisos}</p>
            )})}
        </div>

    );
}