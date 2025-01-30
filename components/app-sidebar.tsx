import {
  Car,
  ChevronUp,
  Home,
  ListCheck,
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
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LogoutButton from "./signOut";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Inicio",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clientes",
    icon: Users2,
  },
  {
    title: "Empleados",
    url: "/empleados",
    icon: Users2,
  },
  {
    title: "Estado Servicio",
    url: "/estadoServicios",
    icon: StepForward,
  },
  {
    title: "Permisos",
    url: "/permisos",
    icon: ListCheck,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: ListCheck,
  },
  {
    title: "Usuarios",
    url: "/usuarios",
    icon: User,
  },
  {
    title: "Vehiculos",
    url: "/vehiculos",
    icon: Car,
  },

];

export async function AppSidebar() {
  const usuario = await getSessionUsuario(); // Obtiene el nombre del usuario

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex justify-between items-center">
            <span>Sistema ACD</span>
            <ToggleThemeButton />
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                  <Link href={item.url}> <item.icon />{item.title}</Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter >
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-full">
                  <Avatar className="p-0 m-0">
                    <AvatarImage  src="https://avatars.githubusercontent.com/u/55272642?v=4" />
                  </Avatar>
                  {usuario?.usuario}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                <LogoutButton/>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
