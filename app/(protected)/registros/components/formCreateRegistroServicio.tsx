"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useState, useEffect } from "react";
import { CarwashSchema } from "../schema";
import { z } from "zod";
import {
  ClienteRegistro,
  EmpleadoRegistro,
  EstadoRegistro,
  ServicioRegistro,
  VehiculoRegistro,
} from "./types";
import { VehiculoItem } from "./vehiculoForm";
import { obtenerVehiculoPorCliente } from "../../vehiculos/actions";
import { CheckboxEmpleados } from "./CheckBoxEmpleados";
import { postRegistroServicio, putRegistroServicio } from "../actions";

interface CarwashFormProps {
  isUpdate?: boolean;
  initialData?: z.infer<typeof CarwashSchema>;
  clientes: ClienteRegistro[];
  estados: EstadoRegistro[];
  empleados: EmpleadoRegistro[];
  servicios: ServicioRegistro[];
}

export function CarwashForm({
  isUpdate = false,
  initialData,
  clientes,
  estados,
  empleados,
  servicios,
}: CarwashFormProps) {

  const router = useRouter();
  const { toast } = useToast();

const form = useForm<z.infer<typeof CarwashSchema>>({
  resolver: zodResolver(CarwashSchema),
  defaultValues: initialData
    ? { ...initialData, empleados: initialData.empleados  } 
    : {
        clienteId: "",
        estadoServicioId: "",
        empleados: [],
        vehiculos: [],
      },
});

  const [vehiculos, setVehiculos] = useState<VehiculoRegistro[]>([]);

  // Observamos el valor del campo "clienteId"
  const selectedClientId = form.watch("clienteId");

  useEffect(() => {
    // Si no estamos en modo actualización, reiniciamos la lista de vehículos en el formulario
    if (!isUpdate) {
      form.setValue("vehiculos", []);
    }

    if (selectedClientId) {
      obtenerVehiculoPorCliente(selectedClientId)
        .then((data) => setVehiculos(data || []))
        .catch((err) => {
          console.error("Error al obtener vehículos:", err);
          setVehiculos([]);
        });
    } else {
      setVehiculos([]);
    }
  }, [selectedClientId, form, isUpdate]);

  const {
    fields: vehiculosFields,
    append: appendVehiculo,
    remove: removeVehiculo,
  } = useFieldArray({
    control: form.control,
    name: "vehiculos",
  });

  async function onSubmit(data: z.infer<typeof CarwashSchema>) {
    try {
      if (isUpdate) {
        // Si es actualización, llamamos a la acción PUT
        await putRegistroServicio({ data });
        toast({
          title: "Actualización Exitosa",
          description: "El registro ha sido actualizado.",
        });
      } else {
        await postRegistroServicio({ data });
        toast({
          title: "Creación Exitosa",
          description: "El registro ha sido creado.",
        });
      }

      router.push("/registros"); // Redirige después de la acción
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: "Hubo un problema.",
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border rounded-md p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Cliente */}
            <FormField
              control={form.control}
              name="clienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientes.map((cliente) => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Selecciona el cliente.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estado del Servicio */}
            <FormField
              control={form.control}
              name="estadoServicioId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del Servicio</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un estado" />
                      </SelectTrigger>
                      <SelectContent>
                        {estados.map((estado) => (
                          <SelectItem key={estado.id} value={estado.id}>
                            {estado.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Selecciona el estado del servicio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Empleados */}
            <FormField
              control={form.control}
              name="empleados"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Empleados</FormLabel>
                  <FormControl>
                    <CheckboxEmpleados
                      empleados={empleados}
                      selectedEmpleados={field.value || []}
                      onChange={(selectedIds: string[]) =>
                        field.onChange(selectedIds)
                      }
                    />
                  </FormControl>
                  <FormDescription>Selecciona uno o varios empleados.</FormDescription>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>

          {/* Vehículos y sus Servicios */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Vehículos</h3>
            {vehiculosFields.map((vehiculoField, vehiculoIndex) => (
              <VehiculoItem
                key={vehiculoField.id}
                control={form.control}
                index={vehiculoIndex}
                vehiculo={vehiculoField}
                vehiculos={vehiculos} // Lista de vehículos disponibles según el cliente
                servicios={servicios}
                removeVehiculo={removeVehiculo}
              />
            ))}

            <Button
              type="button"
              onClick={() => appendVehiculo({ vehiculoId: "", servicios: [] })}
            >
              Agregar Vehículo
            </Button>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="w-full sm:w-auto">
              {isUpdate ? "Actualizar Registro" : "Registrar Registro"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
