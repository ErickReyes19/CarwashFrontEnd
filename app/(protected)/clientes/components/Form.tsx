"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"; // Importamos useForm
import { zodResolver } from "@hookform/resolvers/zod"; // Usamos el resolutor de Zod
import { z } from "zod";
import { ClienteSchema } from "../schema"; // Tu esquema de Zod
import { postCliente, putCliente } from "../actions"; // Tu función para enviar datos
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
import { Loader2 } from "lucide-react";

interface FormularioProps {
  isUpdate: boolean;
  initialData?: z.infer<typeof ClienteSchema>;
  // Callback opcional que se llamará cuando el cliente se cree o actualice exitosamente.
  onSuccess?: (newClient: any) => void;
}

export function Formulario({ isUpdate, initialData, onSuccess }: FormularioProps) {
  const { toast } = useToast();
  const router = useRouter();

  // Usamos Zod para resolver la validación
  const form = useForm<z.infer<typeof ClienteSchema>>({
    resolver: zodResolver(ClienteSchema), // Pasamos el esquema Zod al resolver
    defaultValues: initialData || {}, // Valores iniciales si es actualización
  });

  async function onSubmit(data: z.infer<typeof ClienteSchema>) {
    const clienteData = { cliente: data };

    try {
      let result;
      if (isUpdate) {
        result = await putCliente(clienteData);
      } else {
        result = await postCliente(clienteData); 
      }

      // Notificación de éxito
      toast({
        title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
        description: isUpdate
          ? "El cliente ha sido actualizado."
          : "El cliente ha sido creado.",
      });

      // Si se pasó el callback onSuccess, lo usamos en lugar de redireccionar
      if (onSuccess) {
        onSuccess(result);
      } else {
        router.push("/clientes"); // Redirige después de la acción
        router.refresh();
      }
    } catch (error) {
      // Manejo de error
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: "Hubo un problema:",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          form.handleSubmit(onSubmit)(e); 
        }}
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
          name="correo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
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

        {/* Teléfono */}
        <FormField
          control={form.control}
          name="telefono"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Teléfono</FormLabel>
              <FormControl>
                <Input placeholder="Ingresa tu teléfono" {...field} />
              </FormControl>
              <FormDescription>
                Este número se usará para contacto.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Género */}
        <FormField
          control={form.control}
          name="genero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                    <SelectItem value="Otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Indica tu género.</FormDescription>
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : isUpdate ? (
              "Actualizar"
            ) : (
              "Crear"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
