import { getSession } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const session = await getSession();

    if (!session) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next(); // Permite continuar con la navegación si hay sesión
}

export const config = {
    matcher: [
        "/cierre/:path*", 
        "/clientes/:path*", 
        "/dashboard/:path*", 
        "/empleados/:path*", 
        "/estadoServicios/:path*", 
        "/permisos/:path*", 
        "/registros/:path*", 
        "/roles/:path*", 
        "/servicios/:path*", 
        "/usuarios/:path*", 
        "/vehiculos/:path*"
    ]
};
