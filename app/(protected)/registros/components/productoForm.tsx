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
import { Input } from "@/components/ui/input";
import { ProductoRegistro } from "./types";

interface ProductoItemProps {
  control: any;
  servicioIndex: number;
  vehiculoIndex: number;
  productos?: ProductoRegistro[]; // Puede ser undefined
}

export const ProductoItem: React.FC<ProductoItemProps> = ({
  control,
  servicioIndex,
  vehiculoIndex,
  productos = [], // Si es undefined, se asigna un array vacío
}) => {
  const { setValue, getValues } = useFormContext();
  const {
    fields: productosFields,
    append: appendProducto,
    remove: removeProducto,
  } = useFieldArray({
    control,
    name: `vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos`,
  });

  return (
    <div className="border p-4 rounded-lg mb-6 shadow-lg w-full">
      <h4 className="text-lg font-semibold mb-4">Productos</h4>

      {productosFields.map((productoField, productoIndex) => (
        <div
          key={productoField.id}
          className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 items-end"
        >
          {/* Select de Producto */}
          <FormField
            control={control}
            name={`vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.productoId`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Producto</FormLabel>
                <FormControl className="w-full">
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      const selectedProduct = productos.find(
                        (prod) => prod.id === value
                      );
                      const currentQuantity =
                        parseFloat(
                          getValues(
                            `vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.cantidad`
                          )
                        ) || 1;
                      if (selectedProduct) {
                        setValue(
                          `vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.precio`,
                          parseFloat(selectedProduct.precio) * currentQuantity
                        );
                      } else {
                        setValue(
                          `vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.precio`,
                          0
                        );
                      }
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un producto" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      {productos.map((prod) => (
                        <SelectItem key={prod.id} value={prod.id}>
                          {prod.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Selecciona el producto.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input de Cantidad */}
          <FormField
            control={control}
            name={`vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.cantidad`}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Cantidad</FormLabel>
                <FormControl className="w-full">
                  <Input
                    type="number"
                    step="1"
                    placeholder="Cantidad"
                    {...field}
                    className="w-full"
                    onChange={(e) => {
                      field.onChange(e);
                      const quantity = parseFloat(e.target.value) || 1;
                      const selectedProductId = getValues(
                        `vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.productoId`
                      );
                      const selectedProduct = productos.find(
                        (prod) => prod.id === selectedProductId
                      );
                      if (selectedProduct) {
                        setValue(
                          `vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.precio`,
                          parseFloat(selectedProduct.precio) * quantity
                        );
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>La cantidad por defecto es 1.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Input de Precio (calculado) */}
          <FormField
            control={control}
            name={`vehiculos.${vehiculoIndex}.servicios.${servicioIndex}.productos.${productoIndex}.precio`}
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
                    readOnly
                  />
                </FormControl>
                <FormDescription>
                  El precio se calcula (precio del producto x cantidad).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Botón para eliminar el producto */}
          <div className="flex justify-end w-full">
            <Button
              variant="destructive"
              onClick={() => removeProducto(productoIndex)}
              className="w-full sm:w-auto"
            >
              Eliminar Producto
            </Button>
          </div>
        </div>
      ))}

      <div className="flex justify-start w-full">
        <Button
          type="button"
          onClick={() =>
            appendProducto({ productoId: "", cantidad: 1, precio: 0 })
          }
          className="w-full sm:w-auto"
        >
          Agregar Producto
        </Button>
      </div>
    </div>
  );
};
