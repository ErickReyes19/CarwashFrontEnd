"use server";

import { type TSchemaSignIn, schemaSignIn } from "./lib/shemas";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
const key = new TextEncoder().encode(process.env.AUTH_SECRET);
interface UsuarioSesion {
    usuario:   string;
    usuarioId: string; 
    empleadoId: string; 
    Rol:       string;
    Permiso:   string[];
    exp:       number;
    iss:       string;
    aud:       string;
}
export async function encrypt(payload: JWTPayload | undefined) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("1 h from now")
        .sign(key);
}
export const decrypt = async (input: string): Promise<UsuarioSesion> => {
    const { payload } = await jwtVerify<JWTPayload>(input, key, { algorithms: ["HS256"] });

    const usuarioSesion: UsuarioSesion = {
        usuarioId: payload.usuarioId as string,
        usuario: payload.usuario as string,
        empleadoId: payload.empleadoId as string,
        Permiso: payload.Permiso as string[] || [],
        exp: payload.exp as number,
        aud: payload.aud as string,
        iss: payload.iss as string,
        Rol: payload.Rol as string,
    };

    return usuarioSesion;
};
export const login = async (credentials: TSchemaSignIn) => {
    const validated = schemaSignIn.safeParse(credentials);
    if (!validated.success) {
        return { error: "Usuario o contraseña invalidos" };
    }
    try {
        const { usuario, contrasena } = validated.data;
        const tokenAD = await getADAuthentication(usuario, contrasena);
        if (!tokenAD) {
            return { error: "Usuario o contraseña invalidos" };
        }
        const decryptedToken = await decrypt(tokenAD);
        const session = tokenAD;
        const expires = new Date(((await decrypt(session)).exp as number) * 1000);
        cookies().set("session", session, { expires, httpOnly: true });
        return { success: "Login OK" };
    } catch (error) {
        console.log(error);
        return { error: "Error al iniciar sesion" };
    }
};
export const getSession = async () => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }
    return await decrypt(session);
};
export const getSessionUsuario = async (): Promise<UsuarioSesion | null> => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }
    const usuario = await decrypt(session);
    return usuario; 
};

export const getSessionPermisos = async (): Promise<string[] | null> => {
    const session = cookies().get("session")?.value;
    if (!session) {
        return null;
    }
    const usuario = await decrypt(session);
    return usuario.Permiso; // Esto ahora debería ser correcto
};


type TRolAcceso = {
    id: string;
    nivelAcceso: number;
    descripcion: string;
    grupos: string;
    esquema: string;
    tagServicio: string;
};
const chunkCookie = ({ name, value, size }: { name: string; value: string; size: number }) => {
    const chunks = Math.ceil(value.length / size);
    for (let i = 0; i < chunks; i++) {
        const chunkValue = value.slice(i * size, (i + 1) * size);
        cookies().set(`${name}Chunk${i}`, chunkValue);
    }
};
const getADAuthentication = async (usuario: string, contrasena: string) => {

    const url = `${process.env.URLLOGIN}`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contrasena }),
    });
    if (!response.ok) {
        return null;
    }
    const { token } = await response.json();

    return token;
};
export const getToken = async () => {
    const token = cookies().get("session")?.value;
    if(!token){
        return ''
    }
    return token as string;
};

export const signOut = async () => {
    cookies().delete("session");
};


