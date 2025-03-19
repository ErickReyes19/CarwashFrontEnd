"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Formulario as ClienteFormulario } from "../../clientes/components/Form";

interface NuevoClienteDialogProps {
    onNewClient: (newClient: any) => void;
}

export function NuevoClienteDialog({ onNewClient }: NuevoClienteDialogProps) {
    const [open, setOpen] = useState(false);

    const handleSuccess = (newClient: any) => {
        // Llama al callback recibido para actualizar la lista de clientes
        onNewClient(newClient);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Agregar nuevo cliente</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Nuevo Cliente</DialogTitle>
                </DialogHeader>
                {/* Se utiliza el formulario existente para clientes, pasándole el callback onSuccess */}
                <ClienteFormulario isUpdate={false} onSuccess={handleSuccess} />
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
}
