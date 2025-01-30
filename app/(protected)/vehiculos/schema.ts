
import { z } from "zod";

export const ClientesVehiculoSchema = z.object({
  id: z.string().min(1, "El ID del cliente es requerido"),
  nombre: z.string().min(1, "El nombre del cliente es requerido"),
});
// Esquema para validación de usuario
export const VehiculoSchema = z.object({
  placa: z.string().length(7, "La placa debe tener 7 caracteres"),
  marca: z.string(),
  modelo: z.string(),
  color: z.string(),
  id: z.string().optional(),
  activo: z.boolean().default(true),
  clienteVehiculo: z.array(ClientesVehiculoSchema)// Array de permisos, obligatorio
});

export type clienteVehiculo = z.infer<typeof ClientesVehiculoSchema>;


