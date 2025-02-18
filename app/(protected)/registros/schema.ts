import { z } from "zod";

export const CarwashSchema = z
  .object({
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
      // Calcula el total de servicios sumando el precio de cada servicio en cada vehículo
      const totalServicios = data.vehiculos.reduce((accVehiculo, vehiculo) => {
        return (
          accVehiculo +
          vehiculo.servicios.reduce((accServicio, servicio) => {
            return accServicio + servicio.precio;
          }, 0)
        );
      }, 0);

      // Calcula el total de pagos sumando los montos de cada pago
      const totalPagos = data.pagos.reduce((accPago, pago) => accPago + pago.monto, 0);

      // Para evitar problemas con números en coma flotante puedes usar tolerancia, por ejemplo:
      // return Math.abs(totalServicios - totalPagos) < 0.01;
      return totalServicios === totalPagos;
    },
    {
      message: "El total de servicios debe ser igual al total de pagos",
      path: ["pagos"], // Asocia el error al campo "pagos"
    }
  );

export type CarwashFormValues = z.infer<typeof CarwashSchema>;
