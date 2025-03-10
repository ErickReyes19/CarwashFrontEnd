'use client';

import Link from "next/link";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatLempiras } from "@/lib/utils";

interface AlertDialogProps {
  order: {
    registroServicioId: string;
    totalServicio: number;
    mensaje: string;
  };
  onClose: () => void;
}

export function AlertDialog({ order, onClose }: AlertDialogProps) {
  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogTrigger />
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Nueva Orden Asignada</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-lg font-semibold">¡Tienes una nueva orden asignada!</p>
          <p className="mt-2">
            <span className="font-medium">Total Servicio:</span> {formatLempiras(order.totalServicio)}
          </p>
          <p className="mt-2">
            <span className="font-medium">Mensaje:</span> {order.mensaje}
          </p>
        </div>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cerrar</Button>
          <Link href={`/registros/${order.registroServicioId}/view`}>
            <Button onClick={onClose} >Ver detalle</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
