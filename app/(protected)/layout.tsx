import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { SignalRProvider } from "@/providers/signalProvider";
import { Analytics } from "@vercel/analytics/react"



export default async function Layout({ children }: { children: React.ReactNode }) {


  const sesion = await getSession();

  if (!sesion) {
    redirect("/");
  }
  const employeeId = sesion.empleadoId;

  return (
    <SignalRProvider employeeId={employeeId}>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full p-2">
          <SidebarTrigger />
          {children}
          <Toaster />
          <Analytics />
        </main>
      </SidebarProvider>
    </SignalRProvider>
  );
}
