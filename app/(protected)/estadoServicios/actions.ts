"use server";

import { EstadoServicio, EstadoServicioRegistro } from "@/lib/Types";
import apiService from "../../../lib/server";
// import { ClienteElementSchema } from "./schema";

export async function getEstadoServicios() {
  try {
    const response = await apiService.get<EstadoServicio[]>("/EstadosServicio");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Estados de Servicio:", error);
    return [];
  }
}
export async function getEstadoServiciosActivos() {
  try {
    const response = await apiService.get<EstadoServicioRegistro[]>("/EstadosServicio/active");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Estados de Servicio:", error);
    return [];
  }
}

export async function putEstadoServicio({ estadoServicio }: { estadoServicio: EstadoServicio }) {
  try {
    const response = await apiService.put(`/EstadosServicio/${estadoServicio.id}`, estadoServicio);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getEstadoservicioById(id: string) {
  try {
    const response = await apiService.get<EstadoServicio>(`/EstadosServicio/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el estado servicio:", error);
    return null;
  }
}

export async function postEstadoServicio({ estadoServicio }: { estadoServicio: EstadoServicio }) {
  try {
    const response = await apiService.post("/EstadosServicio", estadoServicio);
    return response.data;
  } catch (error) {
    console.error("Error al crear el estado servicio:", error);
    throw error;
  }
}
