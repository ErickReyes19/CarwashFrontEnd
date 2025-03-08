// useSignalR.tsx
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export function useSignalR(employeeId: string) {
  const [order, setOrder] = useState<any>(null); // Guardamos la orden recibida
  const [connectionStatus, setConnectionStatus] = useState<string>("Desconectado");

  useEffect(() => {
    console.log("Iniciando la conexión SignalR...");
    const hubUrl = `${process.env.NEXT_PUBLIC_SIGNALR_URL}/orderHub`;
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, { withCredentials: true })
      .withAutomaticReconnect()
      .build();

    newConnection.onclose(() => {
      console.log("Conexión cerrada.");
      setConnectionStatus("Desconectado");
    });

    newConnection.onreconnecting(() => {
      console.log("Reintentando conexión...");
      setConnectionStatus("Reconectando...");
    });

    newConnection.onreconnected(() => {
      console.log("Reconexión exitosa.");
      setConnectionStatus("Conectado");
    });

    // Manejar la nueva orden recibida
    newConnection.on("newOrder", (receivedOrder: any) => {
      console.log("Nueva orden recibida:", receivedOrder);
      setOrder(receivedOrder); // Actualizamos el estado con la nueva orden
    });

    // Iniciar la conexión
    newConnection
      .start()
      .then(() => {
        console.log("Conectado a SignalR en:", hubUrl);
        setConnectionStatus("Conectado");
        newConnection.invoke("JoinRoom", employeeId).catch((err) => {
          console.error("Error al unirse a la sala:", err);
        });
      })
      .catch((err) => {
        console.error("Error al conectar con SignalR:", err);
        setConnectionStatus("Error de conexión");
      });

    return () => {
      if (newConnection) {
        newConnection.invoke("LeaveRoom", employeeId).catch((err) => console.error("Error al salir de la sala:", err));
        newConnection.stop();
      }
    };
  }, [employeeId]);

  return {
    order, // Devolver la orden para mostrarla en el Dialog
    connectionStatus,
  };
}
