export type EstadoServicio = {
  id?: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};
export type EstadoServicioRegistro = {
  id: string;
  nombre: string;
};

export type Cliente = {
  id?: string;
  nombre: string;
  correo: string;
  telefono: string;
  genero: string;
  activo: boolean;
};

export type Permiso = {
  id?: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
};

export type Empleado = {
  id?: string;
  nombre: string;
  apellido: string;
  edad: number;
  genero: string;
  correo: string;
  activo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  usuarioNombre?: string | null;
};

export type Rol = {
  id?: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
  permisosRol: PermisosRol[];
};

export type PermisosRol = {
  id: string;
  nombre: string;
};

export type Usuario = {
  id?: string;
  usuario: string;
  empleadoNombre: string;
  roleNombre: string;
  activo: boolean;
};

// UsuarioBase: Campos comunes para ambos casos (creación y actualización)
// UsuarioBase: Contiene todos los campos comunes para un usuario
export type UsuarioBase = {
  usuario1: string; // Asegúrate de que este campo esté definido como 'usuario' si así lo estás usando
  contrasena?: string; // Es opcional, solo para actualización o si se necesita cambiar
  empleado_id: string;
  role_id: string;
  id?: string; // Solo para actualización
  activo?: boolean; // Solo para actualización
};

// UsuarioCreate: Para la creación de un nuevo usuario
export type UsuarioCreate = Omit<UsuarioBase, "id" | "activo"> & {
  contrasena: string;
};

// UsuarioUpdate: Para actualizar un usuario existente (requiere 'id' y 'activo')
export type UsuarioUpdate = Required<UsuarioBase> & { usuario: string };

export type Vehiculo = {
  id: string;
  placa: string;
  modelo: string;
  marca: string;
  color: string;
  activo: boolean;
  created_at: Date;
  updated_at: Date;
  clientes: ClienteVehiculo[];
};

export type ClienteVehiculo = {
  id: string;
  nombre: string;
};

export type Marca = {
  id: string;
  nombre: string;
  modelos: Modelo[];
};

export type Modelo = {
  id: string;
  nombre: string;
};

// Tipo para los colores de vehículos
export type Color = {
  id: string;
  nombre: string;
};

export type VehiculoCreate = {
  id?: string;
  clientes: ClienteVehiculo[];
  placa: string;
  modelo: string;
  marca: string;
  color: string;
  activo: boolean;
};

export type Servicio = {
  id?:          string;
  nombre:      string;
  descripcion: string;
  precio:      number;
  activo:      boolean;
}


export type RegistroServicio = {
  id:                   string;
  clienteNombre:        string;
  clienteCorreo:        string;
  usuarioNombre:        null;
  estadoServicioNombre: string;
  fecha:                Date;
}




export type EarningsData = {
  fecha: string
  ganancias: number
}

export type GananciasDia = {
  message: string;
  total:   number;
}
export type GananciaRango = {
  message: string;
  total:   number;
}



export type ServicioGanancias = {
  message: string;
  data:    ServicioGanancia[];
}

export type ServicioGanancia = {
  nombreServicio: string;
  cantidad:       number;
  ganancias:      number;
}


export type Cierre = {
  id:          string;
  fecha:       Date;
  total:       number;
  metodosPago: MetodosPago[];
}

export type MetodosPago = {
  metodoPago: string;
  total:      number;
}
