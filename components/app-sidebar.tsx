
import {
  Car,
  Home,
  List,
  ListCheck,
  ListChecks,
  NotebookText,
  Package,
  StepForward,
  User,
  Users2,
} from "lucide-react";
import { getSessionUsuario } from "@/auth"; // Asegúrate de que esta función exista y retorne el nombre del usuario
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import ToggleThemeButton from "./button-theme";
import Link from "next/link";
import { NavUser } from "./nav-user";
import { BookTextIcon } from "./ui/book-text";
import { UsersIcon } from "./ui/users";

// Menu items con permisos necesarios
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    permiso: "ver_dashboard", // Ejemplo de permiso
  },
  {
    title: "Cierres",
    url: "/cierre",
    icon: ListChecks,
    permiso: "ver_cierres",
  },
  {
    title: "Registros",
    url: "/registros",
    icon: List,
    permiso: "ver_registros",
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: UsersIcon,
    permiso: "ver_clientes",
  },
  {
    title: "Empleados",
    url: "/empleados",
    icon: UsersIcon,
    permiso: "ver_empleados",
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: BookTextIcon,
    permiso: "ver_servicios",
  },
  {
    title: "Estado Servicio",
    url: "/estadoServicios",
    icon: StepForward,
    permiso: "ver_estados_servicios",
  },
  {
    title: "Permisos",
    url: "/permisos",
    icon: ListCheck,
    permiso: "ver_permisos",
  },
  {
    title: "Roles",
    url: "/roles",
    icon: ListCheck,
    permiso: "ver_roles",
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: User,
    permiso: "ver_usuarios",
  },
  {
    title: "Vehiculos",
    url: "/vehiculos",
    icon: Car,
    permiso: "ver_vehiculos",
  },
  {
    title: "Productos",
    url: "/productos",
    icon: Package,
    permiso: "ver_productos",
  },
];

export async function AppSidebar() {
  const usuario = await getSessionUsuario(); // Obtiene el nombre del usuario
  const permisosUsuario = usuario?.Permiso || []; 
  // Filtrar los ítems basados en los permisos del usuario
  const filteredItems = items.filter(item =>
    permisosUsuario.includes(item.permiso)
  );
  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <span>Sistema Carwash</span>
            
            <ToggleThemeButton />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
      {usuario && <NavUser usuario={usuario} />}
      </SidebarFooter>
    </Sidebar>
  );
}
