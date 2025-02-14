export type ClienteView = {
    id: string
    nombre: string
    correo: string
    telefono: string
    genero: string
    activo: boolean
    createdAt: string
    updatedAt: string
    vehiculos: Vehiculo[]
    registroServicios: RegistroServicio[]
  }
  
  type Vehiculo = {
    id: string
    placa: string
    modelo: string
    marca: string
    color: string
    activo: boolean
  }
  
  type Servicio = {
    nombre: string
    descripcion: string
  }
  
  type RegistroServicioVehiculo = {
    id: string
    vehiculoConcatenado: string
    detalles: DetalleServicio[]
  }
  
  type DetalleServicio = {
    precio: number
    servicio: Servicio
  }
  
  type Empleado = {
    nombre: string
    apellido: string
  }
  
  type EstadoServicio = {
    nombre: string
  }
  
  type RegistroServicio = {
    id: string
    fecha: string
    estadoServicio: EstadoServicio
    empleados: Empleado[]
    registroServicioVehiculos: RegistroServicioVehiculo[]
  }
  