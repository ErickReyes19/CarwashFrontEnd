export type Categoria = {
    categoriaId:   string;
    nombre:        string;
    descripcion:   string;
    fechaCreacion: Date;
    activo:        boolean;
}




export type Cliente = {
    clienteId:      string;
    nombre?:        string;
    identidad?:     string;
    apellido?:      string;
    correo?:        string;
    telefono?:      string;
    direccion?:     string;
    activo:         boolean;
    fechaRegistro:  Date;
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














