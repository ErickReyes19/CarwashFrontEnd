import * as z from 'zod';

export const ServicioSchema = z.object({
  id: z.string().optional(), // Campo opcional para manejar clientes existentes
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1, "La descripción es requerida"),
  precio: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(0, "El precio debe ser mayor o igual a 0")
  ),
  activo: z.boolean().default(true),  // Usado solo para actualizaciones
});

export type Servicio = z.infer<typeof ServicioSchema>;
