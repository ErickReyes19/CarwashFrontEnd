"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { postCierre } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CierreConfirmationDialog() {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleConfirm = async () => {
        setOpen(false);
        const response = await postCierre() as { mensaje: string };
        toast({
            title: 'Cierre',
            description: response.mensaje,
        });
        router.refresh();
    };
    return (
        <>
            <Button variant="destructive" onClick={() => setOpen(true)}>
                Realizar Cierre
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>¿Está seguro de realizar el cierre?</DialogTitle>
                    </DialogHeader>
                    <p>Una vez realizado, no se podrá revertir.</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="destructive" onClick={handleConfirm}>
                            Confirmar Cierre
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
