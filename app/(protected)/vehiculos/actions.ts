"use server";

import {
  Cliente,
  ClienteVehiculo,
  Vehiculo,
  VehiculoCreate,
} from "@/lib/Types";
import apiService from "../../../lib/server";
// import { ClienteElementSchema } from "./schema";

export async function getVehiculos() {
  try {
    const response = await apiService.get<Vehiculo[]>("/Vehiculo");
    return response?.data;
  } catch (error) {
    console.error("Error al obtener los vehiculos:", error);
    return [];
  }
}
export async function getVehiculoById(id: string) {
  try {
    const response = await apiService.get<Vehiculo>(`/Vehiculo/${id}`);
    return response?.data;
  } catch (error) {
    console.error("Error al obtener el vehiculo:", error);
    return null;
  }
}
export async function postVehiculo({
  vehiculoCreate,
}: {
  vehiculoCreate: VehiculoCreate;
}) {
  try {
    const response = await apiService.post("/vehiculo", vehiculoCreate);
    return { status: response.status, data: response.data };
  } catch (error: any) {
    return {
      status: error.status || 500,
      data: error.data || { message: "Error inesperado" },
    };
  }
}
export async function AsignarVehiculoACliente({
  idVehiculo,
  clientes,
}: {
  idVehiculo: string;
  clientes: ClienteVehiculo[];
}) {
  const clientesId = clientes.map((cliente) => cliente.id);
  try {
    const response = await apiService.put(
      `/vehiculo/${idVehiculo}/agregar-clientes`,
      clientesId
    );
    return { status: response.status, data: response.data };
  } catch (error: any) {
    return {
      status: error.status || 500,
      data: error.data || { message: "Error inesperado" },
    };
  }
}

export async function putVehiculo({
  vehiculoCreate,
}: {
  vehiculoCreate: VehiculoCreate;
}) {
  try {
    // Desestructuración para quitar clienteVehiculo
    const { clienteVehiculo, ...vehiculoSinClientes } = vehiculoCreate;

    const vehiculo = {
      ...vehiculoSinClientes,
      clientes: clienteVehiculo?.map((cliente) => ({ id: cliente.id })) || [],
    };


    const response = await apiService.put(
      `/Vehiculo/${vehiculoCreate.id}`,
      vehiculo
    );

    return { status: response.status, data: response.data };
  } catch (error: any) {
    return {
      status: error.status || 500,
      data: error.data || { message: "Error inesperado" },
    };
  }
}

