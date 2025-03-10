"use server";
import { getSessionUsuario } from "@/auth";
import apiService from "../../../lib/server";
import { CambiarEstadoType, RegistroServicioEdit, RegistroServicioPost, RegistroServicioView } from "./components/types";
import { RegistroServicio } from "@/lib/Types";  // Asegúrate de importar el template de correo
import { Resend } from 'resend';
import { EmailTemplate } from "./components/facturaPDF";

export async function sendInvoice(registro: any, emailCliente: string) {
  console.log("EN´tro mamalon")
  try {
    // Generar el contenido del correo usando el template
    const emailContent = EmailTemplate({
      firstName: registro.cliente.nombre,
      registro,
    });

    // Enviar el correo con Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [emailCliente],
      // to: 'erickjosepineda33@gmail.com',
      subject: `Factura - ${registro.id}`,
      react: emailContent,
    });

    if (error) {
      console.error("Error al enviar el correo:", error);
      throw new Error('No se pudo enviar el correo');
    }

    console.log('Correo enviado con éxito:', data);
  } catch (error) {
    console.error("Error al generar o enviar el correo:", error);
    throw error;
  }
}


export async function getRegistros(fechaDesde?: string, fechaHasta?: string): Promise<RegistroServicio[]> {
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

export async function getRegistroServicioIdGet(id: string) {
  try {
    const response = await apiService.get<RegistroServicioEdit>(`/RegistroServicio/${id}/edit`);
    return response?.data;
  } catch (error) {
    console.error("Error al obtener el Registro Servicio:", error);
    return null;
  }
}



// Función para crear el registro de servicio
export async function postRegistroServicio({
  data,
}: {
  data: RegistroServicioPost;
}) {
  try {
    const sesion = await getSessionUsuario();
    const usuarioId = sesion?.usuarioId;
    if (!usuarioId) {
      throw new Error("El usuario no está autenticado.");
    }
    const registroConUsuarioId = {
      ...data,
      UsuarioId: usuarioId,
    };
    const response = await apiService.post("/RegistroServicio/multiple", registroConUsuarioId);
    return response?.data;
  } catch (error) {
    console.error("Error al crear el registro de servicio:", error);
    throw error;
  }
}


// Función para crear el registro de servicio
export async function putRegistroServicio({
  data,
}: {
  data: RegistroServicioPost;
}) {
  try {
    const sesion = await getSessionUsuario();
    const usuarioId = sesion?.usuarioId;
    if (!usuarioId) {
      throw new Error("El usuario no está autenticado.");
    }
    const registroConUsuarioId = {
      ...data,
      UsuarioId: usuarioId,
    };
    const response = await apiService.put("/RegistroServicio/multiple", registroConUsuarioId);
    return response?.data;
  } catch (error) {
    console.error("Error al crear el registro de servicio:", error);
    throw error;
  }
}
export async function putCambiarEstado({
  data,
}: {
  data: CambiarEstadoType;
}) {
  try {

    const response = await apiService.put("/RegistroServicio/actualizar-estado", data);
    return response?.data;
  } catch (error) {
    console.error("Error al crear el registro de servicio:", error);
    throw error;
  }
}

