import * as z from 'zod';

export const ClienteSchema = z.object({
  id: z.string().optional(), // Campo opcional para manejar clientes existentes
  nombre: z.string().min(1, "El nombre es requerido"),
  correo: z.string().email("Correo no válido"),
  telefono: z.string().min(8, "El teléfono debe tener al menos 8 caracteres"),
  genero: z.string().min(1, "El género es requerido"),
  activo: z.boolean().default(true),  // Usado solo para actualizaciones
});

export type Cliente = z.infer<typeof ClienteSchema>;
