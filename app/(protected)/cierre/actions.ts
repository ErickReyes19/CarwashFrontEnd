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
export async function postCierre() {
  try {
    const response = await apiService.post("/cierre",{});
    return response?.data;
  } catch (error) {
    console.error("Error al obtener los cierres:", error);
    return [];
  }
}