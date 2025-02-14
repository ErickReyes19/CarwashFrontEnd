import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getEstadoServiciosActivos } from "../../estadoServicios/actions";
import { CambiarEstadoType } from "./types";
import { putCambiarEstado } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface EstadoDialogProps {
  registroId: string;
}

export default function EstadoDialog({ registroId }: EstadoDialogProps) {
  const [open, setOpen] = useState(false);
  const [estado, setEstado] = useState("");
  const [estados, setEstados] = useState<{ id: string; nombre: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const data = await getEstadoServiciosActivos();
        setEstados(data);
      } catch (error) {
        console.error("Error cargando estados:", error);
      }
    };

    fetchEstados();
  }, []);

  const handleEstadoChange = (value: string) => {
    setEstado(value);
  };

  const handleConfirm = async () => {
    if (!estado) return;

    setLoading(true);
    try {
      const data: CambiarEstadoType = {
        RegistroServicioId: registroId,
        EstadoServicioId: estado,
      };

      await putCambiarEstado({ data });
      toast({
        title: "Actualización Exitosa",
        description: "El registro ha sido actualizado.",
      });
      setOpen(false);
      router.push("/registros"); 
      router.refresh();
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error al actualizar",
            description: "El registro no pudo ser actualizado.",
          });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-right">Cambiar Estado</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar Estado</DialogTitle>
        </DialogHeader>
        <Select onValueChange={handleEstadoChange}>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un estado" />
          </SelectTrigger>
          <SelectContent>
            {estados.map((estado) => (
              <SelectItem key={estado.id} value={estado.id}>
                {estado.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleConfirm} disabled={!estado || loading}>
          {loading ? "Actualizando..." : "Confirmar"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}