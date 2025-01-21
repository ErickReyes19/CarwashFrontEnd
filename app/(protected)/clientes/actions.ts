"use server";

import { Cliente } from "@/lib/Types";
import apiService from "../../../lib/server";
// import { ClienteElementSchema } from "./schema";

export async function getClientes() {
  try {
    const response = await apiService.get<Cliente[]>("/cliente");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los clientes:", error);
    return [];
  }
}

export async function putCliente({ cliente }: { cliente: Cliente }) {
  try {
    const response = await apiService.put(`/Cliente/${cliente.id}`, cliente);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getClienteById(id: string) {
  try {
    const response = await apiService.get<Cliente>(`/cliente/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el cliente:", error);
    return null;
  }
}

export async function postCliente({ cliente }: { cliente: Cliente }) {
  try {
    const response = await apiService.post("/cliente", cliente);
    return response.data;
  } catch (error) {
    console.error("Error al crear cliente:", error);
    throw error;
  }
}
