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
import React, { useState, useEffect } from "react";
import { CarwashSchema } from "../schema";
import { z } from "zod";
import {
  ClienteRegistro,
  EmpleadoRegistro,
  EstadoRegistro,
  PagoPost,
  ServicioRegistro,
  VehiculoRegistro,
  ProductoRegistro, // Importamos el tipo de producto
} from "./types";
import { VehiculoItem } from "./vehiculoForm";
import { obtenerVehiculoPorCliente } from "../../vehiculos/actions";
import { CheckboxEmpleados } from "./CheckBoxEmpleados";
import { postRegistroServicio, putRegistroServicio } from "../actions";
import { PagoItem } from "./selectPagot";
import { PaymentSummaryCard } from "./totalesServicio";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { NuevoClienteDialog } from "./DialogCreateCliente";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ClienteSchema } from "../../clientes/schema";

interface CarwashFormProps {
  isUpdate?: boolean;
  initialData?: z.infer<typeof CarwashSchema>;
  clientes: ClienteRegistro[];
  estados: EstadoRegistro[];
  empleados: EmpleadoRegistro[];
  servicios: ServicioRegistro[];
  productos: ProductoRegistro[];
}

export function CarwashForm({
  isUpdate = false,
  initialData,
  clientes,
  estados,
  empleados,
  servicios,
  productos,
}: CarwashFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [clientesList, setClientesList] = useState<ClienteRegistro[]>(clientes);
  const form = useForm<z.infer<typeof CarwashSchema>>({
    resolver: zodResolver(CarwashSchema),
    defaultValues: initialData
      ? { ...initialData, pagos: initialData.pagos || [] }
      : {
          clienteId: "",
          descripcion: "",
          estadoServicioId: "",
          empleados: [],
          vehiculos: [],
          pagos: [],
        },
  });

  const handleNewVehiculo = (newVehiculoData: VehiculoRegistro) => {
    // Agrega el nuevo vehículo a la lista de vehículos
    setVehiculos((prevVehiculos) => [...prevVehiculos, newVehiculoData]);
  };
  const [vehiculos, setVehiculos] = useState<VehiculoRegistro[]>([]);

  // Definimos una lista de productos (puede venir de una API o ser estática)

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

  // Field array para pagos
  const {
    fields: pagosFields,
    append: appendPago,
    remove: removePago,
  } = useFieldArray({
    control: form.control,
    name: "pagos",
  });
  const { formState } = form;
  // forma de saber si un form esta valido o no
  const isValid = formState.errors;
  async function onSubmit(data: z.infer<typeof CarwashSchema>) {
    try {
      console.log("Errores de validación:", form.formState.errors);
      if (isUpdate) {
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
      router.push("/registros");
      router.refresh();
    } catch (error) {
      console.error("Error en la operación:", error);
      toast({
        title: "Error",
        description: "Hubo un problema.",
      });
    }
  }

  const handleNewClient = (newClient: ClienteRegistro) => {
    // Actualizamos la lista (también podrías reconsultar la API)
    setClientesList((prev) => [...prev, newClient]);
    // Establecemos el nuevo cliente como seleccionado en el select
    form.setValue("clienteId", newClient.id);
  };
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

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
              disabled={isUpdate}
              control={form.control}
              name="clienteId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <div className="flex flex-wrap items-center gap-2">
                    <FormControl className="flex-grow min-w-0">
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full sm:w-[200px] justify-between"
                            onClick={() => setOpen(!open)}
                          >
                            {value
                              ? clientesList.find(
                                  (cliente) => cliente.id === value
                                )?.nombre
                              : "Selecciona un cliente..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full sm:w-[200px] max-w-xs p-0">
                          <Command>
                            <CommandInput placeholder="Buscar cliente..." />
                            <CommandList>
                              <CommandEmpty>
                                No se encontró cliente.
                              </CommandEmpty>
                              <CommandGroup>
                                {clientesList.map((cliente) => (
                                  <CommandItem
                                    key={cliente.id}
                                    value={cliente.id}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                      field.onChange(currentValue); // Actualiza el valor en el formulario
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        value === cliente.id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {cliente.nombre}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <NuevoClienteDialog onNewClient={handleNewClient} />
                  </div>

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
                  <FormDescription>
                    Selecciona uno o varios empleados.
                  </FormDescription>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />
          </div>
          {/* Nombre */}
          <FormField
            control={form.control}
            name="descripcion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Ingresa una descripción" {...field} />
                </FormControl>
                <FormDescription>
                  Por favor ingrese una descripción.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Vehículos y sus Servicios */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Vehículos</h3>
            {vehiculosFields.map((vehiculoField, vehiculoIndex) => (
              <VehiculoItem
                clienteSeleccionado={clientesList.find(
                  (cliente) => cliente.id === selectedClientId
                )}
                key={vehiculoField.id}
                control={form.control}
                index={vehiculoIndex}
                vehiculo={vehiculoField}
                vehiculos={vehiculos} // Lista de vehículos disponibles según el cliente
                servicios={servicios}
                productos={productos} // Se pasa la lista de productos
                removeVehiculo={removeVehiculo}
                onNewVehiculo={handleNewVehiculo}
              />
            ))}

            <Button
              disabled={!selectedClientId}
              type="button"
              onClick={() => appendVehiculo({ vehiculoId: "", servicios: [] })}
            >
              Agregar Vehículo
            </Button>
          </div>

          {/* Sección de Pagos */}
          <div className="space-y-6 mt-8">
            <h3 className="text-lg font-semibold">Pagos</h3>
            {pagosFields.map((pagoField, pagoIndex) => (
              <PagoItem
                key={pagoField.id}
                control={form.control}
                index={pagoIndex}
                removePago={removePago}
              />
            ))}
            <Button
              type="button"
              onClick={() => appendPago({ metodo_pago: "", monto: 0 })}
            >
              Agregar Pago
            </Button>
          </div>
          {form.formState.errors.pagos && (
            <p className="text-red-600 text-sm">
              {form.formState.errors.pagos.message}
            </p>
          )}
          <PaymentSummaryCard />
          <div className="flex justify-end gap-4">
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
    </div>
  );
}
