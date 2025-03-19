"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Formulario as VehiculoFormulario } from "../../vehiculos/components/Form"; // Ajusta la ruta según tu estructura
import { ClienteVehiculo } from "@/lib/Types";
import { colores, marcas } from "@/lib/data";
import { getClientesActivos } from "../../clientes/actions";

interface NuevoVehiculoDialogProps {
  onNewVehiculo: (newVehiculo: any) => void;
  clienteSeleccionado?: ClienteVehiculo; // Cliente preseleccionado (del formulario principal)
}

export function NuevoVehiculoDialog({
  onNewVehiculo,
  clienteSeleccionado,
}: NuevoVehiculoDialogProps) {
  const [open, setOpen] = useState(false);
  const [clientes, setClientes] = useState<ClienteVehiculo[]>([]);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const activeClientes = await getClientesActivos();
        setClientes(activeClientes);
      } catch (error) {
        console.error("Error al obtener clientes activos:", error);
      }
    }
    fetchClientes();
  }, []);

  const handleSuccess = (newVehiculo: any) => {
    onNewVehiculo(newVehiculo);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Agregar nuevo vehículo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Vehículo</DialogTitle>
        </DialogHeader>
        {/* Se usa el formulario de vehículo, al que se le pasa el cliente preseleccionado */}
        <VehiculoFormulario
          isUpdate={false}
          onSuccess={handleSuccess}
          marcas={marcas}
          colores={colores}
          clientes={clientes}
          clienteSeleccionado={clienteSeleccionado}
        />
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}
