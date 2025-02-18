
import {
  Car,
  ChevronUp,
  Home,
  List,
  ListCheck,
  ListChecks,
  NotebookText,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage } from "./ui/avatar";
import LogoutButton from "./signOut";
import Link from "next/link";

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
    icon: Users2,
    permiso: "ver_clientes",
  },
  {
    title: "Empleados",
    url: "/empleados",
    icon: Users2,
    permiso: "ver_empleados",
  },
  {
    title: "Servicios",
    url: "/servicios",
    icon: NotebookText,
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
];

export async function AppSidebar() {
  const usuario = await getSessionUsuario(); // Obtiene el nombre del usuario
  const permisosUsuario = usuario?.Permiso || []; // Supón que el usuario tiene un array de permisos

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
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-full">
                  <Avatar className="p-0 m-0">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/55272642?v=4" />
                  </Avatar>
                  {usuario?.usuario}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
