export type RegistroServicioView = {
    id:             string;
    cliente:        Cliente;
    usuario:        Usuario;
    estadoServicio: EstadoServicio;
    fecha:          Date;
    vehiculos:      VehiculoElement[];
    empleados:      Empleado[];
    pagos:           Pagos[];
    descripcion:    string;
}

export type Pagos = {
  metodo_pago: string;
  monto:       number;
}

export type Cliente = {
    id:        string;
    nombre:    string;
    correo:    string;
    telefono?: string;
    apellido?: string;
}
export type Empleado = {
    id:        string;
    nombre:    string;
    correo:    string;
    telefono?: string;
    apellido?: string;
}

export type EstadoServicio = {
    id:          string;
    nombre:      string;
    descripcion: string;
}

export type Usuario = {
    id: string;
}

export type VehiculoElement = {
    id:        string;
    vehiculo:  VehiculoVehiculo;
    servicios: Servicio[];
}

export type Servicio = {
  id:             string;
  servicioNombre: string;
  precio:         number;
  producto:       Producto[];
}
export type Producto = {
  productoId: string;
  cantidad:   number;
  precio:     number;
  nombre:     string;
}

export type VehiculoVehiculo = {
    id:     string;
    placa:  string;
    marca:  string;
    modelo: string;
    color:  string;
}






// Definición de los tipos CREAYE
export type ClienteRegistro = {
    id: string;
    nombre: string;
  };
  
  export type EstadoRegistro = {
    id: string;
    nombre: string;
  };
  
  export type EmpleadoRegistro = {
    id: string;
    nombre: string;
  };
  
  export type VehiculoRegistro = {
    id: string;
    nombre: string;
  };
  
  export type ServicioRegistro = {
    id: string;
    nombre: string;
    precio: string;
  };

  export type ProductoRegistro = {
    id: string;
    nombre: string;
    precio: string;
  };
  




  // Tipos para los servicios de cada vehículo
  export type ServicioPost = {
    servicioId: string;
    precio: number;
  }
  
  // Tipo para los vehículos que serán parte del registro de servicio
  export type VehiculoPost = {
    vehiculoId: string;
    servicios: ServicioPost[];
  }
  
  // Tipo para los pagos
  export type PagoPost = {
    metodo_pago: string;
    monto: number;
  }
  
  // Tipo para el DTO que será enviado con la acción
  export type RegistroServicioPost = {
    clienteId: string;
    descripcion: string;
    estadoServicioId: string;
    UsuarioId: string | null;
    empleados: string[]; // ID de los empleados seleccionados
    vehiculos: VehiculoPost[]; // Lista de vehículos y servicios asociados
    pagos: PagoPost[]; // Lista de pagos asociados
  }


  
  export type CambiarEstadoType = {
    RegistroServicioId: string;
    EstadoServicioId: string;
  }
  



export type RegistroServicioEdit = {
  descripcion: string;
  registroServicioId: string;
  clienteId: string;
  estadoServicioId: string;
  UsuarioId: string | null; // Se cambió de usuarioId → UsuarioId (respetando la API)
  empleados: string[]; // Se cambió de empleados → Empleados (respetando la API)
  vehiculos: VehiculoEdit[];
  pagos: PagoPost[];
};

export type VehiculoEdit = {
  vehiculoId: string;
  servicios: ServicioEdit[];
};

export type ServicioEdit = {
  servicioId: string;
  precio: string;
  productos:  ProductoEdit[];
};


export type ProductoEdit = {
  productoId: string;
  cantidad:   number;
  total:   number;
}

