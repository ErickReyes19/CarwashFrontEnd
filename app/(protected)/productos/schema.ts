import * as z from 'zod';

export const ProductosSchema = z.object({
  id: z.string().optional(), // Campo opcional para manejar clientes existentes
  nombre: z.string().min(1, "El nombre es requerido"),
  descripcion: z.string().min(1,"descripcion es requerida"),
  activo: z.boolean().default(true),
  precio: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(0, "El precio debe ser mayor o igual a 0")
  ),
});

export type Producto = z.infer<typeof ProductosSchema>;
