import { z } from "zod";

export const CarwashSchema = z
  .object({
    descripcion: z.string().default(""),
    registroServicioId: z.string().default("").nullable(),
    clienteId: z.string().uuid({ message: "Cliente inválido" }),
    estadoServicioId: z.string().uuid({ message: "Estado de servicio inválido" }),
    UsuarioId: z.string().default("").nullable(),
    empleados: z
      .array(z.string().uuid({ message: "Empleado inválido" }))
      .min(1, "Se debe seleccionar al menos un empleado"),
    vehiculos: z
      .array(
        z.object({
          vehiculoId: z.string().uuid({ message: "Vehículo inválido" }),
          servicios: z
            .array(
              z.object({
                servicioId: z.string().uuid({ message: "Servicio inválido" }),
                precio: z
                  .coerce
                  .number({ invalid_type_error: "El precio debe ser un número" })
                  .min(0, "El precio no puede ser negativo"),
                productos: z
                  .array(
                    z.object({
                      productoId: z.string().uuid({ message: "Producto inválido" }),
                      cantidad: z
                        .coerce
                        .number({ invalid_type_error: "La cantidad debe ser un número" })
                        .min(1, "La cantidad debe ser al menos 1"),
                      precio: z
                        .coerce
                        .number({ invalid_type_error: "El precio debe ser un número" })
                        .min(0, "El precio no puede ser negativo"),
                    })
                  )
                  .min(1, "Se debe agregar al menos un producto por servicio"),
              })
            )
            .min(1, "Se debe agregar al menos un servicio por vehículo"),
        })
      )
      .min(1, "Se debe agregar al menos un vehículo"),
    pagos: z.array(
      z.object({
        metodo_pago: z.string().min(1, "El método de pago es requerido"),
        monto: z
          .coerce
          .number({ invalid_type_error: "El monto debe ser un número" })
          .min(0, "El monto no puede ser negativo"),
      })
    ),
  })
  .refine(
    (data) => {
      // Suma total de servicios: para cada vehículo, se suman:
      //   - El precio del servicio.
      //   - El total de cada producto (ya calculado en el campo "precio" de cada producto)
      const totalServicios = data.vehiculos.reduce((accVehiculo, vehiculo) => {
        return (
          accVehiculo +
          vehiculo.servicios.reduce((accServicio, servicio) => {
            const productosTotal = servicio.productos.reduce(
              (accProducto, producto) => accProducto + Number(producto.precio),
              0
            );
            return accServicio + Number(servicio.precio) + productosTotal;
          }, 0)
        );
      }, 0);

      // Total de pagos
      const totalPagos = data.pagos.reduce(
        (accPago, pago) => accPago + Number(pago.monto),
        0
      );

      return totalServicios === totalPagos;
    },
    {
      message: "El total de servicios debe ser igual al total de pagos",
      path: ["pagos"],
    }
  );

export type CarwashFormValues = z.infer<typeof CarwashSchema>;
