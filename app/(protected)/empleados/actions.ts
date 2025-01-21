"use server";

import { Cliente, Empleado } from "@/lib/Types";
import apiService from "../../../lib/server";
// import { ClienteElementSchema } from "./schema";

export async function getEmpleados() {
  try {
    const response = await apiService.get<Empleado[]>("/Empleado");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return [];
  }
}

export async function putEmpleado({ empleado }: { empleado: Empleado }) {
  console.log("ENtró al put")
  try {

    console.log(empleado)
    const response = await apiService.put(`/Empleado/${empleado.id}`, empleado);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getEmpleadoId(id: string) {
  try {
    const response = await apiService.get<Empleado>(`/Empleado/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el empleado:", error);
    return null;
  }
}

export async function postEmpleado({ empleado }: { empleado: Empleado }) {
  try {
    const response = await apiService.post("/Empleado", empleado);
    return response.data;
  } catch (error) {
    console.error("Error al crear empleado:", error);
    throw error;
  }
}
