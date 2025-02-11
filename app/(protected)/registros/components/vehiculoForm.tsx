"use client";

import React from "react";
import { useFieldArray } from "react-hook-form";
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
import { ServicioRegistro, VehiculoRegistro } from "./types";
import { Input } from "@/components/ui/input";

interface VehiculoItemProps {
    control: any;
    index: number;
    vehiculo: { id: string; vehiculoId: string; servicios: any[] };
    vehiculos: VehiculoRegistro[];
    servicios: ServicioRegistro[];
    removeVehiculo: (index: number) => void;
}

export const VehiculoItem: React.FC<VehiculoItemProps> = ({
    control,
    index,
    vehiculo,
    vehiculos,
    servicios,
    removeVehiculo,
}) => {
    // Extraemos el field array para los servicios del vehículo
    const {
        fields: serviciosFields,
        append: appendServicio,
        remove: removeServicio,
    } = useFieldArray({
        control,
        name: `vehiculos.${index}.servicios`,
    });

    return (
        <div className="border p-4 rounded-lg mb-6 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Selección del Vehículo */}
                <FormField
                    control={control}
                    name={`vehiculos.${index}.vehiculoId`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vehículo</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un vehículo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {vehiculos.map((v) => (
                                            <SelectItem key={v.id} value={v.id}>
                                                {v.nombre}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>Selecciona el vehículo.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Botón para eliminar el vehículo */}
                <div className="flex justify-end">
                    <Button variant="destructive" onClick={() => removeVehiculo(index)}>
                        Eliminar Vehículo
                    </Button>
                </div>
            </div>

            {/* Servicios para este vehículo */}
            <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">Servicios</h4>
                {serviciosFields.map((servicioField, servicioIndex) => (
                    <div
                        key={servicioField.id}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-end"
                    >
                        {/* Selección del Servicio */}
                        <FormField
                            control={control}
                            name={`vehiculos.${index}.servicios.${servicioIndex}.servicioId`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Servicio</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un servicio" />
                                            </SelectTrigger>
                                            <SelectContent>
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
                                <FormItem>
                                    <FormLabel>Precio</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="Precio"
                                            {...field}
                                            value={field.value || servicios.find((servicio) => servicio.id === field.value)?.precio || 0} // Asigna el precio si existe, de lo contrario 0
                                        />
                                    </FormControl>
                                    <FormDescription>Ingresa el precio.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Botón para eliminar el servicio */}
                        <div className="flex justify-end">
                            <Button
                                variant="destructive"
                                onClick={() => removeServicio(servicioIndex)}
                            >
                                Eliminar Servicio
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="flex justify-start">
                    <Button
                        type="button"
                        onClick={() => appendServicio({ servicioId: "", precio: 0 })}
                    >
                        Agregar Servicio
                    </Button>
                </div>
            </div>
        </div>
    );
};
