"use server";

import {
  Cliente,
  ClienteVehiculo,
  Vehiculo,
  VehiculoCreate,
} from "@/lib/Types";
import apiService from "../../../lib/server";
import { VehiculoRegistro } from "../registros/components/types";
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
export const obtenerVehiculoPorCliente = async (id: string): Promise<VehiculoRegistro[] > => {
  try {
    const response = await apiService.get<Vehiculo[]>(`/Vehiculo/cliente/${id}`);
    
    // Verifica si los datos existen y luego transforma
    if (response.data) {
      return transformarVehiculo(response.data);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error al obtener el vehículo:", error);
    return [];
  }
};
const transformarVehiculo = (data: any[]): VehiculoRegistro[] => {
  return data.map((vehiculo) => ({
    id: vehiculo.id,
    nombre: `${vehiculo.marca} - ${vehiculo.modelo} - ${vehiculo.color}`,
  }));
};

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
    const { clientes, ...vehiculoSinClientes } = vehiculoCreate;

    const vehiculo = {
      ...vehiculoSinClientes,
      clientes: clientes?.map((cliente) => ({ id: cliente.id })) || [],
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

