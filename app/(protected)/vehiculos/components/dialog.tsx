import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { AsignarVehiculoACliente } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ClienteVehiculo } from "@/lib/Types";

interface ErrorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  errorData: {
    message: string;
    clienteNombre: string;
    clienteId: string; // Cliente ya asignado
    idVehiculo: string; // Cliente ya asignado
  } | null;
  clientes: ClienteVehiculo[]; // Nuevo cliente
}

const ErrorDialog: React.FC<ErrorDialogProps> = ({
  isOpen,
  onClose,
  errorData,
  clientes,
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const handleAsignar = async () => {
    if (!clientes) return; // Validar que el clienteId sea válido
    setLoading(true);
    try {
      const response = await AsignarVehiculoACliente({
        idVehiculo: errorData?.idVehiculo || "", // Vehículo del cliente actual
        clientes: clientes, // Cliente al que se asignará
      });
      if (response.status === 200) {
        toast({
          title: "Actualización Exitosa",
          description: "El vehículo ha sido asignado con exito.",
        });
        router.push("/vehiculos");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: "Error al asignar el vehículo.",
        });
      }
      onClose(); // Cerrar el diálogo después de la asignación
    } catch (error) {
      console.error("Error al asignar vehículo:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
        <button style={{ display: "none" }}>Open</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{errorData?.message || "Error"}</DialogTitle>
          <DialogDescription>
            Vehículo asignado actualmente al cliente:{" "}
            <strong>{errorData?.clienteNombre || "Desconocido"}</strong>
          </DialogDescription>
        </DialogHeader>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2 style={{ marginBottom: "20px" }}>
            ¿Desea asignar este vehículo al cliente{" "}
            <strong></strong>?
          </h2>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "10px" }}
          >
            <Button
              variant="default"
              onClick={handleAsignar}
              disabled={loading}
            >
              {loading ? "Asignando..." : "Asignar"}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ErrorDialog;
