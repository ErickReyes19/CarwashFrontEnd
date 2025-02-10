"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { VehiculoSchema } from "../schema";
import { postVehiculo, putVehiculo } from "../actions";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ClienteVehiculo, Color, Marca } from "@/lib/Types";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import ErrorDialog from "./dialog";
import { CheckboxClientes } from "./ComboBox";

export function Formulario({
  isUpdate,
  initialData,
  marcas,
  colores,
  clientes,
}: {
  isUpdate: boolean;
  initialData?: z.infer<typeof VehiculoSchema>;
  marcas: Marca[];
  colores: Color[];
  clientes: ClienteVehiculo[];
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof VehiculoSchema>>({
    resolver: zodResolver(VehiculoSchema),
    defaultValues: initialData || {},
  });

  // Mover estos hooks fuera de onSubmit
  const [open, setOpen] = useState(false);
  const [errorData, setErrorData] = useState<{
    message: string;
    clienteNombre: string;
    clienteId: string;
    idVehiculo: string;
  } | null>(null);

  async function onSubmit(data: z.infer<typeof VehiculoSchema>) {
    console.log("Errores de validación:", form.formState.errors);
    const vehiculodata = {
      vehiculoCreate: data,
    };

    try {
      let response;
      if (isUpdate) {
        response = await putVehiculo(vehiculodata);
      } else {
        response = await postVehiculo(vehiculodata);
      }

      if (response.status === 200 || response.status === 201) {
        toast({
          title: isUpdate ? "Actualización Exitosa" : "Creación Exitosa",
          description: isUpdate
            ? "El vehículo ha sido actualizado."
            : "El vehículo ha sido creado.",
        });

        router.push("/vehiculos");
        router.refresh();
      } else if (response.status === 409) {
        setErrorData({
          message: response.data.message,
          clienteNombre: response.data.clienteNombre,
          clienteId: response.data.clienteId,
          idVehiculo: response.data.idVehiculo,
        });
        setOpen(true);
      } else {
        toast({
          title: "Error",
          description: "Hubo un problema inesperado.",
        });
      }
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
              name="placa"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-1">
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingresa la placa del vehículo"
                    />
                  </FormControl>
                  <FormDescription>
                    Ingresa la placa del vehículo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecciona Clientes</FormLabel>
                  <FormControl>
                    <CheckboxClientes
                      clientes={clientes} // Lista de clientes [{ id: "1", nombre: "Juan" }, ...]
                  selectedClientes={
                    field.value?.map((cliente: ClienteVehiculo) => cliente.id) || []
                  } // Solo pasamos los IDs de los permisos
                      onChange={(selected) => {
                        // Convertir los IDs seleccionados a objetos completos
                        const selectedClientes = clientes.filter(
                          (c) => selected.includes(c.id) // Usamos solo el ID para encontrar el cliente
                        );
                        field.onChange(selectedClientes); // Guardar los objetos completos en el formulario
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Selecciona los clientes que deseas asignar.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marca */}
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-1 flex flex-col">
                  <FormLabel>Marca</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? marcas.find((marca) => marca.id === field.value)
                                ?.nombre
                            : "Selecciona una marca"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar marca..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No se encontró marca.</CommandEmpty>
                          <CommandGroup>
                            {marcas.map((marca) => (
                              <CommandItem
                                value={marca.id}
                                key={marca.id}
                                onSelect={() => {
                                  form.setValue("marca", marca.id);
                                  form.setValue("modelo", ""); // Limpia el modelo al cambiar la marca
                                }}
                              >
                                {marca.nombre}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    marca.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Selecciona la marca del vehículo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Modelo */}
            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => {
                // Obtén la marca seleccionada usando `watch`
                const selectedMarcaId = form.watch("marca");
                const modelos =
                  marcas.find((marca) => marca.id === selectedMarcaId)
                    ?.modelos || [];

                return (
                  <FormItem className="col-span-1 sm:col-span-1 flex flex-col">
                    <FormLabel>Modelo</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value || "Selecciona un modelo"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Buscar modelo..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No se encontró modelo.</CommandEmpty>
                            <CommandGroup>
                              {modelos.map((modelo) => (
                                <CommandItem
                                  value={modelo.id}
                                  key={modelo.id}
                                  onSelect={() =>
                                    form.setValue("modelo", modelo.nombre)
                                  }
                                >
                                  {modelo.nombre}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      modelo.nombre === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecciona el modelo del vehículo.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="col-span-1 sm:col-span-1 flex flex-col">
                  <FormLabel>Color</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? colores.find(
                                (color) => color.nombre === field.value
                              )?.nombre
                            : "Selecciona un color"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Buscar color..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No se encontró color.</CommandEmpty>
                          <CommandGroup>
                            {colores.map((color) => (
                              <CommandItem
                                value={color.nombre}
                                key={color.id}
                                onSelect={() => {
                                  form.setValue("color", color.nombre);
                                }}
                              >
                                {color.nombre}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    color.nombre === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Selecciona el color del vehículo.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {isUpdate && (
            <FormField
              control={form.control}
              name="activo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      defaultValue={field.value ? "true" : "false"}
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
                </FormItem>
              )}
            />
          )}
          <div className="flex justify-end gap-4">
            <Button type="submit" className="w-full sm:w-auto">
              {isUpdate ? "Actualizar vehículo" : "Registrar vehículo"}
            </Button>
          </div>
        </form>
      </Form>
      <ErrorDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        errorData={errorData}
        clientes={form.getValues("clientes") || ""}
      />
    </div>
  );
}
