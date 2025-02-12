"use server";

import { Servicio } from "@/lib/Types";
import apiService from "../../../lib/server";
import { ServicioRegistro } from "../registros/components/types";
// import { ClienteElementSchema } from "./schema";

export async function getServicios() {
  try {
    const response = await apiService.get<Servicio[]>("/Servicio");
    return response?.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
}
export async function getServiciosActivos() {
  try {
    const response = await apiService.get<ServicioRegistro[]>("/Servicio/active");
    return response?.data;
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    return [];
  }
}

export async function putServicio({ servicio }: { servicio: Servicio }) {
  try {
    const response = await apiService.put(`/Servicio/${servicio.id}`, servicio);

    return response?.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function postServicio({ servicio }: { servicio: Servicio }) {
  try {
    const response = await apiService.post("/Servicio", servicio);
    return response?.data;
  } catch (error) {
    console.error("Error al crear servicio:", error);
    throw error;
  }
}

export async function getServicioId(id: string) {
  try {
    const response = await apiService.get<Servicio>(`/Servicio/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    return null;
  }
}
