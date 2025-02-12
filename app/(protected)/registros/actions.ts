"use server";
import { getSessionUsuario } from "@/auth";
import apiService from "../../../lib/server";
import { RegistroServicioPost, RegistroServicioView } from "./components/types";
import { RegistroServicio } from "@/lib/Types";
export async function getRegistros(fechaDesde?: string, fechaHasta?: string): Promise<RegistroServicio[]> {
  try {
    const params: Record<string, string> = {};
    if (fechaDesde) {
      params.fechaDesde = fechaDesde;
    }

    if (fechaHasta) {
      params.fechaHasta = fechaHasta;
    }

    const response = await apiService.get<RegistroServicio[]>("/RegistroServicio/summary", {
      params,
    });

    return response?.data || [];  
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return [];  // Retorna un array vacío en caso de error
  }
}


export async function getRegistroServicioId(id: string) {
  try {
    const response = await apiService.get<RegistroServicioView>(`/RegistroServicio/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error al obtener el Registro Servicio:", error);
    return null;
  }
}



// Función para crear el registro de servicio
export async function postRegistroServicio({
  data,
}: {
  data: RegistroServicioPost;
}) {
  try {
    const sesion = await getSessionUsuario(); // Obtener la sesión de usuario
    const usuarioId = sesion?.usuarioId; // Extraer el usuarioId de la sesión

    if (!usuarioId) {
      throw new Error("El usuario no está autenticado.");
    }

    // Agregar el usuarioId al registroServicio
    const registroConUsuarioId = {
      ...data,
      UsuarioId: usuarioId,
    };

    // Hacer la solicitud POST con el usuarioId incluido
    const response = await apiService.post("/RegistroServicio/multiple", registroConUsuarioId);

    return response?.data;
  } catch (error) {
    console.error("Error al crear el registro de servicio:", error);
    throw error;
  }
}

