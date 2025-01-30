import { getToken } from '@/auth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';

class ApiService {
  private static axiosInstance: AxiosInstance;

  private constructor() {}

  // Patrón Singleton para la instancia de Axios
  public static getInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: process.env.URLBASE,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Interceptor para las solicitudes
      this.axiosInstance.interceptors.request.use(
        async (config) => {
          try {
            const token = await getToken();
            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            } else {
              if (typeof window !== 'undefined') {
                window.location.href = '/';
              }
            }
          } catch (error) {
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            }
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      // Interceptor para las respuestas
      this.axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response && error.response.status === 401) {
            if (typeof window !== 'undefined') {
              window.location.href = '/';
            } else {
              redirect('/');
            }
          }
          return Promise.reject(error);
        }
      );
    }
    return this.axiosInstance;
  }

  // Métodos de solicitud HTTP
  static async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.getInstance().get<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.getInstance().post<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.getInstance().put<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.getInstance().delete<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  static async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.getInstance().patch<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Manejo de errores
  private static handleError(error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data;

      // Retornar el código de respuesta y el cuerpo completo de la respuesta
      return {
        status,
        data,
      };
    } else {
      throw new Error('Ocurrió un error inesperado.');
    }
  }
}

export default ApiService;
