export type Categoria = {
    categoriaId:   string;
    nombre:        string;
    descripcion:   string;
    fechaCreacion: Date;
    activo:        boolean;
}



export type Cliente = {
    id?:       string;
    nombre:   string;
    correo:   string;
    telefono: string;
    genero:   string;
    activo:   boolean;
}


export type Rol = {
    rolId:         string;
    nombre:        string;
    descripcion:   string;
    fechaCreacion: Date;
    activo:        boolean;
    permisosIds:   string[];
}

export type Permiso = {
    permisoId:     string;
    nombre:        string;
    fechaCreacion: Date;
    activo:        boolean;
}

export type RolPermisos = {
    RolId:       string;
    PermisosIds: string[];
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















