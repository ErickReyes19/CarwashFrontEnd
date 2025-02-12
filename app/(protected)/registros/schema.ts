import { z } from "zod";

export const CarwashSchema = z.object({
  clienteId: z.string().uuid({ message: "Cliente inválido" }),
  estadoServicioId: z.string().uuid({ message: "Estado de servicio inválido" }),
  // Agregar el campo UsuarioId con opción de ser nulo
  UsuarioId: z.string().default("").nullable(), // Esto permite que sea null o una cadena válida
  Empleados: z
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
                .number({ invalid_type_error: "El precio debe ser un número" })
                .min(0, "El precio debe ser mayor o igual a 0"),
            })
          )
          .min(1, "Se debe agregar al menos un servicio por vehículo"),
      })
    )
    .min(1, "Se debe agregar al menos un vehículo"),
});

export type CarwashFormValues = z.infer<typeof CarwashSchema>;
