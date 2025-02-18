"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PagoItemProps {
  control: any;
  index: number;
  removePago: (index: number) => void;
}

export const PagoItem: React.FC<PagoItemProps> = ({ control, index, removePago }) => {
  return (
    <div className="border p-4 rounded-lg mb-4 shadow">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Método de Pago */}
        <FormField
          control={control}
          name={`pagos.${index}.metodo_pago`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Método de Pago</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta</SelectItem>
                    <SelectItem value="transferencia">Transferencia</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Selecciona el método de pago.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Monto */}
        <FormField
          control={control}
          name={`pagos.${index}.monto`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monto</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Ingrese el monto"
                  {...field}
                />
              </FormControl>
              <FormDescription>Ingresa el monto del pago.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex justify-end mt-2">
        <Button variant="destructive" onClick={() => removePago(index)}>
          Eliminar Pago
        </Button>
      </div>
    </div>
  );
};
