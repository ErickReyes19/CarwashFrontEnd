"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Importamos useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Usamos el resolutor de Zod
import { z } from "zod";
import {  EstadoServicioSchema } from "../schema"; // Tu esquema de Zod
import { postEstadoServicio, putEstadoServicio } from "../actions"; // Tu función para enviar datos
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function Formulario({
  isUpdate,
  initialData,
}: {
  isUpdate: boolean;
  initialData?: z.infer<typeof EstadoServicioSchema>;
}) {
  const { toast } = useToast();
  const router = useRouter();

  // Usamos Zod para resolver la validación
  const form = useForm<z.infer<typeof EstadoServicioSchema>>({
    resolver: zodResolver(EstadoServicioSchema), // Pasamos el esquema Zod al resolver
    defaultValues: initialData || {}, // Valores iniciales si es actualización
  });

  async function onSubmit(data: z.infer<typeof EstadoServicioSchema>) {
    const estadoServicioData = {
      estadoServicio: data,
    };

    try {
      if (isUpdate) {
        await putEstadoServicio(estadoServicioData);
      } else {
        await postEstadoServicio(estadoServicioData); 
      }

      // Notificación de éxito
      toast({
        title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
        description: isUpdate
          ? "El estado servicio ha sido actualizado."
          : "El estado servicio ha sido creado.",
      });

      router.push("/estadoServicios"); // Redirige después de la acción
      router.refresh();
    } catch (error) {
      // Manejo de error
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: `Hubo un problema:`,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 border rounded-md p-4"
      >
        {/* Nombre */}
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu nombre" {...field} />
              </FormControl>
              <FormDescription>
                Por favor ingresa tu nombre completo.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Correo */}
        <FormField
          control={form.control}
          name="descripcion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingresa ladescripción"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Debes ingresar un correo electrónico válido.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Estado Activo (solo si es actualización) */}
        {isUpdate && (
          <FormField
            control={form.control}
            name="activo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")} // Convertimos "true"/"false" a boolean
                    defaultValue={field.value ? "true" : "false"} // Convertimos el valor inicial a cadena
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Activo</SelectItem>
                      <SelectItem value="false">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>
                  Define si el registro está activo o inactivo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Enviar */}
        <div className="flex justify-end">
          <Button type="submit">{isUpdate ? "Actualizar" : "Crear"}</Button>
        </div>
      </form>
    </Form>
  );
}
