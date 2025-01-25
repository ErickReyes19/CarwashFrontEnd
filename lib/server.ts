import { getToken } from '@/auth';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { redirect } from 'next/navigation';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
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
            // Redirige si no hay token
            if (typeof window !== "undefined") {
              window.location.href = "/";
            }
          }
        } catch (error) {
          // En caso de error en la obtención del token
          window.location.href = "/";
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
          if (typeof window !== "undefined") {
            window.location.href = "/";
          } else {
            redirect("/");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.get<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.post<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.put<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.delete<T>(url, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async patch<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.patch<T>(url, data, config);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Manejo de errores
  private handleError(error: any) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      console.error(`Error en la solicitud Axios: ${message}`);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
}

const apiServiceInstance = new ApiService();
export default apiServiceInstance;
