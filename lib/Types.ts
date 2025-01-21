export type EstadoServicio = {
    id?:          string;
    nombre:      string;
    descripcion: string;
    activo:      boolean;
}



export type Cliente = {
    id?:       string;
    nombre:   string;
    correo:   string;
    telefono: string;
    genero:   string;
    activo:   boolean;
}



export type Permiso = {
    id?:          string;
    nombre:      string;
    descripcion: string;
    activo:      boolean;
}


export type Empleado = {
    id?:            string;
    nombre:        string;
    apellido:      string;
    edad:          number;
    genero:        string;
    correo:        string;
    activo:        boolean;
    createdAt?:     Date;
    updatedAt?:     Date;
    usuarioNombre?: string;
}















