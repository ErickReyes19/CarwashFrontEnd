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

// export async function putCliente({ data }: { data: Cliente }) {
//   try {
//     const response = await apiService.put(`/clientes/${data.clienteId}`, data);

//     return response.data;
//   } catch (error) {
//     console.error("Error:", error);
//     return [];
//   }
// }

// export async function getClienteById(id: string) {
//   try {
//     const response = await apiService.get<Cliente>(`/clientes/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener el cliente:", error);
//     return null;
//   }
// }

// export async function postCliente({ cliente }: { cliente: Cliente }) {
//   try {
//     const response = await apiService.post("/clientes", cliente);
//     return response.data;
//   } catch (error) {
//     console.error("Error al crear cliente:", error);
//     throw error;
//   }
// }
