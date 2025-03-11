import { useFormContext, useFormState } from "react-hook-form";
import type { CarwashFormValues } from "../schema"; // Ajusta la ruta según corresponda
import { formatLempiras } from "@/lib/utils";

export function PaymentSummaryCard() {
  const { watch, control } = useFormContext<CarwashFormValues>();
  // Nos suscribimos a cambios en isSubmitted y errors para re-renderizar cuando se haga submit
  const { isSubmitted, errors } = useFormState({ control });

  const vehiculos = watch("vehiculos") || [];
  const pagos = watch("pagos") || [];

  // Calcula el total de servicios, sumando el precio del servicio y el total de sus productos
  const totalServicios = vehiculos.reduce((acc: number, vehiculo) => {
    const serviciosTotal = vehiculo.servicios.reduce((sum: number, servicio) => {
      const productosTotal = servicio.productos
        ? servicio.productos.reduce((pSum: number, producto: any) => pSum + Number(producto.precio), 0)
        : 0;
      return sum + Number(servicio.precio) + productosTotal;
    }, 0);
    return acc + serviciosTotal;
  }, 0);

  // Calcula el total de pagos forzando la conversión a número
  const totalPagos = pagos.reduce(
    (acc: number, pago: CarwashFormValues["pagos"][number]) => {
      return acc + Number(pago.monto);
    },
    0
  );

  // La diferencia (faltante o exceso) se calcula como total de servicios menos total de pagos
  const diferencia = totalServicios - totalPagos;

  return (
    <div className="p-4 border rounded-md shadow-md">
      <h4 className="text-lg font-semibold mb-2">Resumen de Pagos</h4>
      <p>
        <strong>Total de Servicios:</strong> {formatLempiras(totalServicios)}
      </p>
      <p>
        <strong>Total de Pagos:</strong> {formatLempiras(totalPagos)}
      </p>
      <p>
        <strong>{diferencia > 0 ? "Faltante:" : "Exceso:"}</strong> {formatLempiras(Math.abs(diferencia))}
      </p>

      {/* Mostrar el error solo al dar submit */}
      {isSubmitted && diferencia !== 0 && (
        <div className="mt-4 p-2 border border-red-500 bg-red-100 text-red-700 rounded">
          {errors.pagos?.message ||
            "Error: El total de servicios no coincide con el total de pagos."}
        </div>
      )}
    </div>
  );
}
