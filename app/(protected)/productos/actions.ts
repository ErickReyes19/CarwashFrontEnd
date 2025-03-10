"use server";

import { Producto, EstadoServicioRegistro } from "@/lib/Types";
import apiService from "../../../lib/server";
// import { ClienteElementSchema } from "./schema";

export async function getProductos() {
  try {
    const response = await apiService.get<Producto[]>("/Producto");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Producto:", error);
    return [];
  }
}
export async function getEstadoProductosActivos() {
  try {
    const response = await apiService.get<Producto[]>("/Producto/active");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los Producto:", error);
    return [];
  }
}

export async function putProducto({ producto }: { producto: Producto }) {
  try {
    const response = await apiService.put(`/Producto/${producto.id}`, producto);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export async function getProductoById(id: string) {
  try {
    const response = await apiService.get<Producto>(`/Producto/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return null;
  }
}

export async function postProducto({ producto }: { producto: Producto }) {
  try {
    const response = await apiService.post("/Producto", producto);
    return response.data;
  } catch (error) {
    console.error("Error al crear el Producto:", error);
    throw error;
  }
}
