'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { AlertDialog } from "@/components/alert";

interface SignalRContextType {
  connection: HubConnection | null;
  connectionStatus: string;
  order: any; // Aquí se guarda la orden recibida
  setOrder: (order: any) => void; // Función para actualizar la orden
}

const SignalRContext = createContext<SignalRContextType | undefined>(undefined);

export const useSignalRContext = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error("useSignalRContext must be used within a SignalRProvider");
  }
  return context;
};

export const SignalRProvider = ({ employeeId, children }: { employeeId: string; children: React.ReactNode }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<string>("Connecting...");
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    let activeConnection: HubConnection;

    const connectSignalR = async () => {
      const hubUrl = `${process.env.NEXT_PUBLIC_SIGNALR_URL}/orderHub`;
      const newConnection = new HubConnectionBuilder()
        .withUrl(hubUrl, { withCredentials: true })
        .build();

      // Evento para recibir una nueva orden
      newConnection.on("newOrder", (receivedOrder: any) => {
        console.log("Nueva orden recibida:", receivedOrder);
        setOrder(receivedOrder);
      });

      newConnection.onclose(() => setConnectionStatus("Disconnected"));
      newConnection.onreconnecting(() => setConnectionStatus("Reconnecting..."));
      newConnection.onreconnected(() => setConnectionStatus("Connected"));

      try {
        await newConnection.start();
        setConnection(newConnection);
        setConnectionStatus("Connected");
        activeConnection = newConnection;
        // Invoca el método del Hub para unirse al grupo del empleado
        await newConnection.invoke("JoinRoom", employeeId);
      } catch (err) {
        console.error("Error al conectar a SignalR", err);
        setConnectionStatus("Error");
      }
    };

    connectSignalR();

    // Cleanup: salir del grupo y detener la conexión
    return () => {
      if (activeConnection) {
        activeConnection.invoke("LeaveRoom", employeeId).catch((err) => console.error("Error al salir del grupo", err));
        activeConnection.stop();
      }
    };
  }, [employeeId]);

  // Efecto para reproducir sonido cuando llega una nueva orden
  useEffect(() => {
    if (order) {
      const audio = new Audio("/notification.mp3"); // Asegúrate de tener el archivo en /public
      audio.play().catch((err) => console.error("Error reproduciendo sonido:", err));
    }
  }, [order]);

  return (
    <SignalRContext.Provider value={{ connection, connectionStatus, order, setOrder }}>
      {children}
      {/* Muestra el AlertDialog si hay una nueva orden */}
      {order && <AlertDialog order={order} onClose={() => setOrder(null)} />}
    </SignalRContext.Provider>
  );
};
