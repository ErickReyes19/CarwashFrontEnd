"use server";
import { getSessionUsuario } from "@/auth";
import apiService from "../../../lib/server";
import { EarningsData } from "@/lib/Types";


export async function getananciasRango(fechaDesde?: string, fechaHasta?: string): Promise<EarningsData[]> {
  try {
    const params: Record<string, string> = {};

    // Si no se pasa fechaDesde, usar la fecha actual
    if (!fechaDesde) {
      const today = new Date();
      fechaDesde = today.toISOString().split('T')[0]; // Formato yyyy-MM-dd
    }
    params.fechaDesde = fechaDesde;

    // Si no se pasa fechaHasta, usar la fecha actual
    if (!fechaHasta) {
      const today = new Date();
      fechaHasta = today.toISOString().split('T')[0]; // Formato yyyy-MM-dd
    }
    params.fechaHasta = fechaHasta;

    const response = await apiService.get<EarningsData[]>("reporte/ganancias_rango", {
      params,
    });
    return response?.data || [];
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    return [];  // Retorna un array vacío en caso de error
  }
}
