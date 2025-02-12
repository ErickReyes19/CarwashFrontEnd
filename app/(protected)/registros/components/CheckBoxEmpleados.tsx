import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Asegúrate de que la ruta y el nombre del type sean correctos
import { EmpleadoRegistro } from "../../registros/components/types";

export const CheckboxEmpleados = ({
  empleados,
  selectedEmpleados,
  onChange,
}: {
  empleados: EmpleadoRegistro[];
  selectedEmpleados: string[];
  onChange: (selected: string[]) => void;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id: string) => {
    const newSelected = selectedEmpleados.includes(id)
      ? selectedEmpleados.filter((empleadoId) => empleadoId !== id)
      : [...selectedEmpleados, id];
    onChange(newSelected);
  };

  const filteredEmpleados = empleados.filter((empleado) =>
    empleado.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Campo de búsqueda */}
      <Input
        type="text"
        placeholder="Buscar empleados..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2"
      />

      {/* Lista de empleados con Checkbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredEmpleados.map((empleado) => (
          <Label
            key={empleado.id}
            htmlFor={empleado.id}
            className="flex items-center space-x-2 p-3 border border-muted-200 rounded-lg hover:bg-muted-100 transition duration-200 cursor-pointer"
          >
            <Checkbox
              id={empleado.id}
              checked={selectedEmpleados.includes(empleado.id)}
              onCheckedChange={() => handleCheckboxChange(empleado.id)}
              className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-muted-800 font-medium">
              {empleado.nombre}
            </span>
          </Label>
        ))}
      </div>

      {filteredEmpleados.length === 0 && (
        <div className="text-muted-500">No se encontraron empleados.</div>
      )}
    </div>
  );
};
