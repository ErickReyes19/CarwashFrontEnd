"use client";

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ServicioRegistro, VehiculoRegistro, ProductoRegistro } from "./types";
import { Input } from "@/components/ui/input";
import { ClienteVehiculo } from "@/lib/Types";
import { ProductoItem } from "./productoForm";
import { NuevoVehiculoDialog } from "./DialogCreateVehiculo";
import { obtenerVehiculoPorCliente } from "../../vehiculos/actions";

// Importa el dialog para agregar vehículos (ajusta la ruta según tu estructura)

interface VehiculoItemProps {
  clienteSeleccionado?: ClienteVehiculo;
  control: any;
  index: number;
  vehiculo: { id: string; vehiculoId: string; servicios: any[] };
  vehiculos: VehiculoRegistro[];
  servicios: ServicioRegistro[];
  productos: ProductoRegistro[];
  removeVehiculo: (index: number) => void;
  // Opcional: callback para actualizar la lista de vehículos en el padre
  onNewVehiculo?: (newVehiculo: VehiculoRegistro) => void;
}

export const VehiculoItem: React.FC<VehiculoItemProps> = ({
  clienteSeleccionado,
  control,
  index,
  vehiculo,
  vehiculos,
  servicios,
  productos,
  removeVehiculo,
  onNewVehiculo,
}) => {
  // Obtenemos setValue desde el contexto del formulario
  const { setValue } = useFormContext();

  // Field array para los servicios del vehículo
  const {
    fields: serviciosFields,
    append: appendServicio,
    remove: removeServicio,
  } = useFieldArray({
    control,
    name: `vehiculos.${index}.servicios`,
  });

  return (
    <div className="border p-4 rounded-lg mb-6 shadow-lg w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Selección del Vehículo */}
        <FormField
          control={control}
          name={`vehiculos.${index}.vehiculoId`}
          render={({ field }) => (
            <FormItem className="w-full">
              {/* <FormLabel>Vehículo</FormLabel> */}
              <div className="flex flex-wrap items-center gap-2">
                <FormControl className="flex-grow min-w-0">
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un vehículo" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {vehiculos.map((v) => (
                        <SelectItem key={v.id} value={v.id}>
                          {v.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <NuevoVehiculoDialog
                  clienteSeleccionado={clienteSeleccionado}
                  onNewVehiculo={(newVehiculoResponse) => {
                    const data = newVehiculoResponse.data;
                    const newVehicleData: VehiculoRegistro = {
                      id: data.id,
                      nombre: `${data.marca} - ${data.modelo} - ${data.color}`,
                    };

                    // Llama al callback del padre para actualizar la lista
                    if (onNewVehiculo) {
                      onNewVehiculo(newVehicleData);
                    }

                    // Actualiza el campo de selección (vehiculoId) en este componente
                    field.onChange(newVehicleData.id);
                  }}
                />
              </div>
              <FormDescription>Selecciona el vehículo.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Botón para eliminar el vehículo */}
        <div className="flex justify-end w-full">
          <Button
            variant="destructive"
            onClick={() => removeVehiculo(index)}
            className="w-full sm:w-auto"
          >
            Eliminar Vehículo
          </Button>
        </div>
      </div>

      {/* Servicios para este vehículo */}
      <div className="mt-6 w-full">
        <h4 className="text-lg font-semibold mb-4">Servicios</h4>
        {serviciosFields.map((servicioField, servicioIndex) => (
          <div
            key={servicioField.id}
            className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-end"
          >
            {/* Selección del Servicio */}
            <FormField
              control={control}
              name={`vehiculos.${index}.servicios.${servicioIndex}.servicioId`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Servicio</FormLabel>
                  <FormControl className="w-full">
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        const selectedService = servicios.find(
                          (s) => s.id === value
                        );
                        if (selectedService) {
                          setValue(
                            `vehiculos.${index}.servicios.${servicioIndex}.precio`,
                            selectedService.precio
                          );
                        }
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {servicios.map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Selecciona el servicio.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio del Servicio */}
            <FormField
              control={control}
              name={`vehiculos.${index}.servicios.${servicioIndex}.precio`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Precio</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Precio"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription>
                    El precio se actualiza al seleccionar un servicio.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botón para eliminar el servicio */}
            <div className="flex justify-end w-full">
              <Button
                variant="destructive"
                onClick={() => removeServicio(servicioIndex)}
                className="w-full sm:w-auto"
              >
                Eliminar Servicio
              </Button>
            </div>

            {/* Sección de productos dentro de este servicio */}
            <div className="col-span-3">
              <ProductoItem
                control={control}
                servicioIndex={servicioIndex}
                vehiculoIndex={index}
                productos={productos}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-start w-full">
          <Button
            type="button"
            onClick={() =>
              appendServicio({ servicioId: "", precio: 0, productos: [] })
            }
            className="w-full sm:w-auto"
          >
            Agregar Servicio
          </Button>
        </div>
      </div>
    </div>
  );
};
