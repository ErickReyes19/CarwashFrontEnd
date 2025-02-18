"use server";

import { Cierre } from "@/lib/Types";
import apiService from "../../../lib/server";

export async function getClientes() {
  try {
    const response = await apiService.get<Cierre[]>("/cierre");
    return response?.data;
  } catch (error) {
    console.error("Error al obtener los cierres:", error);
    return [];
  }
}