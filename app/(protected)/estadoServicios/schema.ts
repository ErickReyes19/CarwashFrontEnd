import * as z from 'zod';

export const EstadoServicioSchema = z.object({
  id: z.string().optional(), // Campo opcional para manejar clientes existentes
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1,"descripcion es requerida"),
  activo: z.boolean().default(true),  // Usado solo para actualizaciones
});

export type EstadoServicio = z.infer<typeof EstadoServicioSchema>;
