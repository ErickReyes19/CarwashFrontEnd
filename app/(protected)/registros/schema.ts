import { z } from "zod";

export const CarwashSchema = z.object({
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
                .min(0, "El precio no puede ser negativo"), // Aquí también puedes agregar una validación para el rango si es necesario
            })
          )
          .min(1, "Se debe agregar al menos un servicio por vehículo"),
      })
    )
    .min(1, "Se debe agregar al menos un vehículo"),

  pagos: z
    .array(
      z.object({
        metodo_pago: z.string().min(1, "El método de pago es requerido"),
        monto: z
          .coerce
          .number({ invalid_type_error: "El monto debe ser un número" })
          .min(0, "El monto no puede ser negativo"), // Validación similar para el monto
      })
    )
});

export type CarwashFormValues = z.infer<typeof CarwashSchema>;
