
import apiService from "../../../lib/server";
import { RegistroServicioView } from "./components/types";
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