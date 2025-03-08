'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { AlertDialog } from "@/components/alert";

interface SignalRContextType {
  connection: HubConnection | null;
  connectionStatus: string;
  order: any; // Aquí guardamos la orden recibida
  setOrder: (order: any) => void; // Función para actualizar el estado de la orden
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
  const [order, setOrder] = useState<any>(null); // Aquí guardamos la orden recibida

  useEffect(() => {
    const connectSignalR = async () => {
        const hubUrl = `${process.env.NEXT_PUBLIC_SIGNALR_URL}/orderHub`;
      const newConnection = new HubConnectionBuilder()
        .withUrl(hubUrl)
        .build();

      newConnection.on("newOrder", (receivedOrder: any) => {
        console.log("Nueva orden recibida:", receivedOrder);
        setOrder(receivedOrder); // Actualizar la orden
      });

      newConnection.onclose(() => setConnectionStatus("Disconnected"));
      newConnection.onreconnecting(() => setConnectionStatus("Reconnecting..."));
      newConnection.onreconnected(() => setConnectionStatus("Reconnected"));

      try {
        await newConnection.start();
        setConnection(newConnection);
        setConnectionStatus("Connected");
      } catch (err) {
        console.error("Error al conectar a SignalR", err);
        setConnectionStatus("Error");
      }
    };

    connectSignalR();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, [employeeId]); // El efecto solo se ejecuta cuando employeeId cambia

  return (
    <SignalRContext.Provider value={{ connection, connectionStatus, order, setOrder }}>
      {children}
      {/* Mostramos el AlertDialog si hay una nueva orden */}
      {order && <AlertDialog order={order} />}
    </SignalRContext.Provider>
  );
};
