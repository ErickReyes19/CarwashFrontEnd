export type RegistroServicioView = {
    id:             string;
    cliente:        Cliente;
    usuario:        Usuario;
    estadoServicio: EstadoServicio;
    fecha:          Date;
    vehiculos:      VehiculoElement[];
    empleados:      Empleado[];
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
}

export type VehiculoVehiculo = {
    id:     string;
    placa:  string;
    marca:  string;
    modelo: string;
    color:  string;
}
