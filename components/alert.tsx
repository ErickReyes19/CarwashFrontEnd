import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"; // Importando desde Shadcn

interface AlertDialogProps {
  order: {
    registroServicioId: string;
    totalServicio: number;
    mensaje: string;
  };
}

export function AlertDialog({ order }: AlertDialogProps) {
  return (
    <Dialog open={true}>
      <DialogTrigger />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva Orden Asignada</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {/* Mostrar los datos básicos de la orden */}
          <p><strong>Registro Servicio ID:</strong> {order.registroServicioId}</p>
          <p><strong>Total Servicio:</strong> {order.totalServicio}</p>
          <p><strong>Mensaje:</strong> {order.mensaje}</p>
        </div>
      </DialogContent>
      <DialogFooter>
        <button className="btn" onClick={() => {}}>Cerrar</button>
      </DialogFooter>
    </Dialog>
  );
}
