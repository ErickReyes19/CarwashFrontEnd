import * as React from 'react';
import Image from "next/image";

// Función de formato para los precios
const formatLempiras = (amount: number) => {
  return `HNL ${amount.toFixed(2)}`;
};

interface EmailTemplateProps {
  firstName: string;
  registro: any; // Define el tipo apropiado con las propiedades necesarias
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  registro,
}) => {
  // Calcular total sumando cada servicio y sus productos asociados
  const totalGeneral = registro.vehiculos.flatMap((v: any) => v.servicios)
    .reduce((sum: number, s: any) => {
      const totalProductos = s.producto?.reduce((acc: number, p: any) => acc + (p.precio * p.cantidad), 0) || 0;
      return sum + s.precio + totalProductos;
    }, 0);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f2f2f2', padding: '20px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', boxShadow: '0 0 10px rgba(0,0,0,0.1)', padding: '30px' }}>
        
        {/* Header */}
        <table style={{ width: '100%', borderBottom: '2px solid #e0e0e0', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'middle' }}>
                <h1 style={{ fontSize: '26px', margin: '0 0 10px 0', color: '#333' }}>Factura de Servicio</h1>
                <p style={{ fontSize: '12px', color: '#777', margin: '0' }}>
                  <strong>ID:</strong> {registro.id}
                </p>
                <p style={{ fontSize: '12px', color: '#777', margin: '0' }}>
                  <strong>Fecha:</strong> {new Date(registro.fecha).toLocaleDateString()}
                </p>
              </td>
              <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <img
                  src="https://res.cloudinary.com/dspl3mzbp/image/upload/v1740592237/wuf3pl1unf21rskhp2wo.png"
                  alt="Logo"
                  style={{ width: '60px', height: '60px' }}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Datos del Cliente */}
        <table style={{ width: '100%', marginBottom: '20px' }}>
          <tbody>
            <tr>
              <td>
                <h2 style={{ fontSize: '16px', color: '#333', margin: '0 0 5px 0' }}>Cliente</h2>
                <p style={{ fontSize: '14px', color: '#555', margin: '0' }}>
                  {registro.cliente?.nombre} {registro.cliente?.apellido}
                </p>
                <p style={{ fontSize: '14px', color: '#555', margin: '0' }}>
                  {registro.cliente?.correo}
                </p>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Detalles del Servicio */}
        <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', fontSize: '16px', color: '#333', paddingBottom: '10px' }} colSpan={2}>
                Detalles del Servicio
              </th>
            </tr>
          </thead>
          <tbody>
            {registro.vehiculos?.map((vehiculo: any) => (
              <React.Fragment key={vehiculo.id}>
                <tr style={{ backgroundColor: '#fafafa' }}>
                  <td colSpan={2} style={{ padding: '10px' }}>
                    <strong style={{ fontSize: '14px', color: '#333' }}>
                      {vehiculo.vehiculo.marca} {vehiculo.vehiculo.modelo}
                    </strong>
                    <span style={{ fontSize: '13px', color: '#777', marginLeft: '10px' }}>
                      - Placa: {vehiculo.vehiculo.placa.toUpperCase()}
                    </span>
                  </td>
                </tr>
                {vehiculo.servicios?.map((servicio: any) => (
                  <React.Fragment key={servicio.id}>
                    <tr>
                      <td style={{ padding: '5px 10px', fontSize: '13px', color: '#444' }}>
                        {servicio.servicioNombre}
                      </td>
                      <td style={{ padding: '5px 10px', fontSize: '13px', color: '#444', textAlign: 'right' }}>
                        {formatLempiras(servicio.precio)}
                      </td>
                    </tr>
                    {servicio.producto && servicio.producto.length > 0 && (
                      <tr>
                        <td colSpan={2} style={{ paddingLeft: '20px' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <tbody>
                              {servicio.producto.map((producto: any) => (
                                <tr key={producto.productoId}>
                                  <td style={{ padding: '3px 10px', fontSize: '12px', color: '#666' }}>
                                    {producto.nombre} (x{producto.cantidad})
                                  </td>
                                  <td style={{ padding: '3px 10px', fontSize: '12px', color: '#666', textAlign: 'right' }}>
                                    {formatLempiras(producto.precio * producto.cantidad)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        {/* Total General */}
        <table style={{ width: '100%', borderTop: '2px solid #e0e0e0', paddingTop: '15px', marginTop: '20px' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'right', fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                Total General: {formatLempiras(totalGeneral)}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <table style={{ width: '100%', borderTop: '1px solid #e0e0e0', paddingTop: '15px', marginTop: '30px' }}>
          <tbody>
            <tr>
              <td style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
                Gracias por confiar en nuestros servicios. Si tienes alguna pregunta, contáctanos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
